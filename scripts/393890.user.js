// ==UserScript==
// @name        Landgrab: Umpires Tools
// @namespace   landgrab_umpires_tools
// @description (1) Highlight owned cards (2) Calculate attack plan - does not enforce borders (3) Place max armies on your territories - most useful in games where territories are maxed at 10,000
// @include     http://landgrab.net/landgrab/ViewBoard
// @include     http://landgrab.net/landgrab/HistoryPlayback
// @include     http://www.landgrab.net/landgrab/ViewBoard
// @include     http://www.landgrab.net/landgrab/HistoryPlayback
// @version     1.0.0
// @grant       none
// ==/UserScript==

var Invariant = (function(inv) {
  'use strict';
  
  inv = inv || { };
  
  inv.isTrue = function(expression) {
    if (!expression) {
      throw "Bad Invariant";
    }
  };
  
  return inv;
})(Invariant);

var JS = (function(js) {
  'use strict';

  js = js || { };
  
  js.trapError = function(delegate) {
    return function() {
      try {
        delegate();
      } catch (e) {
        var message = e + "\n";
        if (e.stack) {
          message += e.stack;
        }
        alert(message);
      }
    };
  };

  return js;
})(JS);

var DomWrapper = (function(domWrapper) {
  'use strict';
  
  domWrapper = domWrapper || {};

  domWrapper.Create = function(element) {
    var wrapper = {};
    wrapper.elements = [];
    
    if (element != null) {
      wrapper.elements.push(element);
    }
    
    wrapper.hide = function() {
      for (var i = 0; i < wrapper.elements.length; i++) {
        wrapper.elements[i].style.display = 'none';
      }
    };
    
    wrapper.show = function() {
      for (var i = 0; i < wrapper.elements.length; i++) {
      //alert(wrapper.length);
        wrapper.elements[i].style.display = '';
      }
    };
    
    wrapper.setText = function(txt) {
      for (var i = 0; i < wrapper.elements.length; i++) {
        wrapper.elements[i].innerHTML = txt;
      }
    };
   
    return wrapper;
  };
  
  return domWrapper;  
})(DomWrapper);

var Dom = (function(dom, domWrapper, doc) {
  'use strict';
  
  dom = dom || { };
  
  dom.findElement = function(expr) {
    if (expr[0] === "#") {
      var id = expr.slice(1);
      var elem = doc.getElementById(id);
      return elem;
    }
  };

  dom.find = function(expr) {
    return domWrapper.Create(dom.findElement(expr));
  };

  return dom;
})(  Dom, DomWrapper, document );


var GameBoard = (function(gameBoard, dom, win) {
  'use strict';

  gameBoard = gameBoard || { };
  
  gameBoard.getRemainingArmies = function() {
    return win.remainingArmies;
  };

  gameBoard.setRemainingArmies = function(newRemainingCount) {
    win.remainingArmies = newRemainingCount;
    dom.findElement("#stored_armies_span").innerHTML = newRemainingCount;
  };

  gameBoard.clearHighlights = function() {
    win.clearCanvas();
  };

  gameBoard.canAddArmies = function() {
    var addRemovePanel = dom.findElement("#add_or_remove");
    return addRemovePanel != null;
  };

  return gameBoard;
})(GameBoard, Dom, window);

var Teams = (function(teams, win) {
  'use strict';
  
  teams = teams || {};
  
  teams.getTeamFor = function(playerID) {
    var team = function(t) {
      t = { };
      
      t.teamID = win.playerToTeamHashtable.get(playerID);
      
      return t;
    }();
    return team;
  };

  return teams;
})(Teams, window);


