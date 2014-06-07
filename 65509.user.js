// Watch this game script for ConquerClub
// version 1.2.4
// 2010-02-09
// Copyright (c) 2009, Daniel Pavlyuchkov
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//
// ==UserScript==
// @name              Conquer Club - Watch this game
// @namespace         http://userscripts.org
// @description       Simple script to add ability to watch certain games you like
// @include           http://*conquerclub.com/player.php*
// @include           http://*conquerclub.com/game.php*
// @exclude           http://*conquerclub.com/player.php?mode=ratings*
// ==/UserScript==


//---------   Naming conventions  ---------//
//
//  VARS  
//
//  variables: camel case (starting with lowercase)
//  constants: camel case (starting with uppercase) 
//  global variables: underscore separated uppercase words
//  
//  FUNCTIONS
//
//  get* - get data (usually over AJAX)
//  add* - draw HTML from the object they receive
//  update* - redraw (or update) HTML from the object they receive
//  clear* - clear HTML for further update, reset some global variables 
//  toggle* - switch some entity between 2 states
//  compare* - comparision functions. Shoud be named as compareObjectField
//
//  OBJECTS
//
//  camel case (starting with lowercase) and suffixed with "Object"
//


//---------   Constants   ---------//

const WatchLinkClass = "gameno watch";
const UnwatchLinkClass = "gameno unwatch";
const WatchLinkText = "Watch game";
const UnwatchLinkText = "Unwatch game";
const IsInside = /game.php\?game=[0-9]*$/.test(window.location.href);
const MapNormal = "http://static.conquerclub.com/map_normal.png";
const MapBeta = "http://static.conquerclub.com/map_beta.png";


//---------   Global variables   ---------//  

var Games_Array = new Array();
var Maps_Array = new Array();
var Players_Array = new Array();


//---------   Prototyping   ---------//  

Array.prototype.has = function(obj) {
  return this.indexOf(obj) !== -1;
};

String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, '');
};


//---------   Objects definition   ---------//

function gameObject(gameNumber, tournament, privateGame, speedGame, map, gameType, initialTroops, playOrder, bonusCards, fortifications, warFog, round, timeRemaining, players) {
  this.gameNumber = gameNumber;
  this.tournament = tournament;
  this.privateGame = privateGame;
  this.speedGame = speedGame;
  this.map = map;
  this.gameType = gameType;
  this.initialTroops = initialTroops;
  this.playOrder = playOrder;
  this.bonusCards = bonusCards;
  this.fortifications = fortifications;
  this.warFog = warFog;
  this.round = round;
  this.timeRemaining = timeRemaining;
  this.players = players;
}

function playerObject(userid, username, rank, rating, state) {
  this.userid = userid;
  this.username = username;
  this.rank = rank;
  this.rating = rating;
  this.state = state;
}

function mapObject(mapName, thumbnail, small, status) {
  this.mapName = mapName;
  this.thumbnail = thumbnail;
  this.small = small;
  this.status = status;
}

//---------   Tab functions   ---------//

/**
  *  Add "watched" tab
  *
  */
function addTab() {
  var ul, li, a, span;

  ul = document.getElementById("invertedtabs");
  ul = ul.childNodes[1];
  li = document.createElement("li");
  a = document.createElement('a');
  span = document.createElement("span");
  li.appendChild(a);
  a.href = "javascript:void(0);";
  a.addEventListener("click", listTab, false);
  a.appendChild(span);
  span.innerHTML = "Watched [ <span id='watchedGameNumber' class='inbox'>" + getWatchedGamesNumber() + " </span>]";
  ul.appendChild(li);
}

/**
  *  Draw "watched" tab
  *
  */
function addTabContent() {
  var i, count;

  count = "even";
  Games_Array.sort(compareGamesTime);

  for (i = 0; i < Games_Array.length; i++) {
    count = (count == "odd") ? "even" : "odd";
    addGameRow(Games_Array[i], count);
  }
  for (i = 0; i < Maps_Array.length; i++) {
    getGameMap(Maps_Array[i]);
  }
  for (i = 0; i < Players_Array.length; i++) {
    getGamePlayer(Players_Array[i]);
  }
  addWatchLinks();
}

