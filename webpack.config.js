const webpack = require("webpack");
const { resolve } = require("path");
const webpackMerge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");

const modeConfig = (env) =>
  require(`./build-utils/webpack.${env.mode}.js`)(env);

const corejs = "./node_modules/core-js-bundle";
const webcomponentsjs = "./node_modules/@webcomponents/webcomponentsjs";
const documentregisterEl = "./node_modules/document-register-element";

const polyfills = [
  {
    from: resolve(`${corejs}/*.{js,map}`),
    to: "vendor/core-js",
    flatten: true,
  },
  {
    from: resolve(`${webcomponentsjs}/webcomponents-*.{js,map}`),
    to: "vendor",
    flatten: true,
  },
  {
    from: resolve(`${webcomponentsjs}/bundles/*.{js,map}`),
    to: "vendor/bundles",
    flatten: true,
  },
  {
    from: resolve(`${webcomponentsjs}/custom-elements-es5-adapter.js`),
    to: "vendor",
    flatten: true,
  },
  {
    from: resolve(`${documentregisterEl}/build/document-register-element.js`),
    to: "vendor",
    flatten: true,
  },
];

const assets = [
  {
    from: "public/imgs",
    to: "imgs/",
  },
];

const plugins = [
  new CleanWebpackPlugin(),
  new webpack.ProgressPlugin(),
  new CopyWebpackPlugin([...polyfills, ...assets], {
    ignore: [".DS_Store"],
  }),
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: "./public/index.html",
    minify: false,
  }),
  new HtmlWebpackTagsPlugin({
    tags: [
      "vendor/core-js/minified.js",
      "vendor/webcomponents-loader.js",
      "vendor/document-register-element.js",
    ],
    useHash: true,
    append: false,
  }),
];

module.exports = ({ mode, presets }) => {
  return webpackMerge(
    {
      mode,
      entry: {
        main: ["./src"], // DEFAULT builtIn
        currentTime: ["./src/components/current-time.js"],
        currentTimeLitHtml: ["./src/components/current-time-lit-html.js"],
        currentTimeLitElement: ["./src/components/current-time-lit-element.js"],
      },
      output: {
        // Make sure to use [name] or [id] in output.filename
        //  when using multiple entry points
        library: "[name]",
        libraryTarget: "umd",
        filename: "[name].js",
        // filename: '[name].[chunkhash:8].js'
        chunkFilename: "[id].chunk.js",
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            // exclude: /node_modules/,
            exclude: /node_modules\/(?!(@webcomponents|lit-element|lit-html)\/).*/,
            loader: "babel-loader",
            options: {
              plugins: ["@babel/plugin-transform-runtime"],
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: 3,
                    targets: ["last 2 versions", "android >= 4.2"],
                  },
                ],
              ],
            },
          },
        ],
      },
      plugins,
    },
    modeConfig({ mode, presets })
  );
};
