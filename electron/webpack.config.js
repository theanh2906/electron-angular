"use strict";

const CopyWebpackPlugin = require("copy-webpack-plugin");
const { merge } = require("webpack-merge");
const helpers = require("../config/helpers");
const commonConfig = require("../config/webpack.common.js")();
const DefinePlugin = require("webpack/lib/DefinePlugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const path = require("path");

const config = merge(commonConfig, {
  context: __dirname,
  resolve: {
    modules: [
      helpers.root("electron"),
      helpers.root("electron/node_modules"),
      // helpers.root("electron/build/Release"),
    ],
    extensions: [".ts", ".js", ".json", ".node", ".txt", ".lib", ".node"],
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: helpers.root("electron/src"),
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      "process.env.__webpack__dirname": JSON.stringify(helpers.root()),
    }),
    // new ForkTsCheckerWebpackPlugin({ async: true }),
    new CopyWebpackPlugin({
      patterns: [{ from: helpers.root("electron/package.json") }],
    }),
  ],
});

const mainConfig = merge(config, {
  entry: {
    main: helpers.root("electron/src/main/main.ts"),
  },
  target: "electron-main",
});

const rendererConfig = merge(config, {
  entry: {
    renderer: helpers.root("electron/src/renderer/renderer.ts"),
  },
  target: "electron-renderer",
  output: {
    path: helpers.root("dist"),
    filename: "renderer.js",
    umdNamedDefine: true,
    library: "renderer",
    libraryTarget: "umd",
  },
});

switch (process.env.NODE_ENV) {
  case "prod":
  case "production":
    module.exports = require("./config/webpack.prod")(
      mainConfig,
      rendererConfig,
    );
    break;
  case "test":
  case "testing":
    module.exports = require("./config/webpack.test")(
      mainConfig,
      rendererConfig,
    );
    break;
  case "dev":
  case "development":
  default:
    module.exports = require("./config/webpack.dev")(
      mainConfig,
      rendererConfig,
    );
}
