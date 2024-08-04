import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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

export const SkeletonCardSurat = () => {
  return (
    <View className="flex-row text-sm justify-between border-b border-gray-200 w-full cursor-pointer p-2 py-4 transition-all duration-300">
      <View className="flex-row space-y-0">
        <View
          className="bg-gray-100"
          style={{
            width: 30,
            height: 30,
            borderRadius: 100,
          }}
        />
        <View className="flex-col ml-2 items-center gap-y-2">
          <View
            className="bg-gray-100"
            style={{
              width: 100,
              height: 8,
              borderRadius: 4,
            }}
          />
          <View
            className="bg-gray-100"
            style={{
              width: 100,
              height: 8,
              borderRadius: 4,
            }}
          />
        </View>
      </View>
      <View className="flex-col items-center gap-y-2">
        <View
          className="bg-gray-100"
          style={{
            width: 50,
            height: 8,
            borderRadius: 4,
          }}
        />
        <View
          className="bg-gray-100"
          style={{
            width: 50,
            height: 8,
            borderRadius: 4,
          }}
        />
      </View>
    </View>
  );
};