/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
import { expect } from 'chai';

import {
    convertStringToArrayBufferView,
    convertArrayBufferViewToString,

    convertBase64ToArrayBufferView,
    convertArrayBufferViewToBase64,

    convertObjectToArrayBufferView,

    convertBlobToArrayBufferView,

    convertArrayBufferToHexadecimal,
    convertHexadecimalToArrayBuffer,

    mergeUint8Arrays,
} from '../source/utils';

import {
    plainText,
    plainArray,
    plainBase64,
    plainHexadecimal,
    plainObject,
    plainObjectArray,
    plainBlob,
    plainBlobArray,
} from './testResources/crypto';

describe('utils.js', () => {
    describe('convertStringToArrayBufferView', () => {
        it(`should properly convert '${plainText}'`, () => {
            expect(convertStringToArrayBufferView(plainText)).to.deep.equal(plainArray);
        });
    });

    describe('convertArrayBufferViewToString', () => {
        it(`should properly convert ArrayBuffer to '${plainText}'`, () => {
            expect(convertArrayBufferViewToString(plainArray)).to.deep.equal(plainText);
        });
    });

    describe('convertBase64ToArrayBufferView', () => {
        it(`should properly convert base64 to '${plainText}'`, () => {
            expect(convertBase64ToArrayBufferView(plainBase64)).to.deep.equal(plainArray);
        });
    });

    describe('convertArrayBufferViewToBase64', () => {
        it(`should properly convert '${plainText}' to base64`, () => {
            expect(convertArrayBufferViewToBase64(plainArray)).to.deep.equal(plainBase64);
        });
    });

    describe('convertObjectToArrayBufferView', () => {
        it(`should properly convert ${JSON.stringify(plainObject)} to ArrayBuffer`, () => {
            expect(convertObjectToArrayBufferView(plainObject)).to.deep.equal(plainObjectArray);
        });
    });

    describe('convertBlobToArrayBufferView', () => {
        it('should properly convert blob to ArrayBuffer', (done) => {
            convertBlobToArrayBufferView(plainBlob)
                .then((byteArray) => {
                    expect(byteArray).to.deep.equal(plainBlobArray);

                    done();
                })
                .catch(done);
        });
    });

    describe('mergeUint8Arrays', () => {
        it('should merge ArrayBuffers properly', () => {
            const mergedArray = mergeUint8Arrays(plainArray, plainArray);
            expect(convertArrayBufferViewToString(mergedArray)).to.equal(plainText + plainText);
        });
    });

    describe('convertArrayBufferToHexadecimal', () => {
        it('should properly convert ArrayBuffer to hexadecimal', () => {
            expect(convertArrayBufferToHexadecimal(plainArray)).to.deep.equal(plainHexadecimal);
        });
    });

    describe('convertHexadecimalToArrayBuffer', () => {
        it('should properly convert hexadecimal to ArrayBuffer', () => {
            expect(convertHexadecimalToArrayBuffer(plainHexadecimal))
                .to.deep.equal(plainArray.buffer);
        });

        it('should return a TypeError if the input is not a string', () => {
            try {
                convertHexadecimalToArrayBuffer(123);
            } catch (error) {
                expect(error.message).to.eql('Expected input to be a string');
            }
        });

        it('should return a TypeError if the input is not a string', () => {
            try {
                convertHexadecimalToArrayBuffer(plainHexadecimal.substr(1));
            } catch (error) {
                expect(error.message).to.eql('Expected string to be an even number of characters');
            }
        });
    });
});
