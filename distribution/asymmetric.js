"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asymDecryptString = exports.asymDecrypt = exports.asymEncryptString = exports.asymEncrypt = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.typed.uint8-array");

require("core-js/modules/es6.function.name");

var _key = require("./key");

var _utils = require("./utils");

/**
 * Asymmetric encryption of data with d4lKey
 *
 * @param {Object} d4lPublicKey - d4lKey representation of the public key
 * @param {ArrayBufferView} data that will be encrypted
 * @returns {Promise} Resolves to encrypted data as an ArrayBufferView
 */
var asymEncrypt = function asymEncrypt(d4lPublicKey, data) {
  return (0, _key.importKey)(d4lPublicKey).then(function (key) {
    return crypto.subtle.encrypt({
      name: key.algorithm.name,
      hash: {
        name: 'SHA-256'
      }
    }, key, data);
  }).then(function (result) {
    return new Uint8Array(result);
  });
};

exports.asymEncrypt = asymEncrypt;

var asymEncryptString = function asymEncryptString(publicKeySPKI, string) {
  return asymEncrypt(publicKeySPKI, (0, _utils.convertStringToArrayBufferView)(string)).then(_utils.convertArrayBufferViewToBase64);
};

exports.asymEncryptString = asymEncryptString;

var isD4LKey = function isD4LKey(key) {
  return key.t && key.v && (key.priv || key.pub || key.sym);
};
/**
 * Asymmetric decryption of data with D4LKey or CryptoKey.
 * It is necessary to offer function overloading to support the usage of
 * unexportable CryptoKeys, which obviously can't / don't need to be imported.
 *
 * @param {Object} privateKey
 * @param {ArrayBufferView} data
 * @returns {Promise} Resolves to decrypted data as an ArrayBufferView
 */


var asymDecrypt = function asymDecrypt(privateKey, data) {
  var outputPrivateKey;

  if (isD4LKey(privateKey)) {
    // If the privateKey is a D4LKey, transform it into a Promise<CryptoKey>.
    outputPrivateKey = (0, _key.importKey)(privateKey);
  } else {
    // If the privateKey a CryptoKey, it needs to be wrapped into a Promise.
    outputPrivateKey = Promise.resolve(privateKey);
  }

  return outputPrivateKey.then(function (key) {
    return crypto.subtle.decrypt({
      name: key.algorithm.name,
      hash: {
        name: 'SHA-256'
      }
    }, key, data);
  }).then(function (result) {
    return new Uint8Array(result);
  });
};

exports.asymDecrypt = asymDecrypt;

var asymDecryptString = function asymDecryptString(privateKey, base64String) {
  return asymDecrypt(privateKey, (0, _utils.convertBase64ToArrayBufferView)(base64String)).then(_utils.convertArrayBufferViewToString);
};

exports.asymDecryptString = asymDecryptString;