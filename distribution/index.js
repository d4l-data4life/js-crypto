"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "deriveKey", {
  enumerable: true,
  get: function get() {
    return _key.deriveKey;
  }
});
Object.defineProperty(exports, "generateSymKey", {
  enumerable: true,
  get: function get() {
    return _key.generateSymKey;
  }
});
Object.defineProperty(exports, "generateAsymKeyPair", {
  enumerable: true,
  get: function get() {
    return _key.generateAsymKeyPair;
  }
});
Object.defineProperty(exports, "importKey", {
  enumerable: true,
  get: function get() {
    return _key.importKey;
  }
});
Object.defineProperty(exports, "exportKey", {
  enumerable: true,
  get: function get() {
    return _key.exportKey;
  }
});
Object.defineProperty(exports, "importPrivateKeyFromPKCS8", {
  enumerable: true,
  get: function get() {
    return _key.importPrivateKeyFromPKCS8;
  }
});
Object.defineProperty(exports, "exportPrivateKeyToPKCS8", {
  enumerable: true,
  get: function get() {
    return _key.exportPrivateKeyToPKCS8;
  }
});
Object.defineProperty(exports, "importPublicKeyFromSPKI", {
  enumerable: true,
  get: function get() {
    return _key.importPublicKeyFromSPKI;
  }
});
Object.defineProperty(exports, "exportPublicKeyToSPKI", {
  enumerable: true,
  get: function get() {
    return _key.exportPublicKeyToSPKI;
  }
});
Object.defineProperty(exports, "importSymKeyFromBase64", {
  enumerable: true,
  get: function get() {
    return _key.importSymKeyFromBase64;
  }
});
Object.defineProperty(exports, "exportSymKeyToBase64", {
  enumerable: true,
  get: function get() {
    return _key.exportSymKeyToBase64;
  }
});
Object.defineProperty(exports, "keyTypes", {
  enumerable: true,
  get: function get() {
    return _key.KEYTYPES;
  }
});
Object.defineProperty(exports, "convertStringToArrayBufferView", {
  enumerable: true,
  get: function get() {
    return _utils.convertStringToArrayBufferView;
  }
});
Object.defineProperty(exports, "convertBase64ToArrayBufferView", {
  enumerable: true,
  get: function get() {
    return _utils.convertBase64ToArrayBufferView;
  }
});
Object.defineProperty(exports, "convertObjectToArrayBufferView", {
  enumerable: true,
  get: function get() {
    return _utils.convertObjectToArrayBufferView;
  }
});
Object.defineProperty(exports, "convertBlobToArrayBufferView", {
  enumerable: true,
  get: function get() {
    return _utils.convertBlobToArrayBufferView;
  }
});
Object.defineProperty(exports, "convertArrayBufferViewToString", {
  enumerable: true,
  get: function get() {
    return _utils.convertArrayBufferViewToString;
  }
});
Object.defineProperty(exports, "convertArrayBufferViewToBase64", {
  enumerable: true,
  get: function get() {
    return _utils.convertArrayBufferViewToBase64;
  }
});
Object.defineProperty(exports, "asymEncrypt", {
  enumerable: true,
  get: function get() {
    return _asymmetric.asymEncrypt;
  }
});
Object.defineProperty(exports, "asymEncryptString", {
  enumerable: true,
  get: function get() {
    return _asymmetric.asymEncryptString;
  }
});
Object.defineProperty(exports, "asymDecrypt", {
  enumerable: true,
  get: function get() {
    return _asymmetric.asymDecrypt;
  }
});
Object.defineProperty(exports, "asymDecryptString", {
  enumerable: true,
  get: function get() {
    return _asymmetric.asymDecryptString;
  }
});
Object.defineProperty(exports, "symEncrypt", {
  enumerable: true,
  get: function get() {
    return _symmetric.symEncrypt;
  }
});
Object.defineProperty(exports, "symEncryptString", {
  enumerable: true,
  get: function get() {
    return _symmetric.symEncryptString;
  }
});
Object.defineProperty(exports, "symEncryptObject", {
  enumerable: true,
  get: function get() {
    return _symmetric.symEncryptObject;
  }
});
Object.defineProperty(exports, "symEncryptBlob", {
  enumerable: true,
  get: function get() {
    return _symmetric.symEncryptBlob;
  }
});
Object.defineProperty(exports, "symDecrypt", {
  enumerable: true,
  get: function get() {
    return _symmetric.symDecrypt;
  }
});
Object.defineProperty(exports, "symDecryptString", {
  enumerable: true,
  get: function get() {
    return _symmetric.symDecryptString;
  }
});
Object.defineProperty(exports, "symDecryptObject", {
  enumerable: true,
  get: function get() {
    return _symmetric.symDecryptObject;
  }
});
exports.algorithms = exports.hash = exports.newDerivationSalt = void 0;

require("core-js/modules/es6.typed.uint8-array");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("fast-text-encoding");

var _key = require("./key");

var _utils = require("./utils");

var _asymmetric = require("./asymmetric");

var _symmetric = require("./symmetric");

var algorithms = _interopRequireWildcard(require("./algorithms"));

exports.algorithms = algorithms;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var crypto = window.crypto || window.msCrypto;

var hash = function hash(message) {
  var alg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'SHA-512';
  return crypto.subtle.digest(alg, Buffer.from(message)).then(function (res) {
    return Buffer.from(res).toString('base64');
  });
};

exports.hash = hash;

var newDerivationSalt = function newDerivationSalt() {
  return crypto.getRandomValues(new Uint8Array(16));
};

exports.newDerivationSalt = newDerivationSalt;