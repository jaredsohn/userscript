//  Watch This Game script for Conquer Club
//  version 1.4.3
//  2011-09-17
//  Copyright (c) 2009, Daniel Pavlyuchkov (dako.lrd@gmail.com)
//  Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html
//
//
// ==UserScript==
// @name              Conquer Club - Watch This Game temp fix dgz345
// @description       Simple script to watch certain games you like
// @namespace         http://userscripts.org
// @version           1.4.4
// @include           http*://*conquerclub.com/*
// @exclude           http*://*conquerclub.com/api.php*
// ==/UserScript==


//---------   Naming conventions  ---------//
//
//
//  VARS  
//
//  variables: camel case (starting with lowercase)
//  constants: camel case (starting with uppercase) 
//  global variables: underscore separated with uppercase words
//  
//
//  FUNCTIONS
//
//  add* - draw some HTML elements
//  clear* - clear HTML for further update, reset some global variables
//  compare* - comparison functions. Shoud be named as 'compareObjectField'
//  get* - get data (usually over AJAX)
//  init* - set default options for something
//  parse* - parse AJAX response
//  toggle* - switch some entity between 2 states
//  update* - redraw (or update) HTML from the object they receive
//  watch - add something to watch list
//
//
//  OBJECTS
//
//  camel case (starting with lowercase) and suffixed with 'Object'
//


//---------   Constants   ---------//

const VersionString = '1.4.4';
const TopicLink = 'http://www.conquerclub.com/forum/viewtopic.php?f=59&t=97965';
const ScriptLink = 'http://userscripts.org/scripts/source/186816.user.js';
const ScriptMetaLink = 'http://userscripts.org/scripts/source/186816.user.meta.js';
const WatchLinkClass = 'watch';
const UnwatchLinkClass = 'unwatch';
const WatchLinkText = 'Watch game';
const UnwatchLinkText = 'Unwatch game';
const IsInside = /game.php\?game=[0-9]*$/.test(window.location.href);
const IsTournamentPage = /public.php\?mode=tournaments[0-9]$/.test(window.location.href);
const MapNormal = 'http://static.conquerclub.com/map_normal.png';
const MapBeta = 'http://static.conquerclub.com/map_beta.png';


//---------   Global variables   ---------//  

var Games_Array = [];
var Maps_Array = [];
var Players_Array = [];
var Script_Options = {};


//---------   Prototyping   ---------//  

Array.prototype.has = function(obj) {
  return this.indexOf(obj) !== -1;
};

String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, '');
};


//---------   Objects definition   ---------//

