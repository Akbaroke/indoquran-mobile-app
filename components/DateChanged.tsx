import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import moment from 'moment';
import 'moment/locale/id';
import getTimeHijri from '@/utils/getTimeHijri';

const DateChanged = ({ date, setDate }: { date: Date; setDate: Function }) => {
  const [formattedDate, setFormattedDate] = React.useState<string>();
  const [hijriDate, setHijriDate] = React.useState<string>();

  const formatDate = (date: Date) => {
    return moment(date).locale('id').format('DD MMMM, YYYY');
  };

  const updateDates = (newDate: Date) => {
    setFormattedDate(formatDate(newDate));
    setHijriDate(getTimeHijri(newDate));
  };

  const handlePrevDate = () => {
    const newDate = moment(date).subtract(1, 'days').toDate();
    setDate(newDate);
    updateDates(newDate);
  };

  const handleNextDate = () => {
    const newDate = moment(date).add(1, 'days').toDate();
    setDate(newDate);
    updateDates(newDate);
  };

  React.useEffect(() => {
    updateDates(date);
  }, [date]);

  return (
    <View className="w-full h-[70px] bg-white rounded-xl shadow-2xl shadow-black/50 p-5 flex-row justify-between items-center">
      <TouchableOpacity onPress={handlePrevDate} className="p-2">
        <SimpleLineIcons name="arrow-left" size={12} color="black" />
      </TouchableOpacity>
      <View className="flex-col items-center justify-center gap-[2px]">
        <Text
          className="text-base"
          style={{
            fontFamily: 'Quicksand_700Bold',
          }}>
          {formattedDate}
        </Text>
        <Text className="text-xs text-gray-400">{hijriDate}</Text>
      </View>
      <TouchableOpacity onPress={handleNextDate} className="p-2">
        <SimpleLineIcons name="arrow-right" size={12} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default DateChanged;
