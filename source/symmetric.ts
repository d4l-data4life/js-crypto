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
    D4LKeyTypes,
    D4LKey,
    b64,
} from './key';

const TEK_IV = new Uint8Array(16).fill(0);

/**
 * Symmetric encryption of data with d4lKey
 *
 * @param {D4LKey} d4lKey - The d4lKey representation of the key
 * @param {Uint8Array} data that should be encrypted
 * @returns {Promise<Uint8Array>} Resolves to encrypted data as an ArrayBufferView
 */
const symEncrypt = async (d4lKey: D4LKey, data: Uint8Array): Promise<Uint8Array> => {
    const isTagEncryption = d4lKey.t === D4LKeyTypes.TAG_ENCRYPTION_KEY;
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

const symEncryptString = (d4lKey: D4LKey, string: string): Promise<b64> =>
    symEncrypt(d4lKey, convertStringToArrayBufferView(string))
        .then(convertArrayBufferViewToBase64);

const symEncryptObject = (d4lKey: D4LKey, object: object): Promise<b64> =>
    symEncryptString(d4lKey, JSON.stringify(object));

const symEncryptBlob = (d4lKey: D4LKey, blob: Blob): Promise<Uint8Array> =>
    convertBlobToArrayBufferView(blob)
        .then(arrayBufferString => symEncrypt(d4lKey, arrayBufferString));


/**
 * Symmetric decryption of data with d4lKey
 *
 * @param {D4LKey} d4lKey that specifies the crypto primitives
 * @param {Uint8Array} ivData encrypted data that should be decrypted
 * @returns {Promise<Uint8Array>} Resolves to plain data as an ArrayBufferView
 */
const symDecrypt = async (d4lKey: D4LKey, ivData: Uint8Array): Promise<Uint8Array> => {
    const isTagDecryption = d4lKey.t === D4LKeyTypes.TAG_ENCRYPTION_KEY;
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

const symDecryptString = async (d4lKey: D4LKey, base64String: b64): Promise<string> =>
    symDecrypt(d4lKey, convertBase64ToArrayBufferView(base64String))
        .then(convertArrayBufferViewToString);

const symDecryptObject = async (d4lKey: D4LKey, base64String: b64): Promise<object> =>
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
