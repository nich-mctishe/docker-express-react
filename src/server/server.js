const express = require('express');
const path = require('path')
const app = express();
const port = process.env.PORT || 5000;
const webpack = require('webpack');

require('./routes')(app)

/**
 * Dev webpack route.
 */
var compiler = webpack(require('../../webpack.config.js'));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: '/'
}));

app.use('*', function (req, res, next) {
  var filename = path.join(compiler.outputPath,'index.html');
  compiler.outputFileSystem.readFile(filename, function(err, result){
    if (err) {
      return next(err);
    }
    res.set('content-type','text/html');
    res.send(result);
    res.end();
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
