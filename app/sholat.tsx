import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import DateChanged from '@/components/DateChanged';
import {
  Feather,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import axios from 'axios';
import formatLocationName from '@/utils/formatLocationName';
import { PrayTimeModel } from '@/interfaces/sholat-interface';
import moment from 'moment';
import PrayerTimeSection from '@/components/PrayerTimeSection';
import RealTimeClock from '@/components/RealTimeClock';
import useUserLocation from '@/hooks/useUserLocation ';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';

type AutoLocation = {
  province: string;
  city: string;
};

const SHOLAT_NOTIFICATION_TASK = 'SHOLAT_NOTIFICATION_TASK';

TaskManager.defineTask(SHOLAT_NOTIFICATION_TASK, async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Waktu Sholat',
      body: 'Saatnya sholat!',
      sound: require('@/assets/audio/adzan_kurdi.mp3'),
    },
    trigger: {
      seconds: 2,
    },
  });
});

const SholatScreen = () => {
  const [date, setDate] = React.useState(new Date());
  const { location } = useUserLocation();
  const [autoLocation, setAutoLocation] = React.useState<AutoLocation>();
  const [prayTime, setPrayTime] = React.useState<PrayTimeModel>();
  const [nextPrayer, setNextPrayer] = React.useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = React.useState<string | null>(null);
  const [notificationScheduled, setNotificationScheduled] =
    React.useState(false);
  const DEFAULT_CITY_ID = '1301';

  const fetchPrayerTime = React.useCallback(
    async (cityId: string) => {
      try {
        const { data } = await axios.get(
          `${
            process.env.EXPO_PUBLIC_API_URL_2
          }/sholat/jadwal/${cityId}/${moment(date).format('YYYY/MM/DD')}`
        );
        setPrayTime(data.data?.jadwal);
      } catch (error) {
        console.error('Error fetching prayer times:', error);
      }
    },
    [date]
  );

  const getCityId = React.useCallback(
    async (city: string) => {
      const convertCity = formatLocationName(city);
      try {
        const { data } = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL_2}/sholat/kota/cari/${convertCity}`
        );
        fetchPrayerTime(data.data[0]?.id ?? DEFAULT_CITY_ID);
      } catch (error) {
        console.error('Error fetching city ID:', error);
      }
    },
    [fetchPrayerTime]
  );

  const getDetailLocation = React.useCallback(async () => {
    if (location?.coords) {
      try {
        const { data } = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL_5}?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&localityLanguage=id`
        );
        const province = data.localityInfo.administrative[2].name;
        const city = data.localityInfo.administrative[3].name;
        setAutoLocation({ province, city });
        getCityId(city);
      } catch (error) {
        console.error('Error fetching location details:', error);
      }
    }
  }, [location, getCityId]);

  const calculateNextPrayerTime = React.useCallback(() => {
    if (prayTime) {
      const prayerTimes = [
        { name: 'Subuh', time: prayTime.subuh },
        { name: 'Dzuhur', time: prayTime.dzuhur },
        { name: 'Ashar', time: prayTime.ashar },
        { name: 'Maghrib', time: prayTime.maghrib },
        { name: "Isya'", time: prayTime.isya },
      ];

      const now = moment();
      for (let i = 0; i < prayerTimes.length; i++) {
        const prayerMoment = moment(prayerTimes[i].time, 'HH:mm');
        if (prayerMoment.isAfter(now)) {
          setNextPrayer(prayerTimes[i].name);
          const diff = prayerMoment.diff(now);
          setTimeRemaining(moment.utc(diff).format('HH:mm'));
          // Schedule notification if not already scheduled
          if (!notificationScheduled) {
            Notifications.scheduleNotificationAsync({
              content: {
                title: 'Waktu Sholat',
                body: `${prayerTimes[i].name} - Saatnya sholat!`,
                sound: require('@/assets/audio/adzan_kurdi.mp3'),
              },
              trigger: {
                seconds: diff / 1000, // Set trigger based on the remaining time
              },
            });
            setNotificationScheduled(true);
          }
          break;
        }
      }
    }
  }, [prayTime, notificationScheduled]);

  React.useEffect(() => {
    getDetailLocation();
  }, [location, getDetailLocation]);

  React.useEffect(() => {
    if (autoLocation?.city) {
      getCityId(autoLocation.city);
    }
  }, [date, autoLocation?.city, getCityId]);

  React.useEffect(() => {
    setDate(new Date());
    calculateNextPrayerTime();

    // Set up a task to check if it's a new day
    const interval = setInterval(() => {
      const currentDate = new Date();
      if (currentDate.getDate() !== date.getDate()) {
        setDate(currentDate);
        setNotificationScheduled(false); // Reset the flag to schedule new notifications
        calculateNextPrayerTime(); // Recalculate prayer times for the new date
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [prayTime, calculateNextPrayerTime]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="relative">
        <Image
          alt="Background"
          className="w-full opacity-90"
          source={require('@/assets/images/bg-adzan.png')}
        />
        <View className="absolute top-0 w-full flex-col justify-center items-center h-full">
          <Text
            className="text-white mb-4"
            style={{ fontFamily: 'Quicksand_500Medium' }}>
            {autoLocation?.city}, {autoLocation?.province}
          </Text>
          <RealTimeClock />
          <Text
            className="text-white"
            style={{ fontFamily: 'Quicksand_500Medium' }}>
            {nextPrayer && timeRemaining
              ? `${nextPrayer} kurang dari ${timeRemaining}`
              : 'Jadwal sholat hari ini sudah selesai'}
          </Text>
        </View>
      </View>
      <View className="relative bottom-9 mx-5">
        <DateChanged date={date} setDate={setDate} />
      </View>
      <View className="relative bottom-9 mx-5 bg-white mt-8 rounded-xl p-5">
        <PrayerTimeSection
          icon={<Fontisto name="night-alt-cloudy" size={20} color="black" />}
          label="Subuh"
          time={prayTime?.subuh}
        />
        <PrayerTimeSection
          icon={<Feather name="sun" size={20} color="black" />}
          label="Dzuhur"
          time={prayTime?.dzuhur}
        />
        <PrayerTimeSection
          icon={
            <Ionicons name="partly-sunny-outline" size={20} color="black" />
          }
          label="Ashar"
          time={prayTime?.ashar}
        />
        <PrayerTimeSection
          icon={
            <MaterialCommunityIcons
              name="weather-sunset"
              size={20}
              color="black"
            />
          }
          label="Maghrib"
          time={prayTime?.maghrib}
        />
        <PrayerTimeSection
          icon={
            <MaterialCommunityIcons
              name="weather-night"
              size={20}
              color="black"
            />
          }
          label="Isya'"
          time={prayTime?.isya}
        />
      </View>
    </ScrollView>
  );
};

export default SholatScreen;
