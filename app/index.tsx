import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const { replace } = useRouter();

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;

    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5))),
      100
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))),
      300
    );

    setTimeout(() => replace('quran'), 2500);
  }, []);

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-cPrimary">
      <StatusBar style="light" />

      <Animated.View
        className="bg-white/20 rounded-full"
        style={{ padding: ring1padding }}>
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{ padding: ring2padding }}>
          <View className="flex justify-center items-center p-7 rounded-full bg-cWhite">
            <Image
              source={require('@/assets/images/logo_indoquran.png')}
              style={{ width: hp(12), height: hp(12) }}
              className="box-shadow-2xl"
            />
          </View>
        </Animated.View>
      </Animated.View>

      <View className="flex items-center space-y-1">
        <Text
          style={{ fontSize: hp(4), fontFamily: 'Quicksand_700Bold' }}
          className="text-white tracking-tighter">
          IndoQur`an
        </Text>
        <Text
          style={{ fontSize: hp(1.5), fontFamily: 'Quicksand_500Medium' }}
          className="text-white tracking-tighter">
          Qur`an dan Terjemahan
        </Text>
      </View>
    </View>
  );
}
