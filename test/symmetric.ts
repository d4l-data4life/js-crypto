/* eslint-env mocha */

/* eslint-disable max-nested-callbacks */
import { expect } from 'chai';

import {
    symEncrypt,
    symEncryptString,
    symEncryptObject,
    symEncryptBlob,
    symDecryptString,
    symDecrypt,
    symDecryptObject,
} from '../source/index';
import {
    plainText,
    cipherTextArray,
    cipherTextBase64,
    plainObject,
    plainBlob,
    cipherBlobArray,
    cipherObjectBase64,
    plainArray,
    commonCipherArray,
    commonCipherBase64,
    commonCipherObjectBase64,
} from './testResources/crypto';
import {
    symTagKey, symCommonKey,
} from './testResources/key';


describe('symmetric.js', () => {
    describe('symEncrypt', () => {
        it('should encrypt deterministically when using a tag encryption key', (done) => {
            symEncrypt(symTagKey, plainArray)
                .then((cipher) => {
                    expect(cipher).to.deep.equal(cipherTextArray);
                    done();
                })
                .catch(done);
        });

        it('should encrypt nondeterministically when not using tag encryption key', (done) => {
            Promise.all([
                symEncrypt(symCommonKey, plainArray),
                symEncrypt(symCommonKey, plainArray),
            ])
                .then((ciphers) => {
                    expect(ciphers[0]).not.to.deep.equal(ciphers[1]);

                    done();
                })
                .catch(done);
        });
    });

    describe('symEncryptString', () => {
        it('should encrypt deterministically when using a tag encryption key', (done) => {
            symEncryptString(symTagKey, plainText)
                .then((cipher) => {
                    expect(cipher).to.deep.equal(cipherTextBase64);
                    done();
                })
                .catch(done);
        });

        it('should encrypt nondeterministically when not using tag encryption key', (done) => {
            Promise.all([
                symEncryptString(symCommonKey, plainText),
                symEncryptString(symCommonKey, plainText),
            ])
                .then((ciphers) => {
                    expect(ciphers[0]).not.to.equal(ciphers[1]);

                    done();
                })
                .catch(done);
        });
    });

    describe('symEncryptObject', () => {
        it('should encrypt deterministically when using a tag encryption key', (done) => {
            symEncryptObject(symTagKey, plainObject)
                .then((cipher) => {
                    expect(cipher).to.equal(cipherObjectBase64);
                    done();
                })
                .catch(done);
        });

        it('should encrypt nondeterministically when not using tag encryption key', (done) => {
            Promise.all([
                symEncryptObject(symCommonKey, plainObject),
                symEncryptObject(symCommonKey, plainObject),
            ])
                .then((ciphers) => {
                    expect(ciphers[0]).not.to.equal(ciphers[1]);

                    done();
                })
                .catch(done);
        });
    });

    describe('symEncryptBlob', () => {
        it('should encrypt deterministically when using a tag encryption key', (done) => {
            symEncryptBlob(symTagKey, plainBlob)
                .then((cipher) => {
                    expect(cipher).to.deep.equal(cipherBlobArray);
                    done();
                })
                .catch(done);
        });

        it('should encrypt nondeterministically when not using tag encryption key', (done) => {
            Promise.all([
                symEncryptBlob(symCommonKey, plainBlob),
                symEncryptBlob(symCommonKey, plainBlob),
            ])
                .then((ciphers) => {
                    expect(ciphers[0]).not.to.equal(ciphers[1]);

                    done();
                })
                .catch(done);
        });
    });

    describe('symDecrypt', () => {
        it('should decrypt deterministic encryption properly', (done) => {
            symDecrypt(symTagKey, cipherTextArray)
                .then((plain) => {
                    expect(plain).to.deep.equal(plainArray);
                    done();
                })
                .catch(done);
        });

        it('should decrypt nondeterministic encryption properly', (done) => {
            symDecrypt(symCommonKey, commonCipherArray)
                .then((plain) => {
                    expect(plain).to.deep.equal(plainArray);
                    done();
                })
                .catch(done);
        });
    });

    describe('symDecryptString', () => {
        it('should decrypt deterministic encryption properly', (done) => {
            symDecryptString(symTagKey, cipherTextBase64)
                .then((plain) => {
                    expect(plain).to.equal(plainText);
                    done();
                })
                .catch(done);
        });

        it('should decrypt nondeterministic encryption properly', (done) => {
            symDecryptString(symCommonKey, commonCipherBase64)
                .then((plain) => {
                    expect(plain).to.equal(plainText);
                    done();
                })
                .catch(done);
        });
    });

    describe('symDecryptObject', () => {
        it('should decrypt deterministic encryption properly', (done) => {
            symDecryptObject(symTagKey, cipherObjectBase64)
                .then((plain) => {
                    expect(plain).to.deep.equal(plainObject);
                    done();
                })
                .catch(done);
        });

        it('should decrypt nondeterministic encryption properly', (done) => {
            symDecryptObject(symCommonKey, commonCipherObjectBase64)
                .then((plain) => {
                    expect(plain).to.deep.equal(plainObject);
                    done();
                })
                .catch(done);
        });
    });
});