var LandGrab = (function(lg, game, dom, win) {
  'use strict';
  
  lg = lg || { };

  function getTerritoryIDs() {
    return win.armyOwnerHashtable.keys();
  };
  
  function getOwner(territoryID) {
    return Territories.getTerritory(territoryID).getOwnerPlayer();
  };
  
  function isTeamGame() {
    return win.teamGame;
  };
  
  function getOwnerTeamFor(territory) {
    var territoryOwner = territory.getOwner();
    return Teams.getTeamFor(territoryOwner);
  };
  
  function getTeam() {
    var team = win.playerToTeamHashtable.get(window.beanEndUserPlayerCode);
    return team;
  };
  
  lg.isPlacingArmies = function() {
    return win.armyPlacementHashtable != null;
  };
  
 
  lg.getTerritoryHtmlIDs = function() {
    var result = [];
    var tIDs = getTerritoryIDs();
    for(var i = 0; i < tIDs.length; i++) {
      var territoryHtmlID = "terr_poly_" + i;
      result.push(territoryHtmlID);
    }
    return result;
  };
  
  lg.addToTerritory = function(territory, numberToPlace) {
      var armiesOnTargetTerritory = territory.getArmyCount();

      var remainingArmiesToPlace = GameBoard.getRemainingArmies();
      remainingArmiesToPlace -= numberToPlace;
      var newTerritoryCount = (armiesOnTargetTerritory + numberToPlace);

      territory.setArmyCount(newTerritoryCount);
      GameBoard.setRemainingArmies(remainingArmiesToPlace);
      win.setArmyLayerHTML(territory.territoryID, newTerritoryCount);
  };

  lg.canPlaceOn = function(territory) {
    if (territory.getOwner() === win.beanEndUserPlayerCode) {
      return true;
    }
    if (isTeamGame() && getTeam() === getOwnerTeamFor(territory)) {
      return true;
    }
    // todo: handle unassigned territories
    // TODO: handle army donation games
    return false;
  };
  
  lg.canAddArmies = function() {
    return game.canAddArmies();
  };
  
  lg.getArmyPlacementArea = function() {
    // control_panel_table
    var zNode = dom.findElement("#submit_ia");
    if( ! zNode ) return null;
    zNode = zNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    Invariant.isTrue(zNode.className == "control_panel_table");
    return zNode;
  };
  
  return lg;
}) ( LandGrab, GameBoard, Dom, window );


var Territories = (function(territories, lg, win) {
  'use strict';
  
  territories = territories || {};

  territories.getTerritory = function(territoryID) {
    if (territories[territoryID] != null) {
      return territories[territoryID];
    }
  
    var territory = function(t) {
      t = {};
      
      var armies = win.territories[territoryID].armies;
      t.capitol = win.territories[territoryID].capitol;
      var fortress = win.territories[territoryID].fortress;
      var leader = win.territories[territoryID].leader;
      var owner = win.territories[territoryID].owner;
      var card = win.territories[territoryID].card;
      var teamCard = win.territories[territoryID].teamCard;
      
      t.territoryID = territoryID,
      
      t.getArmyCount = function() {
        if (lg.isPlacingArmies()) {
          return win.armyPlacementHashtable.get(territoryID);
        }
        return armies;
      };
      
      t.setArmyCount = function(newCount) {
        win.armyPlacementHashtable.put(territoryID, newCount);
      };

      t.getOwner = function() {
        return win.armyOwnerHashtable.get(territoryID);
      };

      t.getRemainingCapacity = function() {
        return 10000 - t.getArmyCount();
      };

      t.hasLeader = function() {
        return leader;
      }
      
      t.getDefenseBonus = function() {
        var bonus = leader ? 1 : 0;
        if (!t.capitol) {
          bonus += fortress;
        }
        return bonus;
      };

      t.hasCard = function() {
        if (card > -1) {
          return true;
        }
        if (teamCard > -1) {
          return true;
        }
        return false;
      };

      return t;
    }();
    territories[territoryID] = territory;
    return territory;
  };

  return territories;
})(Territories, LandGrab, window);