function gameObject(gameNumber, gameState, tournament, privateGame, speedGame, map, gameType, initialTroops, playOrder, bonusCards, fortifications, warFog, round, timeRemaining, players) {
  this.gameNumber = gameNumber;
  this.gameState = gameState;
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

function playerObject(userid, username, membership, rank, rating, state) {
  this.userid = userid;
  this.username = username;
  this.membership = membership;
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


//---------   GM functions   ---------//

function initGM() {
  if (typeof GM_getValue == 'undefined' || GM_getValue('a', 'b') == undefined) {
    var namespace = 'WTG.';
    GM_addStyle = function(css) {
      var style = document.createElement('style');
      style.textContent = css;
      document.getElementsByTagName('head')[0].appendChild(style);
    }

    GM_deleteValue = function(name) {
      localStorage.removeItem(namespace + name);
    }

    GM_getValue = function(name, defaultValue) {
      var value = localStorage.getItem(namespace + name);
      if (!value)
        return defaultValue;
      
      var type = value[0];
      value = value.substring(1);
      switch (type) {
        case 'b':
          return value == 'true';
        case 'n':
          return Number(value);
        default:
          return value;
      }
    }

    GM_listValues = function() {
      var i, result = [];
      for (i = 0; i < localStorage.length; i++) {
        var name = localStorage.key(i);
        if (name.indexOf(namespace) == 0)
          result.push(name.substring(namespace.length));
      }
      return result;
    }
    
    GM_log = function(message) {
      console.log(message);
    }
    
    GM_xmlhttpRequest = function(obj) {
      var request = new XMLHttpRequest();
      request.onreadystatechange=function() {
        if (obj.onreadystatechange)
          obj.onreadystatechange(request);

        if (request.readyState == 4 && obj.onload)
          obj.onload(request);
      }
      request.onerror = function() {
        if(obj.onerror)
          obj.onerror(request);

      }
      try {
        request.open(obj.method,obj.url, true);
      } catch(e) {
        if (obj.onerror)
          obj.onerror( {readyState:4, responseHeaders:'', responseText:'', responseXML:'', status:403, statusText:'Forbidden'} );

        return request;
      }
      if (obj.headers) { 
        for(var name in obj.headers)
          request.setRequestHeader(name,obj.headers[name]);
      }
      request.send(obj.data);
      return request;
    }

    GM_setValue = function(name, value) {
      value = (typeof value)[0] + value;
      localStorage.setItem(namespace + name, value);
    }
    unsafeWindow = window;
  }
}

//---------   Options handling   ---------//

/**
 * Init script options
 * 
 */
function initOptions() {
  var defaultOptions, name;
  
  defaultOptions = {
    profile_link : true,
    reverse_order : true,
    waiting_games : false,
    sort_by : 'time'
  };
  
  Script_Options = GM_getValue('options');
  if (Script_Options != undefined)
    Script_Options = eval('(' + Script_Options + ')');
  
  if (typeof(Script_Options) == 'undefined') {
    // Jeez, poor manual editing in the about:config page
    Script_Options = {};
  }
  
  // Set default options for undefined items
  for (name in defaultOptions) {
    if (typeof(Script_Options[name]) == 'undefined') {
      Script_Options[name] = defaultOptions[name];
    }
  }

  GM_setValue('options', serialize(Script_Options));
}


//---------   Tab functions   ---------//

/**
 * Init watched tab
 * 
 */
function initTab() {
  if (!IsInside && /player.php\?mode=mygames/.test(window.location.href)) {
    addTab();
    
    // Click the tab if we have #watch part in the url
    if (window.location.hash == '#watch') {
      listTab();
    }
  }  
}

/**
 * Add 'watched' tab
 *
 */
function addTab() {
  var ul, li, a, span;

  ul = document.getElementById('invertedtabs');
  ul = ul.childNodes[1];
  li = document.createElement('li');
  a = document.createElement('a');
  span = document.createElement('span');
  li.appendChild(a);
  a.href = '#watch';
  a.addEventListener('click', listTab, false);
  a.appendChild(span);
  span.innerHTML = 'Watched [ <span id="watchedGameNumber" class="inbox">' + getWatchedGamesNumber() + ' </span>]';
  ul.appendChild(li);
}

/**
 * Draw 'watched' tab
 *
 */
function addTabContent() {
  var i, count;

  count = 'even';
  
  // Check fort "sort by" option
  if (Script_Options.sort_by == 'time') {
    Games_Array.sort(compareGamesTime);
  } else if (Script_Options.sort_by == 'number') {
    Games_Array.sort(compareGamesNumber);
  }
  
  // Check for reverse sorting option
  if (!Script_Options.reverse_order) {
    Games_Array.reverse();
  }

  for (i = 0; i < Games_Array.length; i++) {
    count = (count == 'odd') ? 'even' : 'odd';
    addGameRow(Games_Array[i], count);
  }
  getGameMaps(Maps_Array);
  getGamePlayers(Players_Array);
  
  addWatchLinks();
  toggleProcessingOverlay();
  window.initLightbox();
}

/**
 * Clear and prepare table for our 'watched' tab
 *
 */
function clearTabContent() {
  var nav, content, elem, newTable, tbody, trHeader, tHead, th;
  
  document.getElementById('current').id = '';
  document.getElementById('invertedtabs').childNodes[1].lastChild.id = 'current';
  
  // Delete unnecessary HTML elements
  content = document.getElementById('middleColumn').getElementsByTagName('br')[0].nextSibling.nextSibling;
  while (undefined != (elem = content.nextSibling)) {
    content.parentNode.removeChild(elem);
  }

  content.parentNode.appendChild(document.createElement('p')).appendChild(document.createTextNode('These are games you are following.'));
  if (getWatchedGamesNumber()) {
    content.parentNode.appendChild(document.createElement('h3')).appendChild(document.createTextNode('Games you are watching'));
  } else {
    content.parentNode.appendChild(document.createElement('h3')).appendChild(document.createTextNode('You are not watching any games'));
    return;
  }
  
  // Add dumb legend row 
  elem = content.parentNode.appendChild(document.createElement('p'));
  elem.innerHTML = 'Legend:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img width="10" height="10" title="ready to play" alt="ready to play" src="http://static.conquerclub.com/icon_status_green.gif"> ready to play&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img width="10" height="10" title="playing" alt="playing" src="http://static.conquerclub.com/icon_status_yellow.gif"> playing&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img width="10" height="10" title="waiting for turn" alt="waiting for turn" src="http://static.conquerclub.com/icon_status_red.gif"> waiting for turn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img width="10" height="10" title="waiting for opponent to begin" alt="waiting for opponent to begin" src="http://static.conquerclub.com/icon_status_blocked.gif"> waiting for opponent to begin';
  
  // Create header row
  newTable = document.createElement('table');
  newTable.className = 'listing';
  newTable.id = 'games-table';
  
  tbody = document.createElement('tbody');
  newTable.appendChild(tbody);  
  trHeader = tbody.insertRow(0);
  
  th = document.createElement('th');
  trHeader.appendChild(th);
  th = document.createElement('th');
  trHeader.appendChild(th);
  th.innerHTML = 'Game Type<br>Initial Troops<br>Play Order';
  th = document.createElement('th');
  trHeader.appendChild(th);
  th.innerHTML = 'Map';
  th = document.createElement('th');
  trHeader.appendChild(th);
  th.innerHTML = 'Spoils<br>Reinforcements<br>Fog of War';
  th = document.createElement('th');
  trHeader.appendChild(th);
  th.innerHTML = 'Round<br>Time Remaining';
  th = document.createElement('th');
  trHeader.appendChild(th);
  th.innerHTML = 'Players';
  
  content.parentNode.appendChild(newTable);
  
  // Reset global variables
  Games_Array = [];
  Players_Array = [];
  Maps_Array = [];
}

/**
 * Update number of games at tab
 *
 */
function updateTabNumber() {
  var span;

  span = document.getElementById('watchedGameNumber');
  if (span) {
    span.innerHTML = getWatchedGamesNumber() + ' ';
  }
}

/**
 * onClick handler for 'watched' tab
 *
 */
function listTab() {
  var games, gameNumber;

  clearTabContent();
  games = getWatchedGames();
  
  if (games.length) {
    addProcessingOverlay();
    toggleProcessingOverlay();
    getGameRows(games);
  }
}

/**
 * Add overlay when the tab was clicked
 * 
 */
function addProcessingOverlay() {
  var imageWrapper;
  
  // Add overlay
  document.getElementById('SOWrap').appendChild(document.createElement('div')).id = 'wtg-overlay';
  
  // Add popup overlay
  imageWrapper = document.getElementById('SOWrap').appendChild(document.createElement('div'));
  imageWrapper.id = 'wtg-overlay-popup';
  imageWrapper.appendChild(document.createElement('img')).src = 'http://static.conquerclub.com/loading.gif';
  imageWrapper.appendChild(document.createElement('span')).appendChild(document.createTextNode('Processing watched games'));
}

/**
 * Toggle overlay display status
 * 
 */
function toggleProcessingOverlay() {
  var overlay, popup;
  
  overlay = document.getElementById('wtg-overlay');
  overlay.style.display = (overlay.style.display == '' || overlay.style.display == 'none') ? 'block' : 'none';
  
  popup = document.getElementById('wtg-overlay-popup');
  popup.style.display = (popup.style.display == '' || popup.style.display == 'none') ? 'block' : 'none';
}


//---------   Watch links functions   ---------//

/**
 * Add 'Watch game' links.
 *
 */
function addWatchLinks() {
  var gameNumber, gamesArray, a, allGames, allGameLinks, allTournaments, thisGame, i, ul, br, span;
  
  if (IsInside) {
     ul = document.getElementById('players');
     br = document.createElement('br');
     a = document.createElement('a');
     span = document.createElement('span');
     
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
       a.className = UnwatchLinkClass;
     } else {
       a.innerHTML = WatchLinkText.toLowerCase();
       a.className = WatchLinkClass;
     }
  
     a.href = 'javascript:void(0);';
     a.addEventListener('click', toggleWatchLink, false);
  } else {
    // Process game trs
    allGames = document.evaluate("//span[@class='gameno']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
       
    for (i = 0; i < allGames.snapshotLength; i++) {
      thisGame = allGames.snapshotItem(i);
      gameNumber = thisGame.textContent;
    
      a = document.createElement('a');
      thisGame.parentNode.appendChild(a);
       
      gamesArray = getWatchedGames();
    
      if (gamesArray.has(gameNumber)) {
        a.innerHTML = UnwatchLinkText;     
        a.className = 'gameno ' + UnwatchLinkClass;
      } else {
        a.innerHTML = WatchLinkText;
        a.className = 'gameno ' + WatchLinkClass;
      }
       
      a.href = 'javascript:void(0);';
      a.addEventListener('click', toggleWatchLink, false);
    }
    
    // Process [game] forum bb-tags
    allGameLinks = document.evaluate("//a[contains(@href,'game.php?game=')][starts-with(text(), 'Game ')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    for (i = 0; i < allGameLinks.snapshotLength; i++) {
      thisGame = allGameLinks.snapshotItem(i);
      gameNumber = /Game ([0-9]*)$/.exec(thisGame.textContent)[1];
    
      a = document.createElement('a');
      thisGame.parentNode.insertBefore(a, thisGame.nextSibling);
       
      gamesArray = getWatchedGames();
    
      if (gamesArray.has(gameNumber)) {
        a.innerHTML = UnwatchLinkText;     
        a.className = 'gamelink ' + UnwatchLinkClass;
      } else {
        a.innerHTML = WatchLinkText;
        a.className = 'gamelink ' + WatchLinkClass;
      }
       
      a.href = 'javascript:void(0);';
      a.addEventListener('click', toggleWatchLink, false);
    }
    
    // Process tournament pages
    if (IsTournamentPage) {
      allTournaments = document.evaluate("//table[@class='listing']//a[contains(@href,'forum/viewtopic.php?t=')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      
      for (i = 0; i < allTournaments.snapshotLength; i++) {
        a = document.createElement('a');
        allTournaments.snapshotItem(i).parentNode.appendChild(document.createTextNode(' ')).parentNode.appendChild(a);
        a.href = 'javascript:void(0);';
        a.innerHTML = 'Watch this tournament';
        a.className = 'gamelink ' + WatchLinkClass;
        
        a.addEventListener('click', function () {
          watchTournament(this.previousSibling.previousSibling.innerHTML, 1, 'A');
          if (Script_Options.waiting_games) {
            watchTournament(this.previousSibling.previousSibling.innerHTML, 1, 'W');
          }
          this.parentNode.removeChild(this);
        }, false);
      }
    }
  }
}

/**
 * Redraw all 'Watch game' links
 * 
 */
function updateWatchLinks() {
  var link, allGames;
  
  if (!IsInside) {
    allGames = document.evaluate("//a[@class='gameno watch']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; i < allGames.snapshotLength; i++) {
      link = allGames.snapshotItem(i);
      link.parentNode.removeChild(link);
    }
    
    allGames = document.evaluate("//a[@class='gameno unwatch']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; i < allGames.snapshotLength; i++) {
      link = allGames.snapshotItem(i);
      link.parentNode.removeChild(link);
    }
    
    addWatchLinks();
  }
}

/**
 * OnClick handler for 'Watch game' links.
 *
 */
function toggleWatchLink() {
  var gameNumber, className, text, indicator;
  
  if (IsInside) {
    gameNumber = /[0-9]*$/.exec(window.location.href);
    gameNumber = gameNumber.toString();
    
    if (this.innerHTML.toLowerCase() == WatchLinkText.toLowerCase()) {
      text = UnwatchLinkText.toLowerCase();
      className = this.className.replace(WatchLinkClass, UnwatchLinkClass);
      indicator = true;
    } else {
      text = WatchLinkText.toLowerCase();
      className = this.className.replace(UnwatchLinkClass, WatchLinkClass);
      indicator = false;
    }
  } else {
    if (/gamelink/.test(this.className)) {
      gameNumber = /Game ([0-9]*)$/.exec(this.previousSibling.textContent)[1];        
    } else {

      if (this.parentNode.childNodes[0].tagName == 'SPAN') {
        gameNumber = this.parentNode.childNodes[0].innerHTML;
      } else {
        gameNumber = this.parentNode.childNodes[3].innerHTML;
      }
    }
      
    if (this.innerHTML == WatchLinkText) {      
      text = UnwatchLinkText;
      className = this.className.replace(WatchLinkClass, UnwatchLinkClass);
      indicator = true;
    } else {
      text = WatchLinkText;
      className = this.className.replace(UnwatchLinkClass, WatchLinkClass);
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
 * Update 'watched' tab by adding new games there
 *
 * @param {Object} game data object
 * @param {String} row class name
 */
function addGameRow(game, color) {
  var table, tr, td, ul, li, span, a, i;
  
  // Initial var preparation
  
  switch (game.gameType) {
    case 'S': game.gameType = 'Standard'; break;
    case 'C': game.gameType = 'Terminator'; break;
    case 'A': game.gameType = 'Assassin'; break;
    case 'D': game.gameType = 'Doubles'; break;
    case 'T': game.gameType = 'Triples'; break;
    case 'Q': game.gameType = 'Quadruples '; break;
  }
  switch (game.initialTroops) {
    case 'E': game.initialTroops = 'Automatic'; break;
    case 'M': game.initialTroops = 'Manual '; break;
  }
  switch (game.playOrder) {
    case 'S': game.playOrder = 'Sequential'; break;
    case 'F': game.playOrder = 'Freestyle'; break;
  }
  switch (game.bonusCards) {
    case '1': game.bonusCards = 'No Spoils'; break;
    case '2': game.bonusCards = 'Escalating'; break;
    case '3': game.bonusCards = 'Flat Rate'; break;
    case '4': game.bonusCards = 'Nuclear'; break;
  }
  switch (game.fortifications) {
    case 'C': game.fortifications = 'Chained'; break;
    case 'O': game.fortifications = 'Adjacent'; break;
    case 'M': game.fortifications = 'Unlimited'; break;
  }
  game.warFog = (game.warFog == 'Y') ? 'Yes' : 'No';
  
  table = document.getElementById('games-table');
  
  if (game.privateGame == 'Y') {
    tr = document.createElement('tr');
    tr.className = color + '2';
    
    td = tr.insertCell(0);
    td.colSpan = 7;
    if (game.tournament) {
      td.innerHTML = '<strong>Tournament Game: ' + game.tournament + '</strong>';
    } else {
      if (game.speedGame == 'Y') {
        td.innerHTML = '<strong>Private Speed Game</strong>';
      } else {
        td.innerHTML = '<strong>Private Game</strong>';
      }
    }
    table.appendChild(tr);
  }
    
  tr = document.createElement('tr');
  tr.className = color;
  td = tr.insertCell(0);
  td.style.textAlign = 'center';
  td.innerHTML = '<span class="gameno">' + game.gameNumber + '</span>' + '<a href="game.php?game=' + game.gameNumber + '" class="gameno">Enter Game</a>';
  
  tr.insertCell(1).innerHTML = game.gameType + '<br>' + game.initialTroops + '<br>' + game.playOrder;
  tr.insertCell(2).innerHTML = game.map;
  
  tr.insertCell(3).innerHTML = game.bonusCards + '<br>' + game.fortifications + '<br>' + game.warFog;
  if (game.round != 0) {
    if (game.timeRemaining != 0) {
      tr.insertCell(4).innerHTML = 'Round ' + game.round + '<br>' + game.timeRemaining;
    } else {
      tr.insertCell(4).innerHTML = 'Round ' + game.round;
    }
  } else {
    tr.insertCell(4).innerHTML = '';
  }
  
  ul = document.createElement('ul');
  ul.className = 'players';
  
   for (i = 0; i < game.players.length; i++) {
    li = document.createElement('li');
    
    if (game.gameState != 'W') {
      switch (game.players[i].state) {
        case 'Lost': li.className = 'status_red'; break;
        case 'Blocked': li.className = 'status_blocked'; break;
        case 'Waiting': li.className = 'status_red'; break;
        case 'Playing': li.className = 'status_yellow'; break;
        case 'Ready': li.className = 'status_green'; break;
        case 'Won': li.className = 'status_green'; break;
      }
    } else {
      if (game.players[i].state == 'Open') {
        li.appendChild(document.createTextNode('Empty'));
        ul.appendChild(li);
        continue;
      } else if (game.players[i].state == 'Reserved') {
        li.appendChild(document.createTextNode('Reserved for: '));
      }
    }
    
    a = document.createElement('a');
    a.href = 'forum/memberlist.php?mode=viewprofile&u=' + game.players[i].userid;
    a.innerHTML = game.players[i].userid;

    if (game.players[i].state == 'Lost') {
      span = document.createElement('span');
      span.className = 'eliminated';
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
 * Fetch the game for 'watched' tab via AJAX.
 *
 * @param {Integer} game number
 */
function getGameRows(gameNumbers) {
  var requestPage, request, data, table, games, game, players, player, playersArray, i, e;
  var gameNumbers, tournament, privateGame, speedGame, map, gameType, initialTroops, playOrder, bonusCards, fortifications, warFog, round, timeRemaining;
 
  gameNumbers = gameNumbers instanceof Array ?  gameNumbers.join(',') : gameNumbers;
  requestPage = window.location.protocol + '//www.conquerclub.com/api.php?mode=gamelist&gn=' + gameNumbers;
  request = new XMLHttpRequest();
  request.open('GET', requestPage, true);
  request.overrideMimeType('text/xml');
 
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      try {
        data = request.responseXML;
        games = data.getElementsByTagName('games')[0].attributes;
        if (games.getNamedItem('total').nodeValue != '0') {
          for (var gameIndex = 0; gameIndex < data.getElementsByTagName('game').length; gameIndex++) {
            var gameData = data.getElementsByTagName('game')[gameIndex];
            gameNumber = gameData.getElementsByTagName('game_number')[0].childNodes[0].nodeValue;
            gameState = gameData.getElementsByTagName('game_state')[0].childNodes[0].nodeValue;
            tournament = '';
            if (gameData.getElementsByTagName('tournament')[0].childNodes.length > 0) {
              tournament = gameData.getElementsByTagName('tournament')[0].childNodes[0].nodeValue;
            }
            privateGame = gameData.getElementsByTagName('private')[0].childNodes[0].nodeValue;
            speedGame = gameData.getElementsByTagName('speed_game')[0].childNodes[0].nodeValue;
            map = gameData.getElementsByTagName('map')[0].childNodes[0].nodeValue;
            
            // Add unique maps to global array
            if (!(Maps_Array.has(map))) {
              Maps_Array.push(map);
            }
            
            gameType = gameData.getElementsByTagName('game_type')[0].childNodes[0].nodeValue;
            initialTroops = gameData.getElementsByTagName('initial_troops')[0].childNodes[0].nodeValue;
            playOrder = gameData.getElementsByTagName('play_order')[0].childNodes[0].nodeValue;
            bonusCards = gameData.getElementsByTagName('bonus_cards')[0].childNodes[0].nodeValue;
            fortifications = gameData.getElementsByTagName('fortifications')[0].childNodes[0].nodeValue;
            warFog = gameData.getElementsByTagName('war_fog')[0].childNodes[0].nodeValue;
            round = gameData.getElementsByTagName('round')[0].childNodes[0].nodeValue;
            timeRemaining = gameData.getElementsByTagName('time_remaining')[0].childNodes[0].nodeValue;
            players = gameData.getElementsByTagName('player');
   
            playersArray = new Array();
            for (i = 0; i < players.length; i++) {
              player = players[i];
  
              if (player.attributes.getNamedItem('state').nodeValue == 'Open') {
                player = new playerObject('', '', '', '', '', player.attributes.getNamedItem('state').nodeValue);
              } else {
                player = new playerObject(player.childNodes[0].nodeValue, '', '', '', '', player.attributes.getNamedItem('state').nodeValue);
              }
              playersArray.push(player);
              
              // Add unique players to global array
              if (player.userid != '' && !(Players_Array.has(player.userid))) {
                Players_Array.push(player.userid);
              }
            }
   
            game = new gameObject(gameNumber, gameState, tournament, privateGame, speedGame, map, gameType, initialTroops, playOrder, bonusCards, fortifications, warFog, round, timeRemaining, playersArray);
            Games_Array.push(game);
            
          }
        } else {
          // Remove unexistent game
          toggleGame(gameNumber, false);
          updateTabNumber();
        }
        
        addTabContent();
      }
      catch (e) {
        //~ alert(e.message);
      }
    }
  };
  request.send(null);
}



//---------   Player object functions   ---------//

/**
 * Update 'watched' tab by adding players info
 *
 * @param {Object} player data object
 */
function updateGamesPlayers(player) {  
  var players, profileLink, ratingLink, className, title, i;

  players = document.evaluate("//ul[@class='players']/li/descendant::*[text() = '" + player.userid + "']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; i < players.snapshotLength; i++) {
    profileLink = players.snapshotItem(i);
  
    // Rank switch
    switch (player.rank) {
      case 'New Recruit': className = 'rank r0'; title = 'New Recruit ' + player.username + '\'s'; break;
      case 'Cook': className = 'rank r1'; title = 'Cook ' + player.username + '\'s'; break;
      case 'Cadet': className = 'rank r2'; title = 'Cadet ' + player.username + '\'s'; break;
      case 'Private': className = 'rank r3'; title = 'Private ' + player.username + '\'s'; break;
      case 'Private 1st Class': className = 'rank r4'; title = 'Private 1st Class ' + player.username + '\'s'; break;
      case 'Corporal': className = 'rank r5'; title = 'Corporal ' + player.username + '\'s'; break;
      case 'Corporal 1st Class': className = 'rank r6'; title = 'Corporal 1st Class ' + this.username + '\'s'; break;
      case 'Sergeant': className = 'rank r7'; title = 'Sergeant ' + player.username + '\'s'; break;
      case 'Sergeant 1st Class': className = 'rank r8'; title = 'Sergeant 1st Class ' + this.username + '\'s'; break;
      case 'Lieutenant': className = 'rank r9'; title = 'Lieutenant ' + player.username + '\'s'; break;
      case 'Captain': className = 'rank r10'; title = 'Captain ' + player.username + '\'s'; break;
      case 'Major': className = 'rank r11'; title = 'Major ' + player.username + '\'s'; break;
      case 'Colonel': className = 'rank r12'; title = 'Colonel ' + player.username + '\'s'; break;
      case 'Brigadier': className = 'rank r13'; title = 'Brigadier ' + player.username + '\'s'; break;
      case 'General': className = 'rank r14'; title = 'General ' + player.username + '\'s'; break;
      case 'Field Marshal': className = 'rank r15'; title = 'Field Marshal ' + player.username + '\'s'; break;
      case 'Conqueror': className = 'rank r16'; title = 'Conqueror ' + player.username + '\'s'; break;    
    }
    profileLink.className = className + ' ' + player.membership.toLowerCase();
    profileLink.title = title + ' Profile';
    profileLink.innerHTML = player.username;
  
    ratingLink = document.createElement('a');
    ratingLink.className = 'rating';
    ratingLink.href = 'player.php?mode=ratings1&username=' + player.username;
    ratingLink.title = title + ' Ratings';
    ratingLink.innerHTML = player.rating;
    players.snapshotItem(i).parentNode.appendChild(document.createTextNode(' '));
    players.snapshotItem(i).parentNode.appendChild(ratingLink);
  }
}

/**
 * Fetch game player for 'watched' tab via AJAX.
 *
 * @param {Integer} user id
 */
function getGamePlayers(playerIds) {
 var requestPage, request, data, username, rank, rating, e;
 
 var playerIdsString = playerIds instanceof Array ?  playerIds.join(',') : playerIds;
 requestPage = window.location.protocol + '//www.conquerclub.com/api.php?mode=player&u=' + playerIdsString;
 request = new XMLHttpRequest();
 request.open('GET', requestPage, true);
 request.overrideMimeType('text/xml');
     
 request.onreadystatechange = function() {
   if (request.readyState == 4) {
     try {
       data = request.responseXML;
       var players = data.getElementsByTagName('player');
       for (var playerIndex = 0; playerIndex < players.length; playerIndex++) {
         var playerData = players[playerIndex];
         var userId = playerData.getElementsByTagName('userid')[0].childNodes[0].nodeValue;
         username = playerData.getElementsByTagName('username')[0].childNodes[0].nodeValue;
         membership = playerData.getElementsByTagName('membership')[0].childNodes[0].nodeValue;
         rank = playerData.getElementsByTagName('rank')[0].childNodes[0].nodeValue;
         rating = playerData.getElementsByTagName('rating')[0].childNodes[0].nodeValue;
         
         player = new playerObject(userId, username, membership, rank, rating);
         updateGamesPlayers(player);
       }
     }
     catch (e) {
     //~ alert(e.message);
     }
   }
 };
 request.send(null);
}


//---------   Map object functions   ---------//

/**
 * Update 'watched' tab by adding map info
 *
 * @param {Object} player data object
 */
function updateGamesMaps(map) {  
  var searchName, games, status, i;

  switch (map.status) {
    case 'R':
    case 'N': status = MapNormal; break;
    case 'B': status = MapBeta; break;
  }
  
  searchName = map.mapName;

  games = document.evaluate('//td[text() = "' + searchName + '"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; i < games.snapshotLength; i++) {    
    games.snapshotItem(i).innerHTML = map.mapName + '<br>' + '<a title="' + map.mapName + '" rel="lightbox" href="http://maps.conquerclub.com/' + map.small + '"><img width="50" height="34" title="' + map.mapName + '" alt="' + map.mapName + '" class="thumbnail" src="' + status + '" style="background-image: url(http://maps.conquerclub.com/' + map.thumbnail + ');"/></a>';
  }
}

/**
 * Fetch game map for 'watched' tab via AJAX.
 *
 * @param {String} map name
 */
function getGameMaps(mapNames) {
  var requestPage, request, data, thumbnail, small, status, games, i, e;

  var mapNamesString = mapNames instanceof Array ?  mapNames.join(',') : mapNames;
  requestPage = window.location.protocol + '//www.conquerclub.com/api.php?mode=map&mp=' + mapNamesString;
  request = new XMLHttpRequest();
  request.open('GET', requestPage, true);
  request.overrideMimeType('text/xml');

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      try {
        data = request.responseXML;
        var maps = data.getElementsByTagName('map');
        for (var mapIndex = 0; mapIndex < maps.length; mapIndex++) {
          var mapData = maps[mapIndex];
          var mapName = mapData.getElementsByTagName('title')[0].childNodes[0].nodeValue;
          thumbnail = mapData.getElementsByTagName('thumbnail')[0].childNodes[0].nodeValue;
          small = mapData.getElementsByTagName('small')[0].childNodes[0].nodeValue;
          status = mapData.getElementsByTagName('status')[0].childNodes[0].nodeValue;
          map = new mapObject(mapName, thumbnail, small, status);
          updateGamesMaps(map);
        }
      }
      catch (e) {
        //~ alert(e.message);
      }
    }
  };
  request.send(null);
}


//---------   Watch functions   ---------//

/**
 * Add a game to watched list
 * 
 * @param {Integer} game number
 */
function watchGame(gameNumber) {
  var games;
  
  games = getWatchedGames();
  if (!games.has(gameNumber)) {
    games.push(gameNumber);
    GM_setValue('games', games.toString());
    updateTabNumber();
    updateWatchLinks();
  }
}

/**
 * Watch all user's active games
 * 
 * @param {String} username
 * @param {Integer} page id
 */
function watchPlayer(username, page, state) {
  var requestPage, request, data, gamesNumbers, i, e;
  
  requestPage = window.location.protocol + '//www.conquerclub.com/api.php?mode=gamelist&gs=' + state + '&un=' + username + '&page=' + page;
  request = new XMLHttpRequest();
  request.open('GET', requestPage, true);
  request.overrideMimeType('text/xml');
      
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      try {
        data = request.responseXML;
        
        maxPages = /\d+ of (\d+)/i.exec(data.getElementsByTagName('page')[0].childNodes[0].nodeValue);
        if (maxPages[1] > page) {
          watchPlayer(username, page + 1);
        }
        
        gamesNumbers = data.getElementsByTagName('game_number');
        for (i in gamesNumbers) {
          watchGame(gamesNumbers[i].childNodes[0].nodeValue);
        }
      }
      catch (e) {
      //~ alert(e.message);
      }
    }
  };
  request.send(null);
}

/**
 * Watch all tournaments's active games
 * 
 * @param {String} tournament name
 * @param {Integer} page id
 */
function watchTournament(tournamentName, page, state) {
  var requestPage, request, data, gamesNumbers, i, e;
  tournamentName = encodeURIComponent(tournamentName);
  requestPage = window.location.protocol + '//www.conquerclub.com/api.php?mode=gamelist&gs=' + state + '&to=' + tournamentName + '&page=' + page;
  request = new XMLHttpRequest();
  request.open('GET', requestPage, true);
  request.overrideMimeType('text/xml');
      
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      try {
        data = request.responseXML;
        
        maxPages = /\d+ of (\d+)/i.exec(data.getElementsByTagName('page')[0].childNodes[0].nodeValue);
        if (maxPages[1] > page) {
          watchTournament(username, page + 1, state);
        }
        
        gamesNumbers = data.getElementsByTagName('game_number');
        for (i in gamesNumbers) {
          watchGame(gamesNumbers[i].childNodes[0].nodeValue);
        }
      }
      catch (e) {
      //~ alert(e.message);
      }
    }
  };
  request.send(null);
}

/**
 * Add game/player/tournament to wathing list
 * 
 * @param {Mixed} can be game #, player name or tournament name
 */
function watchObject(value) {
  if (!/[^0-9]/.test(value)) {
    watchGame(value, 'A');
    if (Script_Options.waiting_games) {
      watchGame(value, 'W');
    }
  } else {
    // One of them should succeed but not both at the same time.
    watchPlayer(value, 1, 'A');
    watchTournament(value, 1, 'A');
    if (Script_Options.waiting_games) {
      watchPlayer(value, 1, 'W');
      watchTournament(value, 1, 'W');
    }
  }
}


//---------   Profile page functions   ---------//

/**
 * Init links on profile page
 * 
 */
function initProfile() {
  if (location.href.indexOf('mode=viewprofile')!= -1 && Script_Options.profile_link) {
    addProfileLinks();
  }
}

/**
 * Add "watch all player's games" link on profile page
 * 
 */
function addProfileLinks() {
  var profileLinks, username, a;
  
  username = document.evaluate("//dl[@class='left-box details']/dd/span", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  username = username.snapshotItem(0).childNodes[0].data;
  
  a = document.createElement('a');
  a.href = 'javascript:void(0);';
  a.addEventListener('click', function () {
    watchPlayer(username, 1, 'A');
    if (Script_Options.waiting_games) {
      watchPlayer(username, 1, 'W');
    }
  }, false);
  a.appendChild(document.createTextNode("Watch all player's games"));
  
  profileLinks = document.evaluate("//dl[@class='left-box details']/dd", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  profileLinks.snapshotItem(3).appendChild(document.createTextNode(' | ')).parentNode.appendChild(document.createElement('strong')).appendChild(a);
}


//---------   Helper functions   ---------//

/**
 * Serialize any variable
 * 
 */
function serialize(_obj) {
  // Let Gecko browsers do this the easy way
  if (typeof _obj.toSource !== 'undefined' && typeof _obj.callee === 'undefined') {
    return _obj.toSource();
  }

  // Other browsers must do it the hard way
  switch (typeof _obj) {
    // numbers, booleans, and functions are trivial:
    // just return the object itself since its default .toString()
    // gives us exactly what we want
    case 'number':
    case 'boolean':
    case 'function':
      return _obj;
      break;

    // for JSON format, strings need to be wrapped in quotes
    case 'string':
      return '\'' + _obj + '\'';
      break;

    case 'object':
      var str;
      if (_obj.constructor === Array || typeof _obj.callee !== 'undefined') {
        str = '[';
        var i, len = _obj.length;
        for (i = 0; i < len-1; i++) { str += serialize(_obj[i]) + ','; }
        str += serialize(_obj[i]) + ']';
      } else {
        str = '{';
        var key;
        for (key in _obj) {  str += key + ':' + serialize(_obj[key])  + ','; }
        str = str.replace(/\,$/, '') + '}';
      }
      return str;
      break;

    default:
      return 'UNKNOWN';
        break;
  }
}

/**
 * Toggle game status in GM array.
 *
 * @param {Integer} game number
 * @param {Bool} add (true) or remove (false) game
 */
function toggleGame(gameNumber, indicator) {
  var games;
  
  games = getWatchedGames();
  
  if (indicator) {
    if (!games.has(gameNumber)) {
      games.push(gameNumber);
    }
  } else {
    games.splice(games.indexOf(gameNumber), 1);
  }

  GM_setValue('games', games.toString());
}

/**
 * Unwatch all watched games
 * 
 * @return
 */
function unwatchAllGames() {
  GM_setValue('games', '');
  updateTabNumber();
  updateWatchLinks();
}

/**
 * Return watched games
 *
 * @return {Array} array of games numbers being watch
 */
function getWatchedGames() {
  var games, gamesArray;
  
  games = GM_getValue('games');
  gamesArray = [];
  
  if (games) {
    games = games.toString();
    gamesArray = games.split(',');
  }
    
  return gamesArray;
}

/**
 * Return number of watched games 
 *
 * @return {Integer} total number games being watch
 */
function getWatchedGamesNumber() {
  return getWatchedGames().length;
}

/**
 * Time comparison function for gameObjects
 * 
 * @param {Object} gameObjects
 * @param {Object} gameObjects
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

/**
 * Game number comparison function for gameObjects
 * 
 * @param {Object} gameObjects
 * @param {Object} gameObjects
 */
function compareGamesNumber(a, b) {
  return (a.gameNumber > b.gameNumber) ? 1 : -1;
}

/**
 * Add script styles
 * 
 */
function addStyles() {
  // Common styles
  GM_addStyle('a.watch { color: #0a0; } a.unwatch { color: #a00; }');
  GM_addStyle('a.gamelink { font-size: xx-small; vertical-align: super; padding-left: 2px; }');
  
  // Menu styles
  GM_addStyle('#wtg-menu textarea { font-family: monospace; color: #ccc; font-size: 1em; line-height: 0.9em; height: 18px; width: 145px; padding: 0px; }');
  GM_addStyle('#wtg-menu #wtg-ul ul { display: none; }');
  GM_addStyle('#wtg-menu #wtg-ul ul li a { background-color: #7a7; }');
  GM_addStyle('#wtg-menu #wtg-ul ul li a:hover { background-color: #898; }');
  
  // Overlay styles
  GM_addStyle('#innerColumnContainer { position: relative; }');
  GM_addStyle('#wtg-overlay { background-color: #000; display: none; width: 100%; height: 100%; position: absolute; left: 0; top: 0; opacity: 0.5; z-index: 95; }');
  GM_addStyle('#wtg-overlay-popup { background-color: #FFF; display: none; border: 1px solid black; position: absolute; left: 40%; top: 20%; padding: 10px; vertical-align: middle; opacity: 1; z-index: 96; }');
  GM_addStyle('#wtg-overlay-popup img { padding-right: 5px; vertical-align: middle; }');
}

/**
 * Check userscript for new version of the script
 * 
 */
function getUpdateAvailable() {
  
  if (GM_getValue('lastUpdate', 0) < new Date().getTime() - 3600000) {
    GM_xmlhttpRequest({
      method: 'GET',
      url: ScriptMetaLink,
      onload: parseUpdateAvailable
    });
  }
  toggleUpdateAvailable(GM_getValue('updateAvailable', false));
}

/**
 * Parse response and find new version number
 * 
 * @param {Object} response from AJAX call
 * @see getUpdateAvailable
 */
function parseUpdateAvailable(response) {
  var serverVersion, newVersion, thisVersion, available;
  
  try {
    serverVersion = /@version\s+(\d+.\d+.\d+)/.exec(response.responseText)[1];
    GM_setValue('lastUpdate', new Date().getTime() + '');
    
    newVersion = serverVersion.split('.').map(function (string) {
      return parseInt(string, 10);
    });
    thisVersion = VersionString.split('.').map(function (string) {
      return parseInt(string, 10);
    });
    
    available = (newVersion[0] > thisVersion[0] || (newVersion[0] == thisVersion[0] && (newVersion[1] > thisVersion[1] || (newVersion[1] == thisVersion [1] && newVersion[2] > thisVersion[2]))));
    GM_setValue('updateAvailable', available);
    toggleUpdateAvailable(available);
  } catch (e) {}
}

/**
 * Toggle script version menu text 
 * 
 * @param {Bool} is new version available?
 */
function toggleUpdateAvailable(newVersionAvailable) {
  document.getElementById('wtg-menu-version').innerHTML = newVersionAvailable ? '<span class="attention">Update Available</span>' : 'Latest Version Installed';
}


//---------   Menu functions   ---------//

/**
 * Init menu holder for the script
 * 
 */
function initMenu() {
  var ul;
  
  ul = addMenu();
  addWatchMenu(ul);
  addUnwatchMenu(ul);
  addSettingsMenu(ul);
  addVersionMenu(ul);
}

/**
 * Draw left-hand menu for the script
 * 
 * @return {Element} Menu's &lt;ul&gt;
 */
function addMenu() {
  var menu, header, ul;
  
  // Setup menu headings.
  menu = document.createElement('div');
  menu.id = 'wtg-menu';
  header = document.createElement('h3');
  menu.appendChild(header);
  header.innerHTML = 'WTG Menu <span style="font-size:7pt;" ><a href="' + TopicLink + '" target="_blank">' + VersionString + '</a></span>';

  ul = document.createElement('ul');
  ul.id = 'wtg-ul';
  menu.appendChild(ul);
  document.getElementById('leftColumn').getElementsByTagName('ul')[0].parentNode.appendChild(menu);

  return ul;
}

/**
 * Add watch menu to the script menu
 * 
 * @param {Element} Menu ul
 */
function addWatchMenu(menu) {
  var li, textarea;
  
  li = document.createElement('li');
  textarea = document.createElement('textarea');
  textarea.value = 'Enter game #, player name or tournament name';
  
  textarea.addEventListener('focus', function () {
    this.value = ''; this.style.color = '#000';
  }, false);
  
  textarea.addEventListener('blur', function () {
    if (this.value == '') {
      this.value = 'Enter game #, player name or tournament name';
      this.style.color = '#ccc';
    }
  }, false);

  textarea.addEventListener('keyup', function (e) {
    if (e.keyCode == 27) {
      this.blur();
    }
    if (e.keyCode == 13) {
      watchObject(this.value.trim());
      this.value = '';
      this.blur();
    }
  }, false);
  
  li.appendChild(textarea);
  menu.appendChild(li);
}

/**
 * Add unwatch menu to the script menu
 * 
 * @param {Element} Menu ul
 */
function addUnwatchMenu(menu) {
var li, a;
  
  li = document.createElement('li');
  a = document.createElement('a');
  a.href = 'javascript:void(0);';
  a.addEventListener('click', function () {
    if (confirm('Are you sure you want to unwatch all games?'))
      unwatchAllGames();
  }, false);
  a.appendChild(document.createTextNode('Unwatch all games'));
  
  li.appendChild(a);
  menu.appendChild(li);
}

/**
 * Add settings menu to the script menu
 * 
 * @param {Element} Menu ul
 */
function addSettingsMenu(menu) {
  var li, ul, a, strong;
  
  li = document.createElement('li');
  a = document.createElement('a');
  a.id = 'wtg-menu-options';
  a.href = 'javascript:void(0);';
  a.addEventListener('click', toggleMenu, false);
  a.appendChild(document.createTextNode('Options'));
  li.appendChild(a);
  
  ul = document.createElement('ul');
  li.appendChild(ul);
  menu.appendChild(li);
  
  // Add "sort by" option
  li = document.createElement('li');
  ul.appendChild(li);
  
  a = document.createElement('a');
  a.href = 'javascript:void(0);';
  
  a.addEventListener('click', function () {
    Script_Options.sort_by = (Script_Options.sort_by == 'time') ? 'number' : 'time';
    GM_setValue('options', serialize(Script_Options));
    this.childNodes[1].innerHTML = (Script_Options.sort_by == 'time') ? 'Time' : 'Game number';
  }, false);
  
  a.appendChild(document.createTextNode('Sort by: '));
  strong = document.createElement('strong');
  strong.appendChild(document.createTextNode((Script_Options.sort_by == 'time') ? 'Time' : 'Game number'));
  a.appendChild(strong);
  li.appendChild(a);
  
  // Add reversed order option
  li = document.createElement('li');
  ul.appendChild(li);
  
  a = document.createElement('a');
  a.href = 'javascript:void(0);';
  
  a.addEventListener('click', function () {
    Script_Options.reverse_order = (Script_Options.reverse_order) ? false : true;
    GM_setValue('options', serialize(Script_Options));
    this.childNodes[1].innerHTML = (Script_Options.reverse_order) ? 'Yes' : 'No';
  }, false);
  
  a.appendChild(document.createTextNode('Reversed order: '));
  strong = document.createElement('strong');
  strong.appendChild(document.createTextNode((Script_Options.reverse_order) ? 'Yes' : 'No'));
  a.appendChild(strong);
  li.appendChild(a);

  // Add profile link option
  li = document.createElement('li');
  ul.appendChild(li);
  
  a = document.createElement('a');
  a.href = 'javascript:void(0);';
  
  a.addEventListener('click', function () {
    Script_Options.profile_link = (Script_Options.profile_link) ? false : true;
    GM_setValue('options', serialize(Script_Options));
    this.childNodes[1].innerHTML = (Script_Options.profile_link) ? 'Yes' : 'No';
  }, false);
  
  a.appendChild(document.createTextNode('Add profile link: '));
  strong = document.createElement('strong');
  strong.appendChild(document.createTextNode((Script_Options.profile_link) ? 'Yes' : 'No'));
  a.appendChild(strong);
  li.appendChild(a);

  // Add waiting games option
  li = document.createElement('li');
  ul.appendChild(li);
  
  a = document.createElement('a');
  a.href = 'javascript:void(0);';
  
  a.addEventListener('click', function () {
    Script_Options.waiting_games = (Script_Options.waiting_games) ? false : true;
    GM_setValue('options', serialize(Script_Options));
    this.childNodes[1].innerHTML = (Script_Options.waiting_games) ? 'Yes' : 'No';
  }, false);
  
  a.appendChild(document.createTextNode('Watch waiting games: '));
  strong = document.createElement('strong');
  strong.appendChild(document.createTextNode((Script_Options.waiting_games) ? 'Yes' : 'No'));
  a.appendChild(strong);
  li.appendChild(a);
}

/**
 * Add version control menu to the script menu
 * 
 * @param {Element} Menu ul
 */
function addVersionMenu(menu) {
  var li, a, win;
  
  li = document.createElement('li');
  a = document.createElement('a');
  a.id = 'wtg-menu-version';
  a.href = 'javascript:void(0);';
  a.addEventListener('click', function () {
    if (GM_getValue('updateAvailable', false)) {
      GM_setValue('lastUpdate', 0); // Reset last update value so we check for update on next page load
      window.location = ScriptLink;
    }
  }, false);
  a.appendChild(document.createTextNode('Latest Version Installed'));
  li.appendChild(a);
  menu.appendChild(li);
  
  getUpdateAvailable();
}

/**
 * onClick handler - toggle script menu visibility 
 * 
 */
function toggleMenu() {
  this.nextSibling.style.display = (this.nextSibling.style.display == 'block') ? 'none' : 'block';
  return false;
}


//---------   Init function   ---------//

/**
 * Everything starts here
 *
 */
function initScript() {
  
  // Quit if user is not logged in
  if (document.getElementById('username')) {
    return;
  }
  
  initGM();
  initOptions();
  initMenu();
  initTab();
  initProfile();
  
  addWatchLinks();
  addStyles();
}

// Start the script
initScript();