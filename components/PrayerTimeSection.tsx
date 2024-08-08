import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNotifications } from 'react-native-notificated';

const PrayerTimeSection = ({
  icon,
  label,
  time,
}: {
  icon: React.ReactNode;
  label: string;
  time: string | undefined;
}) => {
  const { notify } = useNotifications();
  const [active, setActive] = React.useState(false);

  const handleToggle = () => {
    setActive(!active);
    notify('info', {
      params: {
        title: `Pengingat sholat ${label} di ${
          !active ? 'aktifkan' : 'matikan'
        }`,
        style: {
          leftIconSource: (
            <Ionicons
              name={
                !active ? 'notifications-outline' : 'notifications-off-outline'
              }
              size={20}
              color="#00957b"
            />
          ),
        },
        hideCloseButton: true,
      },
    });
  };

  return (
    <View className="flex-row p-3 border-b justify-between items-center border-gray-100">
      <View className="flex-row items-center gap-8">
        {icon}
        <Text style={{ fontFamily: 'Quicksand_700Bold' }}>{label}</Text>
      </View>
      <View className="flex-row items-center gap-14">
        <Text className="text-gray-400">{time}</Text>
        <TouchableOpacity
          onPress={handleToggle}
          className="p-1.5 bg-cPrimary/10 rounded-lg">
          <Ionicons
            name={
              active ? 'notifications-outline' : 'notifications-off-outline'
            }
            size={20}
            color="#00957b"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PrayerTimeSection;