var AddMax = (function(addMax, lg, game, dom, js) {
  'use strict';

  addMax = addMax || { };
  addMax.On = false;
  
  addMax.StandardClickHandlers = addMax.StandardClickHandlers || { };
  addMax.MaxClickHandlers = addMax.MaxClickHandlers || { };

  addMax.Click = function() {
    addMax.On = ! addMax.On;
    var territoryHtmlIDs = lg.getTerritoryHtmlIDs();
    if (addMax.On) {
    lg.getArmyPlacementArea();
      dom.find('#add_or_remove').hide();
      dom.find("#add_max_button_text").setText(" REVERT ");
      for (var i = 0; i < territoryHtmlIDs.length; i++) {
	    dom.findElement("#" + territoryHtmlIDs[i]).onclick = addMax.MaxClickHandlers[i];
      }
    }
    else { 
      dom.find('#add_or_remove').show();
      dom.find("#add_max_button_text").setText(" ADD MAX ");
      for (var i = 0; i < territoryHtmlIDs.length; i++) {
	    dom.findElement("#" + territoryHtmlIDs[i]).onclick = addMax.StandardClickHandlers[i];
	  }
    }
  };
  
  addMax.CalculateMax = function(remainingArmiesToPlace, remainingTerritoryCapacity) {
    if (remainingTerritoryCapacity > remainingArmiesToPlace) {
      return remainingArmiesToPlace;
    } else {
      return remainingTerritoryCapacity;
    }
  };
  
  addMax.DoAddMax = function(territoryID) {
    var territory = Territories.getTerritory(territoryID);
    if (!lg.canPlaceOn(territory)) {
      return;
    }
  
    var remainingArmiesToPlace = GameBoard.getRemainingArmies();
    var remainingTerritoryCapacity = territory.getRemainingCapacity();
    var willPlace = addMax.CalculateMax(remainingArmiesToPlace, remainingTerritoryCapacity);
    lg.addToTerritory(territory, willPlace);
  };
  
  addMax.Init = function() {
    if (!game.canAddArmies()) {
      return;
    }
   
    // setup button
    var zNode = dom.findElement("#submit_ia");
    if( ! zNode ) return;
    zNode = zNode.parentNode.parentNode;
    var button = document.createElement('td');
    //button.class = "control_panel_table";
    button.innerHTML = 
        '<table id="add_max" class="button_table" onclick="doButtonClick(this, addMax)">' +
        '<tbody>' +
        '<tr>' +
        '<td class="button_table_left"></td>' +
        '<td id="add_max_button_text"> ADD MAX </td>' +
        '<td class="button_table_right"></td>' +
        '</tr>' +
        '</tbody>' +
        '</table>';
    zNode.appendChild(button);
    dom.findElement("#add_max").onclick = js.trapError(addMax.Click);
      
    // pull out the original click handlers
    // calculate new click handlers
    var territoryHtmlIDs = lg.getTerritoryHtmlIDs();
    for(var i = 0; i < territoryHtmlIDs.length; i++) {
      addMax.StandardClickHandlers[i] = dom.findElement("#" + territoryHtmlIDs[i]).onclick;
      addMax.MaxClickHandlers[i] = js.trapError((function(id) { return function() { addMax.DoAddMax(id); } })(i));
    }
      
  };

  addMax.Init();

  return addMax;
})(  AddMax, LandGrab, GameBoard, Dom, JS );


