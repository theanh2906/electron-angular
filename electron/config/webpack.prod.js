'use strict';

const { merge } = require('webpack-merge');
const { EsbuildPlugin } = require('esbuild-loader');

module.exports = function (mainConfig, rendererConfig) {
    return [
        merge(mainConfig, {
            mode: 'production',
            cache: false,
            optimization: {
                minimizer: [
                    new EsbuildPlugin ({
                        target: 'es6',
                        css: true
                    }),
                ],
            },
        }),
        merge(rendererConfig, {
            mode: 'production',
            cache: false,
            optimization: {
                minimizer: [
                    new EsbuildPlugin ({
                        target: 'es6',
                        css: true
                    }),
                ],
            },
        })
    ];
};
