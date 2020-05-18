"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.symDecryptObject = exports.symDecryptString = exports.symDecrypt = exports.symEncryptBlob = exports.symEncryptObject = exports.symEncryptString = exports.symEncrypt = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.typed.uint8-array");

require("core-js/modules/es6.array.fill");

var _utils = require("./utils");

var _key = require("./key");

var TEK_IV = new Uint8Array(16).fill(0);
/**
 * Symmetric encryption of data with d4lKey
 *
 * @param {Object} d4lKey - The d4lKey representation of the key
 * @param {ArrayBufferView} data that should be encrypted
 * @returns {Promise} Resolves to encrypted data as an ArrayBufferView
 */

var symEncrypt = function symEncrypt(d4lKey, data) {
  var isTagEncryption = d4lKey.t === _key.KEYTYPES.TAG_ENCRYPTION_KEY;
  var iv = isTagEncryption ? TEK_IV : crypto.getRandomValues(new Uint8Array(12));
  return (0, _key.importKey)(d4lKey).then(function (key) {
    return crypto.subtle.encrypt({
      name: key.algorithm.name,
      iv: iv,
      tagLength: 128
    }, key, data);
  }).then(function (result) {
    return isTagEncryption ? new Uint8Array(result) : (0, _utils.mergeUint8Arrays)(iv, new Uint8Array(result));
  });
};

exports.symEncrypt = symEncrypt;

var symEncryptString = function symEncryptString(d4lKey, string) {
  return symEncrypt(d4lKey, (0, _utils.convertStringToArrayBufferView)(string)).then(_utils.convertArrayBufferViewToBase64);
};

exports.symEncryptString = symEncryptString;

var symEncryptObject = function symEncryptObject(d4lKey, object) {
  return symEncryptString(d4lKey, JSON.stringify(object));
};

exports.symEncryptObject = symEncryptObject;

var symEncryptBlob = function symEncryptBlob(d4lKey, blob) {
  return (0, _utils.convertBlobToArrayBufferView)(blob).then(function (arrayBufferString) {
    return symEncrypt(d4lKey, arrayBufferString);
  });
};
/**
 * Symmetric decryption of data with d4lKey
 *
 * @param {Object} d4lKey that specifies the crypto primitives
 * @param {ArrayBufferView} ivData encrypted data that should be decrypted
 * @returns {Promise} Resolves to plain data as an ArrayBufferView
 */


exports.symEncryptBlob = symEncryptBlob;

var symDecrypt = function symDecrypt(d4lKey, ivData) {
  var isTagDecryption = d4lKey.t === _key.KEYTYPES.TAG_ENCRYPTION_KEY;
  var iv = isTagDecryption ? TEK_IV : ivData.slice(0, 12);
  var data = isTagDecryption ? ivData : ivData.slice(12, ivData.length);
  return (0, _key.importKey)(d4lKey).then(function (key) {
    return crypto.subtle.decrypt({
      name: key.algorithm.name,
      iv: iv,
      tagLength: 128
    }, key, data);
  }).then(function (result) {
    return new Uint8Array(result);
  });
};

exports.symDecrypt = symDecrypt;

var symDecryptString = function symDecryptString(d4lKey, base64String) {
  return symDecrypt(d4lKey, (0, _utils.convertBase64ToArrayBufferView)(base64String)).then(_utils.convertArrayBufferViewToString);
};

exports.symDecryptString = symDecryptString;

var symDecryptObject = function symDecryptObject(d4lKey, base64String) {
  return symDecryptString(d4lKey, base64String).then(JSON.parse);
};

exports.symDecryptObject = symDecryptObject;