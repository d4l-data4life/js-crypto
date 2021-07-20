import {
    b64,
    D4LKeyPrivate,
    D4LKeyPublic,
    importKey,
    isD4LKey,
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
 * @param {D4LKeyPublic} d4lPublicKey - d4lKey representation of the public key
 * @param {Uint8Array} data that will be encrypted
 * @returns {Promise<Uint8Array>} Resolves to encrypted data as an ArrayBufferView
 */
const asymEncrypt = async (d4lPublicKey: D4LKeyPublic, data: Uint8Array): Promise<Uint8Array> =>
    importKey(d4lPublicKey)
        .then(key => crypto.subtle.encrypt(
            {
                name: key.algorithm.name,
            }, key, data,
        ))
        .then(result => new Uint8Array(result));

const asymEncryptString = async (publicKeySPKI: D4LKeyPublic, string: string): Promise<b64> =>
    asymEncrypt(publicKeySPKI, convertStringToArrayBufferView(string))
        .then(convertArrayBufferViewToBase64);

/**
 * Asymmetric decryption of data with D4LKey or CryptoKey.
 * It is necessary to offer function overloading to support the usage of
 * unexportable CryptoKeys, which obviously can't / don't need to be imported.
 *
 * @param {D4LKeyPrivate | CryptoKey} privateKey
 * @param {Uint8Array} data
 * @returns {Promise<Uint8Array>} Resolves to decrypted data as an ArrayBufferView
 */
const asymDecrypt = async (privateKey: D4LKeyPrivate | CryptoKey, data: Uint8Array): Promise<Uint8Array> => {
    let outputPrivateKey: Promise<CryptoKey>;
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
            }, key, data))
        .then(result => new Uint8Array(result));
};

const asymDecryptString = async (privateKey: D4LKeyPrivate | CryptoKey, base64String: b64): Promise<b64> =>
    asymDecrypt(privateKey, convertBase64ToArrayBufferView(base64String))
        .then(convertArrayBufferViewToString);

export {
    asymEncrypt,
    asymEncryptString,
    asymDecrypt,
    asymDecryptString,
};