var AttackPlan = (function(attackPlan, lg, gm, dom, js, win) {
  'use strict';

  attackPlan = attackPlan || { };
  attackPlan.On = false;
  attackPlan.StandardClickHandlers = attackPlan.StandardClickHandlers || { };
  attackPlan.AttackPlanClickHandlers = attackPlan.AttackPlanClickHandlers || { };

  var startTerritory = null;
  var attacks = [];
  var results = [];

  var __stats = {
    "3/2-even-odds": [
      { armiesAbove: 1000, good: .82, average: .853, bad:  .89 },
      { armiesAbove:  100, good: .79, average: .853, bad:  .91 },
      { armiesAbove:   25, good: .73, average: .853, bad:  .98 },
      { armiesAbove:    1, good: .64, average: .853, bad: 1.28 },
      { armiesAbove:    0, good: .34, average: .516, bad: 1.55 },
    ],
    "3/2-attacker+1": [
      { armiesAbove: 1000, good: .49, average: .507, bad:  .53 },
      { armiesAbove:  100, good: .47, average: .507, bad:  .54 },
      { armiesAbove:   25, good: .43, average: .507, bad:  .58 },
      { armiesAbove:    1, good: .38, average: .507, bad: 0.76 },
      { armiesAbove:    0, good: .11, average: .210, bad: 0.63 },
    ],
    "3/2-defender+1": [
      { armiesAbove: 1000, good: 1.20, average: 1.255, bad: 1.31 },
      { armiesAbove:  100, good: 1.17, average: 1.255, bad: 1.34 },
      { armiesAbove:   25, good: 1.07, average: 1.255, bad: 1.44 },
      { armiesAbove:    1, good:  .94, average: 1.255, bad: 1.88 },
      { armiesAbove:    0, good:  .51, average: 1.025, bad: 3.08 },
    ],
    "3/2-defender+2": [
      { armiesAbove: 1000, good: 1.60, average: 1.67, bad: 1.74 },
      { armiesAbove:  100, good: 1.55, average: 1.67, bad: 1.79 },
      { armiesAbove:   25, good: 1.42, average: 1.67, bad: 1.92 },
      { armiesAbove:    1, good: 1.25, average: 1.67, bad: 2.51 },
      { armiesAbove:    0, good: 1.00, average: 2.00, bad: 6.00 },
    ],
    "2/2-even-odds": [
      { armiesAbove: 1000, good: 1.50, average: 1.566, bad: 1.63 },
      { armiesAbove:  100, good: 1.46, average: 1.566, bad: 1.68 },
      { armiesAbove:   25, good: 1.33, average: 1.566, bad: 1.80 },
      { armiesAbove:    1, good: 1.17, average: 1.566, bad: 2.35 },
      { armiesAbove:    0, good: 0.36, average:  .728, bad: 2.18 },
    ],
    "2/2-attacker+1": [
      { armiesAbove: 1000, good: .96, average: 1.000, bad: 1.04 },
      { armiesAbove:  100, good: .93, average: 1.000, bad: 1.07 },
      { armiesAbove:   25, good: .85, average: 1.000, bad: 1.15 },
      { armiesAbove:    1, good: .75, average: 1.000, bad: 1.50 },
      { armiesAbove:    0, good: .17, average: 0.342, bad: 1.03 },
    ],
    "2/2-defender+1": [
      { armiesAbove: 1000, good: 2.17, average: 2.26, bad: 2.35 },
      { armiesAbove:  100, good: 2.10, average: 2.26, bad: 2.42 },
      { armiesAbove:   25, good: 1.92, average: 2.26, bad: 2.60 },
      { armiesAbove:    1, good: 1.70, average: 2.26, bad: 3.39 },
      { armiesAbove:    0, good:  .70, average: 1.40, bad: 4.20 },
    ],
  };

  var attackStats = {
    "3/2-0/0": __stats["3/2-even-odds"],
    "3/2-1/1": __stats["3/2-even-odds"],
    "3/2-1/0": __stats["3/2-attacker+1"],
    "3/2-0/1": __stats["3/2-defender+1"],
    "3/2-1/2": __stats["3/2-defender+1"],
    "3/2-0/2": __stats["3/2-defender+2"],
    "2/2-0/0": __stats["2/2-even-odds"],
    "2/2-1/1": __stats["2/2-even-odds"],
    "2/2-1/0": __stats["2/2-attacker+1"],
    "2/2-0/1": __stats["2/2-defender+1"],
  };

  var findStats = function(statsSet, armySize) {
    for (var i = 0; i < statsSet.length; i++) {
      if (armySize > statsSet[i].armiesAbove) {
        return statsSet[i];
      }
    }
    throw new Error("Cannot find stats set for army size " + armySize);
  };

  var calculateAttack = function(territory) {
    var armyOnTerritory = territory.getArmyCount();

    var attackBonus = startTerritory.hasLeader() ? 1 : 0;
    var defenseBonus = territory.getDefenseBonus();
    var maximumAttackers = territory.capitol ? 2 : 3;
    var attackCategory = maximumAttackers + "/2-" + attackBonus + "/" + defenseBonus;
    //alert(attackCategory);

    var statsSet = attackStats[attackCategory];
    var stats = findStats(statsSet, armyOnTerritory);
    return { good: armyOnTerritory * stats.good, average: armyOnTerritory * stats.average, bad: armyOnTerritory * stats.bad };
  };

  var calculateRemaining = function() {
    var start = startTerritory;
    var startingArmySize = start.getArmyCount();
    var losses = { bad: 0.0, average: 0.0, good: 0.0 };
    var leftBehind = 0;
    
    for (var i = 0; i < results.length; ++i) {
      leftBehind++;
      losses.bad += results[i].bad;
      losses.average += results[i].average;
      losses.good += results[i].good;
    }
    
    var startArmy = start.getArmyCount() * 1.0;
    var armySize =  "<font color='red'>" + Math.round(startArmy - leftBehind - losses.bad) + "</font>" +
                    " / " + 
                    Math.round(start.getArmyCount() - leftBehind - losses.average) + 
                    " / " +
                    "<font color='green'>" + Math.round(start.getArmyCount() - leftBehind - losses.good) + "</font>" +
                    " / " +
                    "<font color='yellow'>" + Math.round(start.getArmyCount() - leftBehind) + "</font>";
    var lossesOut = "<font color='red'>" + Math.round(losses.bad) + "</font>" + 
                    " / " + 
                    Math.round(losses.average) + 
                    " / " + 
                    "<font color='green'>" + Math.round(losses.good) + "</font>" +
                    " / " +
                    "<font color='yellow'>0</font>";
    dom.findElement('#army_size_display').innerHTML = (armySize + " left.<br>" + lossesOut + " losses.<br>" + leftBehind + " left behind.");
  };

  var highlight = function(territory) {
	var fillOptions = {};
	fillOptions.lineWidth = 14;
	var continentId = win.terrToContMap.get(startTerritory.territoryID);
	var continentColour = win.continents[continentId].color;
    var highlightColor = win.players[startTerritory.getOwner()].color
	fillOptions.lineColor = continentColour;
	fillOptions.fillColor = highlightColor;
    win.highlightTerritory(territory.territoryID,255,255,255,fillOptions);
  };

  var startAttack = function(territory) {
    startTerritory = territory;
    dom.findElement('#army_size_display').innerHTML = territory.getArmyCount();
    highlight(territory);
  };

  var attack = function(territory) {
    var attacker = startTerritory.getOwner();
    
    if (territory.getOwner() === attacker) {
      return;
    }
    
    for (var i = 0; i < attacks.length; i++) {
      if (attacks[i].territoryID === territory.territoryID) {
        return;
      }
    }
    
    // todo: has territory ajoining?
    results.push(calculateAttack(territory));
    attacks.push(territory);  
    calculateRemaining();
    highlight(territory);
  };
  
  attackPlan.DoPlanAttack = function(territoryID) {
    var territory = Territories.getTerritory(territoryID);
    if (startTerritory === null) {
      startAttack(territory);
    } else {
      attack(territory);
    }
  };
  
  attackPlan.Activate = function() {
    startTerritory = null;
    attacks = [];
    results = [];
    var territoryHtmlIDs = lg.getTerritoryHtmlIDs();
    for (var i = 0; i < territoryHtmlIDs.length; i++) {
      //if (i === territoryHtmlIDs.length) break;
      dom.findElement("#" + territoryHtmlIDs[i]).onclick = attackPlan.AttackPlanClickHandlers[i];
    }
    dom.find('#start_attack_plan').hide();
    dom.find('#reset_attack_plan').show();
    dom.find('#disable_attack_plan').show();
    dom.find('#army_size_display').show();
  };
  
  attackPlan.Reset = function() {
    gm.clearHighlights();
    startTerritory = null;
    attacks = [];
    results = [];
    // todo: remove highlight
  };

  attackPlan.Disable = function() {
    attackPlan.Reset();
    var territoryHtmlIDs = lg.getTerritoryHtmlIDs();
    for (var i = 0; i < territoryHtmlIDs.length; i++) {
      dom.findElement("#" + territoryHtmlIDs[i]).onclick = attackPlan.StandardClickHandlers[i];
	}
    dom.findElement('#start_attack_plan').show();
    dom.findElement('#reset_attack_plan').hide();
    dom.findElement('#disable_attack_plan').hide();
    dom.findElement('#army_size_display').hide();
    // todo: remove highlight
  };

  attackPlan.Init = function() {
    // setup button
	var zNode = document.getElementById("control_panel_upper");
    if (zNode == null) return;

	var activateButton = document.createElement('div');
	activateButton.class = "control_panel_table";
	activateButton.innerHTML = 
		'<table style="padding-right: 5px; padding-left:5px" id="start_attack_plan"><tr><td>' +
		'<table class="button_table"><tr><td class="button_table_left"</td><td>START ATTACK PLAN</td><td class="button_table_right"</td></table>' +
		'</td></tr></table>';
    zNode.appendChild(activateButton);
    dom.findElement("#start_attack_plan").onclick = js.trapError(attackPlan.Activate);

	var resetButton = document.createElement('div');
	resetButton.class = "control_panel_table";
	resetButton.innerHTML = 
		'<table style="padding-right: 5px; padding-left:5px" id="reset_attack_plan"><tr><td>' +
		'<table class="button_table"><tr><td class="button_table_left"</td><td>RESET ATTACK PLAN</td><td class="button_table_right"</td></table>' +
		'</td></tr></table>';
    zNode.appendChild(resetButton);
    dom.findElement("#reset_attack_plan").onclick = js.trapError(attackPlan.Reset);

	var disableButton = document.createElement('div');
	disableButton.class = "control_panel_table";
	disableButton.innerHTML = 
		'<table style="padding-right: 5px; padding-left:5px" id="disable_attack_plan"><tr><td>' +
		'<table class="button_table"><tr><td class="button_table_left"</td><td>DISABLE ATTACK PLAN</td><td class="button_table_right"</td></table>' +
		'</td></tr></table>';
    zNode.appendChild(disableButton);
    dom.findElement("#disable_attack_plan").onclick = js.trapError(attackPlan.Disable);

	var armySizeDisplay = document.createElement('div');
	armySizeDisplay.class = "control_panel_table";
	armySizeDisplay.innerHTML = '<div id="army_size_display"></div>';
    zNode.appendChild(armySizeDisplay);

    dom.findElement('#start_attack_plan').show();
    dom.findElement('#reset_attack_plan').hide();
    dom.findElement('#disable_attack_plan').hide();
    dom.findElement('#army_size_display').hide();

    // pull out the original click handlers
    // calculate new click handlers
    var territoryHtmlIDs = lg.getTerritoryHtmlIDs();
    for(var i = 0; i < territoryHtmlIDs.length; i++) {
      attackPlan.StandardClickHandlers[i] = dom.findElement("#" + territoryHtmlIDs[i]).onclick;
      attackPlan.AttackPlanClickHandlers[i] = js.trapError((function(id) { return function() { attackPlan.DoPlanAttack(id); } })(i));
    }
  };

  attackPlan.Init();

  return attackPlan;
})(  AddMax, LandGrab, GameBoard, Dom, JS, window );



