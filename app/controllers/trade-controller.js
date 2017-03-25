'use strict';

module.exports = (app) => {
  app.controller('TradeController', ['$log', '$http', '$rootScope',TradeController]);
  function TradeController($log, $http, $rootScope) {
    this.salaryCap = $rootScope.salaryCap;
    this.teams = [];
    this.teamOne = {active: false, sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
    this.teamTwo = {active: false, sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
    this.teamThree = {active: false, sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
    this.teamFour = {active: false, sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
    this.tradeResult = {};
    this.tradeComplete = false;

    this.getTeams = function() {
      $log.debug('TradeController.getTeams');
      // Get request that would be made to a backend
      // $http.get(this.baseUrl + '/teams', this.config)
      //   .then((res) => {
      //     this.teams = res;
      //   });
      this.teams.push($rootScope.exampleTeam);
      this.teams.push($rootScope.anotherExample);
      this.teams.push($rootScope.thirdExample);
      this.teams.push($rootScope.fourthExample);
    };

    this.setTeamSlot = function(slot, team) {
      $log.debug('TradeController.setTeamSlot');
      slot.team = team;
      slot.active = true;
      slot.capRoom = this.salaryCap - slot.capRoom;
      this.tradeComplete = false;
      $log.log(slot + ' set as ' + team);
    };

    this.emptySlot = function(slot) {
      $log.debug('TradeController.removeTeam');
      slot.team = {};
      slot.active = false;
      slot.sending = {picks: [], players: [], tradeExceptions: []};
      slot.receiving = {picks: [], players: [], tradeExceptions: []};
      slot.capRoom = 0;
      this.tradeComplete = false;
      $log.log(slot + ' cleared');
    };

    this.resetTeams = function() {
      $log.debug('TradeController.resetTeams');
      this.teamOne = {active: false, capRoom: 0, sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
      this.teamTwo = {active: false, capRoom: 0, sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
      this.teamThree = {active: false, capRoom: 0, sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
      this.teamFour = {active: false, capRoom: 0, sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
      this.tradeResult = {};
      this.tradeComplete = false;
    };

    this.resetTrade = function() {
      $log.debug('TradeController.resetTrade');
      this.teamOne = {sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
      this.teamTwo = {sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
      this.teamThree = {sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
      this.teamFour = {sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
      $log.log('Reset sending and receiving for all teams in TradeController.tradeMachine');
    };

    this.sendPlayer = function(player, currTeam, newTeam) {
      $log.debug('TradeController.sendPlayer');
      if (currTeam.sending.tradeExceptions.length) {
        this.tradeResult.warningText = 'Teams cannot use a Trade Exception in the same trade where they trading away a player';
        this.tradeResult.warning = true;
      }
      if (player.tradeRestrictions.length) {
        this.tradeResult.warningText = player.name + ' has a trade restriction that may prevent this trade from succeeding';
      }
      player.inTrade = true;
      currTeam.sending.push(player);
      newTeam.receiving.push(player);
    };

    this.returnPlayer = function(player, currTeam, newTeam) {
      $log.debug('TradeController.returnPlayer');
      currTeam.sending.splice(currTeam.sending.indexOf(player), 1);
      newTeam.receiving.splice(newTeam.receiving.indexOf(player), 1);
      player.inTrade = false;
    };

    function tradeImpact(team) {
      let capChange = 0;
      let playersSent = [];
      let playersReceived = [];
      let picksSent = [];
      let picksReceived = [];
      let tradeException;
      if (team.isActive) {
        team.receiving.players.forEach((player) => {
          capChange += player.contract.yearByYear[0];
          playersReceived.push(player);
        });
        team.sending.players.forEach((player) => {
          capChange += player.contract.yearByYear[0];
          playersSent.push(player);
        });
      }
    }

    this.makeTrade = function() {
      if (this.teamOne.isActive) {
        this.teamOne.sending.forEach(());
      }
    }
  }
};
