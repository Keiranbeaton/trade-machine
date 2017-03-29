'use strict';

module.exports = (app) => {
  app.controller('TradeController', ['$log', '$http', '$rootScope', '$anchorScroll', '$location', TradeController]);
  function TradeController($log, $http, $rootScope, $anchorScroll, $location) {
    this.salaryCap = $rootScope.salaryCap.cap;
    this.taxLine = $rootScope.salaryCap.tax;
    this.teams = [];
    this.teamsInTrade = [];
    this.teamOne = {id: 1, team: {name: 'Add Team'}, active: false, sending: {picks: [], players: [], tradeExceptions: [], money: 0}, receiving: {picks:[], players:[], tradeExceptions:[], money: 0}};
    this.teamTwo = {id: 2, team: {name: 'Add Team'}, active: false, sending: {picks: [], players: [], tradeExceptions: [], money: 0}, receiving: {picks:[], players:[], tradeExceptions:[], money: 0}};
    this.teamThree = {id: 3, team: {name: 'Add Team'}, active: false, sending: {picks: [], players: [], tradeExceptions: [], money: 0}, receiving: {picks:[], players:[], tradeExceptions:[], money: 0}};
    this.teamFour = { id: 4, team: {name: 'Add Team'}, active: false, sending: {picks: [], players: [], tradeExceptions: [], money: 0}, receiving: {picks:[], players:[], tradeExceptions:[], money: 0}};
    this.tradeResult = {};
    this.tradeComplete = false;
    this.divColor = {'background-color': '#B6BFBF'};
    this.clickedColor = {'background-color': '#f4e5af'};
    this.playerStyling = 'roster-player';
    this.tradedStyling = 'traded-player';
    this.teamStyling = {'background-color': 'white', 'color': 'black'};
    this.activeTeamStyling = {'background-color': 'black', 'color': 'white'};
    this.activeList = [];
    this.width = 'two-team-width';
    this.dropDownWidth = 'two-team-width';
    this.twoTeam = 'two-team-width';
    this.threeTeam = 'three-team-width';
    this.fourTeam = 'four-team-width';

    this.setSize = function() {
      if (this.activeList.length < 2) {
        this.width = this.twoTeam;
        this.dropDownWidth = this.twoTeam;
      }
      if (this.activeList.length === 2) {
        this.width = this.twoTeam;
        this.dropDownWidth = this.threeTeam;
      }
      if(this.activeList.length === 3) {
        this.width = this.threeTeam;
        this.dropDownWidth = this.fourTeam;
      }
      if(this.activeList.length === 4) {
        this.width = this.fourTeam;
        this.dropDownWidth = this.fourTeam;
      }
    };

    this.goToTop = function() {
      let old = $location.hash();
      $location.hash('results-view');
      $anchorScroll();
      $location.hash(old);
    };

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
        team.background = this.teamStyling;
        team.capRoom = this.salaryCap - team.totalSalary;
        team.taxRoom = this.taxLine - team.totalSalary;

        if (team.capRoom < 0) {
          team.capDisplay = '-$';
          team.capDisplayNum = Math.abs(team.capRoom);
          team.underCap = false;
        } else {
          team.capDisplay = '$';
          team.capDisplayNum = team.capRoom;
          team.underCap = true;
        }

        if (team.taxRoom < 0) {
          team.taxDisplay = '-$';
          team.taxDisplayNum = Math.abs(team.taxRoom);
          team.underTax = false;
        } else {
          team.taxDisplay = '$';
          team.taxDisplayNum = team.taxRoom;
          team.underTax = true;
        }

        team.roster.forEach((player) => {
          player.inTrade = false;
          player.chooseDestination = false;
          player.sentTo = {};
          player.background = this.playerStyling;
        });
      });
      this.savedTeams = this.teams;
      $log.log('TradeController.teams', this.teams);
    };

    this.setTeamSlot = function(slot, team) {
      $log.debug('TradeController.setTeamSlot');
      if (!team.roster) return;

      if(slot.team.hasOwnProperty('roster')) {
        this.emptySlot(slot);
      }

      if(slot.receiving.players.length) {
        slot.receiving.players.forEach((player) => {
          let origTeam = player.team;
          origTeam.team.roster[origTeam.team.roster.indexOf(player)].background = this.playerStyling;
          origTeam.sending.players.splice(origTeam.sending.players.indexOf(player), 1);
        });
      }

      team.inTrade = true;
      team.background = this.activeTeamStyling;
      team.roster.forEach((player) => {
        player.team = team.id;
        player.slot = slot;
        player.background = this.playerStyling;
      });

      slot.team = team;
      $log.log('team in slot ' + slot.id, team);
      slot.sending = {picks: [], players: [], tradeExceptions: [], money: 0};
      slot.receiving = {picks: [], players: [], tradeExceptions: [], money: 0};
      slot.active = true;
      this.tradeComplete = false;
      this.activeList.push(slot);
      this.setSize();
      $log.log(slot);
    };

    this.emptySlot = function(slot) {
      $log.debug('TradeController.removeTeam');
      if(slot.receiving.players.length) {
        slot.receiving.players.forEach((player) => {
          let origTeam = player.slot;
          origTeam.team.roster[origTeam.team.roster.indexOf(player)].background = this.playerStyling;
          origTeam.sending.money -= player.contract.yearByYear[0];
          origTeam.sending.players.splice(origTeam.sending.players.indexOf(player), 1);
        });
      }

      if(slot.sending.players.length) {
        slot.sending.players.forEach((player) => {
          let newTeam = player.sentTo;
          newTeam.receiving.players.splice(newTeam.receiving.players.indexOf(player), 1);
          newTeam.receiving.money -= player.contract.yearByYear[0];
        });
      }
      slot.team.inTrade = false;
      slot.team.background = this.teamStyling;
      let index = this.teams.indexOf(slot.team);
      this.teams[index].inTrade = false;
      this.teams[index].background = this.teamStyling;
      slot.team = {name: 'Add Team'};
      slot.active = false;
      slot.sending = {picks: [], players: [], tradeExceptions: [], money: 0};
      slot.receiving = {picks: [], players: [], tradeExceptions: [], money: 0};
      slot.capRoom = 0;
      this.tradeComplete = false;
      this.activeList.splice(this.activeList.indexOf(slot), 1);
      this.setSize();
      $log.log(slot + ' cleared');
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
        $log.log('TeamThree');
        this.emptySlot(this.teamThree);
      }
      if (this.teamFour.active) {
        $log.log('TeamFour');
        this.emptySlot(this.teamFour);
      }
      this.tradeResult = {};
      this.tradeComplete = false;
    };

    this.adjustTrade = function() {
      $log.debug('TradeController.resetTrade');
      this.tradeComplete = false;
    };

    this.cancelSend = function(player) {
      $log.debug('cancelSend');
      player.chooseDestination = false;
    };

    this.tradePlayer = function(player) {
      $log.debug('TradeController.tradePlayer');
      if(player.inTrade === true) {
        this.returnPlayer(player);
        return;
      } else {
        if (this.activeList.length === 1) {
          return;
        }
        if (this.activeList.length === 2) {
          player.inTrade = true;
          player.background = this.tradedStyling;
          this.activeList.forEach((slot) => {
            if (slot.id !== player.slot.id) {
              $log.log('Team player is not on', slot);
              slot.receiving.players.push(player);
              slot.receiving.money += player.contract.yearByYear[0];
              player.sentTo = slot;
            }
            if (slot.id === player.slot.id) {
              $log.log('team player is on', slot);
              slot.sending.players.push(player);
              slot.sending.money =+ player.contract.yearByYear[0];
            }
          });
          return;
        }
      }
      player.chooseDestination = true;
      $log.log('player.chooseDestination', player.chooseDestination);
    };

    this.returnPlayer = function(player) {
      $log.debug('TradeController.returnPlayer');
      let team = player.slot;
      if (team.sending.players.indexOf(player) !== -1) {
        team.sending.players.splice(team.sending.players.indexOf(player), 1);
        team.sending.money -= player.contract.yearByYear[0];
      }
      let newTeam = player.sentTo;
      if (newTeam.receiving.players.indexOf(player) !== -1) {
        newTeam.receiving.players.splice(newTeam.receiving.players.indexOf(player), 1);
        newTeam.receiving.money -= player.contract.yearByYear[0];
      }
      player.inTrade = false;
      player.chooseDestination = false;
      player.background = this.playerStyling;
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
      player.chooseDestination = false;
      player.inTrade = true;
      player.sentTo = newTeam;
      player.background = this.tradedStyling;
      currTeam.sending.players.push(player);
      currTeam.sending.money += player.contract.yearByYear[0];
      newTeam.receiving.players.push(player);
      newTeam.receiving.money += player.contract.yearByYear[0];
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
        let capChangeDisplay;
        let capChange = salaryGained - salaryLost;
        let finalSalary = team.team.totalSalary + capChange;
        if (capChange > 0 ) {
          capChangeDisplay = 'Increased By';
          capChange = Math.abs(capChange);
        } else {
          capChangeDisplay = 'Reduced By';
          capChange = Math.abs(capChange);
        }
        let finalCapRoom = this.salaryCap - finalSalary;
        let finalCapRoomDisplay;
        let underFinalCap;
        if (finalCapRoom < 0) {
          finalCapRoomDisplay = '-$';
          underFinalCap = {'color': 'red'};
          finalCapRoom = Math.abs(finalCapRoom);
        } else  {
          finalCapRoomDisplay = '$';
          underFinalCap = {'color': 'green'};
          finalCapRoom = Math.abs(finalCapRoom);
        }
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
          failingPoints = team.team.name + ' is over the salary cap, and cannot receive in excess of 125% of the salary they sent plus $100,000';
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
        tradeResult.capChangeDisplay = capChangeDisplay;
        tradeResult.finalCapRoom = finalCapRoom;
        tradeResult.finalCapRoomDisplay = finalCapRoomDisplay;
        tradeResult.underFinalCap = underFinalCap;
        tradeResult.playersLost = playersSent;
        tradeResult.newPlayers = playersReceived;
        tradeResult.finalSalary = finalSalary;
        tradeResult.problems = failingPoints;
        return tradeResult;
      }
      return {active: false};
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
      this.goToTop();
    };
  }
};
