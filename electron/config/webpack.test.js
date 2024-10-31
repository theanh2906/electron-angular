'use strict';

const {merge} = require('webpack-merge');

module.exports = function(mainConfig, rendererConfig) {
    return [
        merge(mainConfig, {mode: 'development'}),
        merge(rendererConfig, {mode: 'development'})
    ];
};
