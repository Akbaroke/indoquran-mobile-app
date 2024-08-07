import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import axios from 'axios';
import { DoaModel } from '@/interfaces/doa-interface';
import CardDoa, { LoadingSkeletonCardDoa } from '@/components/CardDoa';
import InputSearch from '@/components/InputSearch';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DoaScreen = () => {
  const [listDoa, setListDoa] = React.useState<DoaModel[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    const getDoaDoa = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL_2}/doa/all`
        );
        return data.data.map((item: any, index: number) => ({
          id: `doa-doa-${index + 1}`,
          title: item.judul,
          arab: item.arab,
          indo: item.indo,
        }));
      } catch (error) {
        return [];
      }
    };

    const getDoaHarian = async () => {
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL_4}/doaharian`
        );
        return response.data.data.map((item: any, index: number) => ({
          id: `doa-harian-${index + 1}`,
          title: item.title,
          arab: item.arabic,
          indo: item.translation,
        }));
      } catch (error) {
        return [];
      }
    };

    const getDoaTahlil = async () => {
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL_4}/tahlil`
        );
        return response.data.data.map((item: any, index: number) => ({
          id: `doa-tahlil-${index + 1}`,
          title: item.title,
          arab: item.arabic,
          indo: item.translation,
        }));
      } catch (error) {
        return [];
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      const storedData = await AsyncStorage.getItem('doa');
      if (storedData) {
        setListDoa(
          JSON.parse(storedData).map((item: any, index: number) => ({
            number: index + 1,
            ...item,
          }))
        );
      } else {
        const doaDoa = await getDoaDoa();
        const doaHarian = await getDoaHarian();
        const doaTahlil = await getDoaTahlil();
        const newListDoa = [...doaDoa, ...doaHarian, ...doaTahlil];
        setListDoa(
          newListDoa.map((item, index) => ({
            number: index + 1,
            ...item,
          }))
        );
        await AsyncStorage.setItem('doa', JSON.stringify(newListDoa));
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const filteredSurat = listDoa.filter(
    (item) =>
      item.indo.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.id.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.title.toString().includes(searchValue.toLowerCase()) ||
      item.number.toString().includes(searchValue)
  );

  return (
    <ScrollView className="flex-1 px-5 bg-white">
      <View className="flex-row justify-between items-center pt-5">
        <Text
          className="text-xl mb-3"
          style={{
            fontFamily: 'Quicksand_700Bold',
          }}>
          Doa
        </Text>
        {!isLoading && (
          <InputSearch
            placeholder="Cari doa..."
            setSearchValue={setSearchValue}
          />
        )}
      </View>
      <View className="pb-28 items-center w-full">
        {isLoading
          ? [...Array(10)].map((_, index) => (
              <LoadingSkeletonCardDoa key={index} />
            ))
          : filteredSurat.map((item) => (
              <CardDoa key={item.id} number={item.number} data={item} />
            ))}
      </View>
    </ScrollView>
  );
};

export default DoaScreen;