var CardHighlighter = (function(cardHighlighter, lg, dom, win) {
  'use strict';

  cardHighlighter = cardHighlighter || { };
  
  var highlight = function(territory) {
	var fillOptions = {};
	fillOptions.lineWidth = 14;
	var continentId = win.terrToContMap.get(territory.territoryID);
	var continentColour = win.continents[continentId].color;
    var highlightColor = win.players[territory.getOwner()].color
	//fillOptions.lineColor = continentColour;
	//fillOptions.fillColor = highlightColor;
    win.highlightTerritory(territory.territoryID,255,255,255,fillOptions);
  };

  cardHighlighter.Init = function() {
    var territoryHtmlIDs = lg.getTerritoryHtmlIDs();
    for(var i = 0; i < territoryHtmlIDs.length; i++) {
      var territory = Territories.getTerritory(i);
      if (territory.hasCard()) {
        highlight(territory);
      }
    }
  };

  cardHighlighter.Init();

  return cardHighlighter;
})(  CardHighlighter, LandGrab, Dom, window );

///*
//var AdvancedAttack = (function(advanced, lg, dom, js) {
//  'use strict';
//  
//  advanced = advanced || { };
//  
//  advanced.DoDoubleClick = function(territoryID) {
//  };
//  
//  advanced.Init = function() {
//    // pull out the original click handlers
//    // calculate new click handlers
//    var territoryHtmlIDs = lg.getTerritoryHtmlIDs();
//    for(var i = 0; i < territoryHtmlIDs.length; i++) {
//      var clickHandler = js.trapError((function(id) { return function() { advanced.DoDoubleClick(id); } })(i));
//      //dom.findElement("#" + territoryHtmlIDs[i]).ondblclick = clickHandler;
//    }
//  };
//
//  advanced.Init();
//  
//}) (AdvancedAttack, LandGrab, Dom, JS);
//*/
//
//
//
//
//
//
//var dom = Dom;
//var js = JS;
//
//function nextAction(){
//  window.updateHistoryActionDiv(window.currentActionNdx+1);
//} 
//
//function doFastPlayback(){
///*
//  alert(window.turnActions.length);
//  for (var i = 0; i < window.turnActions.length; ++i) {
//    alert("" + i + " " + window.turnActions[i].machineData + " " + window.turnActions[i].type);
//    var output = "" + i + " ";
//    for (var key in window.turnActions[i]) { 
//      output += key + ":" + window.turnActions[i][key] + " ";
//    }
//    alert(output);
//  };
//
//Found out we only want to look at window.turnActions[i].type = 8 (attack)
//*/
//
///*
//THis gets called. So we want to advance currentActionNdx
//function nextAction(){
//
//updateHistoryActionDiv(currentActionNdx+1);
//} 
//*/
//
//
//// This needs to call back on itself to vary the timer
///*
//  alert(window.turnActions[currentActionNdx].type);
//  if (window.turnActions[currentActionNdx].type == 8) {
//    window.playbackIntervalID=window.setInterval(nextAction,1500); 
//  } else {
//    window.playbackIntervalID=window.setInterval(nextAction,1500); 
//  }
//  */
//  //$("start_playback_label").innerHTML="STOP AUTOPLAY";
//  //disableButton("action_continue");
//
//    if (window.turnActions[currentActionNdx].type == 8) {
//      while (currentActionNdx < window.turnActions.length) {
////             window.turnActions[currentActionNdx].
//        currentActionNdx++;
//      }
//    }
//  
//    window.nextAction();
//    window.playbackIntervalID=window.setInterval(doFastPlayback,1500); 
//} 
//
//
//var playback = document.getElementById('start_playback');
//if (playback != null) {
//  var parent = playback.parentNode.parentNode;
//    var button = document.createElement('td');
//    //button.class = "control_panel_table";
//    button.innerHTML = 
//        '<table id="fast_playback" class="button_table" onclick="doButtonClick(this, doFastPlayback)">' +
//        '<tbody>' +
//        '<tr>' +
//        '<td class="button_table_left"></td>' +
//        '<td id="add_max_button_text"> FAST PLAYBACK </td>' +
//        '<td class="button_table_right"></td>' +
//        '</tr>' +
//        '</tbody>' +
//        '</table>';
//  parent.appendChild(button);
//
//  dom.findElement("#fast_playback").onclick = js.trapError(doFastPlayback);
//
//}

