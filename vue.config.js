module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: true,
  devServer: {
    hot: true,
    port: 8088,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  }
}
