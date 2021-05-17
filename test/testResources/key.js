// KEY
const masterKeyPhrase = 'Hęłlø črüėl wōrlđ';
const masterKeyArray = new Uint8Array([72, 196, 153, 197, 130, 108, 195, 184, 32, 196, 141, 114,
    195, 188, 196, 151, 108, 32, 119, 197, 141, 114, 108, 196, 145]);
const defaultMasterKey = {
    t: 'pk',
    v: 1,
    sym: 'By+2DGaiPLZ+ou4c+9qMoZW7h0ceEBetavR6+BtjoQk=',
};
const IV = new ArrayBuffer([0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7]);
const masterKey = {
    t: 'pk',
    v: 1,
    sym: 'nlBTQFK5rgG3YviH1xXckALC77mZ5IPe+FEGSIBF8KI=',
};

const symMainKey = {
    t: 'mk',
    v: 1,
    sym: '498f0615b8a30b14da0bac84b52d41655fcc6876f20f0929e6cef74d4ce63082',
};
const symMainCryptoKey = {
    type: 'secret',
    extractable: false,
    algorithm: { name: 'AES-GCM', length: 256 },
    usages: ['encrypt', 'decrypt'],
};

const symCommonKey = {
    t: 'ck',
    v: 1,
    sym: '6fPqfut/1wnu3JXClAFNXWE4iojvktihfUKiGV8x4yk=',
};
const symCommonCryptoKey = {
    type: 'secret',
    extractable: false,
    algorithm: { name: 'AES-GCM', length: 256 },
    usages: ['encrypt', 'decrypt'],
};
const symCommonKeyJWK = {
    alg: 'A256GCM',
    ext: true,
    k: '6fPqfut_1wnu3JXClAFNXWE4iojvktihfUKiGV8x4yk',
    key_ops: ['encrypt', 'decrypt'],
    kty: 'oct',
};

const symTagKey = {
    t: 'tek',
    v: 1,
    sym: 'JK8SjBCNtT8bxLBqt/ut0CKQTRimBc+ydIF5D1L3cTU=',
};
const symTagCryptoKey = {
    type: 'secret',
    extractable: false,
    algorithm: { name: 'AES-CBC', length: 256 },
    usages: ['encrypt', 'decrypt'],
};
const symTagKeyJWK = {
    alg: 'A256CBC',
    ext: true,
    k: 'JK8SjBCNtT8bxLBqt_ut0CKQTRimBc-ydIF5D1L3cTU',
    key_ops: ['encrypt', 'decrypt'],
    kty: 'oct',
};

