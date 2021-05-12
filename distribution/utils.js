"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEdge = exports.mergeUint8Arrays = exports.convertBlobToArrayBufferView = exports.convertObjectToArrayBufferView = exports.convertArrayBufferToHexadecimal = exports.convertArrayBufferViewToBase64 = exports.convertBase64ToArrayBufferView = exports.convertArrayBufferViewToString = exports.convertStringToArrayBufferView = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es7.string.pad-start");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.typed.uint8-array");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _base64Js = _interopRequireDefault(require("base64-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder();
/**
 * converts the bytes to a base64 string
 *
 * @param {Uint8Array} bytes
 * @returns {String} - the base64 representation of the bytes
 *
 */

var convertArrayBufferViewToBase64 = _base64Js.default.fromByteArray;
/**
 * converts a base64 string to a Uint8Array
 *
 * @param {String} base64
 * @returns {Uint8Array} - the bytes of the base64 string
 *
 */

exports.convertArrayBufferViewToBase64 = convertArrayBufferViewToBase64;
var convertBase64ToArrayBufferView = _base64Js.default.toByteArray;
exports.convertBase64ToArrayBufferView = convertBase64ToArrayBufferView;
var convertStringToArrayBufferView = textEncoder.encode.bind(textEncoder);
exports.convertStringToArrayBufferView = convertStringToArrayBufferView;

var convertObjectToArrayBufferView = function convertObjectToArrayBufferView(object) {
  return convertStringToArrayBufferView(JSON.stringify(object));
};

exports.convertObjectToArrayBufferView = convertObjectToArrayBufferView;
var convertArrayBufferViewToString = textDecoder.decode.bind(textDecoder);
exports.convertArrayBufferViewToString = convertArrayBufferViewToString;

var convertBlobToArrayBufferView = function convertBlobToArrayBufferView(blob) {
  return new Promise(function (resolve) {
    var fileReader = new FileReader();

    fileReader.onload = function (event) {
      resolve(new Uint8Array(event.target.result));
    };

    fileReader.readAsArrayBuffer(blob);
  });
};

exports.convertBlobToArrayBufferView = convertBlobToArrayBufferView;

var mergeUint8Arrays = function mergeUint8Arrays(arr1, arr2) {
  var merge = new Uint8Array(arr1.length + arr2.length);
  merge.set(arr1);
  merge.set(arr2, arr1.length);
  return merge;
};
/**
 * converts an ArrayBuffer to a hexadecimal string
 *
 * @param {ArrayBuffer} buffer
 * @returns {String} - hexadecimal representation of the ArrayBuffer
 *
 */


exports.mergeUint8Arrays = mergeUint8Arrays;

var convertArrayBufferToHexadecimal = function convertArrayBufferToHexadecimal(buffer) {
  return Array.from(new Uint8Array(buffer)).map(function (x) {
    return x.toString(16).padStart(2, '0');
  }).join('');
}; // this does not affect Chrome-based Edge because its user agent only contains "Edg"


exports.convertArrayBufferToHexadecimal = convertArrayBufferToHexadecimal;
var isEdge = window.navigator.userAgent.indexOf('Edge') > -1;
exports.isEdge = isEdge;