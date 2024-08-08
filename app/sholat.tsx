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
import useUserLocation from '@/hooks/useUserLocation ';
import PrayerTimeSection from '@/components/PrayerTimeSection';
import RealTimeClock from '@/components/RealTimeClock';

type AutoLocation = {
  province: string;
  city: string;
};

const SholatScreen = () => {
  const [date, setDate] = React.useState(new Date());
  const { location } = useUserLocation();
  const [autoLocation, setAutoLocation] = React.useState<AutoLocation>();
  const [prayTime, setPrayTime] = React.useState<PrayTimeModel>();
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
  }, []);

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
            Maghrib kurang dari pukul 05:23
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
          onToggle={() => console.log('toggle Subuh')}
        />
        <PrayerTimeSection
          icon={<Feather name="sun" size={20} color="black" />}
          label="Dzuhur"
          time={prayTime?.dzuhur}
          onToggle={() => console.log('toggle Dzuhur')}
        />
        <PrayerTimeSection
          icon={
            <Ionicons name="partly-sunny-outline" size={20} color="black" />
          }
          label="Ashar"
          time={prayTime?.ashar}
          onToggle={() => console.log('toggle Ashar')}
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
          onToggle={() => console.log('toggle Maghrib')}
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
          onToggle={() => console.log('toggle Isya')}
        />
      </View>
    </ScrollView>
  );
};

export default SholatScreen;
