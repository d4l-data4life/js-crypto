import pbkdf2 from 'pbkdf2';

import { AES_CBC, AES_GCM, RSA_OAEP } from './algorithms';
import {
    isEdge,
    convertArrayBufferViewToBase64,
    convertArrayBufferViewToString,
    convertArrayBufferToHexadecimal,
    convertBase64ToArrayBufferView,
    convertHexadecimalToArrayBuffer,
} from './utils';

const KEYVERSION = 1;
const ENCRYPT = 'encrypt';
const DECRYPT = 'decrypt';

const KEYTYPES = {
    COMMON_KEY: 'ck',
    DATA_KEY: 'dk',
    MAIN_KEY: 'mk',
    PASSWORD_KEY: 'pk',
    ATTACHMENT_KEY: 'ak',
    TAG_ENCRYPTION_KEY: 'tek',
    APP: {
        PRIVATE_KEY: 'apriv',
        PUBLIC_KEY: 'apub',
    },
    USER: {
        PRIVATE_KEY: 'upriv',
        PUBLIC_KEY: 'upub',
    },
};

// EXPORT

/**
 * Export public CryptoKey to base64 encoded SPKI.
 *
 * @param {Object} cryptoKey - the key that should be exported
 * @returns {Promise} Resolves to the key as a base64 encoded String.
 */
const exportPublicKeyToSPKI = cryptoKey =>
    crypto.subtle.exportKey('spki', cryptoKey)
        .then(SPKI => new Uint8Array(SPKI))
        .then(convertArrayBufferViewToBase64);

/**
 * Export symmetric CryptoKey as base64 encoded raw key.
 *
 * @param {Object} cryptoKey - the cryptoKey that should be exported
 * @returns {Promise} Resolves to the key as a base64 encoded String.
 */
const exportSymKeyToBase64 = cryptoKey =>
    crypto.subtle.exportKey('raw', cryptoKey)
        .then(byteKey => new Uint8Array(byteKey))
        .then(convertArrayBufferViewToBase64);

/**
 * Export private CryptoKey to base64 encoded PKCS8.
 *
 * @param {Object} cryptoKey - the cryptoKey that should be exported
 * @returns {Promise} Resolves to the key as a base64 encoded String.
 */
const exportPrivateKeyToPKCS8 = cryptoKey =>
    crypto.subtle.exportKey('pkcs8', cryptoKey)
        .then(PKCS8 => new Uint8Array(PKCS8))
        .then(convertArrayBufferViewToBase64);

/**
 * Export symmetric CryptoKey as hexadecimal raw key
 *
 * @param {Object} cryptoKey - the cryptoKey that should be exported
 * @returns {Promise} Resolves to the key as a hexadecimal encoded String.
 */
const exportSymKeyToHexadecimal = cryptoKey =>
    crypto.subtle.exportKey('raw', cryptoKey).then(convertArrayBufferToHexadecimal);

const exportKey = (key, type) => {
    switch (type) {
    case KEYTYPES.COMMON_KEY:
    case KEYTYPES.DATA_KEY:
    case KEYTYPES.ATTACHMENT_KEY:
    case KEYTYPES.TAG_ENCRYPTION_KEY:
    case KEYTYPES.PASSWORD_KEY:
        return exportSymKeyToBase64(key)
            .then(base64 => ({
                t: type,
                v: KEYVERSION,
                sym: base64,
            }));
    case KEYTYPES.USER.PRIVATE_KEY:
    case KEYTYPES.APP.PRIVATE_KEY:
        return exportPrivateKeyToPKCS8(key)
            .then(base64 => ({
                t: type,
                v: KEYVERSION,
                priv: base64,
            }));
    case KEYTYPES.USER.PUBLIC_KEY:
    case KEYTYPES.APP.PUBLIC_KEY:
        return exportPublicKeyToSPKI(key)
            .then(base64 => ({
                t: type,
                v: KEYVERSION,
                pub: base64,
            }));
    case KEYTYPES.MAIN_KEY:
        return exportSymKeyToHexadecimal(key).then(hexadecimal => ({
            t: type,
            v: KEYVERSION,
            sym: hexadecimal,
        }));
    default:
        throw new Error(`invalid key type: ${type}`);
    }
};

// IMPORT
/**
 * Import private CryptoKey from base64 encoded PKCS8.
 * An imported key should never be extractable.
 *
 * @param {String} PKCS8 - the base64 encoded PKCS8 string
 * @returns {Promise} Resolves to the private key as a CryptoKey.
 */
const importPrivateKeyFromPKCS8 = PKCS8 =>
    crypto.subtle.importKey(
        'pkcs8',
        convertBase64ToArrayBufferView(PKCS8),
        RSA_OAEP,
        false,
        [DECRYPT],
    );

/**
 * Import public CryptoKey from base64 encoded SPKI.
 *
 * @param {String} SPKI - the base64 encoded SPKI
 * @returns {Promise} Resolves to the public key as a CryptoKey.
 */
const importPublicKeyFromSPKI = (SPKI) => {
    const alg = RSA_OAEP;
    return crypto.subtle.importKey(
        'spki',
        convertBase64ToArrayBufferView(SPKI),
        alg,
        true,
        [ENCRYPT],
    );
};

/**
 * Import from base64 encoded raw key to CryptoKey.
 * An imported key should never be extractable.
 *
 * @param {String} base64Key - base64 encoded key
 * @param algorithm - cryptographic algorithm
 * @returns {Promise} Resolves to the key as a CryptoKey.
 */
const importSymKeyFromBase64 = (base64Key, algorithm = AES_GCM) =>
    crypto.subtle.importKey(
        'raw',
        convertBase64ToArrayBufferView(base64Key),
        algorithm,
        false,
        [ENCRYPT, DECRYPT],
    );

