import * as base64js from 'base64-js';
import { b64, hex } from './key';

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

/**
 * converts the bytes to a base64 string
 *
 * @param {Uint8Array} bytes
 * @returns {b64} - the base64 representation of the bytes
 *
 */
const convertArrayBufferViewToBase64 = (bytes: Uint8Array): b64 => base64js.fromByteArray(bytes);

/**
 * converts a base64 string to a Uint8Array
 *
 * @param {b64} base64
 * @returns {Uint8Array} - the bytes of the base64 string
 *
 */
const convertBase64ToArrayBufferView = (value: b64): Uint8Array => base64js.toByteArray(value);

const convertStringToArrayBufferView = (value: string): Uint8Array => textEncoder.encode(value);

const convertObjectToArrayBufferView = (object: Record<string, unknown>): Uint8Array =>
    convertStringToArrayBufferView(JSON.stringify(object));

const convertArrayBufferViewToString = (bytes: Uint8Array): string => textDecoder.decode(bytes);

const convertBlobToArrayBufferView = async (blob: Blob): Promise<Uint8Array> =>
    new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            resolve(new Uint8Array(event.target.result as any)); // TODO check the type mismatch here, remove "any"
        };
        fileReader.readAsArrayBuffer(blob);
    });

const mergeUint8Arrays = (arr1: Uint8Array, arr2: Uint8Array): Uint8Array => {
    const merge = new Uint8Array(arr1.length + arr2.length);
    merge.set(arr1);
    merge.set(arr2, arr1.length);
    return merge;
};

/**
 * converts an ArrayBuffer to a hexadecimal string
 *
 * @param {Uint8Array} buffer
 * @returns {hex} - hexadecimal representation of the ArrayBuffer
 *
 */
const convertArrayBufferToHexadecimal = (buffer: Uint8Array): hex => Array.from(new Uint8Array(buffer))
    .map(x => x.toString(16).padStart(2, '0'))
    .join('');


/**
 * converts a hexadecimal string to an ArrayBuffer
 *
 * @param  {hex} hexadecimal
 * @returns {Uint8Array} the bytes of the hexadecimal string
 *
 */
const convertHexadecimalToArrayBuffer = (hexadecimal: hex): ArrayBuffer => {
    if (typeof hexadecimal !== 'string') {
        throw new TypeError('Expected input to be a string');
    }

    if ((hexadecimal.length % 2) !== 0) {
        throw new RangeError('Expected string to be an even number of characters');
    }

    const output = new Uint8Array(Math.ceil(hexadecimal.length / 2))
        .map((_, i) => parseInt(hexadecimal.substr(i * 2, 2), 16));

    return output.buffer;
};

// this does not affect Chrome-based Edge because its user agent only contains "Edg"
const isEdge = window.navigator.userAgent.indexOf('Edge') > -1;

export {
    convertStringToArrayBufferView,
    convertArrayBufferViewToString,
    convertBase64ToArrayBufferView,
    convertArrayBufferViewToBase64,
    convertArrayBufferToHexadecimal,
    convertHexadecimalToArrayBuffer,
    convertObjectToArrayBufferView,
    convertBlobToArrayBufferView,
    mergeUint8Arrays,
    isEdge,
};
