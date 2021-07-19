/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
import { expect } from 'chai';

import {
    // KEY
    deriveKey,
    generateAsymKeyPair,
    generateSymKey,
    importKey,
    exportKey,
    D4LKeyTypes,

    algorithms,
} from '../source/index';

import {
    defaultMasterKey,
    masterKeyArray,
    IV,
    masterKey,
    symMainKey,
    symMainCryptoKey,
    symCommonKey,
    symCommonCryptoKey,
    symCommonKeyJWK,
    symTagKey,
    symTagCryptoKey,
    symTagKeyJWK,
    asymUserPrivateKey,
    asymUserPublicKey,
    asymPrivateCryptoKey,
    asymPublicCryptoKey,
    asymPrivateJWK,
    asymPublicJWK,
} from './testResources/key';

describe('key.js', () => {
    describe('deriveKey', () => {
        it('should derive a symmetric GC Key in a deterministic way', (done) => {
            deriveKey(masterKeyArray)
                .then((derivedKey) => {
                    expect(derivedKey).to.deep.equal(defaultMasterKey);
                    done();
                })
                .catch(done);
        });

        it('should use an empty IV and AES_GCM as default', (done) => {
            Promise.all([
                deriveKey(masterKeyArray),
                deriveKey(masterKeyArray, new Uint8Array(16), algorithms.AES_GCM),
            ])
                .then(([defaultDerivedKey, derivedKey]) => {
                    expect(defaultDerivedKey).to.deep.equal(derivedKey);
                    done();
                })
                .catch(done);
        });

        it('should derive a different key when IV is set', (done) => {
            deriveKey(masterKeyArray, IV)
                .then((derivedKey) => {
                    expect(derivedKey).to.deep.equal(masterKey);
                    expect(deriveKey).not.to.deep.equal(defaultMasterKey);
                    done();
                })
                .catch(done);
        });
    });

    describe('generateAsymKeyPair', () => {
        it('should generate a keypair in the GC key format', (done) => {
            generateAsymKeyPair(D4LKeyTypes.USER)
                .then(({ publicKey, privateKey }) => {
                    expect(Object.keys(publicKey)).to.deep.equal(['t', 'v', 'pub']);
                    expect(publicKey.t).to.equal('upub');

                    expect(Object.keys(privateKey)).to.deep.equal(['t', 'v', 'priv']);
                    expect(privateKey.t).to.equal('upriv');
                    done();
                })
                .catch(done);
        });

        it('should behave non deterministically', (done) => {
            Promise.all([
                generateAsymKeyPair(D4LKeyTypes.USER),
                generateAsymKeyPair(D4LKeyTypes.USER),
            ])
                .then((keyPairs) => {
                    expect(keyPairs[0]).not.to.deep.equal(keyPairs[1]);

                    done();
                })
                .catch(done);
        });
    });

    describe('generateSymKey', () => {
        it('should generate a key in the GC key format', (done) => {
            generateSymKey(D4LKeyTypes.COMMON_KEY)
                .then((key) => {
                    expect(Object.keys(key)).to.deep.equal(['t', 'v', 'sym']);
                    done();
                })
                .catch(done);
        });

        it('should behave non deterministically', (done) => {
            Promise.all([
                generateSymKey(D4LKeyTypes.COMMON_KEY),
                generateSymKey(D4LKeyTypes.COMMON_KEY),
            ])
                .then((keys) => {
                    expect(keys[0]).not.to.deep.equal(keys[1]);

                    done();
                })
                .catch(done);
        });

        it('should generate a key in the GC key format using AES-CBC', (done) => {
            generateSymKey(D4LKeyTypes.TAG_ENCRYPTION_KEY, algorithms.AES_CBC)
                .then((key) => {
                    expect(Object.keys(key)).to.deep.equal(['t', 'v', 'sym']);
                    done();
                })
                .catch(done);
        });
    });

    describe('importKey', () => {
        it('is able to import a commonKey (sym, AES-GCM)', (done) => {
            importKey(symCommonKey)
                .then((cryptoKey) => {
                    expect(cryptoKey.type).to.equal(symCommonCryptoKey.type);
                    expect(cryptoKey.extractable).to.equal(symCommonCryptoKey.extractable);
                    expect(cryptoKey.algorithm).to.deep.equal(symCommonCryptoKey.algorithm);
                    expect(cryptoKey.usages).to.deep.equal(symCommonCryptoKey.usages);
                    done();
                })
                .catch(done);
        });

        it('is able to import a tagEncryptionKey (sym, AES-CBC)', (done) => {
            importKey(symTagKey)
                .then((cryptoKey) => {
                    expect(cryptoKey.type).to.equal(symTagCryptoKey.type);
                    expect(cryptoKey.extractable).to.equal(symTagCryptoKey.extractable);
                    expect(cryptoKey.algorithm).to.deep.equal(symTagCryptoKey.algorithm);
                    expect(cryptoKey.usages).to.deep.equal(symTagCryptoKey.usages);

                    done();
                })
                .catch(done);
        });

        it('is able to import a public userKey (asym)', (done) => {
            importKey(asymUserPublicKey)
                .then((cryptoKey) => {
                    expect(cryptoKey.type).to.equal(asymPublicCryptoKey.type);
                    expect(cryptoKey.extractable).to.equal(asymPublicCryptoKey.extractable);
                    expect(JSON.stringify(cryptoKey.algorithm))
                        .to.deep.equal(JSON.stringify(asymPublicCryptoKey.algorithm));
                    expect(cryptoKey.usages).to.deep.equal(asymPublicCryptoKey.usages);
                    done();
                })
                .catch(done);
        });

        it('is able to import a private userKey (asym)', (done) => {
            importKey(asymUserPrivateKey)
                .then((cryptoKey) => {
                    expect(cryptoKey.type).to.equal(asymPrivateCryptoKey.type);
                    expect(cryptoKey.extractable).to.equal(asymPrivateCryptoKey.extractable);
                    expect(JSON.stringify(cryptoKey.algorithm))
                        .to.deep.equal(JSON.stringify(asymPrivateCryptoKey.algorithm));
                    expect(cryptoKey.usages).to.deep.equal(asymPrivateCryptoKey.usages);

                    done();
                })
                .catch(done);
        });

        it('is able to import a main key (sym, AES-GCM)', (done) => {
            importKey(symMainKey)
                .then((cryptoKey) => {
                    expect(cryptoKey.type).to.equal(symMainCryptoKey.type);
                    expect(cryptoKey.extractable).to.equal(symMainCryptoKey.extractable);
                    expect(cryptoKey.algorithm).to.deep.equal(symMainCryptoKey.algorithm);
                    expect(cryptoKey.usages).to.deep.equal(symMainCryptoKey.usages);

                    done();
                })
                .catch(done);
        });
    });

    describe('exportKey', () => {
        it('is able to export a commonKey (sym, AES-GCM)', (done) => {
            crypto.subtle.importKey('jwk', symCommonKeyJWK, algorithms.AES_GCM, true, ['encrypt', 'decrypt'])
                .then(cryptoKey => exportKey(cryptoKey, D4LKeyTypes.COMMON_KEY))
                .then((GCKey) => {
                    expect(GCKey).to.deep.equal(symCommonKey);

                    done();
                })
                .catch(done);
        });

        it('is able to import a tagEncryptionKey (sym, AES-CBC)', (done) => {
            crypto.subtle.importKey('jwk', symTagKeyJWK, algorithms.AES_CBC, true, ['encrypt', 'decrypt'])
                .then(cryptoKey => exportKey(cryptoKey, D4LKeyTypes.TAG_ENCRYPTION_KEY))
                .then((GCKey) => {
                    expect(GCKey).to.deep.equal(symTagKey);

                    done();
                })
                .catch(done);
        });

        it('is able to import a public userKey (asym)', (done) => {
            crypto.subtle.importKey('jwk', asymPublicJWK, algorithms.RSA_OAEP, true, ['encrypt'])
                .then(cryptoKey => exportKey(cryptoKey, D4LKeyTypes.USER.PUBLIC_KEY))
                .then((GCKey) => {
                    expect(GCKey).to.deep.equal(asymUserPublicKey);
                    done();
                })
                .catch(done);
        });

        it('is able to export a private userKey (asym)', (done) => {
            crypto.subtle.importKey('jwk', asymPrivateJWK, algorithms.RSA_OAEP, true, ['decrypt'])
                .then(cryptoKey => exportKey(cryptoKey, D4LKeyTypes.USER.PRIVATE_KEY))
                .then((GCKey) => {
                    expect(GCKey).to.deep.equal(asymUserPrivateKey);
                    done();
                })
                .catch(done);
        });
    });
});
