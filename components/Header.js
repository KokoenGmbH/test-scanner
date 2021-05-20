import React, {Component} from 'react';
import cssStyle from "./Styles";
import {View, Text} from "react-native";
import Utility from "../model/Utility";

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let target = "Home";
        if (Utility.isNotUndefined(this.props.target)) {
            target = this.props.target
        }
        return(
            <View style={cssStyle.screenHeaderContainer}>
                <Text style={cssStyle.HeaderText}>{this.props.title}</Text>
            </View>
        );

    }

}