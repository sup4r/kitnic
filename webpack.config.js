module.exports = {
    entry: "./build/.temp/render.jsx",
    output: {
        filename: "test.js"
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: ['react']
          }
        }
      ]
    },
    resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.jsx', '.json', '.coffee']
  }
}
