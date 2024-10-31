'use strict';

const {merge} = require('webpack-merge');

module.exports = function (mainConfig, rendererConfig) {
    return [
        merge(mainConfig, {
            mode: 'development',
            cache: {
                type: 'filesystem',
            },
        }),
        merge(rendererConfig, {
            mode: 'development',
            cache: {
                type: 'filesystem',
            },
        })
    ];
};