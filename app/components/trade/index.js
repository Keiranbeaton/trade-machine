'use strict';

module.exports = function(app) {
  app.component('kbTrade', {
    controller: 'TradeController',
    template: require('./trade-template.html'),
    bindings: {
      baseUrl: '<',
      config: '<'
    }
  });
};
