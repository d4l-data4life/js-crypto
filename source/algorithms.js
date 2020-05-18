const AES_GCM = {
    name: 'AES-GCM',
    length: 256,
};

const AES_CBC = {
    name: 'AES-CBC',
    length: 256,
};

const RSA_OAEP = {
    name: 'RSA-OAEP',
    modulusLength: 2048,
    // 0x010001 = 65537 is a Fermat Prime and a popular choice for the public exponent.
    publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
    hash: { name: 'SHA-256' },
};

export {
    AES_CBC,
    AES_GCM,
    RSA_OAEP,
};
