const path = require('path');
const MattPlugin = require('./plugin')

module.exports = {
  mode: 'none',
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
      new MattPlugin()
  ]
};
