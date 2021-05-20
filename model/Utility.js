import React from 'react';
import {showMessage} from "react-native-flash-message";
import * as mime from 'react-native-mime-types';

class Utility {

    constructor() {

    };

    /**
     *
     * @param value
     * @returns {boolean|boolean}
     */
    isNotUndefined(value) {

        return typeof value != "undefined" && value !== null;
    };

    /**
     *
     * @param a
     * @param b
     * @param property
     * @param order : false => asc , true => desc
     * @returns {number}
     */
    sortArrayObject(a, b, property, order) {
        a[property] = this.parseStringToFloat(a[property]);
        b[property] = this.parseStringToFloat(b[property]);

        if (typeof order != 'undefined' && order) {
            if (a[property] > b[property]) {
                return -1;
            }
            if (a[property] < b[property]) {
                return 1;
            }
        } else {
            if (a[property] < b[property]) {
                return -1;
            }
            if (a[property] > b[property]) {
                return 1;
            }
        }
        return 0;
    }

    /**
     *
     * @param value
     * @returns {number}
     * if string contain number it will return float otherwise returns string
     */
    parseStringToFloat(value)
    {
        if (!isNaN(value) && value != "") {
            value = parseFloat(value);
        }
        return value;
    }

    compareArray(arrayOne, arrayTwo) {
            // if the other array is a falsy value, return
            if (!arrayTwo)
                return false;

            // compare lengths - can save a lot of time
            if (arrayOne.length != arrayTwo.length)
                return false;

            for (var i = 0, l=arrayOne.length; i < l; i++) {
                // Check if we have nested arrays
                if (arrayOne[i] instanceof Array && arrayTwo[i] instanceof Array) {
                    // recurse into the nested arrays
                    if (!arrayOne[i].equals(arrayTwo[i]))
                        return false;
                }
                else if (arrayOne[i] != arrayTwo[i]) {
                    // Warning - two different object instances will never be equal: {x:20} != {x:20}
                    return false;
                }
            }
            return true;
    }

    /**
     * will get string as number and replace "," with ".", we do it because of German decimal separator
     * @returns {*}
     * @param strNumber
     */
    convertStringToNumber(strNumber) {
        let number = 0;
        if (strNumber !== "") {
            strNumber = strNumber.toString();
            strNumber = strNumber.replace(",", ".");
            if (!isNaN(strNumber)) {
                number = parseFloat(strNumber);
            } else {
                number = false;
            }
        }
        return number;

    }
    /**
     * will recive a number and turn it to string and replace "." with ",", we do it because of German decimal separator to show the number to user
     * @param number
     * @returns {string}
     */
    convertNumberToString(number) {
        if (!isNaN(number)) {
            let strNumber = number.toString();
            return strNumber.replace(".", ",");
        }
    }

    isBiggerThanZero(number) {
        if (!isNaN(number) && number > 0) {
            return true;
        } else {
            return false
        }
    }

    /**
     *
     * @param filename
     * @returns {T}
     */
    getFileExtension(filename) {
        return filename.split('.').pop();
    }

    /**
     *
     * @param filename
     * @returns {*}
     */
    getMimeType(filename) {
        return mime.lookup(filename);
    }

    /**
     * add files to attachment
     * @param files
     * @returns {[]}
     */
    createAttachments(files) {

        var attachments = [];

        try {
            for(var i in files){

                var file = {
                    type:       this.getMimeType(files[i].uri),
                    name:       files[i].key + "." + this.getFileExtension(files[i].uri),
                    content:    files[i].base64,
                };

                attachments.push(file);
            }
        } catch (error) {
            if (__DEV__) {
                console.log(error);
            }
        }

        return attachments;
    }

    /**
     * default configuration for mandrill message object
     * @returns {{return_path_domain: string, merge: boolean, preserve_recipients: boolean, track_opens: boolean, track_clicks: boolean, tracking_domain: string, signing_domain: string}}
     */
    getDefaultMessage() {
        return {
            preserve_recipients: true,
            track_opens: false,
            track_clicks: false,
            tracking_domain: "mandrillapp.com",
            signing_domain: "mandrillapp.com",
            return_path_domain: "mandrillapp.com",
            merge: false,
        }
    }

    /**
     * create clone of object
     * @param src
     * @returns {any}
     */
    cloneObject(src) {
        return Object.assign({}, src);
    }

    /**
     * return current date in format d-m-Y
     * optional with time in format d-m-Y_h-i
     * @param withTime
     * @returns {string}
     */
    getDate(withTime) {

        var date    = new Date();
        var day     = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var month   = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var year    = date.getFullYear();
        var dateString = day + "-" + month + "-" + year;

        if(withTime){
            var hour    = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var minute  = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            dateString += "_" + hour + "-" + minute;
        }

        return dateString;
    }
}

export default new Utility();