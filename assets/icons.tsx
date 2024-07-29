import { Feather, FontAwesome5 } from '@expo/vector-icons';

export const icons: any = {
  quran: (props: any) => <Feather name="book-open" size={22} {...props} />,
  hadits: (props: any) => <Feather name="book" size={22} {...props} />,
  doa: (props: any) => <FontAwesome5 name="pray" size={22} {...props} />,
  sholat: (props: any) => <Feather name="clock" size={22} {...props} />,
};
