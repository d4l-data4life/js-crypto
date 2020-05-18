import {
    convertArrayBufferViewToBase64,
    convertBase64ToArrayBufferView,
    convertArrayBufferViewToString,
    convertStringToArrayBufferView,
    convertBlobToArrayBufferView,
    mergeUint8Arrays,
} from './utils';
import {
    importKey,
    KEYTYPES,
} from './key';

const TEK_IV = new Uint8Array(16).fill(0);

/**
 * Symmetric encryption of data with d4lKey
 *
 * @param {Object} d4lKey - The d4lKey representation of the key
 * @param {ArrayBufferView} data that should be encrypted
 * @returns {Promise} Resolves to encrypted data as an ArrayBufferView
 */
const symEncrypt = (d4lKey, data) => {
    const isTagEncryption = d4lKey.t === KEYTYPES.TAG_ENCRYPTION_KEY;
    const iv = isTagEncryption ?
        TEK_IV :
        crypto.getRandomValues(new Uint8Array(12));

    return importKey(d4lKey)
        .then(key => crypto.subtle.encrypt(
            {
                name: key.algorithm.name,
                iv,
                tagLength: 128,
            }, key, data,
        ))
        .then(result => (
            isTagEncryption ?
                new Uint8Array(result) :
                mergeUint8Arrays(iv, new Uint8Array(result))
        ));
};

const symEncryptString = (d4lKey, string) =>
    symEncrypt(d4lKey, convertStringToArrayBufferView(string))
        .then(convertArrayBufferViewToBase64);

const symEncryptObject = (d4lKey, object) =>
    symEncryptString(d4lKey, JSON.stringify(object));

const symEncryptBlob = (d4lKey, blob) =>
    convertBlobToArrayBufferView(blob)
        .then(arrayBufferString => symEncrypt(d4lKey, arrayBufferString));


/**
 * Symmetric decryption of data with d4lKey
 *
 * @param {Object} d4lKey that specifies the crypto primitives
 * @param {ArrayBufferView} ivData encrypted data that should be decrypted
 * @returns {Promise} Resolves to plain data as an ArrayBufferView
 */
const symDecrypt = (d4lKey, ivData) => {
    const isTagDecryption = d4lKey.t === KEYTYPES.TAG_ENCRYPTION_KEY;
    const iv = isTagDecryption ? TEK_IV : ivData.slice(0, 12);
    const data = isTagDecryption ? ivData : ivData.slice(12, ivData.length);
    return importKey(d4lKey)
        .then(key => crypto.subtle.decrypt(
            {
                name: key.algorithm.name,
                iv,
                tagLength: 128,
            }, key, data))
        .then(result => new Uint8Array(result));
};

const symDecryptString = (d4lKey, base64String) =>
    symDecrypt(d4lKey, convertBase64ToArrayBufferView(base64String))
        .then(convertArrayBufferViewToString);

const symDecryptObject = (d4lKey, base64String) =>
    symDecryptString(d4lKey, base64String).then(JSON.parse);


export {
    symEncrypt,
    symEncryptString,
    symEncryptObject,
    symEncryptBlob,

    symDecrypt,
    symDecryptString,
    symDecryptObject,
};
