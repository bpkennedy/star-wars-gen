module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        data: `
                @import "./src/styles/custom.scss";
            `
      }
    }
  }
}
