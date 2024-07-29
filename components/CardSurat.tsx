import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import { useFocus } from 'react-native-web-hooks';
import { router } from 'expo-router';
import Nomer from './Nomer';
import Surat from '@/interfaces/surat-interface';

interface Props extends Surat {
  searchValue?: string;
}

export default function CardSurat({
  nomor,
  nama,
  namaLatin,
  jumlahAyat,
  arti,
}: Props) {
  return (
    <TouchableOpacity
      onPress={() => router.replace(`/quran/${nomor}`)}
      className="flex-row gap-3 text-sm justify-between border-b border-gray-200 w-full cursor-pointer p-2 py-4 transition-all duration-300">
      <View className="flex-row gap-6 space-y-0">
        <Nomer number={nomor} />
        <View className="flex-col gap-1">
          <Text
            style={{
              fontFamily: 'Quicksand_600SemiBold',
            }}>
            {namaLatin}
          </Text>
          <Text
            className="text-xs text-gray-400"
            style={{
              fontFamily: 'Quicksand_500Medium',
            }}>
            {arti}
          </Text>
        </View>
      </View>
      <View className="gap-1">
        <Text
          style={{
            fontFamily: 'ScheherazadeNew_700Bold',
          }}>
          {nama}
        </Text>
        <Text className="text-xs text-gray-400">{jumlahAyat} Ayat</Text>
      </View>
    </TouchableOpacity>
  );
}
