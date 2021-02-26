module.exports = {
  devServer: {
    host: 'annino.local'
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/whatif/': '/'
}