/**
  *  Clear and prepare table for our "watched" tab
  *
  */
function clearTabContent() {
  var nav, content, header, table, newTable, tbody, trHeader, tHead, th;
  
  nav = document.getElementById("current");
  nav.id = '';
  nav = document.getElementById("invertedtabs");
  nav = nav.childNodes[1].lastChild.id = "current";
  
  content = document.getElementById("middleColumn");
  content = content.childNodes[1];
  
  header = content.getElementsByTagName("h3");
  header = header[0];
  header.innerHTML = "Games you are watching";
  
  table = content.getElementsByTagName("table");
  table = table[0];
  
  //Create header row
  newTable = document.createElement("table");
  newTable.className = "listing";
  newTable.id = "games-table";
  
  tbody = document.createElement("tbody");
  newTable.appendChild(tbody);  
  trHeader = tbody.insertRow(0);
  
  th = document.createElement("th");
  trHeader.appendChild(th);
  th = document.createElement("th");
  trHeader.appendChild(th);
  th.innerHTML = "Game Type<br>Initial Troops<br>Play Order";
  th = document.createElement("th");
  trHeader.appendChild(th);
  th.innerHTML = "Map";
  th = document.createElement("th");
  trHeader.appendChild(th);
  th.innerHTML = "Spoils<br>Reinforcements<br>Fog of War";
  th = document.createElement("th");
  trHeader.appendChild(th);
  th.innerHTML = "Round<br>Time Remaining";
  th = document.createElement("th");
  trHeader.appendChild(th);
  th.innerHTML = "Players";
  
  table.parentNode.replaceChild(newTable, table);
  
  //reset global variables
  Games_Array = new Array();
  Players_Array = new Array();
  Maps_Array = new Array();
}

/**
  *  Update number of games at tab
  *
  */
function updateTabNumber() {
  var span;

  span = document.getElementById("watchedGameNumber");
  if (span) {
    span.innerHTML = getWatchedGamesNumber() + ' ';
  }
}

/**
  *  onClick handler for "watched" tab
  *
  */
function listTab() {
  var games, gameNumber;
   
  clearTabContent();
  games = getWatchedGames();

  for (gameNumber in games) {
    getGameRow(games[gameNumber]);
  }
}


//---------   Watch links functions   ---------//

/**
 *  Add "Watch game" links.
 *
 */
