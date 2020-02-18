import AsyncStorage from '@react-native-community/async-storage';
import { log } from './Logger';

interface TokenDetails {
  expires_at: any;
  expires_in: any;
  refresh_token: any;
  access_token: any;
}

export const storeTokenDetils = async (authResponse: any) => {
  var tokenDetails: TokenDetails = {
    expires_at: authResponse.expires_at,
    expires_in: authResponse.expires_in,
    refresh_token: authResponse.refresh_token,
    access_token: authResponse.access_token,
  };

  log(JSON.stringify(tokenDetails));

  try {
    await AsyncStorage.setItem(
      'token_details',
      `${JSON.stringify(tokenDetails)}`,
    );

    log(`token details stored`);
  } catch (e) {
    log(e);
  }
};

export const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('token_details');
    if (accessToken !== null) {
      const tokenDetails: TokenDetails = JSON.parse(accessToken);

      return tokenDetails.access_token;
    }
  } catch (e) {
    return 'undefined';
  }
};
