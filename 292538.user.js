// ==UserScript==
// @name          Conquer Club - Game Link
// @namespace     conquerClubGameLink
// @description   Adds game info popup to game links
// @version       1.6.0
// @include       *://www.conquerclub.com/forum/viewtopic.php*
// @include       *://www.conquerclub.com/forum/ucp.php?*mode=view*
// @include       *://www.conquerclub.com/forum/ucp.php?*mode=compose*
// @include       *://www.conquerclub.com/forum/posting.php?*mode=reply*
// @include       *://www.conquerclub.com/forum/posting.php?*mode=post*
// ==/UserScript==

var gameInfoDiv; // The div that displays the game details
var gamesLoaded = false;
var games = {}; // Used as an associative array, games[gamenumber] leads to the info about that game.
var players = {}; // Used as an associative array, players[playername] leads to the info about that player.

// Just grouping some converter-functions in 1 object here.
var Converter = (function() {
  var toReturn = {}, rankToClass = {
    "New Recruit" : "r0",
    "Cook" : "r1",
    "Cadet" : "r2",
    "Private" : "r3",
    "Private 1st Class" : "r4",
    "Corporal" : "r5",
    "Corporal 1st Class" : "r6",
    "Sergeant" : "r7",
    "Sergeant 1st Class" : "r8",
    "Lieutenant" : "r9",
    "Captain" : "r10",
    "Major" : "r11",
    "Colonel" : "r12",
    "Brigadier" : "r13",
    "General" : "r14",
    "Field Marshal" : "r15",
    "Conqueror" : "r16"
  }, gameTypes = {
    S : "Standard",
    C : "Terminator",
    A : "Assassin",
    D : "Doubles",
    T : "Triples",
    Q : "Quadruples",
    P : "Polymorphic"
  }, gameTypeTeamSize = {
    D : 2,
    T : 3,
    Q : 4
  }, troops = {
    E : "Automatic",
    M : "Manual"
  }, orders = {
    S : "Sequential",
    F : "Freestyle"
  }, spoils = {
    1 : "No Spoils",
    2 : "Escalating",
    3 : "Flat Rate",
    4 : "Nuclear",
    5 : "Zombie"
  }, forts = {
    C : "Chained",
    O : "Adjacent",
    M : "Unlimited",
    P : "Parachute",
    N : "None"      
  }, stateToClass = {
    W : "waiting",
    A : "active",
    F : "finished"
  };
  toReturn.rankToClass = function(rank) {
    return rankToClass[rank] || "r0";
  };
  toReturn.gameTypeToText = function(gt) {
    return gameTypes[gt] || "Unknown";
  };
  toReturn.troopsToText = function(it) {
    return troops[it] || "Unknown";
  };
  toReturn.playOrderToText = function(po) {
    return orders[po] || "Unknown";
  };
  toReturn.spoilsToText = function(bc) {
    return spoils[bc] || "Unknown";
  };
  toReturn.fortsToText = function(ft) {
    return forts[ft] || "Unknown";
  };
  toReturn.specialGameplayToText = function(wf, tw) {
    var summary = [];
    var specialGameplay = {
      wf : { // must match an argument of the containing function
        Y : "Fog",
        N : ""
      },
      tw : { // must match an argument of the containing function
        Y : "Trench",
        N : ""
      }
    };
	if (specialGameplay.wf[wf]) summary.push(specialGameplay.wf[wf]);
	if (specialGameplay.tw[tw]) summary.push(specialGameplay.tw[tw]);
    return summary.length == 0? "None" : summary.join(", ");
  };
  toReturn.gameTypeToTeamSize = function(gt) {
    return gameTypeTeamSize[gt] || 1;
  };
  toReturn.stateToClass = function(value) {
    return stateToClass[value] || "unknown";
  };
  return toReturn;
})();

// Details of a game, basically a normal object with some predefined keys.
function GameDetails(gameNumber) {
  this.gameNumber = gameNumber;
  this.mapName = "?";
  this.gameType = "?";
  this.playOrder = "?";
  this.reinforcements = "?";
  this.spoils = "?";
  this.fogOfWar = "?";
  this.trenchWarfare = "?";
  this.troopDeploy = "?";
  this.players = [];
  this.round = "?";
}

function createGameInfoDiv() {
  gameInfoDiv = document.createElement('div');
  gameInfoDiv.id = "gameLinkInfo";
  gameInfoDiv.className = "gameLinkContent";
  document.body.appendChild(gameInfoDiv);
  return gameInfoDiv;
}

// refreshes the gameinfo div, useful if extra information was retrieved.
function refreshGameInfoDiv() {
  var gamenumber = gameInfoDiv && gameInfoDiv.getAttribute('data-gamenumber');
  if (gamenumber) {
    updateGameInfoDiv(gamenumber);
  }
}