function addWatchLinks() {
  var gameNumber, gamesArray, a, allGames, thisGame, i, ul, br, span;
  
  if (IsInside) {
     ul = document.getElementById("players");
     br = document.createElement("br");
     a = document.createElement('a');
     span = document.createElement("span");
     
     ul.parentNode.insertBefore(br, ul.previousSibling.previousSibling);
     ul.parentNode.insertBefore(span, ul.previousSibling.previousSibling);
     
     span.appendChild(document.createTextNode('['));
     span.appendChild(a);
     span.appendChild(document.createTextNode(']'));
  
     gameNumber = /[0-9]*$/.exec(window.location.href);
     gameNumber = gameNumber.toString();
     gamesArray = getWatchedGames();
  
     if (gamesArray.has(gameNumber)) {
       a.innerHTML = UnwatchLinkText.toLowerCase();
       a.className = "unwatch";
     } else {
       a.innerHTML = WatchLinkText.toLowerCase();
       a.className = "watch";
     }
  
     a.href = "javascript:void(0);";
     a.addEventListener("click", toggleWatchLink, false);
  } else {   
    allGames = document.evaluate("//span[@class='gameno']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
       
    for (i = 0; i < allGames.snapshotLength; i++) {
      thisGame = allGames.snapshotItem(i);
      gameNumber = thisGame.textContent;
    
      a = document.createElement('a');
      thisGame.parentNode.appendChild(a);
       
      gamesArray = getWatchedGames();
    
      if (gamesArray.has(gameNumber)) {
        a.innerHTML = UnwatchLinkText;     
        a.className = UnwatchLinkClass;
      } else {
        a.innerHTML = WatchLinkText;
        a.className = WatchLinkClass;
      }
       
      a.href = "javascript:void(0);";
      a.addEventListener("click", toggleWatchLink, false);
    }
  }
}

/**
 *  OnClick handler for "Watch game" links.
 *
 */
function toggleWatchLink() {
  var gameNumber, className, text, indicator;
  
  if (IsInside) {
    gameNumber = /[0-9]*$/.exec(window.location.href);
    gameNumber = gameNumber.toString();
    
    if (this.innerHTML.toLowerCase() == WatchLinkText.toLowerCase()) {
      text = UnwatchLinkText.toLowerCase();
      className = "unwatch";
      indicator = true;
    } else {
      text = WatchLinkText.toLowerCase();
      className = "watch";
      indicator = false;
    }
  } else {    
    if (this.parentNode.childNodes[0].tagName == "SPAN"){
      gameNumber = this.parentNode.childNodes[0].innerHTML;
    } else {
      gameNumber = this.parentNode.childNodes[1].innerHTML;
    }
    
    if (this.innerHTML == WatchLinkText) {      
      text = UnwatchLinkText;
      className = UnwatchLinkClass;
      indicator = true;
    } else {
      text = WatchLinkText;
      className = WatchLinkClass;
      indicator = false;
    }
  }
  
  this.innerHTML = text;
  this.className = className;
  toggleGame(gameNumber.trim(), indicator);
  updateTabNumber();  
}


//---------   Game object functions   ---------//

/**
  *  Update "watched" tab by adding new games there
  *
  *  @var gameObject - game data
  *  @var string - row class name
  */
function addGameRow(game, color) {
  var table, tr, td, ul, li, span, a, i;
  
  //initial var preparation
  
  switch (game.gameType) {
    case 'S': game.gameType = "Standard"; break;
    case 'C': game.gameType = "Terminator"; break;
    case 'A': game.gameType = "Assassin"; break;
    case 'D': game.gameType = "Doubles"; break;
    case 'T': game.gameType = "Triples"; break;
    case 'Q': game.gameType = "Quadruples "; break;
  }
  switch (game.initialTroops) {
    case 'E': game.initialTroops = "Automatic"; break;
    case 'M': game.initialTroops = "Manual"; break;
  }
  switch (game.playOrder) {
    case 'S': game.playOrder = "Sequential"; break;
    case 'F': game.playOrder = "Freestyle"; break;
  }
  switch (game.bonusCards) {
    case '1': game.bonusCards = "No Spoils"; break;
    case '2': game.bonusCards = "Escalating"; break;
    case '3': game.bonusCards = "Flat Rate"; break;
    case '4': game.bonusCards = "Nuclear"; break;
  }
  switch (game.fortifications) {
    case 'C': game.fortifications = "Chained"; break;
    case 'O': game.fortifications = 'Adjacent'; break;
    case 'M': game.fortifications = "Unlimited"; break;
  }
  game.warFog = (game.warFog == 'Y') ? "Yes" : "No";
  
  table = document.getElementById("games-table");
  
  if (game.privateGame == 'Y') {
    tr = document.createElement("tr");
    tr.className = color + '2';
    
    td = tr.insertCell(0);
    td.colSpan = 7;
    if (game.tournament) {
      td.innerHTML = "<strong>Tournament Game: " + game.tournament + "</strong>";
    } else {
      if (game.speedGame == 'Y') {
        td.innerHTML = "<strong>Private Speed Game</strong>";
      } else {
        td.innerHTML = "<strong>Private Game</strong>";
      }
    }
    table.appendChild(tr);
  }
    
  tr = document.createElement("tr");
  tr.className = color;
  td = tr.insertCell(0);
  td.style.textAlign = "center";
  td.innerHTML = "<span class='gameno'>" + game.gameNumber + "</span>" + "<a href='game.php?game=" + game.gameNumber + "' class='gameno'>Enter Game</a>";
  
  tr.insertCell(1).innerHTML = game.gameType + "<br>" + game.initialTroops + "<br>" + game.playOrder;
  tr.insertCell(2).innerHTML = game.map;
  
  tr.insertCell(3).innerHTML = game.bonusCards + "<br>" + game.fortifications + "<br>" + game.warFog;
  if (game.round != 0) {
    if (game.timeRemaining != 0) {
      tr.insertCell(4).innerHTML = "Round " + game.round + "<br>" + game.timeRemaining;
    } else {
      tr.insertCell(4).innerHTML = "Round " + game.round;
    }
  } else {
    tr.insertCell(4).innerHTML = '';
  }
  
  ul = document.createElement("ul");
  ul.className = "players";
  
   for (i = 0; i < game.players.length; i++) {
    li = document.createElement("li");

    if (game.timeRemaining != 0) {
      switch (game.players[i].state) {
        case "Lost": li.className = "status_red"; break;
        case "Blocked": li.className = "status_blocked"; break;
        case "Waiting": li.className = "status_red"; break;
        case "Playing": li.className = "status_yellow"; break;
        case "Ready": li.className = "status_green"; break;
        case "Won": li.className = "status_green"; break;
      }
    }
    a = document.createElement('a');
    a.href = "forum/memberlist.php?mode=viewprofile&u=" + game.players[i].userid;
    a.innerHTML = game.players[i].userid;

    if (game.players[i].state == "Lost") {
      span = document.createElement("span");
      span.className = "eliminated";
      li.appendChild(span);
      span.appendChild(a);
    } else {
      li.appendChild(a);
    }

    ul.appendChild(li);
  }
  tr.insertCell(5).appendChild(ul);
  table.appendChild(tr);
}

/**
 *  Fetch the game for "watched" tab via AJAX.
 *
 *  @var int - game number
 */
function getGameRow(gameNumber) {
  var requestPage, request, data, table, games, game, players, player, playersArray, i, e;
  var gameNumber, tournament, privateGame, speedGame, map, gameType, initialTroops, playOrder, bonusCards, fortifications, warFog, round, timeRemaining;
 
  requestPage = window.location.protocol + "//www.conquerclub.com/api.php?mode=gamelist&gn=" + gameNumber;
  request = new XMLHttpRequest();
  request.open("GET", requestPage, true);
  request.overrideMimeType("text/xml");
 
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      try {
        data = request.responseXML;
        games = data.getElementsByTagName("games")[0].attributes;
        if (games.getNamedItem("total").nodeValue != '0') {
          gameNumber = data.getElementsByTagName("game_number")[0].childNodes[0].nodeValue;
          tournament = '';
          if (data.getElementsByTagName("tournament")[0].childNodes.length > 0) {
            tournament = data.getElementsByTagName("tournament")[0].childNodes[0].nodeValue;
          }
          privateGame = data.getElementsByTagName("private")[0].childNodes[0].nodeValue;
          speedGame = data.getElementsByTagName("speed_game")[0].childNodes[0].nodeValue;
          map = data.getElementsByTagName("map")[0].childNodes[0].nodeValue;
          
          //add unique maps to global array
          if (!(Maps_Array.has(map))) {
            Maps_Array.push(map);
          }
          
          gameType = data.getElementsByTagName("game_type")[0].childNodes[0].nodeValue;
          initialTroops = data.getElementsByTagName("initial_troops")[0].childNodes[0].nodeValue;
          playOrder = data.getElementsByTagName("play_order")[0].childNodes[0].nodeValue;
          bonusCards = data.getElementsByTagName("bonus_cards")[0].childNodes[0].nodeValue;
          fortifications = data.getElementsByTagName("fortifications")[0].childNodes[0].nodeValue;
          warFog = data.getElementsByTagName("war_fog")[0].childNodes[0].nodeValue;
          round = data.getElementsByTagName("round")[0].childNodes[0].nodeValue;
          timeRemaining = data.getElementsByTagName("time_remaining")[0].childNodes[0].nodeValue;
          players = data.getElementsByTagName("player");
 
          playersArray = new Array();
          for (i = 0; i < players.length; i++) {
            player = players[i];
            player = new playerObject(player.childNodes[0].nodeValue, '', '', '', player.attributes.getNamedItem("state").nodeValue);
            playersArray.push(player);
            
            //add unique players to global array
            if (!(Players_Array.has(player.userid))) {
              Players_Array.push(player.userid);
            }
          }
 
          game = new gameObject(gameNumber, tournament, privateGame, speedGame, map, gameType, initialTroops, playOrder, bonusCards, fortifications, warFog, round, timeRemaining, playersArray);
    
          if (Games_Array.push(game) == getWatchedGamesNumber()) {
            addTabContent();
          }
        }
      } catch (e) {
        // alert(e.message);
      }
    }
  };
  request.send(null);
}


