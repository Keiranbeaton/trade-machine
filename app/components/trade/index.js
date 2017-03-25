'use strict';

module.exports = function(app) {
  app.component('kb-trade', {
    controller: 'TradeController',
    template: require('./trade-template.html'),
    bindings: {
      baseUrl: '<',
      config: '<'
    }
  });
};
