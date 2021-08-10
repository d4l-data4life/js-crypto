import * as pbkdf2 from 'pbkdf2';

import { AES_CBC, AES_GCM, RSA_OAEP } from './algorithms';
import {
    isEdge,
    convertArrayBufferViewToBase64,
    convertArrayBufferViewToString,
    convertArrayBufferToHexadecimal,
    convertBase64ToArrayBufferView,
    convertHexadecimalToArrayBuffer,
} from './utils';

const KEY_VERSION = 1;
const ENCRYPT = 'encrypt';
const DECRYPT = 'decrypt';

const EXTRACTABLE = true;
const UNEXTRACTABLE = false;

enum D4LKeyTypes {
    COMMON_KEY = 'ck',
    DATA_KEY = 'dk',
    MAIN_KEY = 'mk',
    PASSWORD_KEY = 'pk',
    RECOVERY_KEY = 'rk',
    ATTACHMENT_KEY = 'ak',
    TAG_ENCRYPTION_KEY = 'tek',
    APP_PRIVATE_KEY = 'apriv',
    APP_PUBLIC_KEY = 'apub',
    USER_PRIVATE_KEY = 'upriv',
    USER_PUBLIC_KEY = 'upub',
}

export enum AsymKeyTypes {
    APP = 'app',
    USER = 'user',
}

export type b64 = string;
export type hex = string;

export type D4LKeySym = {
    v: number;
    t: D4LKeyTypes.COMMON_KEY | D4LKeyTypes.DATA_KEY | D4LKeyTypes.MAIN_KEY | D4LKeyTypes.PASSWORD_KEY | D4LKeyTypes.ATTACHMENT_KEY | D4LKeyTypes.TAG_ENCRYPTION_KEY;
    sym: b64;
};

export type D4LKeyPrivate = {
    v: number;
    t: D4LKeyTypes.APP_PRIVATE_KEY | D4LKeyTypes.USER_PRIVATE_KEY;
    priv: b64;
};

export type D4LKeyPublic = {
    v: number;
    t: D4LKeyTypes.APP_PUBLIC_KEY | D4LKeyTypes.USER_PUBLIC_KEY;
    pub: b64;
};

export type D4LKey = D4LKeySym | D4LKeyPrivate | D4LKeyPublic

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const isD4LKey = (key: any): key is D4LKey => key.t && key.v && (key.priv || key.pub || key.sym);

export type D4LAsymKeysPair = {
    publicKey: D4LKeyPublic,
    privateKey: D4LKeyPrivate,
}

// EXPORT

/**
 * Export public CryptoKey to base64 encoded SPKI.
 *
 * @param {CryptoKey} cryptoKey - the key that should be exported
 * @returns {Promise<b64>} Resolves to the key as a base64 encoded String.
 */
const exportPublicKeyToSPKI = (cryptoKey: CryptoKey): Promise<b64> =>
    crypto.subtle.exportKey('spki', cryptoKey)
        .then(SPKI => new Uint8Array(SPKI))
        .then(convertArrayBufferViewToBase64);

/**
 * Export symmetric CryptoKey as base64 encoded raw key.
 *
 * @param {CryptoKey} cryptoKey - the cryptoKey that should be exported
 * @returns {Promise<b64>} Resolves to the key as a base64 encoded String.
 */
const exportSymKeyToBase64 = (cryptoKey: CryptoKey): Promise<b64> =>
    crypto.subtle.exportKey('raw', cryptoKey)
        .then(byteKey => new Uint8Array(byteKey))
        .then(convertArrayBufferViewToBase64);

/**
 * Export private CryptoKey to base64 encoded PKCS8.
 *
 * @param {CryptoKey} cryptoKey - the cryptoKey that should be exported
 * @returns {Promise<b64>} Resolves to the key as a base64 encoded String.
 */
const exportPrivateKeyToPKCS8 = (cryptoKey: CryptoKey): Promise<b64> =>
    crypto.subtle.exportKey('pkcs8', cryptoKey)
        .then(PKCS8 => new Uint8Array(PKCS8))
        .then(convertArrayBufferViewToBase64);

/**
 * Export symmetric CryptoKey as hexadecimal raw key
 *
 * @param {CryptoKey} cryptoKey - the cryptoKey that should be exported
 * @returns {Promise<hex>} Resolves to the key as a hexadecimal encoded String.
 */
