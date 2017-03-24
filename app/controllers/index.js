'use strict';

module.exports = (app) {
  require('./team-controller')(app);
  require('./trade-controller')(app);
};
