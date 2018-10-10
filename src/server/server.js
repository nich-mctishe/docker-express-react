const express = require('express');
const path = require('path')
const app = express();
const port = process.env.PORT || 5000;
const webpack = require('webpack');
const global = require('./config/options')
const seeder = require('./config/seeder')
const mongoose = require('mongoose')

mongoose
  .plugin(require('mongoose-find-or-create'))
  .set('debug', true) // make this based on env var
  .connect(global.MONGO_URL)
  .then(() => {
    seeder(() => {
      /**
       * Dev webpack route.
       */
      var compiler = webpack(require('../../webpack.config.js'));

      app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: '/'
      }));

      require('./routes')(app)

      app.use('*', function (req, res, next) {
        const filename = path.join(compiler.outputPath,'index.html');
        console.log(filename);

        compiler.outputFileSystem.readFile(filename, function(err, result) {
          if (err) {
            return next(err);
          }
          console.log(err);
          console.log('----------------------');
          console.log(result);
          console.log('----------------------');
          res.set('content-type','text/html');
          res.send(result);
          res.end();
        });
      });

      app.listen(port, () => console.log(`Listening on port ${port}`));
    })
  })
