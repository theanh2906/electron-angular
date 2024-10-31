'use strict';

const helpers = require('./helpers');

module.exports = function() {
    return {
        output: {
            path: helpers.root('dist'),
            filename: '[name].js',
        },
        node: {
            __dirname: false,
            __filename: false
        },
        watchOptions: {
            ignored: /node_modules/
        }
    };
};
