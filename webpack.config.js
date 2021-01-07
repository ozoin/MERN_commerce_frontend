const path = require("path");
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const MinifyPlugin = require('babel-minify-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { triggerAsyncId } = require("async_hooks");
module.exports = {
    mode: 'development',
    entry: { index: path.resolve(__dirname, "src", "index.js") },
    output: {
        path: path.resolve(__dirname,'build')
    },
    module: {
        rules: [
            {
              test: /\.m?js$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
            },
            {
              test: /\.css$/,
              use: [
                "style-loader",
                'css-loader'
              ]
            },
            {
              test: /\.(png|svg|jpg|gif)$/,
              exclude: /node_modules/,
              use: ['file-loader?name=[name].[ext]']
            },
            {
              test: /\.html$/i,
              loader: 'html-loader',
            },
          ]
      },
      resolveLoader: {
        modules: ['src','node_modules'],
        extensions: [".wasm", ".ts", ".tsx", ".mjs", ".cjs", ".js", ".json"],
        mainFields: ['loader', 'main']
      },
      plugins: [
         new HtmlWebPackPlugin({
            template:path.resolve(__dirname, "public", "index.html")
         }),
             new MinifyPlugin({}, {
               comments:false
           }),
           new MiniCssExtractPlugin({
               filename: '[name].css'
           })
     ],
    // devServer: {
    //   historyApiFallback: true,
    //   contentBase: path.join(__dirname, 'public'),
    //   publicPath: "/public",
    //   hot:true,
    //   open:true,
    //   compress: true,
    //   port: 9000
    // }
      
}