const app = require('./app');
const config = require('../config/config');
const PORT = config.app.port;

app.listen(PORT, () => {
  // console.log('FMDB listening on ' + PORT);
  // console.log('environment variables: ', process.env.NODE_ENV);
});
