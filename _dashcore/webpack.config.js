const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'production',
  devtool: false,

  entry: {
    dashcore: './src/js/app.js',
    loading: './src/js/page-loading.js',
  },

  output: {
    filename: 'js/[name].[contenthash].js',
    chunkFilename: "js/[name].js",
  },

  module: {
    rules: [
      {
        test: /\.scss|.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  autoprefixer
                ]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      }
    ],
  },

  optimization: {
    minimizer: [
      `...`,
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[id].css"
    }),
  ]
};