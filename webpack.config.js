const webpack = require("webpack");
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackMerge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const modeConfig = (env) =>
  require(`./build-utils/webpack.${env.mode}.js`)(env);

const documentregisterEl = "./node_modules/document-register-element";
const webcomponentsjs = "./node_modules/@webcomponents/webcomponentsjs";

const polyfills = [
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
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: "./public/index.html",
    minify: false,
  }),
  new CopyWebpackPlugin([...polyfills, ...assets], {
    ignore: [".DS_Store"],
  }),
];

module.exports = ({ mode, presets }) => {
  return webpackMerge(
    {
      mode,
      entry: {
        main: ["./src"], // DEFAULT builtIn
        // TodoView: ["./src/views/todo-view.js"],
        CurrentTime: ["./src/views/current-time.js"],
        CurrentTimeLitHtml: ["./src/views/current-time-lit-html.js"],
        CurrentTimeLitElement: ["./src/views/current-time-lit-element.js"],
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
            exclude: /node_modules\/(?!(@webcomponents\/shadycss|lit-element|lit-html)\/).*/,
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
