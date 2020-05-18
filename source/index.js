import 'fast-text-encoding';

import {
    deriveKey,
    generateSymKey,
    generateAsymKeyPair,
    importKey,
    exportKey,
    importPrivateKeyFromPKCS8,
    exportPrivateKeyToPKCS8,
    importPublicKeyFromSPKI,
    exportPublicKeyToSPKI,
    importSymKeyFromBase64,
    exportSymKeyToBase64,
    KEYTYPES,
} from './key';
import {
    convertStringToArrayBufferView,
    convertBase64ToArrayBufferView,
    convertObjectToArrayBufferView,
    convertBlobToArrayBufferView,
    convertArrayBufferViewToString,
    convertArrayBufferViewToBase64,
} from './utils';
import {
    asymEncrypt,
    asymEncryptString,
    asymDecrypt,
    asymDecryptString,
} from './asymmetric';
import {
    symEncrypt,
    symEncryptString,
    symEncryptObject,
    symEncryptBlob,
    symDecrypt,
    symDecryptString,
    symDecryptObject,
} from './symmetric';
import * as algorithms from './algorithms';

const crypto = window.crypto || window.msCrypto;

const hash = (message, alg = 'SHA-512') => crypto.subtle.digest(alg, Buffer.from(message))
    .then(res => Buffer.from(res).toString('base64'));

const newDerivationSalt = () =>
    crypto.getRandomValues(new Uint8Array(16));

export {
    deriveKey,
    generateSymKey,
    generateAsymKeyPair,
    importKey,
    exportKey,
    importPrivateKeyFromPKCS8,
    exportPrivateKeyToPKCS8,
    importPublicKeyFromSPKI,
    exportPublicKeyToSPKI,
    importSymKeyFromBase64,
    exportSymKeyToBase64,
    KEYTYPES as keyTypes,

    symEncrypt,
    symEncryptString,
    symEncryptObject,
    symEncryptBlob,
    symDecrypt,
    symDecryptString,
    symDecryptObject,

    asymEncrypt,
    asymEncryptString,
    asymDecrypt,
    asymDecryptString,

    convertStringToArrayBufferView,
    convertBase64ToArrayBufferView,
    convertObjectToArrayBufferView,
    convertBlobToArrayBufferView,
    convertArrayBufferViewToString,
    convertArrayBufferViewToBase64,

    algorithms,

    newDerivationSalt,
    hash,
};
