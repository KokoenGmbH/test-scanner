
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, SafeAreaView, Text, TextInput } from 'react-native';

import FlashMessage from "react-native-flash-message";

import AppLoading from 'expo-app-loading';
import { ScreenOrientation} from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';

import cssStyle from "./components/Styles";
import colors from "./constants/Colors";

import Device from "./model/Device";

import AppNavigator from './navigation/AppNavigator';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  initSettings();

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
        <AppLoading
            startAsync={initialLoad}
            onError={handleLoadingError}
            onFinish={() => handleFinishLoading(setLoadingComplete)}
        />
    );
  } else {

    getCameraPermissionAsync();

    let flashMessageStyle = [cssStyle.flashMessageText];

    if(Device.isTablet()){
      flashMessageStyle.push({paddingTop: 10});
      ScreenOrientation.unlockAsync();
    }

    var container = {
      flex: 1,
      backgroundColor: colors.formBackgroundColor,
      marginTop: '-15%',
    }


    return (
        <SafeAreaView style={container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <StatusBar barStyle="default" />}

          <AppNavigator />
          <FlashMessage style={cssStyle.flashMessage} textStyle={flashMessageStyle} titleStyle={flashMessageStyle} position="center" />
        </SafeAreaView>
    );
  }
}

function initSettings(){
  /**
   * subscribe isOnline Listener
   */
  Device.subscribe();

  /**
   * init flashmessager color schemes
   */
  FlashMessage.setColorTheme({
        success: colors.flashMessageSuccess,
        danger:  colors.flashMessageDanger,
        warning: colors.flashMessageWarning,
      }
  );

  /**
   * set default values for components used
   * @type {*|{}}
   */
  Text.defaultProps = Text.defaultProps || {};

  TextInput.defaultProps = TextInput.defaultProps || {};
}

/**
 * ask for permission
 */
async function getCameraPermissionAsync() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  if (status !== 'granted') {
    alert('Grant the app access to the camera and photo library in order to be able to use all functions.');
  }
}

async function initialLoad() {
  await loadResourcesAsync();
}

async function loadResourcesAsync() {
// TODO did not work , might be deleted
  await Promise.all([
    Asset.loadAsync([
      require('./assets/icon/btn_light.svg'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'open-sans-condensed-bold': require('./assets/fonts/OpenSansCondensed-Bold.ttf'),
      'open-sans-condensed-light': require('./assets/fonts/OpenSansCondensed-Light.ttf'),
      'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),
      'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  iconButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#6CC24A'
  },

  middleContainer: {
    flexDirection: 'row',
    flex: 1.5,
  },
  focusedContainer: {
    flex: 6,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#6CC24A'
  },
  animationLineStyle: {
    height: 2,
    width: '100%',
    backgroundColor: 'red',
  },
  rescanIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
