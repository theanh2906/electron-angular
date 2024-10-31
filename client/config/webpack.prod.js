'use strict';

const { merge } = require('webpack-merge');
const helpers = require('../../config/helpers');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { EsbuildPlugin } = require('esbuild-loader');

module.exports = function (options) {
    return merge(options, {
        mode: 'production',
        cache: false,
        plugins: [
            // new ForkTsCheckerWebpackPlugin({ async: true }),
            new HtmlWebpackPlugin({
                template: helpers.root('client/src/index.html'),
                inject: 'body'
            }),
        ],
        module: {
            noParse: [
                /node_modules\/pngjs/
            ]
        },
        optimization: {
            minimizer: [
                new EsbuildPlugin ({
                    target: 'es2015',
                    css: true
                }),
            ],
        },
    });
};
