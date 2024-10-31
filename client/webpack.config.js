'use strict';

const { merge } = require('webpack-merge');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const helpers = require('../config/helpers');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const commonConfig = require('../config/webpack.common.js')();
const path = require('path');

const ENV = process.env.NODE_ENV;
const THEME = process.env.THEME || 'default.scss';

const config =  merge(commonConfig, 
    {
        context: __dirname,
        entry: {
            vendor: helpers.root('client/src/vendor.browser.ts'),
            app: helpers.root('client/src/app.browser.ts')
        },
        resolve: {
            modules: [
                helpers.root('client/node_modules'),
                helpers.root('client/src'),
                helpers.root('dist'),
            helpers.root('client/src/app/styles')
            ],
            extensions: ['.ts', '.js', '.scss', '.css', '.json'],
            symlinks: false
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    type: 'asset/source',
                    include: helpers.root('client/src'),
                    use: [
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    includePaths: [helpers.root('client/src/app/styles')]
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.ts$/,
                    include: helpers.root('client/src'),
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                            }
                        },
                        {
                            loader: path.resolve(__dirname, 'custom_loaders', 'template-loader.js')
                        }
                    ]
                },
                {
                    test: /\.ejs$/,
                    include: helpers.root('client/src'),
                    use: [{
                        loader: 'ejs-loader',
                        options: {
                            esModule: false
                        }
                    }]
                },
                {
                    test: /\.html$/,
                    include: helpers.root('client/src'),
                    type: 'asset/source'
                },
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: 'javascript/auto'
                }
            ]
        },
        plugins: [
            new CopyWebpackPlugin(
                {
                    patterns: [
                        { from: helpers.root('client/assets'), to: helpers.root('dist/assets') }
                    ]
                }
            )
        ],
        target: 'electron-renderer'
    }
)

switch (ENV) {
    case 'prod':
    case 'production':
        module.exports = require('./config/webpack.prod')(config);
        break;
    case 'test':
    case 'testing':
        module.exports = require('./config/webpack.test')(config);
        break;
    case 'dev':
    case 'development':
    default:
        module.exports = require('./config/webpack.dev')(config);
}