//---------   Player object functions   ---------//

/**
 *  Update "watched" tab by adding new games there
 *
 *  @var playerObject - player data
 */
function updateGamesPlayers(player) {  
  var players, profileLink, ratingLink, className, title, i;

  players = document.evaluate("//ul[@class='players']/li/descendant::*[contains(text(), '" + player.userid + "')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; i < players.snapshotLength; i++) {
    profileLink = players.snapshotItem(i);
  
    // rank switch
    // freemium/premium logic broken. for now all are premiums
    switch (player.rank) {
      case "New Recruit": className = "rank p r0"; title = "New Recruit " + player.username + "'s"; break;
      case "Cook": className = "rank p r1"; title = "Cook " + player.username + "'s"; break;
      case "Cadet": className = "rank p r2"; title = "Cadet " + player.username + "'s"; break;
      case "Private": className = "rank p r3"; title = "Private " + player.username + "'s"; break;
      case "Private 1st Class": className = "rank p r4"; title = "Private 1st Class " + player.username + "'s"; break;
      case "Corporal": className = "rank p r5"; title = "Corporal " + player.username + "'s"; break;
      case "Corporal 1st Class": className = "rank p r6"; title = "Corporal 1st Class " + this.username + "'s"; break;
      case "Sergeant": className = "rank p r7"; title = "Sergeant " + player.username + "'s"; break;
      case "Sergeant 1st Class": className = "rank p r8"; title = "Sergeant 1st Class " + this.username + "'s"; break;
      case "Lieutenant": className = "rank p r9"; title = "Lieutenant " + player.username + "'s"; break;
      case "Captain": className = "rank p r10"; title = "Captain " + player.username + "'s"; break;
      case "Major": className = "rank p r11"; title = "Major " + player.username + "'s"; break;
      case "Colonel": className = "rank p r12"; title = "Colonel " + player.username + "'s"; break;
      case "Brigadier": className = "rank p r13"; title = "Brigadier " + player.username + "'s"; break;
      case "General": className = "rank p r14"; title = "General " + player.username + "'s"; break;
      case "Field Marshal": className = "rank p r15"; title = "Field Marshal " + player.username + "'s"; break;
      case "Conqueror": className = "rank p r16"; title = "Conqueror " + player.username + "'s"; break;    
    }
    profileLink.className = className;
    profileLink.title = title + " Profile";
    profileLink.innerHTML = player.username;
  
    ratingLink = document.createElement('a');
    ratingLink.className = "rating";
    ratingLink.href = 'player.php?mode=ratings1&username=' + player.username;
    ratingLink.title = title + ' Ratings';
    ratingLink.innerHTML = player.rating;
    players.snapshotItem(i).parentNode.appendChild(document.createTextNode(' '));
    players.snapshotItem(i).parentNode.appendChild(ratingLink);
  }
}

