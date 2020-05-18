import {
    importKey,
} from './key';
import {
    convertStringToArrayBufferView,
    convertArrayBufferViewToBase64,
    convertArrayBufferViewToString,
    convertBase64ToArrayBufferView,
} from './utils';

/**
 * Asymmetric encryption of data with d4lKey
 *
 * @param {Object} d4lPublicKey - d4lKey representation of the public key
 * @param {ArrayBufferView} data that will be encrypted
 * @returns {Promise} Resolves to encrypted data as an ArrayBufferView
 */
const asymEncrypt = (d4lPublicKey, data) =>
    importKey(d4lPublicKey)
        .then(key => crypto.subtle.encrypt(
            {
                name: key.algorithm.name,
                hash: { name: 'SHA-256' },
            }, key, data,
        ))
        .then(result => new Uint8Array(result));

const asymEncryptString = (publicKeySPKI, string) =>
    asymEncrypt(publicKeySPKI, convertStringToArrayBufferView(string))
        .then(convertArrayBufferViewToBase64);

const isD4LKey = key => key.t && key.v && (key.priv || key.pub || key.sym);

/**
 * Asymmetric decryption of data with D4LKey or CryptoKey.
 * It is necessary to offer function overloading to support the usage of
 * unexportable CryptoKeys, which obviously can't / don't need to be imported.
 *
 * @param {Object} privateKey
 * @param {ArrayBufferView} data
 * @returns {Promise} Resolves to decrypted data as an ArrayBufferView
 */
const asymDecrypt = (privateKey, data) => {
    let outputPrivateKey;
    if (isD4LKey(privateKey)) {
        // If the privateKey is a D4LKey, transform it into a Promise<CryptoKey>.
        outputPrivateKey = importKey(privateKey);
    } else {
        // If the privateKey a CryptoKey, it needs to be wrapped into a Promise.
        outputPrivateKey = Promise.resolve(privateKey);
    }

    return outputPrivateKey
        .then(key => crypto.subtle.decrypt(
            {
                name: key.algorithm.name,
                hash: { name: 'SHA-256' },
            }, key, data))
        .then(result => new Uint8Array(result));
};

const asymDecryptString = (privateKey, base64String) =>
    asymDecrypt(privateKey, convertBase64ToArrayBufferView(base64String))
        .then(convertArrayBufferViewToString);

export {
    asymEncrypt,
    asymEncryptString,
    asymDecrypt,
    asymDecryptString,
};
