import { View } from 'react-native';
import React from 'react';
import TabBarButton from './TabBarButton';
import { usePathname } from 'expo-router';

const TabBar = ({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) => {
  const pathname = usePathname();
  const primaryColor = '#00957B';
  const greyColor = '#737373';

  if (pathname === '/') return null;

  return (
    <View className="absolute bottom-6 flex-row justify-between items-center  mx-6 py-4 bg-white rounded-3xl shadow-xl shadow-black/40 border border-gray-100">
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (!['quran', 'hadits', 'doa', 'sholat'].includes(route.name))
          return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            className="flex-1 justify-center items-center"
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? primaryColor : greyColor}
            label={label}
          />
        );
      })}
    </View>
  );
};

export default TabBar;
