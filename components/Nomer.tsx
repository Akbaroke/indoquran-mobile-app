import React from 'react';
import { View, Text } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { styled } from 'nativewind';

type Props = {
  number: number | string;
  size?: 'small' | 'medium' | 'large';
};

const StyledView = styled(View);
const StyledText = styled(Text);

export default function Nomer({ number, size = 'medium' }: Props) {
  let boxSize;
  let textSize;

  switch (size) {
    case 'small':
      boxSize = 35;
      textSize = 10;
      break;
    case 'large':
      boxSize = 45;
      textSize = 14;
      break;
    case 'medium':
    default:
      boxSize = 40;
      textSize = 12;
      break;
  }

  return (
    <StyledView className="relative flex items-center justify-center w-max">
      <Svg
        height={boxSize}
        width={boxSize}
        viewBox="0 0 100 100"
        className={`absolute border-cPrimary`}>
        <Path
          d="M100 50 L85.11 64.54 L85.36 85.36 L64.54 85.11 L50 100 L35.46 85.11 L14.64 85.36 L14.89 64.54 L0 50 L14.89 35.46 L14.64 14.64 L35.46 14.89 L50 0 L64.54 14.89 L85.36 14.64 L85.11 35.46 Z"
          fill="transparent"
          stroke="#00957B"
          strokeWidth={4}
        />
      </Svg>
      <StyledText
        className={`font-semibold relative z-10 `}
        style={{ fontSize: textSize }}>
        {number}
      </StyledText>
    </StyledView>
  );
}
