import { View, Text } from 'react-native';
import React from 'react';

const SholatScreen = () => {
  return (
    <View className="flex-1 p-5 bg-white">
      <View className="flex-row justify-between items-center">
        <Text
          className="text-xl mb-3"
          style={{
            fontFamily: 'Quicksand_700Bold',
          }}>
          Sholat
        </Text>
      </View>
    </View>
  );
};

export default SholatScreen;
