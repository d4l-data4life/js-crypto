"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RSA_OAEP = exports.AES_GCM = exports.AES_CBC = void 0;

require("core-js/modules/es6.typed.uint8-array");

var AES_GCM = {
  name: 'AES-GCM',
  length: 256
};
exports.AES_GCM = AES_GCM;
var AES_CBC = {
  name: 'AES-CBC',
  length: 256
};
exports.AES_CBC = AES_CBC;
var RSA_OAEP = {
  name: 'RSA-OAEP',
  modulusLength: 2048,
  // 0x010001 = 65537 is a Fermat Prime and a popular choice for the public exponent.
  publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
  hash: {
    name: 'SHA-256'
  }
};
exports.RSA_OAEP = RSA_OAEP;