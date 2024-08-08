import axios from 'axios';

export async function getLocationFromGeolocation(
  latitude: number,
  longitude: number
): Promise<string | null> {
  try {
    const { data } = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL_5}?latitude=${latitude}&longitude=${longitude}&localityLanguage=id`
    );
    return data.city;
  } catch (error) {
    return null;
  }
}
