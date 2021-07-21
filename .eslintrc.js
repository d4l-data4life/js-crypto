module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
    },
    plugins: [
        'import',
        '@typescript-eslint'
    ],
    rules: {},
    settings: {
        'import/resolver': {
            configurable: {
                config: './src/config/index',
            },
        },
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    globals: {
        zkit_sdk: true,
        NODE: true,
        __karma__: true,
        VERSION: true,
        DATA_MODEL_VERSION: true,
    },
};