function updateGameInfoDiv(gameNumber) {
  if (!gameInfoDiv) {
    gameInfoDiv = createGameInfoDiv();
  }
  gameInfoDiv.setAttribute('data-gamenumber', gameNumber);
  gameInfoDiv.innerHTML = createDivHtml(games[gameNumber]);
}

// Creates the HTML for the game div
function createDivHtml(gameDetails) {
  if (typeof (gameDetails) == "string" || typeof (gameDetails) == "undefined") {
    if (gameDetails == "loading") {
      return "Loading game details...";
    } else {
      return "Game details could not be found.";
    }
  }
  var divHtml = "<div class='column'><table>\
	   <tr><td>Map Name:</td><td>" + gameDetails.mapName + "</td></tr>\
	   <tr><td>Game Type:</td><td>" + Converter.gameTypeToText(gameDetails.gameType) + "</td></tr>\
	   <tr><td>Initial Troops:</td><td>" + Converter.troopsToText(gameDetails.troopDeploy) + "</td></tr>\
	   <tr><td>Play Order:</td><td>" + Converter.playOrderToText(gameDetails.playOrder) + "</td></tr>\
	   <tr><td>Spoils:</td><td>" + Converter.spoilsToText(gameDetails.spoils) + "</td></tr>\
	   <tr><td>Forts:</td><td>" + Converter.fortsToText(gameDetails.reinforcements) + "</td></tr>\
	   <tr><td>Special Gameplay:</td><td>" + Converter.specialGameplayToText(gameDetails.fogOfWar, gameDetails.trenchWarfare) + "</td></tr> \
	   <tr><td>Round:</td><td>" + gameDetails.round + "</td></tr></table>\
	   </div>\
	   <div class='column'><table>";
        
    var teamSize = gameDetails.gameType=="P"?gameDetails.polySize:Converter.gameTypeToTeamSize(gameDetails.gameType);

  for ( var playerIndex = 0; playerIndex < gameDetails.players.length; playerIndex++) {
    divHtml += "<tr class='" + Converter.stateToClass(gameDetails.state) + "'>";
    if (teamSize == 1 && playerIndex == 0)
      divHtml += "<td>Players:</td>";
    else if (playerIndex % teamSize == 0 && teamSize > 1)
      divHtml += "<td>Team " + (Math.floor(playerIndex / teamSize) + 1) + ":</td>";
    else {
      divHtml += "<td></td>";
    }

    var playerInfo = players[gameDetails.players[playerIndex].name];
    var rankClass = [], tdClass = "";
    if (playerInfo) {
      rankClass.push(playerInfo.membership.toLowerCase());
      rankClass.push(Converter.rankToClass(playerInfo.rank));
    }
    if (gameDetails.players[playerIndex].state == "Lost") {
      rankClass.push("eliminated");
    } else if (['Ready', 'Blocked', 'Waiting', 'Playing'].indexOf(gameDetails.players[playerIndex].state) > -1) {
      tdClass = " class='" + gameDetails.players[playerIndex].state + "'";
    }

    divHtml += "<td" + tdClass + "><span class='icon rank " + rankClass.join(' ') + "'>";
    divHtml += gameDetails.players[playerIndex].name;
    if (gameDetails.players[playerIndex].state == "Reserved") {
      divHtml += "(reserved)";
    } else if (gameDetails.players[playerIndex].state == "Open") {
      divHtml += "Empty";
    }
    divHtml += "</span></td></tr>";
  }
  divHtml += "</table></div>";

  return divHtml;
}

function addEventFunctions(link) {
  link.addEventListener("mouseover", function(e) {
    var gameNumber = /game=(\d+)/.exec(this.href)[1];
    if (!gamesLoaded) { // Retrieve games info if not available
      fillGameInfo();
      gamesLoaded = true;
    }
    updateGameInfoDiv(gameNumber);
    gameInfoDiv.style.left = (e.pageX + 15) + "px";
    gameInfoDiv.style.top = (e.pageY + 15) + "px";
    gameInfoDiv.style.display = "block";
  }, true);
  link.addEventListener("mouseout", function() {
    if (gameInfoDiv) {
      (gameInfoDiv.style.display = "none");
    }
  }, true);
}

// adds the handlers to all applicable anchors, and creates the initial games list.
function processGameLinks() {
	var links = document.querySelectorAll("a[href*='/game.php?game=']"); 
	// Querying the document, https://developer.mozilla.org/En/DOM/Document.querySelectorAll

  for ( var linkIndex = 0; linkIndex < links.length; linkIndex++) {
    var link = links[linkIndex];
    var gameNumber = /game=(\d+)/.exec(link.href)[1];
    games[gameNumber] = "loading";
    addEventFunctions(link);
  }
}

