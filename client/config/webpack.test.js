'use strict';

const {merge} = require('webpack-merge');

module.exports = function (options) {
    const testConfig = {
        mode: 'development',
        devtool: 'inline-source-map',
        module: {
            noParse: [
                /node_modules\/pngjs/
            ]
        }
    };
    return merge(options, testConfig);
};
