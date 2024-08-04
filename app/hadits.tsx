import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import CardOptionHadits from '@/components/CardOptionHadits';
import { OptionHaditsModel } from '@/interfaces/hadits-interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const HaditsScreen = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [optionHadits, setOptionHadits] = React.useState<OptionHaditsModel[]>(
    []
  );

  React.useEffect(() => {
    const fetchSurat = async () => {
      try {
        const storedData = await AsyncStorage.getItem('hadits_option');
        if (storedData) {
          setOptionHadits(JSON.parse(storedData));
          console.log(`hadits option sudah tersedia`);
        } else {
          console.log(`hadits option belum tersedia`);
          const { data } = await axios.get(
            process.env.EXPO_PUBLIC_API_URL_3 as string
          );
          await AsyncStorage.setItem('hadits_option', JSON.stringify(data));
          setOptionHadits(data);
        }
      } catch (error) {
        console.log('Error :', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurat();
  }, []);

  return (
    <ScrollView className="flex-1 px-5 bg-white">
      <View className="flex-row justify-between items-center pt-5">
        <Text
          className="text-xl mb-3"
          style={{
            fontFamily: 'Quicksand_700Bold',
          }}>
          Hadits
        </Text>
      </View>
      <View className="pl-2 pb-28 items-center">
        {optionHadits.map((item, index) => (
          <CardOptionHadits key={index} number={index + 1} {...item} />
        ))}
      </View>
    </ScrollView>
  );
};

export default HaditsScreen;
