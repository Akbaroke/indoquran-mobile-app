import { View, Text } from 'react-native';
import React from 'react';
import Nomer from './Nomer';
import { ItemsHaditsType } from '@/interfaces/hadits-interface';
import { Entypo, Feather } from '@expo/vector-icons';

export default function CardHadits(props: ItemsHaditsType) {
  return (
    <View className="border-b border-gray-200 py-8 transition-all duration-300 px-3">
      <View className="flex-col gap-5 w-full">
        <View className="flex-row items-center justify-between w-full pl-3">
          <Nomer number={props.number} size="medium" />
          <View className="flex-row gap-8 items-center">
            <Feather name="bookmark" size={20} color="#eab308" />
            <Entypo name="dots-three-horizontal" size={20} color="#3cb09c" />
          </View>
        </View>
        <View className="flex-col gap-y-6 w-full">
          <Text
            className="text-xl text-end transition-all duration-300 leading-10"
            style={{
              fontFamily: 'ScheherazadeNew_700Bold',
            }}>
            {props.arab}
          </Text>
          <Text
            className="text-[14px] text-justify leading-6 text-cPrimary"
            style={{
              fontFamily: 'Quicksand_500Medium',
            }}>
            {props.id}
          </Text>
        </View>
      </View>
    </View>
  );
}

// Loading Skeleton for CardAyat
export function LoadingSkeletonCardHadits() {
  return (
    <View className=" border-b border-gray-200 py-4 transition-all duration-300">
      <View className="flex-col gap-10 w-full pl-5">
        <View className="flex-col gap-5 w-full">
          <View className="flex-row items-center justify-between w-full">
            <View
              className="bg-gray-100"
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
              }}
            />
          </View>
          <View
            className="bg-gray-100"
            style={{
              width: '100%',
              height: 20,
              borderRadius: 4,
            }}
          />
        </View>
        <View className="flex-col gap-3">
          <View
            className="bg-gray-100"
            style={{
              width: '100%',
              height: 15,
              borderRadius: 4,
            }}
          />
          <View
            className="bg-gray-100"
            style={{
              width: '100%',
              height: 15,
              borderRadius: 4,
            }}
          />
        </View>
      </View>
    </View>
  );
}