// retrieves the game info by retrieving it from the API
function fillGameInfo() {
  var i, gamenumbers = [];
  for (i in games) {
    if (gamenumbers.indexOf(i) == -1) {
      gamenumbers.push(i);
    }
  }
  doRequest(window.location.protocol + "//www.conquerclub.com/api.php?mode=gamelist&names=Y&gn="
      + gamenumbers.join(","), function(response) {
    var i, j, gameNumber, players, gamesXML = response.getElementsByTagName("game");
    for (i = 0; i < gamesXML.length; i++) {
      gameNumber = gamesXML[i].getElementsByTagName('game_number')[0].textContent;
      games[gameNumber] = new GameDetails(gameNumber);
      games[gameNumber].mapName = gamesXML[i].getElementsByTagName('map')[0].textContent;
      games[gameNumber].gameType = gamesXML[i].getElementsByTagName('game_type')[0].textContent;
      games[gameNumber].playOrder = gamesXML[i].getElementsByTagName('play_order')[0].textContent;
      games[gameNumber].spoils = gamesXML[i].getElementsByTagName('bonus_cards')[0].textContent;
      games[gameNumber].reinforcements = gamesXML[i].getElementsByTagName('fortifications')[0].textContent;
      games[gameNumber].fogOfWar = gamesXML[i].getElementsByTagName('war_fog')[0].textContent;
      games[gameNumber].trenchWarfare = gamesXML[i].getElementsByTagName('trench_warfare')[0].textContent;
      games[gameNumber].troopDeploy = gamesXML[i].getElementsByTagName('initial_troops')[0].textContent;
      games[gameNumber].round = gamesXML[i].getElementsByTagName('round')[0].textContent;
      games[gameNumber].state = gamesXML[i].getElementsByTagName('game_state')[0].textContent;
      games[gameNumber].polySize = gamesXML[i].getElementsByTagName('poly_slots')[0].textContent;
      games[gameNumber].players = [];
      players = gamesXML[i].getElementsByTagName("player");
      for (j = 0; j < players.length; j++) {
        games[gameNumber].players.push({
          name : players[j].textContent,
          state : players[j].getAttribute('state')
        });
      }
    }
    for (i in games) {
      if (games[i] == "loading") { // we tried to retrieve everything at once,
                                    // so apparently the game doesn't exist.
        games[i] = "not found";
      }
    }
    refreshGameInfoDiv();
    fillPlayerInfo();
  });
}

// retrieves the info of players by retrieving it from the API
function fillPlayerInfo() {
  var i, j, playerNames = [];
  for (i in games) {
    if (games[i].players) {
      for (j in games[i].players) {
        var name = escape(games[i].players[j].name);
        if (playerNames.indexOf(name) == -1) {
          playerNames.push(name);
        }
      }
    }
  }
  doRequest(window.location.protocol + "//www.conquerclub.com/api.php?mode=player&un=" + playerNames.join(","),
      function(response) {
        var playersXML = response.getElementsByTagName("player");
        for ( var i = 0; i < playersXML.length; i++) {
          var username = playersXML[i].getElementsByTagName("username")[0].textContent;
          players[username] = {
            username : username,
            rank : playersXML[i].getElementsByTagName("rank")[0].textContent,
            score : playersXML[i].getElementsByTagName("score")[0].textContent,
            membership : playersXML[i].getElementsByTagName("membership")[0].textContent
          };
        }
        refreshGameInfoDiv();
      });
}

GM_addStyle(".gameLinkContent {display: none; position: absolute; border: solid black thin; background-color: white; font-size:12px; padding: 5px; z-index:99; } \
.gameLinkContent .column { display:inline; float:left;}\
.gameLinkContent table td:nth-child(2n+1) {background-color: #EEEEEE; font-weight: bold;padding: 2px;}\
.gameLinkContent table td {vertical-align:middle}\
.gameLinkContent td span.rank {min-height: 16px; display:block; padding-left:22px;}\
.gameLinkContent tr.active td {padding-left: 17px; background: none no-repeat scroll 2px center transparent;}\
.gameLinkContent tr.active td.Ready {background-image: url('http://static.conquerclub.com/icon_status_green.gif');}\
.gameLinkContent tr.active td.Waiting {background-image: url('http://static.conquerclub.com/icon_status_red.gif');}\
.gameLinkContent tr.active td.Blocked {background-image: url('http://static.conquerclub.com/icon_status_blocked.gif');}\
.gameLinkContent tr.active td.Playing {background-image: url('http://static.conquerclub.com/icon_status_yellow.gif');}");
processGameLinks();

// Simplified method to do a request, GET is default and XML is returned.
function doRequest(url, successFunction) {
  request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      try {
        successFunction.apply(request, [request.responseXML]);
      } catch (e) {
        console.log(e);
      }
    }
  };
  request.send(null);
}
