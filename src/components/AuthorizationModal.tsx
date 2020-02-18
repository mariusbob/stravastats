import React from 'react';
import { View, Modal, Platform } from 'react-native';
import WebView from 'react-native-webview';
import SplashScreen from 'react-native-splash-screen';
import { log } from '../utils/Logger';

interface Props {
  onAuthCode: any;
}
export default class HomeScreen extends React.Component<Props> {
  componentDidMount() {}

  constructor(props: any) {
    super(props);
  }

  state = {
    modalVisible: true,
  };

  setModalVisible(visible: boolean) {
    this.setState({ modalVisible: visible });
  }

  hideSplash() {
    SplashScreen.hide();
  }

  hideModal = (webViewState: any) => {
    var url = webViewState.url;

    if (url.includes('http://localhost/exchange_token?state=&code=')) {
      var result = url.substring(
        url.indexOf('code=') + 5,
        url.indexOf('&scope'),
      );

      this.setModalVisible(false);
      log(`Modal hidden`);

      this.props.onAuthCode(result);
    } else if (
      url == 'http://localhost/exchange_token?state=&error=access_denied'
    ) {
      this.props.onAuthCode(0);

      this.setModalVisible(false);
      log(`Modal hidden`);
    }
  };

  render() {
    return (
      <View style={{ backgroundColor: 'grey', flex: 1 }}>
        <Modal visible={this.state.modalVisible}>
          <WebView
            source={{
              uri:
                'https://www.strava.com/oauth/authorize?client_id=9237&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=read',
            }}
            style={{ marginTop: 20 }}
            onNavigationStateChange={this.hideModal}
            onLoadEnd={this.hideSplash}
          />
        </Modal>
      </View>
    );
  }
}
