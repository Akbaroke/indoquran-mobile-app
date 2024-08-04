import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import InputSearch from '@/components/InputSearch';
import Surat from '@/interfaces/surat-interface';
import axios from 'axios';
import CardSurat, { SkeletonCardSurat } from '@/components/CardSurat';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuranScreen = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [surat, setSurat] = React.useState<Surat[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchSurat = async () => {
      try {
        const storedData = await AsyncStorage.getItem('surat_list');
        if (storedData) {
          setSurat(JSON.parse(storedData));
          console.log(`list surat sudah tersedia`);
        } else {
          console.log(`list surat belum tersedia`);
          const { data } = await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL_1}/surat`
          );
          await AsyncStorage.setItem('surat_list', JSON.stringify(data.data));
          setSurat(data.data);
        }
      } catch (error) {
        console.log('Error :', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurat();
  }, []);

  const filteredSurat = surat.filter(
    (item) =>
      item.namaLatin.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.arti.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.nomor.toString().includes(searchValue)
  );

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
        {isLoading
          ? [...Array(10)].map((_, index) => <SkeletonCardSurat key={index} />)
          : filteredSurat.map((item, index) => (
              <CardSurat key={index} {...item} searchValue={searchValue} />
            ))}
      </View>
    </ScrollView>
  );
};

export default QuranScreen;
