const formatLocationName = (name: string): string => {
  const prefixMapping: { [key: string]: string } = {
    Kabupaten: 'KAB.',
    Kota: 'KOTA',
    Kecamatan: 'KEC.',
  };

  const words = name.split(' ');

  if (prefixMapping.hasOwnProperty(words[0])) {
    words[0] = prefixMapping[words[0]];
  }
  return words.join(' ').toUpperCase();
};

export default formatLocationName;