/**
 *  Fetch the game for 'watched' tab via AJAX.
 *
 *  @var int - user id
 */
function getGamePlayer(playerId) {
 var requestPage, request, data, username, rank, rating, e;
 
 requestPage = window.location.protocol + '//www.conquerclub.com/api.php?mode=player&u=' + playerId;
 request = new XMLHttpRequest();
 request.open('GET', requestPage, true);
 request.overrideMimeType('text/xml');
     
 request.onreadystatechange = function() {
   if (request.readyState == 4) {
     try {
       data = request.responseXML;
       username = data.getElementsByTagName('username')[0].childNodes[0].nodeValue;
       rank = data.getElementsByTagName('rank')[0].childNodes[0].nodeValue;
       rating = data.getElementsByTagName('rating')[0].childNodes[0].nodeValue;

       player = new playerObject(playerId, username, rank, rating);
       updateGamesPlayers(player);
     } catch (e) {
       // alert(e.message);
     }
   }
 };
 request.send(null);
}


//---------   Map object functions   ---------//
/**
 *  Update 'watched' tab by adding new games there
 *
 *  @var playerObject - player data
 */
function updateGamesMaps(map) {  
  var searchName, games, status, i;

  switch (map.status) {
    case 'R':
    case 'N': status = MapNormal; break;
    case 'B': status = MapBeta; break;
  }
  
  searchName = map.mapName.split(/[\'\"]/)[0];

  games = document.evaluate("//td[starts-with(text(), '" + searchName + "')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; i < games.snapshotLength; i++) {    
    games.snapshotItem(i).innerHTML = map.mapName + "<br>" + "<a title='" + map.mapName + "' rel='lightbox' href='http://maps.conquerclub.com/" + map.small + "'><img width='50' height='34' title='" + map.mapName + "' alt='" + map.mapName + "' class='thumbnail' src='" + status + "' style='background-image: url(http://maps.conquerclub.com/" + map.thumbnail + ");'/></a>";
  }
}

/**
  *  Fetch the game for "watched" tab via AJAX.
  *
  *  @var string - map name
  */
function getGameMap(mapName) {
  var requestPage, request, data, thumbnail, small, status, games, i, e;

  requestPage = window.location.protocol + "//www.conquerclub.com/api.php?mode=map&mp=" + mapName;
  request = new XMLHttpRequest();
  request.open("GET", requestPage, true);
  request.overrideMimeType("text/xml");

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      try {
        data = request.responseXML;
        thumbnail = data.getElementsByTagName("thumbnail")[0].childNodes[0].nodeValue;
        small = data.getElementsByTagName("small")[0].childNodes[0].nodeValue;
        status = data.getElementsByTagName("status")[0].childNodes[0].nodeValue;

        map = new mapObject(mapName, thumbnail, small, status);
        updateGamesMaps(map);
      } catch (e) {
        // alert(e.message);
      }
    }
  };
  request.send(null);
}


