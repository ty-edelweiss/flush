const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const path = require('path');

const config = require('./webpack.config');

for (let entryName in config.entry) {
  config.entry[entryName] =
    [
      ('webpack-dev-server/client?http://localhost:' + process.env.PORT),
      'webpack/hot/dev-server'
    ].concat(config.entry[entryName]);
}

config.plugins = [new webpack.HotModuleReplacementPlugin()].concat(config.plugins);

const compiler = webpack(config);

const server =
  new WebpackDevServer(compiler, {
    hot: true,
    contentBase: path.join(__dirname, 'build'),
    sockPort: process.env.PORT,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    disableHostCheck: true
  });

server.listen(process.env.PORT);
