import { View, Text, ScrollView, StatusBar } from 'react-native';
import React from 'react';
import InputSearch from '@/components/InputSearch';
import Surat from '@/interfaces/surat-interface';
import axios from 'axios';
import CardSurat from '@/components/CardSurat';

const QuranScreen = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [surat, setSurat] = React.useState<Surat[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    getSurat();
  }, []);

  const getSurat = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL_1}/surat`
      );
      setSurat(data.data);
    } catch (error) {
      console.log('Error :', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 px-5 bg-white">
      <View className="flex-row justify-between items-center pt-5">
        <Text
          className="text-xl mb-3"
          style={{
            fontFamily: 'Quicksand_700Bold',
          }}>
          Al-Qur`an
        </Text>
        <InputSearch
          placeholder="Cari surat..."
          setSearchValue={setSearchValue}
        />
      </View>
      <View className="pl-2 pb-28 items-center">
        {surat?.map((item, index) => (
          <CardSurat key={index} {...item} searchValue={searchValue} />
        ))}
      </View>
    </ScrollView>
  );
};

export default QuranScreen;