//---------   Helper functions   ---------//

/**
 *  Toggle game status in GM array.
 *
 *  @var int - game number
 *  @var bool - add (true) or remove (false) game
 */
function toggleGame(gameNumber, indicator) {
  var games;
  
  games = getWatchedGames();
  
  if (indicator) {
    games.push(gameNumber);
  } else {
    games.splice(games.indexOf(gameNumber), 1);
  }

  GM_setValue("games", games.toString());
}

/**
  *  Return watched games
  *
  *  @return array - array of games numbers being watch
  */
function getWatchedGames() {
  var games, gamesArray;
  
  games = GM_getValue("games");
  gamesArray = new Array();
  
  if (games) {
    games = games.toString();
    gamesArray = games.split(',');
  }
    
  return gamesArray;
}

/**
  *  Return number of watched games 
  *
  *  @return int - total number games being watch
  */
function getWatchedGamesNumber() {
  return getWatchedGames().length;
}

/**
  *  Comparison function for gameObjects
  *
  */
function compareGamesTime(a, b) {
  var h1, h2, m1, m2, s1, s2, time1, time2;

  time1 = a.timeRemaining;
  time2 = b.timeRemaining;
  
  h1 = time1.slice(0,2);
  h2 = time2.slice(0,2);
  
  m1 = time1.slice(3,5);
  m2 = time2.slice(3,5);
  
  s1 = time1.slice(6,8);
  s2 = time2.slice(6,8);

  if (h1 > h2) {
    return -1;
  }
  if (h1 == h2 && m1 > m2) {
    return -1;
  }
  if (h1 == h2 && m1 == m2 && s1 > s2) {
    return -1;
  }

  return 1;
}


//---------   Init function   ---------//

/**
  *  Everything starts here
  *
  */
function init() {

  if (!IsInside && !/(mode=find)|(submit=Search)/.test(window.location.href)) {
    addTab();
  }
  
  addWatchLinks();
  GM_addStyle("a.watch { color: #00AA00; } a.unwatch { color: #AA0000; }");
}

//start the script
init();
