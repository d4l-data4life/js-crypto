/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
import { expect } from 'chai';

import {
    asymEncrypt,
    asymEncryptString,
    asymDecrypt,
    asymDecryptString,
    importKey,
} from '../source/index';

import { asymUserPublicKey, asymUserPrivateKey } from './testResources/key';
import {
    plainText,
    plainArray,
    asymCipherArray,
    asymCipherBase64,
} from './testResources/crypto';

describe('asymmetric.js', () => {
    describe('asymEncrypt', () => {
        it('should encrypt nondeterministically', (done) => {
            Promise.all([
                asymEncrypt(asymUserPublicKey, plainArray),
                asymEncrypt(asymUserPublicKey, plainArray),
            ])
                .then((ciphers) => {
                    expect(ciphers[0]).not.to.equal(ciphers[1]);

                    done();
                })
                .catch(done);
        });
    });

    describe('asymEncryptString', () => {
        it('should encrypt nondeterministically', (done) => {
            Promise.all([
                asymEncryptString(asymUserPublicKey, plainText),
                asymEncryptString(asymUserPublicKey, plainText),
            ])
                .then((ciphers) => {
                    expect(ciphers[0]).not.to.equal(ciphers[1]);

                    done();
                })
                .catch(done);
        });
    });

    describe('asymDecrypt', () => {
        it('should decrypt properly', (done) => {
            asymDecrypt(asymUserPrivateKey, asymCipherArray)
                .then((plain) => {
                    expect(plain).to.deep.equal(plainArray);

                    done();
                })
                .catch(done);
        });
    });

    describe('asymDecryptString', () => {
        it('should decrypt properly with b64(PKCS8)', (done) => {
            asymDecryptString(asymUserPrivateKey, asymCipherBase64)
                .then((plain) => {
                    expect(plain).to.equal(plainText);

                    done();
                })
                .catch(done);
        });

        it('should decrypt properly with CryptoKey', (done) => {
            importKey(asymUserPrivateKey)
                .then(cryptoKey => asymDecryptString(cryptoKey, asymCipherBase64))
                .then((plain) => {
                    expect(plain).to.equal(plainText);

                    done();
                })
                .catch(done);
        });
    });
});