const exportSymKeyToHexadecimal = (cryptoKey: CryptoKey): Promise<hex> =>
    crypto.subtle.exportKey('raw', cryptoKey).then(convertArrayBufferToHexadecimal);

const exportKey = (key: CryptoKey, type: D4LKeyTypes): Promise<D4LKey> => {
    switch (type) {
        case D4LKeyTypes.COMMON_KEY:
        case D4LKeyTypes.DATA_KEY:
        case D4LKeyTypes.ATTACHMENT_KEY:
        case D4LKeyTypes.TAG_ENCRYPTION_KEY:
        case D4LKeyTypes.PASSWORD_KEY:
            return exportSymKeyToBase64(key)
                .then(base64 => ({
                    t: type,
                    v: KEY_VERSION,
                    sym: base64,
                }));
        case D4LKeyTypes.USER_PRIVATE_KEY:
        case D4LKeyTypes.APP_PRIVATE_KEY:
            return exportPrivateKeyToPKCS8(key)
                .then(base64 => ({
                    t: type,
                    v: KEY_VERSION,
                    priv: base64,
                }));
        case D4LKeyTypes.USER_PUBLIC_KEY:
        case D4LKeyTypes.APP_PUBLIC_KEY:
            return exportPublicKeyToSPKI(key)
                .then(base64 => ({
                    t: type,
                    v: KEY_VERSION,
                    pub: base64,
                }));
        case D4LKeyTypes.MAIN_KEY:
            return exportSymKeyToHexadecimal(key).then(hexadecimal => ({
                t: type,
                v: KEY_VERSION,
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
 * @param {b64} PKCS8 - the base64 encoded PKCS8 string
 * @returns {Promise<CryptoKey>} Resolves to the private key as a CryptoKey.
 */
const importPrivateKeyFromPKCS8 = (PKCS8: b64): Promise<CryptoKey> =>
    crypto.subtle.importKey(
        'pkcs8',
        convertBase64ToArrayBufferView(PKCS8),
        RSA_OAEP,
        UNEXTRACTABLE,
        [DECRYPT],
    );

/**
 * Import public CryptoKey from base64 encoded SPKI.
 *
 * @param {b64} spki - the base64 encoded SPKI
 * @returns {Promise<CryptoKey>} Resolves to the public key as a CryptoKey.
 */
const importPublicKeyFromSPKI = (spki: b64): Promise<CryptoKey> => {
    return crypto.subtle.importKey(
        'spki',
        convertBase64ToArrayBufferView(spki),
        RSA_OAEP,
        EXTRACTABLE,
        [ENCRYPT],
    );
};

/**
 * Import from base64 encoded raw key to CryptoKey.
 * An imported key should never be extractable.
 *
 * @param {b64} base64Key - base64 encoded key
 * @param algorithm - cryptographic algorithm
 * @returns {Promise<CryptoKey>} Resolves to the key as a CryptoKey.
 */
const importSymKeyFromBase64 = (base64Key: b64, algorithm = AES_GCM): Promise<CryptoKey> =>
    crypto.subtle.importKey(
        'raw',
        convertBase64ToArrayBufferView(base64Key),
        algorithm,
        UNEXTRACTABLE,
        [ENCRYPT, DECRYPT],
    );

/**
 * Import from hexadecimal encoded raw key to CryptoKey.
 * An imported key should never be extractable.
 *
 * @param {hex} hexadecimal - hexadecimal encoded key
 * @param algorithm - cryptographic algorithm
 * @returns {Promise<CryptoKey>} Resolves to the key as a CryptoKey.
 */
const importSymKeyFromHexadecimal = (hexadecimal: hex, algorithm = AES_GCM): Promise<CryptoKey> =>
    crypto.subtle.importKey(
        'raw',
        convertHexadecimalToArrayBuffer(hexadecimal),
        algorithm,
        UNEXTRACTABLE,
        [DECRYPT, ENCRYPT],
    );

const importKey = (key: D4LKey): Promise<CryptoKey> => {
    switch (key.t) {
        case D4LKeyTypes.COMMON_KEY:
        case D4LKeyTypes.DATA_KEY:
        case D4LKeyTypes.ATTACHMENT_KEY:
        case D4LKeyTypes.PASSWORD_KEY:
            return importSymKeyFromBase64(key.sym);
        case D4LKeyTypes.TAG_ENCRYPTION_KEY:
            return importSymKeyFromBase64(key.sym, AES_CBC);
        case D4LKeyTypes.USER_PRIVATE_KEY:
        case D4LKeyTypes.APP_PRIVATE_KEY:
            return importPrivateKeyFromPKCS8(key.priv);
        case D4LKeyTypes.USER_PUBLIC_KEY:
        case D4LKeyTypes.APP_PUBLIC_KEY:
            return importPublicKeyFromSPKI(key.pub);
        case D4LKeyTypes.MAIN_KEY:
            return importSymKeyFromHexadecimal(key.sym);
        default:
            throw new Error('invalid key type');
    }
};

// GENERATE

/**
 * Creates a random symmetric key.
 *
 * @param {D4LKeyTypes} type of the key
 * @param {AesKeyGenParams | HmacKeyGenParams | Pbkdf2Params} Cryptographic algorithm used.
 * @returns {Promise<D4LKey>} Resolves to a symmetric key as a d4lKey object
 */
const generateSymKey = (type: D4LKeyTypes, algorithm: AesKeyGenParams | HmacKeyGenParams | Pbkdf2Params = AES_GCM): Promise<D4LKey> =>
    crypto.subtle.generateKey(
        algorithm,
        EXTRACTABLE,
        [ENCRYPT, DECRYPT],
    )
        .then(key => exportKey(key, type));


/**
 * Creates key out of the given buffer (aka password)
 *
 * @param {Uint8Array} masterKey
 * @param {Uint8Array} [salt] - The salt used for deriving, zeroed if not provided
 * @param {AesDerivedKeyParams} algorithm - The algorithm used for deriving. AES GCM by default
 * @returns {Promise<CryptoKey | D4LKey>} Resolves to a CryptoKey derived from the masterKey
 */
const deriveKey = (masterKey: Uint8Array, salt: Uint8Array = new Uint8Array(16), algorithm: AesDerivedKeyParams = AES_GCM): Promise<CryptoKey | D4LKey> => {
    const ITERATIONS = 10000;

    if (isEdge) {
        return new Promise((resolve, reject) =>
            // promisify
            pbkdf2.pbkdf2(
                convertArrayBufferViewToString(masterKey),
                Buffer.from(salt),
                ITERATIONS,
                32,     // 32 bytes = 256 bits = key size of AES 256, the mode of operation is not relevant
                'sha256',
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
        UNEXTRACTABLE,
        ['deriveKey', 'deriveBits'],
    )
        .then(key =>
            crypto.subtle.deriveKey(
                {
                    name: 'PBKDF2',
                    salt,
                    iterations: ITERATIONS,
                    hash: 'SHA-256',
                },
                key,
                algorithm,
                EXTRACTABLE,
                [ENCRYPT, DECRYPT],
            ),
        )
        .then(key => exportKey(key, D4LKeyTypes.PASSWORD_KEY));
};

/**
 * Creates a random public-private key pair
 * @param {AsymKeyTypes} type - type of the key pair (app/user)
 * @returns {Promise<D4LAsymKeysPair>} Resolves to an object containing a public and a private key as d4lKey objects
 */
const generateAsymKeyPair = (type: AsymKeyTypes): Promise<D4LAsymKeysPair> =>
    crypto.subtle.generateKey(
        RSA_OAEP,
        EXTRACTABLE,
        [ENCRYPT, DECRYPT],
    )
        .then(keyPair => Promise.all([
            exportKey(
                keyPair.publicKey, type === AsymKeyTypes.APP ?
                D4LKeyTypes.APP_PUBLIC_KEY :
                D4LKeyTypes.USER_PUBLIC_KEY) as Promise<D4LKeyPublic>,
            exportKey(
                keyPair.privateKey,
                type === AsymKeyTypes.APP ?
                    D4LKeyTypes.APP_PRIVATE_KEY :
                    D4LKeyTypes.USER_PRIVATE_KEY) as Promise<D4LKeyPrivate>,
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
    D4LKeyTypes,
};
