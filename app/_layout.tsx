import React from 'react';
import { Tabs } from 'expo-router';
import TabBar from '@/components/TabBar';
import { Image, StatusBar, Text, View } from 'react-native';
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import {
  ScheherazadeNew_400Regular,
  ScheherazadeNew_700Bold,
} from '@expo-google-fonts/scheherazade-new';

const _layout = () => {
  let [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
    ScheherazadeNew_400Regular,
    ScheherazadeNew_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      initialRouteName="index"
      screenOptions={{
        header: (props) => (
          <View className="flex-row items-center gap-2 bg-white pt-5 pb-5 px-5 shadow-2xl border-b border-gray-200">
            <StatusBar barStyle={'dark-content'} translucent={false} />
            <Image
              alt="Indoquran"
              className="w-10 h-10"
              source={require('@/assets/images/logo_indoquran.png')}
            />
            <Text
              className="text-2xl text-cPrimary drop-shadow-md cursor-pointer"
              style={{
                fontFamily: 'Quicksand_700Bold',
              }}>
              IndoQur`an
            </Text>
          </View>
        ),
      }}>
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="quran" options={{ title: 'Quran' }} />
      <Tabs.Screen name="hadits" options={{ title: 'Hadits' }} />
      <Tabs.Screen name="doa" options={{ title: 'Doa' }} />
      <Tabs.Screen name="sholat" options={{ title: 'Sholat' }} />
    </Tabs>
  );
};

export default _layout;
