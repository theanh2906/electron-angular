'use strict';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');
const helpers = require('./helper/helpers.js');
const commonConfig = require('./helper/webpack.common.js')();

const config = merge(commonConfig, {
    context: __dirname,
    resolve: {
        modules: [
            helpers.root('src'),
            helpers.root('node_modules'),
        ],
        extensions: ['.ts', '.js', '.json', '.node', '.txt', '.lib', '.node'],
        symlinks: false
    },
    module: {
        rules: [{
            test: /\.ts$/,
            include: helpers.root('src'),
            use: [{
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
            }]
        }]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{ from: helpers.root('package.json') }]
        }),
    ]
});

const mainConfig = merge(config, {
    entry: {
        main: helpers.root('src', 'main', 'main.ts')
    },
    target: 'electron-main'
});

const rendererConfig = merge(config, {
    entry: {
        renderer: helpers.root('src', 'renderer', 'renderer.ts')
    },
    target: 'electron-renderer',
    output: {
        path: helpers.root('dist'),
        filename: 'renderer.js',
        umdNamedDefine: true,
        library: 'renderer',
        libraryTarget: 'umd'
    }
});

switch (process.env.NODE_ENV) {
    case 'prod':
    case 'production':
        module.exports = require('./config/webpack.prod')(mainConfig, rendererConfig);
        break;
    case 'dev':
    case 'development':
    default:
        module.exports = require('./config/webpack.dev')(mainConfig, rendererConfig);
}
