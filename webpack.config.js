var webpack = require('webpack');

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
        test: /\.js$/,
        loaders: ['react-hot', 'jsx?harmony'],
        exclude: /node_modules[\\\/]react(-router)?[\\\/]/
      }
    ]
  },
  devtool: "#inline-source-map",
  externals: { }
};
