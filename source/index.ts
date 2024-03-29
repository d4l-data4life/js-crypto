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
    D4LKeyTypes,
    b64,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const crypto = window.crypto || ((window as any).msCrypto as Crypto);

const hash = (message: ArrayBuffer, alg = 'SHA-512'): Promise<b64> => crypto.subtle.digest(alg, Buffer.from(message))
    .then(res => Buffer.from(res).toString('base64'));

const newDerivationSalt = (): Uint8Array =>
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
    D4LKeyTypes as D4LKeyTypes,

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
