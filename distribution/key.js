"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KEYTYPES = exports.exportPublicKeyToSPKI = exports.importPublicKeyFromSPKI = exports.exportPrivateKeyToPKCS8 = exports.importPrivateKeyFromPKCS8 = exports.importSymKeyFromHexadecimal = exports.exportSymKeyToHexadecimal = exports.exportSymKeyToBase64 = exports.importSymKeyFromBase64 = exports.exportKey = exports.importKey = exports.generateSymKey = exports.generateAsymKeyPair = exports.deriveKey = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.typed.uint8-array");

var _pbkdf = _interopRequireDefault(require("pbkdf2"));

var _algorithms = require("./algorithms");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var KEYVERSION = 1;
var ENCRYPT = 'encrypt';
var DECRYPT = 'decrypt';
var KEYTYPES = {
  COMMON_KEY: 'ck',
  DATA_KEY: 'dk',
  MAIN_KEY: 'mk',
  RECOVERY_KEY: 'rk',
  PASSWORD_KEY: 'pk',
  ATTACHMENT_KEY: 'ak',
  TAG_ENCRYPTION_KEY: 'tek',
  APP: {
    PRIVATE_KEY: 'apriv',
    PUBLIC_KEY: 'apub'
  },
  USER: {
    PRIVATE_KEY: 'upriv',
    PUBLIC_KEY: 'upub'
  }
}; // EXPORT

/**
 * Export public CryptoKey to base64 encoded SPKI.
 *
 * @param {Object} cryptoKey - the key that should be exported
 * @returns {Promise} Resolves to the key as a base64 encoded String.
 */

exports.KEYTYPES = KEYTYPES;

var exportPublicKeyToSPKI = function exportPublicKeyToSPKI(cryptoKey) {
  return crypto.subtle.exportKey('spki', cryptoKey).then(function (SPKI) {
    return new Uint8Array(SPKI);
  }).then(_utils.convertArrayBufferViewToBase64);
};
/**
 * Export symmetric CryptoKey as base64 encoded raw key.
 *
 * @param {Object} cryptoKey - the cryptoKey that should be exported
 * @returns {Promise} Resolves to the key as a base64 encoded String.
 */


exports.exportPublicKeyToSPKI = exportPublicKeyToSPKI;

var exportSymKeyToBase64 = function exportSymKeyToBase64(cryptoKey) {
  return crypto.subtle.exportKey('raw', cryptoKey).then(function (byteKey) {
    return new Uint8Array(byteKey);
  }).then(_utils.convertArrayBufferViewToBase64);
};
/**
 * Export private CryptoKey to base64 encoded PKCS8.
 *
 * @param {Object} cryptoKey - the cryptoKey that should be exported
 * @returns {Promise} Resolves to the key as a base64 encoded String.
 */


exports.exportSymKeyToBase64 = exportSymKeyToBase64;

var exportPrivateKeyToPKCS8 = function exportPrivateKeyToPKCS8(cryptoKey) {
  return crypto.subtle.exportKey('pkcs8', cryptoKey).then(function (PKCS8) {
    return new Uint8Array(PKCS8);
  }).then(_utils.convertArrayBufferViewToBase64);
};
/**
 * Export symmetric CryptoKey as hexadecimal raw key
 *
 * @param {Object} cryptoKey - the cryptoKey that should be exported
 * @returns {Promise} Resolves to the key as a hexadecimal encoded String.
 */


exports.exportPrivateKeyToPKCS8 = exportPrivateKeyToPKCS8;

var exportSymKeyToHexadecimal = function exportSymKeyToHexadecimal(cryptoKey) {
  return crypto.subtle.exportKey('raw', cryptoKey).then(_utils.convertArrayBufferToHexadecimal);
};

exports.exportSymKeyToHexadecimal = exportSymKeyToHexadecimal;

