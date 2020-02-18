import React from 'react';
import { View, Text, Alert } from 'react-native';
import WebViewModal from '../components/AuthorizationModal';
import { storeTokenDetils, getAccessToken } from '../utils/StorageUtils';
import { log } from '../utils/Logger';

const createToken = (authCode: any) => {
  const axios = require('axios');
  axios
    .post(
      `https://www.strava.com/oauth/token?client_id=9237&client_secret=00190de9e77b970597bbdb85e53f54065bbc6b17&code=${authCode}&grant_type=authorization_code`,
    )
    .then((res: any) => {
      storeTokenDetils(res.data);
    });
};

export default class HomeScreen extends React.Component {
  onAuthCode(code: any) {
    if (code != 0) {
      createToken(code);
    } else {
      log('user did not authorize');
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: 'grey', flex: 1 }}>
        <WebViewModal onAuthCode={this.onAuthCode} />
      </View>
    );
  }
}
