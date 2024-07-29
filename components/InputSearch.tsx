import { icons } from '@/assets/icons';
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  placeholder: string;
  setSearchValue: (value: string) => void;
  delayDebounce?: number;
};

export default function InputSearch({
  setSearchValue,
  placeholder,
  delayDebounce,
}: Props) {
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayDebounce ?? 200);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delayDebounce]);

  useEffect(() => {
    setSearchValue(debouncedValue);
  }, [debouncedValue, setSearchValue]);

  return (
    <View className="flex-row p-0 px-2 h-[38px] gap-2 border border-gray-300 rounded-lg bg-white w-[200px] overflow-hidden">
      <TextInput
        className="mb-1.5 p-0 text-base w-max no-underline"
        placeholder={placeholder}
        placeholderTextColor="#9ca3af "
        value={value}
        onChangeText={setValue}
      />
      {value ? (
        <TouchableOpacity
          className="absolute right-2 p-1 -top-[1px] bg-white"
          onPress={() => setValue('')}>
          <Feather name="x" size={16} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
