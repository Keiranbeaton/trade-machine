'use strict';

module.exports = (app) => {
  require('./team')(app);
  require('./trade')(app);
};
