import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Nomer from './Nomer';
import { router } from 'expo-router';

interface Props {
  number: number;
  name: string;
  slug: string;
  total: number;
}

export default function CardOptionHadits({ number, name, slug, total }: Props) {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/hadits/${slug}`)}
      className="flex-row items-center gap-7 border-b border-gray-200 cursor-pointer p-2 py-4 w-full">
      <View className="space-y-0">
        <Nomer number={number} />
      </View>
      <View className="flex-col gap-1">
        <Text
          className="flex-col"
          style={{
            fontFamily: 'Quicksand_600SemiBold',
          }}>
          {name}
        </Text>
        <Text
          className="text-xs text-gray-400"
          style={{
            fontFamily: 'Quicksand_500Medium',
          }}>
          {total} Riwayat
        </Text>
      </View>
    </TouchableOpacity>
  );
}
