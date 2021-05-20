import React from 'react';
import {SvgCssUri} from "react-native-svg";
import {Asset} from "expo-asset";
export default function FlashlightIcon(props) {

    let lightButtonUriOn = Asset.fromModule(require('../assets/icon/btn_light.svg')).uri;
    let lightButtonUriOff = Asset.fromModule(require('../assets/icon/btn_light_off.svg')).uri;
    return(
        (props.on ?
              <SvgCssUri
                  uri={lightButtonUriOn}
                  width="95%"
                  height="75%"
              /> :
              <SvgCssUri
                    uri={lightButtonUriOff}
                    width="95%"
                    height="75%"
              />
        )
    );
}