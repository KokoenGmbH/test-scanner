import React, { Component } from 'react';
import cssStyle from "./Styles";
import { View } from "react-native";

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHeight: "50%",
      currentWidth: "40%",
      currentTarget: null,
    };
  }
  getSVGButtonViewStyle() {

    const svgButtonViewStyle = {
      height: this.state.currentHeight,
      width: this.state.currentWidth,
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      alignContent: "flex-end",
    };


    return svgButtonViewStyle;
  }

  render() {
    return (
      <View style={cssStyle.subPagesFooter}>
        <View style={this.getSVGButtonViewStyle()}>
        </View>
      </View>
    );

  }

}