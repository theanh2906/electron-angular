"use strict";

const { merge } = require("webpack-merge");
const helpers = require("../../config/helpers");
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function (options) {
  return merge(options, {
    mode: "development",
    devtool: "source-map",
    cache: {
      type: "filesystem",
    },
    plugins: [
      // new ForkTsCheckerWebpackPlugin({ async: true }),
      new HtmlWebpackPlugin({
        template: helpers.root("client/src/index.ejs"),
        inject: "body",
      }),
    ],
    module: {
      noParse: [/node_modules\/pngjs/],
    },
    devServer: {
      devMiddleware: {
        writeToDisk: true,
      },
      client: {
        overlay: true,
        reconnect: true,
      },
      historyApiFallback: true,
      port: 8765,
      hot: false,
      liveReload: true,
      watchFiles: [helpers.root("client/src/app/**/*")],
      static: {
        directory: helpers.root("dist"),
      },
    },
  });
};
