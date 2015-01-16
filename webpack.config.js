var webpack = require('webpack');
var path = require('path');

module.exports = {
  // Entry point for static analyzer:
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/dev-server',
    './src/main.js'
  ],

  output: {
    // Where to put build results when doing production builds:
    // (Server doesn't write to the disk, but this is required.)
    path: __dirname + "/dist",

    // Filename to use in HTML
    filename: 'main.js',

    // Path to use in HTML
    publicPath: 'http://localhost:3001/js/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
   // new webpack.optimize.CommonsChunkPlugin('lib', 'lib.js')
  ],

  resolve: {
    // Allow to omit extensions when requiring these files
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      // Pass *.jsx files through jsx-loader transform
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'jsx?harmony'],
        exclude: /node_modules[\\\/]react(-router)?[\\\/]/
      },
      {
        test: /\.scss$/,
        // Query parameters are passed to node-sass
        loader: "style!css!sass?outputStyle=expanded&" +
          "includePaths[]=" +
            (path.resolve(__dirname, "./bower_components")) + "&" +
          "includePaths[]=" +
            (path.resolve(__dirname, "./node_modules"))
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },
  devtool: "#inline-source-map",
  externals: { }
};
