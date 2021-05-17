import base64js from 'base64-js';

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

/**
 * converts the bytes to a base64 string
 *
 * @param {Uint8Array} bytes
 * @returns {String} - the base64 representation of the bytes
 *
 */
const convertArrayBufferViewToBase64 = base64js.fromByteArray;

/**
 * converts a base64 string to a Uint8Array
 *
 * @param {String} base64
 * @returns {Uint8Array} - the bytes of the base64 string
 *
 */
const convertBase64ToArrayBufferView = base64js.toByteArray;

const convertStringToArrayBufferView = textEncoder.encode.bind(textEncoder);

const convertObjectToArrayBufferView = object =>
    convertStringToArrayBufferView(JSON.stringify(object));

const convertArrayBufferViewToString = textDecoder.decode.bind(textDecoder);

const convertBlobToArrayBufferView = blob =>
    new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            resolve(new Uint8Array(event.target.result));
        };
        fileReader.readAsArrayBuffer(blob);
    });

const mergeUint8Arrays = (arr1, arr2) => {
    const merge = new Uint8Array(arr1.length + arr2.length);
    merge.set(arr1);
    merge.set(arr2, arr1.length);
    return merge;
};

/**
 * converts an ArrayBuffer to a hexadecimal string
 *
 * @param {ArrayBuffer} buffer
 * @returns {String} - hexadecimal representation of the ArrayBuffer
 *
 */
const convertArrayBufferToHexadecimal = buffer => Array.from(new Uint8Array(buffer))
    .map(x => x.toString(16).padStart(2, '0'))
    .join('');


/**
 * converts a hexadecimal string to an ArrayBuffer
 *
 * @param {String} hexadecimal
 * @returns {Uint8Array} - the bytes of the hexadecimal string
 *
 */
const convertHexadecimalToArrayBuffer = (hexadecimal) => {
    if (typeof hexadecimal !== 'string') {
        throw new TypeError('Expected input to be a string');
    }

    if ((hexadecimal.length % 2) !== 0) {
        throw new RangeError('Expected string to be an even number of characters');
    }

    const output = new Uint8Array(Math.ceil(hexadecimal.length / 2))
        .map((x, i) => parseInt(hexadecimal.substr(i * 2, 2), 16));

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
