import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

const PrayerTimeSection = ({
  icon,
  label,
  time,
  onToggle,
}: {
  icon: React.ReactNode;
  label: string;
  time: string | undefined;
  onToggle: () => void;
}) => (
  <View className="flex-row p-3 border-b justify-between items-center border-gray-100">
    <View className="flex-row items-center gap-8">
      {icon}
      <Text style={{ fontFamily: 'Quicksand_700Bold' }}>{label}</Text>
    </View>
    <View className="flex-row items-center gap-14">
      <Text className="text-gray-400">{time}</Text>
      <TouchableOpacity
        onPress={onToggle}
        className="p-1.5 bg-cPrimary/10 rounded-lg">
        <Ionicons name="notifications-outline" size={20} color="#00957b" />
      </TouchableOpacity>
    </View>
  </View>
);

export default PrayerTimeSection;