const asymUserPrivateKey = {
    t: 'upriv',
    v: 1,
    priv: 'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCS0hxi9mY2YhDafkWqeoluLuoFxq1howJURLRUEdvjmZ7FrezQNqCcTNRtzUw1jN4MZ6Y7aN7ZzZfprFfL5sRNGShmHLwxi/19IyXrIVwwVDZhE2LsNWhO5f8QkPJUor191CZTrNh2a/75o+H6QxJfZMGZnYauCeoSyk3pS61Kcj1VFSDK+x57nKturHWJ0/vGitCCGz4yf6cFnX/xV56gICi7MNzxUzbL75gLAsYeQl/lzq5BxFkC0mR8mD9Se31qO8q7h4ITTWsazAIwusMsg5SaFWbcEcoxNlkqauN25KW1dR1WyNrtZxKA6QhMV609lAwKQmTkqwjI5a2SFo7jAgMBAAECggEANynRd49LfRBgc69w3mo225qt2+i3eRFFjULZHCMvona0FGLSMLLtqnwlbnHtucsJHNEOwJCY9m2ML8RMonQ8ehlDOAaA4P7PiaZcl1kL6a6iVdvyVXyFietZZ7CGFC2nE7FTiynMlMXj4YjlHWH487WIFf79PMPF2jR/jHGeFPOAWUb+YjpwQ6XfKkS2OrzrCkGu5VrhoOBRkimBqFNZNijJeH7HOjAg8IlUCWFkx42hrVIX+XzoFFYYlwb+B3GWwsG9lYGvc93xsq5eYJRwcFULB5IPQJq8zQsQpauUljzDJTCkWwbFEqR2ElAcRiVL9V3PtU4U0Yphpi2Fo5hzZQKBgQDMnWsQKY6ODuwRwGuGQBm4EjPyA2iC9v+CQdm086Svbw81Xu5eN9Ypg0KpR0wdWlgJ62LWa496YMUSmsUSDdFR0Ig4pU3OpoKMryG2EGmDOGmccPHq85wIRwCjrqQTgvYhg++wUK2M7KNoZPLzPWivKQEBUclD0vVkIu1l4Iq3VwKBgQC3sSMMVvSNKL3bnpZZCDT07C/5VVEiO9lyDZMQ6jc5ouCkP/vSbtO2ELk8e16j4812UTbX8JrKsJr7+/9XRA4oP8VlsN3NAVRQ6ASXS0MoNcrZAuoovoE11XBX9sFbTM2cyXrOKENnOy6rQqkdk16b6Law4fKAr2hqWqfBW7NpVQKBgBnMUz5jbvTcTsliMGxp0pRRvzjpUxkIGWkL8m4NNhtkbk91W6qHcbokMZh0Q9WDmYwOoJSWVS3B27cfym8fTN/64eH6fZfriJRCVIbHBPalezNdTjMoaejlQuBgWZGYNn49S1A4q9kT0PqNl9AxUuyax+Spsi2aAJSSjsoEiJjbAoGAC/wuwTtbMWqbGJ08SgrTCbfvWWFLreQhx+NC2TOu7r/F0HGsSIqanaJxs5SJFEBkw3eBEI3OS7NCKXbDrjnugonGo1/q2NlhWvYIdqaedx0rYwVhqc7kN1L5xYOAEijssXIj5ReTbkTaQqpSxm87GQkSAnB7lhHbyjSoBWGqTxECgYBEmzIXyAQU9RlwfJjsTUdSc+ONsL2rttQZFrhqmEkKCqEuJ5yhCFDR7oeSk9BrPCloyCfuKcJ9tPuJIojDfVUTyQNXeDU/PAPc+BjvYGienuVlSyjzllBn5OEEDyS5TPJZb/8ZRMYCwLxmzLYx1HHX2zR5eJr8zycjzoix8+KcMA==',
};
const asymUserPublicKey = {
    t: 'upub',
    v: 1,
    pub: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAktIcYvZmNmIQ2n5FqnqJbi7qBcatYaMCVES0VBHb45mexa3s0DagnEzUbc1MNYzeDGemO2je2c2X6axXy+bETRkoZhy8MYv9fSMl6yFcMFQ2YRNi7DVoTuX/EJDyVKK9fdQmU6zYdmv++aPh+kMSX2TBmZ2GrgnqEspN6UutSnI9VRUgyvsee5yrbqx1idP7xorQghs+Mn+nBZ1/8VeeoCAouzDc8VM2y++YCwLGHkJf5c6uQcRZAtJkfJg/Unt9ajvKu4eCE01rGswCMLrDLIOUmhVm3BHKMTZZKmrjduSltXUdVsja7WcSgOkITFetPZQMCkJk5KsIyOWtkhaO4wIDAQAB',
};
const asymPrivateCryptoKey = {
    type: 'private',
    extractable: false, // Shouldn't be extractable after import!
    algorithm: {
        name: 'RSA-OAEP',
        hash: { name: 'SHA-256' },
        modulusLength: 2048,
        publicExponent: { 0: 1, 1: 0, 2: 1 },
    },
    usages: ['decrypt'],
};
const asymPublicCryptoKey = {
    type: 'public',
    extractable: true,
    algorithm: {
        name: 'RSA-OAEP',
        hash: { name: 'SHA-256' },
        modulusLength: 2048,
        publicExponent: { 0: 1, 1: 0, 2: 1 },
    },
    usages: ['encrypt'],
};
const asymPrivateJWK = {
    alg: 'RSA-OAEP-256',
    d: 'NynRd49LfRBgc69w3mo225qt2-i3eRFFjULZHCMvona0FGLSMLLtqnwlbnHtucsJHNEOwJCY9m2ML8RMonQ8ehlDOAaA4P7PiaZcl1kL6a6iVdvyVXyFietZZ7CGFC2nE7FTiynMlMXj4YjlHWH487WIFf79PMPF2jR_jHGeFPOAWUb-YjpwQ6XfKkS2OrzrCkGu5VrhoOBRkimBqFNZNijJeH7HOjAg8IlUCWFkx42hrVIX-XzoFFYYlwb-B3GWwsG9lYGvc93xsq5eYJRwcFULB5IPQJq8zQsQpauUljzDJTCkWwbFEqR2ElAcRiVL9V3PtU4U0Yphpi2Fo5hzZQ',
    dp: 'GcxTPmNu9NxOyWIwbGnSlFG_OOlTGQgZaQvybg02G2RuT3VbqodxuiQxmHRD1YOZjA6glJZVLcHbtx_Kbx9M3_rh4fp9l-uIlEJUhscE9qV7M11OMyhp6OVC4GBZkZg2fj1LUDir2RPQ-o2X0DFS7JrH5KmyLZoAlJKOygSImNs',
    dq: 'C_wuwTtbMWqbGJ08SgrTCbfvWWFLreQhx-NC2TOu7r_F0HGsSIqanaJxs5SJFEBkw3eBEI3OS7NCKXbDrjnugonGo1_q2NlhWvYIdqaedx0rYwVhqc7kN1L5xYOAEijssXIj5ReTbkTaQqpSxm87GQkSAnB7lhHbyjSoBWGqTxE',
    e: 'AQAB',
    ext: true,
    key_ops: ['decrypt'],
    kty: 'RSA',
    n: 'ktIcYvZmNmIQ2n5FqnqJbi7qBcatYaMCVES0VBHb45mexa3s0DagnEzUbc1MNYzeDGemO2je2c2X6axXy-bETRkoZhy8MYv9fSMl6yFcMFQ2YRNi7DVoTuX_EJDyVKK9fdQmU6zYdmv--aPh-kMSX2TBmZ2GrgnqEspN6UutSnI9VRUgyvsee5yrbqx1idP7xorQghs-Mn-nBZ1_8VeeoCAouzDc8VM2y--YCwLGHkJf5c6uQcRZAtJkfJg_Unt9ajvKu4eCE01rGswCMLrDLIOUmhVm3BHKMTZZKmrjduSltXUdVsja7WcSgOkITFetPZQMCkJk5KsIyOWtkhaO4w',
    p: 'zJ1rECmOjg7sEcBrhkAZuBIz8gNogvb_gkHZtPOkr28PNV7uXjfWKYNCqUdMHVpYCeti1muPemDFEprFEg3RUdCIOKVNzqaCjK8hthBpgzhpnHDx6vOcCEcAo66kE4L2IYPvsFCtjOyjaGTy8z1orykBAVHJQ9L1ZCLtZeCKt1c',
    q: 't7EjDFb0jSi9256WWQg09Owv-VVRIjvZcg2TEOo3OaLgpD_70m7TthC5PHteo-PNdlE21_CayrCa-_v_V0QOKD_FZbDdzQFUUOgEl0tDKDXK2QLqKL6BNdVwV_bBW0zNnMl6zihDZzsuq0KpHZNem-i2sOHygK9oalqnwVuzaVU',
    qi: 'RJsyF8gEFPUZcHyY7E1HUnPjjbC9q7bUGRa4aphJCgqhLiecoQhQ0e6HkpPQazwpaMgn7inCfbT7iSKIw31VE8kDV3g1PzwD3PgY72Bonp7lZUso85ZQZ-ThBA8kuUzyWW__GUTGAsC8Zsy2MdRx19s0eXia_M8nI86IsfPinDA',
};
const asymPublicJWK = {
    alg: 'RSA-OAEP-256',
    e: 'AQAB',
    ext: true,
    key_ops: ['encrypt'],
    kty: 'RSA',
    n: 'ktIcYvZmNmIQ2n5FqnqJbi7qBcatYaMCVES0VBHb45mexa3s0DagnEzUbc1MNYzeDGemO2je2c2X6axXy-bETRkoZhy8MYv9fSMl6yFcMFQ2YRNi7DVoTuX_EJDyVKK9fdQmU6zYdmv--aPh-kMSX2TBmZ2GrgnqEspN6UutSnI9VRUgyvsee5yrbqx1idP7xorQghs-Mn-nBZ1_8VeeoCAouzDc8VM2y--YCwLGHkJf5c6uQcRZAtJkfJg_Unt9ajvKu4eCE01rGswCMLrDLIOUmhVm3BHKMTZZKmrjduSltXUdVsja7WcSgOkITFetPZQMCkJk5KsIyOWtkhaO4w',
};


export {
    masterKeyPhrase,
    masterKeyArray,
    defaultMasterKey,
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
};
