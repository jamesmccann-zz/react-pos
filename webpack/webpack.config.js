var path = require('path');

module.exports = {
  context: __dirname,
  entry: './assets/javascripts/app.jsx',
  output: {
    filename: 'bundle.js',
    path: '../app/assets/javascripts'
  },
  resolve: {
    root: [path.join(__dirname, "assets/javascripts")],
    extensions: ["", ".js", ".jsx"]
  },
   module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx-loader' },
      { test: /\.scss$/, loader: "style-loader!sass-loader" }
    ]

  }}
