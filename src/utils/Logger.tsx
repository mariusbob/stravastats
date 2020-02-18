import { Platform } from 'react-native';

export const log = (message: string) => {
  console.log(`${Platform.OS}: ${message}`);
};