var exportKey = function exportKey(key, type) {
  switch (type) {
    case KEYTYPES.COMMON_KEY:
    case KEYTYPES.DATA_KEY:
    case KEYTYPES.ATTACHMENT_KEY:
    case KEYTYPES.TAG_ENCRYPTION_KEY:
    case KEYTYPES.PASSWORD_KEY:
      return exportSymKeyToBase64(key).then(function (base64) {
        return {
          t: type,
          v: KEYVERSION,
          sym: base64
        };
      });

    case KEYTYPES.USER.PRIVATE_KEY:
    case KEYTYPES.APP.PRIVATE_KEY:
      return exportPrivateKeyToPKCS8(key).then(function (base64) {
        return {
          t: type,
          v: KEYVERSION,
          priv: base64
        };
      });

    case KEYTYPES.USER.PUBLIC_KEY:
    case KEYTYPES.APP.PUBLIC_KEY:
      return exportPublicKeyToSPKI(key).then(function (base64) {
        return {
          t: type,
          v: KEYVERSION,
          pub: base64
        };
      });

    case KEYTYPES.MAIN_KEY:
    case KEYTYPES.RECOVERY_KEY:
      return exportSymKeyToHexadecimal(key).then(function (hexadecimal) {
        return {
          t: type,
          v: KEYVERSION,
          sym: hexadecimal
        };
      });

    default:
      throw new Error("invalid key type: ".concat(type));
  }
}; // IMPORT

/**
 * Import private CryptoKey from base64 encoded PKCS8.
 * An imported key should never be extractable.
 *
 * @param {String} PKCS8 - the base64 encoded PKCS8 string
 * @returns {Promise} Resolves to the private key as a CryptoKey.
 */


exports.exportKey = exportKey;

var importPrivateKeyFromPKCS8 = function importPrivateKeyFromPKCS8(PKCS8) {
  return crypto.subtle.importKey('pkcs8', (0, _utils.convertBase64ToArrayBufferView)(PKCS8), _algorithms.RSA_OAEP, false, [DECRYPT]);
};
/**
 * Import public CryptoKey from base64 encoded SPKI.
 *
 * @param {String} SPKI - the base64 encoded SPKI
 * @returns {Promise} Resolves to the public key as a CryptoKey.
 */


exports.importPrivateKeyFromPKCS8 = importPrivateKeyFromPKCS8;

var importPublicKeyFromSPKI = function importPublicKeyFromSPKI(SPKI) {
  var alg = _algorithms.RSA_OAEP;
  return crypto.subtle.importKey('spki', (0, _utils.convertBase64ToArrayBufferView)(SPKI), alg, true, [ENCRYPT]);
};
/**
 * Import from base64 encoded raw key to CryptoKey.
 * An imported key should never be extractable.
 *
 * @param {String} base64Key - base64 encoded key
 * @param algorithm - cryptographic algorithm
 * @returns {Promise} Resolves to the key as a CryptoKey.
 */


exports.importPublicKeyFromSPKI = importPublicKeyFromSPKI;

var importSymKeyFromBase64 = function importSymKeyFromBase64(base64Key) {
  var algorithm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _algorithms.AES_GCM;
  return crypto.subtle.importKey('raw', (0, _utils.convertBase64ToArrayBufferView)(base64Key), algorithm, false, [ENCRYPT, DECRYPT]);
};
/**
 * Import from hexadecimal encoded raw key to CryptoKey.
 * An imported key should never be extractable.
 *
 * @param {String} hexadecimal - hexadecimal encoded key
 * @param algorithm - cryptographic algorithm
 * @returns {Promise} Resolves to the key as a CryptoKey.
 */


exports.importSymKeyFromBase64 = importSymKeyFromBase64;

var importSymKeyFromHexadecimal = function importSymKeyFromHexadecimal(hexadecimal) {
  var algorithm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _algorithms.AES_GCM;
  return crypto.subtle.importKey('raw', (0, _utils.convertHexadecimalToArrayBuffer)(hexadecimal), algorithm, false, [DECRYPT, ENCRYPT]);
};

exports.importSymKeyFromHexadecimal = importSymKeyFromHexadecimal;

var importKey = function importKey(key) {
  switch (key.t) {
    case KEYTYPES.COMMON_KEY:
    case KEYTYPES.DATA_KEY:
    case KEYTYPES.ATTACHMENT_KEY:
    case KEYTYPES.PASSWORD_KEY:
      return importSymKeyFromBase64(key.sym);

    case KEYTYPES.TAG_ENCRYPTION_KEY:
      return importSymKeyFromBase64(key.sym, _algorithms.AES_CBC);

    case KEYTYPES.USER.PRIVATE_KEY:
    case KEYTYPES.APP.PRIVATE_KEY:
      return importPrivateKeyFromPKCS8(key.priv);

    case KEYTYPES.USER.PUBLIC_KEY:
    case KEYTYPES.APP.PUBLIC_KEY:
      return importPublicKeyFromSPKI(key.pub);

    case KEYTYPES.MAIN_KEY:
    case KEYTYPES.RECOVERY_KEY:
      return importSymKeyFromHexadecimal(key.sym);

    default:
      throw new Error('invalid key type');
  }
}; // GENERATE

