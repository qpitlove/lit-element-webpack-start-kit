const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  plugins: [new MiniCssExtractPlugin()],
});