/**
 * Import from hexadecimal encoded raw key to CryptoKey.
 * An imported key should never be extractable.
 *
 * @param {String} hexadecimal - hexadecimal encoded key
 * @param algorithm - cryptographic algorithm
 * @returns {Promise} Resolves to the key as a CryptoKey.
 */
const importSymKeyFromHexadecimal = (hexadecimal, algorithm = AES_GCM) =>
    crypto.subtle.importKey(
        'raw',
        convertHexadecimalToArrayBuffer(hexadecimal),
        algorithm,
        false,
        [DECRYPT, ENCRYPT],
    );

const importKey = (key) => {
    switch (key.t) {
    case KEYTYPES.COMMON_KEY:
    case KEYTYPES.DATA_KEY:
    case KEYTYPES.ATTACHMENT_KEY:
    case KEYTYPES.PASSWORD_KEY:
        return importSymKeyFromBase64(key.sym);
    case KEYTYPES.TAG_ENCRYPTION_KEY:
        return importSymKeyFromBase64(key.sym, AES_CBC);
    case KEYTYPES.USER.PRIVATE_KEY:
    case KEYTYPES.APP.PRIVATE_KEY:
        return importPrivateKeyFromPKCS8(key.priv);
    case KEYTYPES.USER.PUBLIC_KEY:
    case KEYTYPES.APP.PUBLIC_KEY:
        return importPublicKeyFromSPKI(key.pub);
    case KEYTYPES.MAIN_KEY:
        return importSymKeyFromHexadecimal(key.sym);
    default:
        throw new Error('invalid key type');
    }
};

// GENERATE

/**
 * Creates a random symmetric key.
 *
 * @param {String} type of the key
 * @param {Object} Cryptographic algorithm used.
 * @returns {Promise} Resolves to a symmetric key as a d4lKey object
 */
const generateSymKey = (type, algorithm = AES_GCM) =>
    // Parameters:
    // 1. Symmetric Encryption algorithm name and its requirements
    // 2. Boolean indicating extractable. which indicates whether or not the raw keying
    //    material may be exported by the application
    //    (http://www.w3.org/TR/WebCryptoAPI/#dfn-CryptoKey-slot-extractable)
    // 3. Usage of the key. (http://www.w3.org/TR/WebCryptoAPI/#cryptokey-interface-types)
    crypto.subtle.generateKey(
        algorithm,
        true,
        [ENCRYPT, DECRYPT],
    )
        .then(key => exportKey(key, type));


/**
 * Creates key out of the given buffer (aka password)
 *
 * @param {Uint8Array} masterKey
 * @param {Uint8Array} [salt] - The salt used for deriving, zeroed if not provided
 * @param {Object} algorithm - The algorithm used for deriving. AES GCM by default
 * @returns {Promise} Resolves to a CryptoKey derived from the masterKey
 */
const deriveKey = (masterKey, salt = new Uint8Array(16), algorithm = AES_GCM) => {
    const ITERATIONS = 10000;
    const HASH_ALG = isEdge ? 'sha256' : 'SHA-256';
    // 32 bytes = 256 bits = key size of AES 256, the mode of operation is not relevant
    const KEY_SETTING = isEdge ? 32 : algorithm;

    if (isEdge) {
        return new Promise((resolve, reject) =>
            // promisify
            pbkdf2.pbkdf2(
                convertArrayBufferViewToString(masterKey),
                new Buffer(salt),
                ITERATIONS,
                KEY_SETTING,
                HASH_ALG,
                (err, key) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(key);
                },
            ),
        )
            .then(convertArrayBufferViewToBase64)
            .then(importSymKeyFromBase64);
    }

    return crypto.subtle.importKey(
        'raw',
        masterKey,
        { name: 'PBKDF2' },
        false,
        ['deriveKey', 'deriveBits'],
    )
        .then(key =>
            crypto.subtle.deriveKey(
                {
                    name: 'PBKDF2',
                    salt,
                    iterations: ITERATIONS,
                    hash: HASH_ALG,
                },
                key,
                KEY_SETTING,
                true,
                [ENCRYPT, DECRYPT],
            ),
        )
        .then(key => exportKey(key, KEYTYPES.PASSWORD_KEY));
};

/**
 * Creates a random public-private key pair
 * @param {String} type - type of the key pair 'A' for App, 'U' for User
 * @returns {Promise} Resolves to an object containing a public and a private key as d4lKey objects
 */
const generateAsymKeyPair = type =>
    // Parameters:
    // 1. Asymmetric Encryption algorithm name and its requirements
    // 2. Boolean indicating extractable which indicates whether or not the raw keying
    //    material may be exported by the application
    //    (http://www.w3.org/TR/WebCryptoAPI/#dfn-CryptoKey-slot-extractable)
    // 3. Usage of the keys. (http://www.w3.org/TR/WebCryptoAPI/#cryptokey-interface-types)
    crypto.subtle.generateKey(
        RSA_OAEP,
        true,
        [ENCRYPT, DECRYPT],
    )
        .then(keyPair => Promise.all([
            exportKey(keyPair.publicKey, type.PUBLIC_KEY),
            exportKey(keyPair.privateKey, type.PRIVATE_KEY),
        ]))
        .then(([publicKey, privateKey]) => ({ publicKey, privateKey }));

export {
    deriveKey,
    generateAsymKeyPair,
    generateSymKey,
    importKey,
    exportKey,
    importSymKeyFromBase64,
    exportSymKeyToBase64,
    exportSymKeyToHexadecimal,
    importSymKeyFromHexadecimal,
    importPrivateKeyFromPKCS8,
    exportPrivateKeyToPKCS8,
    importPublicKeyFromSPKI,
    exportPublicKeyToSPKI,
    KEYTYPES,
};
