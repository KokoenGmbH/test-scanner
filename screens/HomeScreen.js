import React, { Component } from 'react';

import Modal, { ModalContent, ModalFooter } from 'react-native-modals';
import { showMessage } from "react-native-flash-message";
import { TextInput, View, Text, StyleSheet, Animated, Keyboard, TouchableWithoutFeedback, Button } from 'react-native';
import Touchable from 'react-native-platform-touchable';

import { Camera } from "expo-camera";


import cssStyle from '../components/Styles';
import FlashlightIcon from "../components/FlashlightIcon";
import Header from "../components/Header";
import Footer from "../components/Footer";

import Colors from "../constants/Colors";

import Device from "../model/Device";
import Utility from "../model/Utility";

export default class Scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      scanned: false,
      isModalOpen: false,
      itemQuantity: '0',
      flashlight: Camera.Constants.FlashMode.off,
      isFocused: true,
      description: '',
      animationLineHeight: 0,
      selectModalVisible: false,
      quantityFieldCssClass: cssStyle.textInput,
      invalidQuantity: false,
      orientationChanged: false,

    };
    this.focusLineAnimation = new Animated.Value(0);
    this.handleScan = this.handleScan.bind(this);

    this.scannedCodeId = null;
    this.scannedCodeDescription = null;
    this.orderList = { items: [], user: '', location: '' };

    this.focusHandler = this.focusHandler.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
    this.props.navigation.addListener(
      'willFocus', this.focusHandler
    );

    this.props.navigation.addListener(
      'willBlur', this.blurHandler
    );

    if (Device.isTablet()) {
      Device.setCallbacks("orientationChanged", (function (state) { this.setState({ orientationChanged: state }) }).bind(this));
    }

    //getCameraPermissionAsync();
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      const focused = navigation.isFocused();
    });
    this.blurListener = navigation.addListener('willBlur', () => {
      this.setState({
        modalVisible: false,
        isModalOpen: false,
        scanned: false,
      });
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
    this.blurListener.remove();
  }

  blurHandler() {
    this.setState({
      isFocused: false
    });
  }

  /**
   * executes when view gets visible
   */
  focusHandler() {
    this.loadSavedOrderList();
    this.setState({
      isFocused: true,
    });
    this.focusLineAnimation = new Animated.Value(0);
    this.animateLine();

  };

  parseQRCode(code) {
    const params = { id: code, desc: null, quantity: "0", menge: "0" };
    return params;
  }

  /**
   *
   * @param type
   * @param data
   */
  handleScan({ type, data }) {
    if (!this.state.isModalOpen && this.state.isFocused) {
      let scannedData = this.parseQRCode(data);
      this.scannedCodeId = scannedData.id;
      this.scannedCodeDescription = scannedData.desc;
      this.state.itemQuantity = scannedData.quantity === "0" ? scannedData.menge : scannedData.quantity;
      this.toggleScanState();
    }
  }

  toggleScanState() {
    this.setState({
      scanned: !this.state.scanned
    });
    this.toggleModalVisibleState();
  }

  toggleFlashLight() {
    if (this.state.flashlight === Camera.Constants.FlashMode.off) {
      this.setState({
        flashlight: Camera.Constants.FlashMode.torch
      });
    } else {
      this.setState({
        flashlight: Camera.Constants.FlashMode.off
      });
    }
  }

  toggleModalVisibleState() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      modalVisible: !this.state.modalVisible,
    });
  }

  prepareDataToSave() {
    const quantity = Utility.convertStringToNumber(this.state.itemQuantity);
    if (!quantity || !Utility.isBiggerThanZero(quantity)) {
      this.setState({
        quantityFieldCssClass: cssStyle.invalidQuantity,
        invalidQuantity: true
      });
      return false;
    }
    return quantity;
  }

  saveItemInOrderList() {
    let items = this.prepareDataToSave();

    if (!items) {
      return;
    }
    this.toggleScanState();
    const result = {'':''};
    let message = "";
    let type = "success";
    if (result) {
      message = "SUCCESS";
    } else {
      message = "FAILED";
      type = "danger";
    }
    showMessage({
      message: message,
      type: type,
      position: "center",
      icon: "auto"
    });
    this.resetNumberOfItemAndScannedId();
  }
  resetNumberOfItemAndScannedId() {
    this.state.itemQuantity = '0';
  }

  cancelOrder() {
    this.toggleScanState();
    showMessage(
      {
        message: "CANCELED",
        type: "warning",
        position: "center",
        icon: "auto"
      }
    )
    this.resetNumberOfItemAndScannedId();
  }

  animateLine() {
    if (!this.state.scanned) {
      Animated.sequence([
        Animated.timing(this.focusLineAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(this.focusLineAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        }),
      ]).start((status) => {
        if (status.finished) {
          this.animateLine();
        }
      });
    }
  }


  render() {
    return (
      <View style={cssStyle.screenContainer}>
        <Header title={"SCAN"}  mode={"scan"} />
        <View style={cssStyle.scanContainer}>
          {this.state.isFocused &&
            <Camera
              onBarCodeScanned={this.handleScan}
              flashMode={this.state.flashlight}
              style={StyleSheet.absoluteFillObject}
            />
          }
        </View>
        <View style={cssStyle.overlay}>
          <View style={[cssStyle.unfocusedContainer]}>
            <Touchable style={cssStyle.flashlightButtonContainer}
              onPress={() => {
                this.toggleFlashLight();
              }}
            >
              <View >
                <FlashlightIcon on={this.state.flashlight} />
              </View>
            </Touchable>
          </View>
          <View style={cssStyle.middleContainer}>
            <View style={cssStyle.unfocusedContainerSides} />
            <View
              style={cssStyle.focusedContainer}
              onLayout={e => this.setState({ animationLineHeight: e.nativeEvent.layout.height })}
            >
              <Animated.View style={[
                cssStyle.animationLineStyle,
                {
                  transform: [
                    {
                      translateY: this.focusLineAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, this.state.animationLineHeight]
                      })
                    }
                  ]
                }
              ]}>

              </Animated.View>
            </View>
            <View style={cssStyle.unfocusedContainerSides} />
          </View>
          <View style={cssStyle.unfocusedContainer} />
        </View>

        <Modal
          width={0.9}
          visible={this.state.modalVisible}
          rounded={false}
          onTouchOutside={() => {
            Keyboard.dismiss();
          }}
          onDismiss={() => {
            if (this.state.isModalOpen) {
              this.toggleScanState();
            }
            this.animateLine();
          }}
          onShow={() => {
            this.numberOfItem.focus();
          }}
          modalStyle={
            {
              backgroundColor: Colors.modalTransparentColor,
              maxWidth: 600,
              marginTop: (this.scannedCodeDescription !== null ? -75 : -20),
            }
          }
          footer={
            <ModalFooter style={cssStyle.modalFooter}>

              <Button style={{ width: '40%', height: '75%' }}
                title="cancel"
                onPress={() => this.cancelOrder()}
              />

              <Button style={{ width: '40%', height: '75%' }}
                title="Confirm"
                onPress={() => this.saveItemInOrderList()}
              />

            </ModalFooter>
          }
        >
          <ModalContent style={cssStyle.scanModalBody} >
            <TouchableWithoutFeedback onPress={() => {
              Keyboard.dismiss();
            }}   >
              <View >
                <Text style={cssStyle.orderProductModalTitle}>Modal Sample</Text>
                <View style={cssStyle.scanModalContent}>
                  <Text style={cssStyle.inputBoxLabel}> QRCode value: </Text>
                  <Text
                    style={cssStyle.scannedProductInfo}
                    numberOfLines={2}
                  >{this.scannedCodeId}</Text>
                </View>

                <View style={[cssStyle.scanModalContent, { paddingBottom: 0 }]}>
                  <Text style={cssStyle.inputBoxLabel}> Input Test: </Text>
                  <TextInput
                    style={[this.state.quantityFieldCssClass, { width: "58%" }]}
                    value={this.state.itemQuantity}
                    placeholder={"Menge"}
                    keyboardType={'numeric'}
                    name={'numberOfItem'}
                    autoFocus={true}
                    onChangeText={(text) => {
                      //TODO refactor when there is time
                      let number = Utility.convertStringToNumber(text);
                      let invalidQuantity = false;
                      let quantityFieldCssClass = cssStyle.textInput;
                      if (!number || !Utility.isBiggerThanZero(number)) {
                        invalidQuantity = true;
                        quantityFieldCssClass = cssStyle.invalidQuantity
                      }
                      this.setState({
                        itemQuantity: text,
                        invalidQuantity: invalidQuantity,
                        quantityFieldCssClass: quantityFieldCssClass,
                      })
                    }}
                    ref={(input) => {
                      this.numberOfItem = input
                    }}
                  />
                </View>
                {
                  this.state.invalidQuantity &&
                  <View style={cssStyle.infoMsgContainerWarning}>
                    <Text style={cssStyle.infoMsgText}>Set a value please!</Text>
                  </View>
                }
              </View>

            </TouchableWithoutFeedback>
          </ModalContent>
        </Modal>

        <Footer page={"scan"} navigation={this.props.navigation} />
      </View>
    );
  }
}