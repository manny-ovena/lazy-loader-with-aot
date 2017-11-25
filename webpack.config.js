const ngToolsWebpack = require('@ngtools/webpack');
const path = require("path");
const webpack = require("webpack");

module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: './app/main.jit.ts',
  output: {
    path: path.resolve(__dirname, './dist/'),
    publicPath: '/dist/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new ngToolsWebpack.AotPlugin({
      tsConfigPath: './tsconfig.aot.json'
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      mangle: { screw_ie8: true },
      compress: { screw_ie8: true, warnings: false },
      sourceMap: true,
    }),
  ],
  module: {
    loaders: [
      { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'] },
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.ts$/, loader: ['@ngtools/webpack'] }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};
