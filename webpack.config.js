module.exports = {
  devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  },
  module:{
    loaders:[
      {
        test:/\.json$/,
        loader:"json"
      },
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel'//在webpack的module部分的loaders里进行配置即可
      },
      {
        test:/\.css$/,
        loader:'style!css?modules!postcss'//添加对样式表的处理
      },
      {
        test:/\.less$/,
        loader:"style!css!less!postcss"
      }
    ]
  },
  postcss: [
   require('autoprefixer')//调用autoprefixer插件
 ],
  devServer:{
    contentBase:"./public",
    colors:true,
    historyApiFallback:true,
    inline:true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  }
}
