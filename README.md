# D4L-Crypto-JS

D4L-Crypto-JS is a thin JavaScript-based wrapper around the browsers' native Web-Crypto APIs. By providing small utility functions around established functionality, we reduce the complexity inherent to many cryptographic applications while, crucially, not re-inventing the cryptographic wheel.

## Browser support

As we rely on a complete implementation of the web cryptography specification, only [fully compliant browsers](https://caniuse.com/#feat=cryptography) are supported. This excludes all versions of Internet Explorer.

## Symmetric encryption

The default symmetric encryption that is used is the Advanced Encryption Standard (AES) with a key size of 256 bits. The mode of operation is Galois Counter Mode (GCM).
The key size of 256 bits is the biggest key size for AES and provides quantum computing safe encryption. The GCM mode provides integrity checks and authentication.

It's worth to mentioning, that GCM makes AES a stream cipher and therefore it must not be used with a 0-bit initialization vector (IV / nonce / salt). The IV for GCM needs to be 12 bytes.

### Deterministic Encryption

As AES GCM is a stream cipher, it is better to use AES Cipher Block Chaining mode (CBC) with an empty IV. The IV for CBC needs to be 16 bytes.

### Format support

The symmetric encryption supports:

- ArrayBuffer,
- Strings,
- Objects and
- Blobs.

## Asymmetric encryption

The default asymmetric encryption used is the cipher by Rivest-Shamir-Adleman (RSA) with a key size of 2048 bits, with Optimal Asymmetric Encryption Padding (OAEP).

### Format support

The asymmetric encryption supports:

- ArrayBuffer and
- Strings.

## Hashing

For hashing we are using Secure Hash Algorithm (SHA) output of 512 bits.

## Key

### Key derivation

For Key derivation we use Password-Based Key Derivation Function 2 (PBKD2) with 10,000 iterations. This is used to derive a key from a user's password.

### Key generation

Key generation for asymmetric and symmetric encryption is supported.

### Salt generation

For salt generation, we use 16 bytes of cryptographically secure random numbers.

### Key format

- Symmetric Keys are encoded into base64.
- Private Keys are stored in PKCS8 format.
- Public Keys are stored in SPKI format.

#### PKCS8 example

```
-----BEGIN PRIVATE KEY-----
MIIBVgIBADANBgkqhkiG9w0BAQEFAASCAUAwggE8AgEAAkEAq7BFUpkGp3+LQmlQ
Yx2eqzDV+xeG8kx/sQFV18S5JhzGeIJNA72wSeukEPojtqUyX2J0CciPBh7eqclQ
2zpAswIDAQABAkAgisq4+zRdrzkwH1ITV1vpytnkO/NiHcnePQiOW0VUybPyHoGM
/jf75C5xET7ZQpBe5kx5VHsPZj0CBb3b+wSRAiEA2mPWCBytosIU/ODRfq6EiV04
lt6waE7I2uSPqIC20LcCIQDJQYIHQII+3YaPqyhGgqMexuuuGx+lDKD6/Fu/JwPb
5QIhAKthiYcYKlL9h8bjDsQhZDUACPasjzdsDEdq8inDyLOFAiEAmCr/tZwA3qeA
ZoBzI10DGPIuoKXBd3nk/eBxPkaxlEECIQCNymjsoI7GldtujVnr1qT+3yedLfHK
srDVjIT3LsvTqw==
-----END PRIVATE KEY-----
```

## License

(c) 2021 D4L data4life gGmbH / All rights reserved. Please refer to our [License](./LICENSE) for further details.

## Support and contributing

Due to today's urgency and dynamic nature, **we cannot offer support for this repository**. We'll continue the development internally.

We won't be able to react to issues and/or pull requests, but **we would still encourage you to provide feedback**. We will monitor the appearing problems, new ideas and possible feature requests and might consider them for future releases.
