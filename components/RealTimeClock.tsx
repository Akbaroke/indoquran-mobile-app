import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Text } from 'react-native';

const RealTimeClock = () => {
  const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(moment().format('HH:mm'));
    };

    const intervalId = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Text
      className="text-white text-7xl"
      style={{ fontFamily: 'Quicksand_700Bold' }}>
      {currentTime}
    </Text>
  );
};

export default RealTimeClock;
