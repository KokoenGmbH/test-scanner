import { StyleSheet } from 'react-native';
import colors from "../constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";

const infoMsgContainer = {
    borderRadius: 5,
    padding: 5,
};

const inputBox = {
    backgroundColor: '#fff',
    marginBottom: '8%',
    width: '100%'
};

const HeaderContainer = {
    backgroundColor: 'rgba(249,249,249,0.96)',

    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
};

const orderTable = {
    fontFamily: 'open-sans-regular',
    textAlign: 'left',
    fontSize: RFValue(12)
};

const orderTableHeader = {
    fontSize: RFValue(14),
    textAlign: 'left',
    fontFamily: 'open-sans-condensed-bold',
    color: '#fff',
    // flex: 1,
    width: "100%"
};

const flashMessageText = {
    fontSize: RFValue(14),
    fontFamily: 'open-sans-condensed-light',
    color: colors.noticeText,
};

const overlayButtonContainer = {
    alignItems: 'center',
    height: 100,
    flexDirection: 'row'
};

const posCenter = {
    alignItems: 'center',
    justifyContent: 'center',
};

const defaultText = {
    fontFamily: 'open-sans-regular',
    color: '#131e29',
    fontSize: RFValue(14),
};

const headlineText = {
    fontFamily: 'open-sans-condensed-bold',
    fontSize: RFValue(20),
    color: '#ffffff',
};

const hiddenButton = {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: '100%',
    width: 51,
};

const textInput = {
    // height: 40,

    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.backgroundLight,
    fontSize: RFValue(18),
}

export default StyleSheet.create({
    screenContainer: {
        marginBottom: 20,
        flex: 1,
        backgroundColor: colors.backgroundLight,
    },
    textInput: {
        ...defaultText,
        ...textInput,
    },
    invalidQuantity: {
        ...defaultText,
        ...textInput,
        borderColor: colors.flashMessageDanger,
        borderWidth: 2,
    },
    flashlightButtonContainer: {
        left: '7%',
        top: '15%',
        width: '12%',
        justifyContent: "center",
    },
    flashlightOn: {
        color: colors.flashlightOn,
        fontSize: RFValue(30)
    },
    flashlightOff: {
        color: colors.flashlightOff,
        fontSize: RFValue(30)
    },
    modalFooter: {
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.modalTransparentColor,
        width: '100%',
        height: '25%',
        maxHeight: 75
    },
    scanContainer: {
        flex: 1,
    },
    barCodeSanner: {
        borderColor: '#1234'
    },
    scanModalContent: {
        paddingBottom: 10,
        flexDirection: 'row'
    },
    scanModalBody: {
        backgroundColor: colors.modalBackground,
    },
    inputBoxLabel:{
        textAlign: 'left',
        width: '42%',
        color: colors.labelColor,
        fontFamily: 'open-sans-regular',
        fontSize: RFValue(17)
    },
    scannedProductInfo: {
        textAlign: 'left',
        marginBottom: 10,
        width: '58%',
        color: '#fff',
        fontFamily: 'open-sans-regular',
        fontSize: RFValue(17),
    },
    screenHeaderContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        height: '12%',
        justifyContent: 'space-between',
        backgroundColor: colors.backgroundLight,
    },
    infoMsgContainerWarning: {
        ...infoMsgContainer,
        backgroundColor: colors.flashMessageWarning,
    },
    infoMsgText: {
        color: colors.noticeText,
        textAlign: "center",
        fontFamily: 'open-sans-regular',
        fontSize: RFValue(12),
    },
    HeaderText: {
        fontSize: RFValue(36),
        paddingLeft: "7%",
        fontFamily: 'open-sans-condensed-bold',
        color: colors.headerTitleColor,
        flex: 1,
    },
    subPagesFooter: {
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: "space-between",
        height: '14%',
        width: '100%',
        paddingLeft: '7%',
        paddingRight: '7%',
        backgroundColor: colors.backgroundLight,
    },
    // scan screen layout
    overlay: {
        position: 'absolute',
        top: '12%',
        left: 0,
        right: 0,
        bottom: '14%',
    },
    unfocusedContainer: {
        flex: 1,
        backgroundColor: colors.scanTransparentColor,
    },
    unfocusedContainerSides: {
        flex: 1,
        backgroundColor: colors.scanTransparentColor,
    },
    middleContainer: {
        flexDirection: 'row',
        flex: 3.5,
        borderWidth: 0
    },
    focusedContainer: {
        width: '86%',
    },
    animationLineStyle: {
        height: 2,
        width: '100%',
        backgroundColor: 'red',
    },
    orderProductModalTitle: {
        fontFamily: 'open-sans-condensed-bold',
        fontSize: RFValue(20),
        color: '#ffffff',
        paddingBottom: '3%'
    },
    flashMessage: {
    },
    flashMessageText: {
        ...flashMessageText,
    },
});

