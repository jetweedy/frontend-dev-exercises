const path = require('path');

module.exports = {
  entry: ['./public/index-towebpack.js']
  ,
  module:{
    rules: [
      {
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true
        }
      }
    ]
  }
  ,
  output: {
    filename: 'webpacked.js',
    path: path.resolve(__dirname, 'public'),
  }
};