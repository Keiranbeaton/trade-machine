'use strict';

module.exports = (app) => {
  app.controller('TradeController', ['$log', '$http', '$rootScope',TradeController]);
  function TradeController($log, $http, $rootScope) {
    this.salaryCap = $rootScope.salaryCap.cap;
    this.taxLine = $rootScope.salaryCap.tax;
    this.teams = [];
    this.teamsInTrade = [];
    this.teamOne = {team: {}, active: false, sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
    this.teamTwo = {team: {}, active: false, sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
    this.teamThree = {team: {}, active: false, sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
    this.teamFour = {team: {}, active: false, sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
    this.tradeResult = {};
    this.tradeComplete = false;
    this.divColor = {'background-color': '#B6BFBF'};
    this.clickedColor = {'background-color': '#f4e5af'};

    this.getTeams = function() {
      $log.debug('TradeController.getTeams');
      // Get request that would be made to a backend
      // $http.get(this.baseUrl + '/teams', this.config)
      //   .then((res) => {
      //     this.teams = res;
      //   });
      this.teams.push($rootScope.exampleTeam);
      this.teams.push($rootScope.exampleTwo);
      this.teams.push($rootScope.exampleThree);
      this.teams.push($rootScope.exampleFour);
      this.teams.forEach((team) => {

        team.inTrade = false;
        team.background = this.divColor;
        team.capRoom = this.salaryCap - team.totalSalary;
        team.taxRoom = this.taxLine - team.totalSalary;

        if (team.capRoom < 0) {
          team.capDisplay = '-$';
          team.underCap = false;
        } else {
          team.capDisplay = '$';
          team.underCap = true;
        }

        if (team.taxRoom < 0) {
          team.taxDisplay = '-$';
          team.underTax = false;
        } else {
          team.taxDisplay = '$';
          team.underTax = true;
        }

        team.roster.forEach((player) => {
          player.inTrade = false;
          player.chooseDest = false;
          player.sentTo = {};
          player.background = this.divColor;
        });
      });
      this.savedTeams = this.teams;
      $log.log('TradeController.teams', this.teams);
    };

    this.setTeamSlot = function(slot, team) {
      $log.debug('TradeController.setTeamSlot');
      $log.log('team in setTeamSlot', team);
      if (!team.roster) return;
      if(slot.receiving.players.length) {
        slot.receiving.players.forEach((player) => {
          let origTeam = player.team;
          origTeam.team.roster[origTeam.team.roster.indexOf(player)].background = this.divColor;
          origTeam.sending.players.splice(origTeam.sending.players.indexOf(player), 1);
        });
      }

      if(slot.sending.players.length) {
        slot.sending.players.forEach((player) => {
          let newTeam = player.sentTo;
          newTeam.receiving.players.splice(newTeam.receiving.players.indexOf(player), 1);
        });
      }

      if (slot.team.hasOwnProperty('name')) {
        slot.team.inTrade = false;
        slot.team.background = this.divColor;
        let index = this.teams.indexOf(slot.team);
        this.teams[index].inTrade = false;
        this.teams[index].background = this.divColor;
      }

      team.inTrade = true;
      team.background = this.clickedColor;
      team.roster.forEach((player) => {
        player.team = slot;
        player.background = this.divColor;
      });


      $log.log('Team being replaced', slot.team);
      slot.team = team;
      $log.log('Team replacing them',slot.team);

      slot.sending = {picks: [], players: [], tradeExceptions: []};
      slot.receiving = {picks: [], players: [], tradeExceptions: []};
      slot.active = true;
      this.tradeComplete = false;
      $log.log(slot);
    };

    this.emptySlot = function(slot) {
      $log.debug('TradeController.removeTeam');
      if(slot.receiving.players.length) {
        slot.receiving.players.forEach((player) => {
          let origTeam = player.team;
          origTeam.team.roster[origTeam.team.roster.indexOf(player)].background = this.divColor;
          origTeam.sending.players.splice(origTeam.sending.players.indexOf(player), 1);
        });
      }

      if(slot.sending.players.length) {
        slot.sending.players.forEach((player) => {
          let newTeam = player.sentTo;
          newTeam.receiving.players.splice(newTeam.receiving.players.indexOf(player), 1);
        });
      }
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
          player.chooseDest = false;
          player.inTrade = false;
          player.sentTo = {};
          player.background = this.divColor;
        });
      }
    };

    this.resetTeams = function() {
      $log.debug('TradeController.resetTeams');
      if (this.teamOne.active) {
        $log.log('TeamOne');
        this.emptySlot(this.teamOne);
      }
      if (this.teamTwo.active) {
        $log.log('TeamTwo');
        this.emptySlot(this.teamTwo);
      }
      if (this.teamThree.active) {
        this.emptySlot(this.teamThree);
      }
      if (this.teamFour.active) {
        this.emptySlot(this.teamFour);
      }
      this.teamOne = {team: {}, active: false, capRoom: 0, sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
      this.teamTwo = {team: {}, active: false, capRoom: 0, sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
      this.teamThree = {team: {}, active: false, capRoom: 0, sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
      this.teamFour = {team: {}, active: false, capRoom: 0, sending: {picks: [], players: [], tradeExceptions: []}, receiving: {picks:[], players:[], tradeExceptions:[]}};
      this.tradeResult = {};
      this.tradeComplete = false;
    };

    this.adjustTrade = function() {
      $log.debug('TradeController.resetTrade');
      this.tradeComplete = false;
    };

    this.choosePlayer = function(player, currTeam) {
      $log.debug('TradeController.choosePlayer');
      if (player.inTrade) {
        $log.debug(player + ' evaluated as In Trade');
        let newTeam = player.sentTo;
        currTeam.sending.players.splice(currTeam.sending.players.indexOf(player), 1);
        newTeam.receiving.players.splice(newTeam.receiving.players.indexOf(player), 1);
        player.background = this.divColor;
        player.inTrade = false;
      } else {
        $log.debug(player + ' evaluated as not In Trade');
        player.chooseDest = true;
      }
    };

    this.cancelSend = function(player) {
      $log.debug('cancelSend');
      player.chooseDest = false;
    };

    this.sendPlayer = function(player, currTeam, newTeam) {
      $log.debug('TradeController.sendPlayer');
      // Prevents teams from trading Players along with trade exceptions
      // if (currTeam.sending.tradeExceptions.length) {
      //   this.tradeResult.warningText = 'Teams cannot use a Trade Exception in the same trade where they trading away a player';
      //   this.tradeResult.warning = true;
      // }
      // Will add for No Trade Clause, Recent free agent acquisition, or other situations where a player may not be tradeable
      // if (player.tradeRestrictions.length) {
      //   this.tradeResult.warningText = player.name + ' has a trade restriction that may prevent this trade from succeeding';
      // }
      player.inTrade = true;
      player.chooseDest = false;
      player.sentTo = newTeam;
      player.background = this.clickedColor;
      currTeam.sending.players.push(player);
      newTeam.receiving.players.push(player);
    };

    this.returnPlayer = function(player, team) {
      $log.debug('TradeController.returnPlayer');
      team.sending.players.splice(team.sending.players.indexOf(player), 1);
      let newTeam = player.sentTo;
      newTeam.receiving.players.splice(newTeam.receiving.players.indexOf(player), 1);
      player.inTrade = false;
      player.background = this.divColor;
    };

    this.tradeImpact = function(team) {
      if (team.active) {
        let salaryLost = 0;
        let salaryGained = 0;
        let playersSent = [];
        let playersReceived = [];
        // Not needed now, but might be later if I add draft picks and traded player exceptions
        // let picksSent = team.sending.picks;
        // let picksReceived = team.receiving.picks;
        // let tradeExceptionUsed;
        // let tradeExceptionEarned;
        let tradeResult = {success: true};
        let failingPoints = [];
        team.receiving.players.forEach((player) => {
          salaryGained += player.contract.yearByYear[0];
          playersReceived.push(player);
        });
        team.sending.players.forEach((player) => {
          salaryLost += player.contract.yearByYear[0];
          playersSent.push(player);
        });

        let capChange = salaryGained - salaryLost;
        let finalSalary = team.team.totalSalary + capChange;
        let finalCapRoom = this.salaryCap - finalSalary;
        // Prevents players from sending more than one trade exception, or from packaging a player with a tade exception
        // if ((team.sending.players.length && team.sending.tradeExceptions.length) || team.sending.tradeExceptions.length > 1) {
        //   tradeResult = {success: false, reason: 'Traded Player Exceptions cannot be traded along with players or other trade exceptions'};
        //   return tradeResult;
        // }
        // Prevents trading a traded player exception for a player whose salary this year is greater than the total value of the TPE
        // if (team.sending.tradeExceptions && team.sending.tradeExceptions[0].value < salaryGained) {
        //   tradeResult = {success: false, reason: 'Traded Player Exceptions cannot be traded for a player whose salary exceeds their value'};
        // }
        // Prevents teams over the salary cap from receiving more than 125% of their current salary + $100000 as per league rules
        if (finalSalary > this.salaryCap && (salaryGained > salaryLost * 1.25 + 100000)) {
          tradeResult.success = false;
          failingPoints = team.team.name + ' is over the salary cap, and cannot receive in excess of 125% of the salary they sent plus $100000';
        }
        // Updates value of a traded player exception that is used to acquire a player
        // if (team.sending.tradeExceptions) {
        //   tradeExceptionUsed = team.sending.tradeExceptions[0].value - salaryGained;
        // }
        // Shows value of a traded player exception a team could acquire from this trade
        // if(finalSalary > this.salaryCap && capChange < 0) {
        //   tradeExceptionEarned = capChange;
        // }
        tradeResult.active = true;
        tradeResult.team = team.team.name;
        tradeResult.capChange = capChange;
        tradeResult.finalCapRoom = finalCapRoom;
        tradeResult.playersLost = playersSent;
        tradeResult.newPlayers = playersReceived;
        tradeResult.finalSalary = finalSalary;
        tradeResult.problems = failingPoints;
        return tradeResult;
      }
      return {active: false};
    };

    this.dismissWarning = function() {
      $log.debug('TradeController.dismmissWarning');
      this.tradeResult.warningText = '';
      this.tradeResult.warning = false;
    };

    this.submitTrade = function(){
      $log.debug('TradeController.submitTrade');
      this.tradeResult.success = true;
      this.tradeResult.teams = [];
      this.tradeResult.involved = [];
      this.tradeResult.reasonsForFailing = [];

      if (this.teamOne.sending.players.length === 0 && this.teamTwo.sending.players.length === 0 && this.teamThree.sending.players.length === 0 && this.teamFour.sending.players.length === 0) {
        return;
      }

      this.tradeResult.teams.push(this.tradeImpact(this.teamOne));
      this.tradeResult.teams.push(this.tradeImpact(this.teamTwo));
      this.tradeResult.teams.push(this.tradeImpact(this.teamThree));
      this.tradeResult.teams.push(this.tradeImpact(this.teamFour));
      this.tradeResult.teams.forEach((team) => {
        if (team.active) {
          this.tradeResult.involved.push(team);
        }
      });

      this.tradeResult.involved.forEach((team) => {
        if (!team.success) {
          this.tradeResult.success = false;
          this.tradeResult.reasonsForFailing.push(team.problems);
        }
      });

      this.tradeComplete = true;
    };
  }
};
