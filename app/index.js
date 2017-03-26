'use strict';

require('!!file-loader?name=[name].[ext]!./html/index.html');
require('./styles/base.scss');

const angular = require('angular');
const angularRoute = require('angular-route');
const kbTradeMachine = angular.module('kbTradeMachine', [angularRoute]);


kbTradeMachine.run(['$rootScope', function($rootScope) {
  $rootScope.salaryCap = {year: '2016-17', cap: 94140000, tax: 113290000};
  $rootScope.exampleTeam = {
    id: 1,
    name: 'Example',
    abbreviation: 'Ex',
    totalSalary: 100000000,
    draftPicks: [{round: 1, year: 2018, conditions: 'Top 10 Protected', originalOwnerId: 2}, {round: 2, year: 2018, conditions: 'None', originalOwnerId: 2}],
    tradeExceptions: [{value:5000000, expiration: Date(2017, 8, 4)}],
    roster: [
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 1, id: 1, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 1, id: 2, contract: {length: 3, total: 23000000, yearByYear: [12000000, 5000000, 6000000], optionType: 'Team', optionYear: 3}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 1, id: 3, contract: {length: 3, total: 23000000, yearByYear: [12000000, 5000000, 6000000], optionType: 'Player', optionYear: 3}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 1, id: 4, contract: {length: 3, total: 23000000, yearByYear: [12000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 1, id: 5, contract: {length: 3, total: 23000000, yearByYear: [12000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 1, id: 6, contract: {length: 3, total: 23000000, yearByYear: [12000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 1, id: 7, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 1, id: 8, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 1, id: 9, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 1, id: 10, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 1, id: 11, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 1, id: 12, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 1, id: 13, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 1, id: 14, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 1, id: 15, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}}]
  };
  $rootScope.exampleTwo = {
    id: 2,
    name: 'Example2',
    abbreviation: 'Aex',
    totalSalary: 110000000,
    draftPicks: [{round: 1, year: 2019, conditions: 'Top 15 Protected', originalOwnerId: 2}, {round: 2, year: 2018, conditions: 'None', originalOwnerId: 2}],
    tradeExceptions: [{value:3200000, expiration: Date(2017, 11, 7)}],
    roster: [
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 2, id: 16, contract: {length: 3, total: 23000000, yearByYear: [12000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 2, id: 17, contract: {length: 3, total: 23000000, yearByYear: [12000000, 5000000, 6000000], optionType: 'Team', optionYear: 3}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 2, id: 18, contract: {length: 3, total: 23000000, yearByYear: [12000000, 5000000, 6000000], optionType: 'Player', optionYear: 3}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 2, id: 19, contract: {length: 3, total: 23000000, yearByYear: [12000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 2, id: 20, contract: {length: 3, total: 23000000, yearByYear: [12000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 2, id: 21, contract: {length: 3, total: 25000000, yearByYear: [14000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 2, id: 22, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 2, id: 23, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 2, id: 24, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 2, id: 25, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 2, id: 26, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 2, id: 27, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 2, id: 28, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 2, id: 29, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 2, id: 30, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}}]
  };
  $rootScope.exampleThree = {
    id: 3,
    name: 'Example3',
    abbreviation: 'Tex',
    totalSalary: 82000000,
    draftPicks: [{round: 1, year: 2019, conditions: 'Top 15 Protected', originalOwnerId: 1}, {round: 2, year: 2018, conditions: 'None', originalOwnerId: 3}, {round:1, year: 2018, conditions: 'None', originalOwnerId:3}],
    tradeExceptions: [],
    roster: [
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 3, id: 31, contract: {length: 3, total: 13000000, yearByYear: [2000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 3, id: 32, contract: {length: 3, total: 23000000, yearByYear: [9000000, 5000000, 6000000], optionType: 'Team', optionYear: 3}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 3, id: 33, contract: {length: 3, total: 23000000, yearByYear: [12000000, 5000000, 6000000], optionType: 'Player', optionYear: 3}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 3, id: 34, contract: {length: 3, total: 23000000, yearByYear: [8000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 3, id: 35, contract: {length: 3, total: 23000000, yearByYear: [1000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 3, id: 36, contract: {length: 3, total: 25000000, yearByYear: [14000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 3, id: 37, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 3, id: 38, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 3, id: 39, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 3, id: 40, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 3, id: 41, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 3, id: 42, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 3, id: 43, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 3, id: 44, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 3, id: 45, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}}]
  };
  $rootScope.exampleFour = {
    id: 4,
    name: 'Example4',
    abbreviation: 'Fex',
    totalSalary: 110000000,
    draftPicks: [{round: 1, year: 2019, conditions: 'Top 5 Protected', originalOwnerId: 2}, {round: 2, year: 2018, conditions: 'None', originalOwnerId: 4}],
    tradeExceptions: [{value:3200000, expiration: Date(2017, 11, 7)}],
    roster: [
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 4, id: 46, contract: {length: 3, total: 23000000, yearByYear: [12000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 4, id: 47, contract: {length: 3, total: 23000000, yearByYear: [12000000, 5000000, 6000000], optionType: 'Team', optionYear: 3}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 4, id: 48, contract: {length: 3, total: 23000000, yearByYear: [12000000, 5000000, 6000000], optionType: 'Player', optionYear: 3}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 4, id: 49, contract: {length: 3, total: 23000000, yearByYear: [12000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 4, id: 50, contract: {length: 3, total: 23000000, yearByYear: [12000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 4, id: 51, contract: {length: 3, total: 25000000, yearByYear: [14000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 4, id: 52, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 4, id: 53, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 4, id: 54, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 4, id: 55, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 4, id: 56, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 4, id: 57, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 4, id: 58, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 4, id: 59, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}},
      {firstName: 'Example', lastName: 'Player', position: 3, age: 25, height: 80, weight: 240, teamId: 4, id: 60, contract: {length: 3, total: 15000000, yearByYear: [4000000, 5000000, 6000000], optionType: 'None', optionYear: 0}}]
  };
}]);

require('./components')(kbTradeMachine);
require('./controllers')(kbTradeMachine);


kbTradeMachine.config(['$routeProvider', '$locationProvider', ($rp, $lp) => {
  $lp.hashPrefix('');
  $rp
  .when('/trade-machine', {
    template: require('./html/trade-machine.html')
  })
  .otherwise({
    redirectTo: 'trade-machine'
  });
}]);
