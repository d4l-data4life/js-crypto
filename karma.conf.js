// Karma configuration
// Generated on Thu Aug 03 2017 11:17:07 GMT+0200 (CEST)

module.exports = function (config) {
    const configuration = {

        // list of files / patterns to load in the browser
        files: [
            'source/**/*.ts',
            'test/**/*.ts',
        ],

        preprocessors: {
            'source/**/*.ts': ['karma-typescript'],
            'test/**/*.ts': ['karma-typescript'],
        },

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [
            'mocha',
            'chai',
            'browserify',
            'karma-typescript'
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha', 'coverage'],

        coverageReporter: {
            reporters: [{ type: 'lcov' }],
        },

        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox'],
            },
        },

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['ChromeHeadless'],
    };

    config.set(configuration);
};
