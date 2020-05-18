/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
import { expect } from 'chai';

import * as hcCrypto from '../source/index';

describe('index.js', () => {
    it('exports the expected methods', () => {
        expect(Object.keys(hcCrypto).sort()).to.deep.equal([
            'algorithms',
            'asymDecrypt',
            'asymDecryptString',
            'asymEncrypt',
            'asymEncryptString',
            'convertArrayBufferViewToBase64',
            'convertArrayBufferViewToString',
            'convertBase64ToArrayBufferView',
            'convertBlobToArrayBufferView',
            'convertObjectToArrayBufferView',
            'convertStringToArrayBufferView',
            'deriveKey',
            'exportKey',
            'exportPrivateKeyToPKCS8',
            'exportPublicKeyToSPKI',
            'exportSymKeyToBase64',
            'generateAsymKeyPair',
            'generateSymKey',
            'hash',
            'importKey',
            'importPrivateKeyFromPKCS8',
            'importPublicKeyFromSPKI',
            'importSymKeyFromBase64',
            'keyTypes',
            'newDerivationSalt',
            'symDecrypt',
            'symDecryptObject',
            'symDecryptString',
            'symEncrypt',
            'symEncryptBlob',
            'symEncryptObject',
            'symEncryptString',
        ]);
    });
});
