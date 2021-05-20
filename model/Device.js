import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import { showMessage } from "react-native-flash-message";
import Utility from "./Utility";
import * as ExpoDevice from 'expo-device';
import { Dimensions } from 'react-native';
import {ScreenOrientation} from 'expo';

class Device {
    /**
     *
     */
    constructor() {

        this.state = {
            isOnline: false,
            orientationChanged: false,
            callbacks: {
                isOnline: [],
                orientationChanged: [],
            },
            currentDevice: null
        };

        this.updateOrientationChanged     = this.updateOrientationChanged.bind(this);

        NetInfo.fetch().then(data => {
            this.state.isOnline = data.isConnected;
        });

        if(__DEV__){
            console.log("Connection Listener initialized");
        }

        // set device type
        ExpoDevice.getDeviceTypeAsync().then(response => {
           this.state.currentDevice = response;
        });
    };

    /**
     * update orientationChanged state to rerender screen on orientation change
     */
    updateOrientationChanged() {

        if(__DEV__){
            console.log("Orientation changed");
        }

        this.state.orientationChanged = !this.state.orientationChanged;

        for(var i in this.state.callbacks.orientationChanged){
            this.state.callbacks.orientationChanged[i](this.state.orientationChanged);
        }
    }

    /**
     * @returns {boolean}
     */
    isTablet() {
        return this.state.currentDevice === ExpoDevice.DeviceType.TABLET;
    }

    /**
     *
     */
    subscribe() {

        const unsubscribeIsOnline = NetInfo.addEventListener(state => {

            if(__DEV__ && this.state.isOnline != state.isConnected) {
                console.log("Connection Status changed: " + state.isConnected);
            }

            this.state.isOnline = state.isConnected;

            for(var i in this.state.callbacks.isOnline){
                this.state.callbacks.isOnline[i](this.state.isOnline);
            }
        });

        /**
         * add event listener for orientation change on tablet devices
         */
        if(this.isTablet()){
            Dimensions.addEventListener("change", this.updateOrientationChanged);
        }
    };

    setCallbacks(type, callback){

        this.state.callbacks[type].push(callback);

    };

    clearCallbacks(){

        /**
         * reset array, WARNING! using [] would clear all references and components using this value wouldn't be informed
         * @type {number}
         */
        this.state.callbacks.isOnline.length = 0;
        this.state.callbacks.orientationChanged.length = 0;
    };

    /**
     *
     * @returns {boolean}
     */
    deviceIsOnline() {
        return this.state.isOnline;
    };

    showOfflineMessage() {

        showMessage({
           message: "Gerät ist nicht mit dem Internet verbunden.",
           type: "warning",
           position: "center"
        });
    };

    /**
     * is device orientation in landscape mode
     * info: ScreenOrientation.getOrientationAsync() only return orientation: UNKNOWN on tablets so use this instead
     *
     * @returns {boolean}
     */
    isLandScape(){

        var screenWidth  = Math.round(Dimensions.get('window').width);
        var screenHeight = Math.round(Dimensions.get('window').height);

        return screenWidth > screenHeight ? true : false;
    }

    /**
     * reset orientation locks after quitting web browser, otherwise it will
     * be stuck in the last orientation
     */
    setOrientationLocks(){

        if(__DEV__){
            // ScreenOrientation.getOrientationAsync().then(function(orientation){
            //     console.log("orientation async");
            //     console.log(orientation);
            // });
            // ScreenOrientation.getOrientationLockAsync().then(function(orientation){
            //     console.log("orientation lock async");
            //     console.log(orientation);
            // });
            // ScreenOrientation.getPlatformOrientationLockAsync().then(function(orientation){
            //     console.log("orientation platform lock async");
            //     console.log(orientation);
            // });
            // console.log("reset orientation locks");
        }

        // ScreenOrientation.addOrientationChangeListener(function(){
        //    console.log("orientation changed");
        // });

        if(this.isTablet()){
            // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
            ScreenOrientation.unlockAsync();
        } else {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        }
    }
}

export default new Device();