/**
 * Creates a random symmetric key.
 *
 * @param {String} type of the key
 * @param {Object} Cryptographic algorithm used.
 * @returns {Promise} Resolves to a symmetric key as a d4lKey object
 */


exports.importKey = importKey;

var generateSymKey = function generateSymKey(type) {
  var algorithm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _algorithms.AES_GCM;
  return (// Parameters:
    // 1. Symmetric Encryption algorithm name and its requirements
    // 2. Boolean indicating extractable. which indicates whether or not the raw keying
    //    material may be exported by the application
    //    (http://www.w3.org/TR/WebCryptoAPI/#dfn-CryptoKey-slot-extractable)
    // 3. Usage of the key. (http://www.w3.org/TR/WebCryptoAPI/#cryptokey-interface-types)
    crypto.subtle.generateKey(algorithm, true, [ENCRYPT, DECRYPT]).then(function (key) {
      return exportKey(key, type);
    })
  );
};
/**
 * Creates key out of the given buffer (aka password)
 *
 * @param {Uint8Array} masterKey
 * @param {Uint8Array} [salt] - The salt used for deriving, zeroed if not provided
 * @param {Object} algorithm - The algorithm used for deriving. AES GCM by default
 * @returns {Promise} Resolves to a CryptoKey derived from the masterKey
 */


exports.generateSymKey = generateSymKey;

var deriveKey = function deriveKey(masterKey) {
  var salt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Uint8Array(16);
  var algorithm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _algorithms.AES_GCM;
  var ITERATIONS = 10000;
  var HASH_ALG = _utils.isEdge ? 'sha256' : 'SHA-256'; // 32 bytes = 256 bits = key size of AES 256, the mode of operation is not relevant

  var KEY_SETTING = _utils.isEdge ? 32 : algorithm;

  if (_utils.isEdge) {
    return new Promise(function (resolve, reject) {
      return (// promisify
        _pbkdf.default.pbkdf2((0, _utils.convertArrayBufferViewToString)(masterKey), new Buffer(salt), ITERATIONS, KEY_SETTING, HASH_ALG, function (err, key) {
          if (err) {
            reject(err);
            return;
          }

          resolve(key);
        })
      );
    }).then(_utils.convertArrayBufferViewToBase64).then(importSymKeyFromBase64);
  }

  return crypto.subtle.importKey('raw', masterKey, {
    name: 'PBKDF2'
  }, false, ['deriveKey', 'deriveBits']).then(function (key) {
    return crypto.subtle.deriveKey({
      name: 'PBKDF2',
      salt: salt,
      iterations: ITERATIONS,
      hash: HASH_ALG
    }, key, KEY_SETTING, true, [ENCRYPT, DECRYPT]);
  }).then(function (key) {
    return exportKey(key, KEYTYPES.PASSWORD_KEY);
  });
};
/**
 * Creates a random public-private key pair
 * @param {String} type - type of the key pair 'A' for App, 'U' for User
 * @returns {Promise} Resolves to an object containing a public and a private key as d4lKey objects
 */


exports.deriveKey = deriveKey;

var generateAsymKeyPair = function generateAsymKeyPair(type) {
  return (// Parameters:
    // 1. Asymmetric Encryption algorithm name and its requirements
    // 2. Boolean indicating extractable which indicates whether or not the raw keying
    //    material may be exported by the application
    //    (http://www.w3.org/TR/WebCryptoAPI/#dfn-CryptoKey-slot-extractable)
    // 3. Usage of the keys. (http://www.w3.org/TR/WebCryptoAPI/#cryptokey-interface-types)
    crypto.subtle.generateKey(_algorithms.RSA_OAEP, true, [ENCRYPT, DECRYPT]).then(function (keyPair) {
      return Promise.all([exportKey(keyPair.publicKey, type.PUBLIC_KEY), exportKey(keyPair.privateKey, type.PRIVATE_KEY)]);
    }).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          publicKey = _ref2[0],
          privateKey = _ref2[1];

      return {
        publicKey: publicKey,
        privateKey: privateKey
      };
    })
  );
};

exports.generateAsymKeyPair = generateAsymKeyPair;