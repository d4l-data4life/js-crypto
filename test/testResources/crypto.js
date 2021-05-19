const plainText = 'Hęłlø črüėl wōrlđ';
const plainArray = new Uint8Array([72, 196, 153, 197, 130, 108, 195, 184, 32, 196, 141, 114, 195,
    188, 196, 151, 108, 32, 119, 197, 141, 114, 108, 196, 145]);
const plainBase64 = 'SMSZxYJsw7ggxI1yw7zEl2wgd8WNcmzEkQ==';
const plainHexadecimal = '48c499c5826cc3b820c48d72c3bcc4976c2077c58d726cc491';

// plainText encrypted with tagEncryptionKey
const cipherTextArray = new Uint8Array([171, 91, 91, 132, 110, 103, 148, 58, 71, 118, 97, 228, 246,
    117, 244, 172, 12, 101, 17, 95, 235, 172, 43, 145, 180, 242, 74, 177, 175, 231, 220, 150]);
const cipherTextBase64 = 'q1tbhG5nlDpHdmHk9nX0rAxlEV/rrCuRtPJKsa/n3JY=';

// plainText encrypted with commonKey
const commonCipherArray = new Uint8Array([177, 241, 45, 105, 235, 186, 111, 193, 97, 22, 177, 196,
    213, 224, 227, 189, 194, 122, 194, 20, 85, 123, 66, 240, 147, 143, 109, 128, 31, 41, 197, 178,
    76, 103, 126, 107, 153, 191, 199, 218, 222, 248, 176, 39, 195, 69, 69, 30, 166, 104, 3, 82,
    120]);
const commonCipherBase64 = 'sfEtaeu6b8FhFrHE1eDjvcJ6whRVe0Lwk49tgB8pxbJMZ35rmb/H2t74sCfDRUUepmgDUng=';

// plainText encrypted with asymUserPublicKey
const asymCipherArray = new Uint8Array([42, 71, 150, 129, 208, 92, 63, 219, 183, 9, 132, 61, 201,
    5, 228, 51, 72, 160, 2, 227, 14, 215, 77, 211, 164, 123, 92, 114, 74, 180, 115, 217, 99, 47,
    37, 202, 201, 46, 22, 8, 229, 150, 204, 152, 140, 165, 156, 6, 76, 49, 118, 159, 243, 141, 42,
    26, 152, 131, 172, 47, 211, 236, 217, 190, 72, 52, 201, 247, 155, 49, 57, 252, 71, 162, 250,
    212, 122, 177, 254, 17, 9, 224, 69, 160, 49, 249, 207, 103, 12, 218, 72, 192, 160, 60, 149, 59,
    240, 23, 72, 252, 12, 243, 100, 239, 128, 138, 144, 20, 204, 46, 242, 20, 24, 206, 34, 208, 98,
    84, 222, 250, 204, 51, 189, 56, 179, 56, 177, 145, 105, 240, 137, 176, 163, 63, 80, 212, 237,
    226, 37, 55, 104, 105, 117, 144, 187, 161, 98, 20, 59, 128, 111, 112, 240, 26, 18, 89, 190,
    255, 51, 162, 185, 227, 46, 142, 230, 105, 176, 3, 197, 119, 36, 97, 183, 60, 232, 53, 16, 100,
    78, 209, 124, 44, 132, 79, 39, 108, 174, 162, 255, 181, 167, 240, 15, 53, 251, 33, 68, 123, 55,
    190, 2, 70, 89, 55, 37, 127, 164, 126, 213, 147, 217, 231, 216, 144, 182, 153, 61, 235, 88,
    176, 65, 1, 179, 38, 250, 172, 243, 15, 203, 62, 198, 58, 142, 161, 203, 226, 113, 230, 154,
    92, 247, 13, 8, 6, 76, 197, 162, 122, 217, 20, 199, 42, 165, 45, 34, 243]);
const asymCipherBase64 = 'KkeWgdBcP9u3CYQ9yQXkM0igAuMO103TpHtcckq0c9ljLyXKyS4WCOWWzJiMpZwGTDF2n/ONKhqYg6wv0+zZvkg0yfebMTn8R6L61Hqx/hEJ4EWgMfnPZwzaSMCgPJU78BdI/AzzZO+AipAUzC7yFBjOItBiVN76zDO9OLM4sZFp8Imwoz9Q1O3iJTdoaXWQu6FiFDuAb3DwGhJZvv8zornjLo7mabADxXckYbc86DUQZE7RfCyETydsrqL/tafwDzX7IUR7N74CRlk3JX+kftWT2efYkLaZPetYsEEBsyb6rPMPyz7GOo6hy+Jx5ppc9w0IBkzFonrZFMcqpS0i8w==';

const plainObject = { plainText };
const plainObjectArray = new Uint8Array([123, 34, 112, 108, 97, 105, 110, 84, 101, 120, 116, 34,
    58, 34, 72, 196, 153, 197, 130, 108, 195, 184, 32, 196, 141, 114, 195, 188, 196, 151, 108, 32,
    119, 197, 141, 114, 108, 196, 145, 34, 125]);

// plainObject encrypted with tagEncryptionKey
const cipherObjectBase64 = 'yTDjX4kxEXahVelDGU4IvIT+vPmY9tHWEnFZMZRMRlv7ds3nKP9wgGfT9a5yA9E3';
// plainObject encrypted with commonKey
const commonCipherObjectBase64 = '4W8dp9DRPEFufpXvJx9/2dUu6G4VSh0vSq2QgrbBJQ/iq7EnNKeZU075B40I0f+YfDP0jR3Y5QRAOOucMW8CEtJtAplk';

const plainBlob = new Blob([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9]);
const plainBlobArray = new Uint8Array([51, 49, 52, 49, 53, 57, 50, 54, 53, 51, 53, 56, 57, 55, 57]);
// plainBlob encrypted with tagEncryptionKey
const cipherBlobArray = new Uint8Array([117, 189, 43, 51, 209, 83, 136, 141, 117, 198, 145, 19,
    145, 233, 166, 220]);

export {
    plainText,
    plainArray,
    plainBase64,
    plainHexadecimal,
    cipherTextArray,
    cipherTextBase64,
    plainObject,
    plainObjectArray,
    cipherObjectBase64,
    plainBlob,
    plainBlobArray,
    cipherBlobArray,
    commonCipherArray,
    commonCipherBase64,
    commonCipherObjectBase64,
    asymCipherArray,
    asymCipherBase64,
};
