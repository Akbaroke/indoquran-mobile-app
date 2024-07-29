import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import Surat from '@/interfaces/surat-interface';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CardAyat, { LoadingSkeletonCardAyat } from '@/components/CardAyat';

const SuratScreen = () => {
  const { nomor } = useLocalSearchParams();
  const [dataSurat, setDataSurat] = React.useState<Surat | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getAyat = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL_1}/surat/${nomor}`
        );
        setDataSurat(data.data);
      } catch (error) {
        console.log('Error :', error);
      } finally {
        setLoading(false);
      }
    };

    getAyat();
  }, [nomor]);

  if (loading) {
    return (
      <ScrollView className="flex-1 bg-white px-6">
        <View className="flex flex-col items-center justify-center gap-3 py-5 border-b border-gray-200">
          <View
            className="bg-gray-200"
            style={{
              width: hp(6),
              height: hp(6),
              borderRadius: hp(3),
            }}
          />
          <View
            className="bg-gray-200"
            style={{
              width: 200,
              height: 20,
              borderRadius: 4,
            }}
          />
          <View
            className="bg-gray-200"
            style={{
              width: 100,
              height: 20,
              borderRadius: 4,
            }}
          />
        </View>
        <View className="flex-col gap-5 my-5 pb-28">
          {[...Array(5)].map((_, index) => (
            <LoadingSkeletonCardAyat key={index} />
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white px-6">
      <View className="flex flex-col items-center justify-center gap-3 py-5 border-b border-gray-200">
        <Image
          source={
            dataSurat?.tempatTurun === 'Mekah'
              ? require('@/assets/images/mekah_icon.png')
              : require('@/assets/images/madinah_icon.png')
          }
          style={{ width: hp(6), height: hp(6) }}
        />
        <Text className="font-bold text-xl">{dataSurat?.namaLatin}</Text>
        <Text className="font-medium text-gray-400 text-sm">
          {dataSurat?.jumlahAyat} Ayat, {dataSurat?.arti}
        </Text>
      </View>
      <View className="flex-col gap-5 my-5 pb-28">
        {dataSurat?.ayat.map((item, index) => (
          <CardAyat key={index} {...item} />
        ))}
      </View>
    </ScrollView>
  );
};

export default SuratScreen;
