'use strict';

module.exports = (app) => {
  app.controller('TradeController', ['$log', '$http', '$rootScope',TradeController]);
  function TradeController($log, $http, $rootScope) {
    this.salaryCap = $rootScope.salaryCap.cap;
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

    this.resetPlayers = function(team) {
      if (team.active) {
        team.players.forEach((player) => {
          player.inTrade = false;
        });
      }
    };

    this.resetTeams = function() {
      $log.debug('TradeController.resetTeams');

      this.teamOne = {team: {}, active: false, capRoom: 0, sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
      this.teamTwo = {team: {}, active: false, capRoom: 0, sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
      this.teamThree = {team: {}, active: false, capRoom: 0, sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
      this.teamFour = {team: {}, active: false, capRoom: 0, sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
      this.tradeResult = {};
      this.tradeComplete = false;
    };


    this.resetTrade = function() {
      $log.debug('TradeController.resetTrade');
      this.resetPlayers(this.teamOne);
      this.resetPlayers(this.teamTwo);
      this.resetPlayers(this.teamThree);
      this.resetPlayers(this.teamFour);
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
      // Will add for No Trade Clause, Recent free agent acquisition, or other situations where a player may not be tradeable
      // if (player.tradeRestrictions.length) {
      //   this.tradeResult.warningText = player.name + ' has a trade restriction that may prevent this trade from succeeding';
      // }
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

    this.tradeImpact = function(team) {
      if (team.active) {
        let salaryLost = 0;
        let salaryGained = 0;
        let playersSent = [];
        let playersReceived = [];
        let picksSent = team.sending.picks;
        let picksReceived = team.receiving.picks;
        let tradeExceptionUsed;
        let tradeExceptionEarned;
        let tradeResult;
        team.receiving.players.forEach((player) => {
          salaryGained += player.contract.yearByYear[0];
          playersReceived.push(player);
        });
        team.sending.players.forEach((player) => {
          salaryLost += player.contract.yearByYear[0];
          playersSent.push(player);
        });

        let capChange = salaryGained - salaryLost;
        let finalSalary = team.totalSalary + capChange;
        let finalCapRoom = this.salaryCap - finalSalary;
        // Prevents players from sending more than one trade exception, or from packaging a player with a tade exception
        if ((team.sending.players.length && team.sending.tradeExceptions.length) || team.sending.tradeExceptions.length > 1) {
          tradeResult = {success: false, reason: 'Traded Player Exceptions cannot be traded along with players or other trade exceptions'};
          return tradeResult;
        }
        // Prevents trading a traded player exception for a player whose salary this year is greater than the total value of the TPE
        if (team.sending.tradeExceptions && team.sending.tradeExceptions[0].value < salaryGained) {
          tradeResult = {success: false, reason: 'Traded Player Exceptions cannot be traded for a player whose salary exceeds their value'};
        }
        // Prevents teams over the salary cap from receiving more than 150% of their current salary + $100000 as per league rules
        if (finalSalary > this.salaryCap && salaryGained * 1.5 + 100000 > salaryLost) {
          tradeResult = {success: false, reason: team.name + ' is over the salary cap, and cannot receive in excess of 150% of the salary they sent plus $100000'};
          return tradeResult;
        }

        if (team.sending.tradeExceptions) {
          tradeExceptionUsed = team.sending.tradeExceptions[0].value - salaryGained;
        }

        if(finalSalary > this.salaryCap && capChange < 0) {
          tradeExceptionEarned = capChange;
        }

        return {active:true, success: true, capChange: capChange, finalCapRoom: finalCapRoom, playersLost: playersSent, newPlayers: playersReceived, picksLost: picksSent, newPicks: picksReceived, finalSalary: finalSalary, newTPE: tradeExceptionUsed};
      }
      return {active: false};
    };

    this.submitTrade = function(){
      this.tradeResults.teamOne = this.tradeImpact(this.teamOne);
      this.tradeResults.teamTwo = this.tradeImpact(this.teamTwo);
      this.tradeResults.teamThree = this.tradeImpact(this.teamThree);
      this.tradeResults.teamFour = this.tradeImpact(this.teamFour);
      this.tradeComplete = true;
    };
  }
};
