// ==UserScript==
// @name       Lexical Word Finder - Named Games Utility
// @namespace  http://www.lexicalwordfinder.com/
// @run-at document-end
// @version    0.1.76
// @description  Adds ability to create name for each saved game
// @match      http://*.lexicalwordfinder.com/*
// @copyright  2012+, AJ Coon <ajcoon@gmail.com>
// @require http://static.lexicalwordfinder.com/includes/jquery/jquery-1.4.1.min-v20100130.1.js
// @require http://static.lexicalwordfinder.com/includes/tablesorter/jquery.tablesorter.min-v20100114.1.js
// ==/UserScript==


// redraw our updated game table
// modified from: http://static.lexicalwordfinder.com/wordfinder-v20110728.1.js
function displaySavedGamesWithNames() {
    var gameTable, lwfSavedGamesCookie, lwfSavedGames;
    gameTable = [];
    lwfSavedGamesCookie = getCookie("gameIds");
    if (lwfSavedGamesCookie !== null && lwfSavedGamesCookie !== "") {
        gameTable.push('<table id="tableSavedGames" width="100%">');
        gameTable.push('<thead title="Hold SHIFT to sort multiple columns."><tr><th><big><a href="#" onclick="return false;">Game Type<span></span></a></big></th><th><big><a href="#" onclick="return false;">Game Name<span></span></a></big></th><th style="text-align:left;"><big><a href="#" onclick="return false;">Word<span></span></a></big></th><th><big><a href="#" onclick="return false;">Value<span></span></a></big></th><th><big><a href="#" onclick="return false;">Date Last Played<span></span></a></big></th><th><big><a href="#" onclick="return false;">Delete?<span></span></a></big></th></tr></thead>');
        gameTable.push("<tbody>");
        lwfSavedGames = lwfSavedGamesCookie.split(" ");
        for (var i = 0; i < lwfSavedGames.length; ++i) {
            var thisGameInfo = getGameIdInformation(lwfSavedGames[i]);
            var thisGameName = gameNames[thisGameInfo.gameId];
            var gameOnClickHandler = "setGameId('" + thisGameInfo.gameId + "'); document.location.href = '?game=" + thisGameInfo.game + "&layout=" + thisGameInfo.layout + "&tiles=" + thisGameInfo.tiles + "&board=" + thisGameInfo.board + "&lexicon=" + thisGameInfo.lexicon + "&word=" + (thisGameInfo.wordNum + 1) + "&save=0';";
            gameTable.push("<tr>");
            gameTable.push('<td onclick="' + gameOnClickHandler + '">' + (thisGameInfo.game === null ? thisGameInfo.game : thisGameInfo.game.replace(/_/g, " ").replace("Words With Friends", "WWF")) + "</td>");
            gameTable.push('<td id="gameName_'+thisGameInfo.gameId +'">' + (thisGameName === null||thisGameName === "" ? "NULL" : thisGameName) + "</td>");
            gameTable.push('<td onclick="' + gameOnClickHandler + '">' + thisGameInfo.foundWord + "</td>");
            gameTable.push('<td onclick="' + gameOnClickHandler + '">' + thisGameInfo.foundWordScore + "</td>");
            var thisGameDateTime = thisGameInfo.dateTime;
            gameTable.push('<td onclick="' + gameOnClickHandler + '">' + thisGameDateTime.getFullYear() + "-" + pad2(thisGameDateTime.getMonth() + 1) + "-" + pad2(thisGameDateTime.getDate()) + " " + pad2(thisGameDateTime.getHours()) + ":" + pad2(thisGameDateTime.getMinutes()) + "</td>");
            gameTable.push('<td class="deleteGame" onclick="deleteGameId(\'' + thisGameInfo.gameId + "'); location.reload();\">delete</td>");
            gameTable.push("</tr>")
        }
        gameTable.push("</tbody>");
        gameTable.push("</table>")
    }
    document.getElementById("divSavedGames").innerHTML = gameTable.join("")
}

// copied dependencies of the above function
function getCookieName(a) {
    a = a.substr(0, a.indexOf("="));
    return a = a.replace(/^\s+|\s+$/g, "")
}
function getCookieValue(a) {
    a = a.substr(a.indexOf("=") + 1);
    a = a.replace(/\+/g, " ");
    return unescape(a)
}
function getCookieArray() {
    return document.cookie.split(";")
}
function getCookie(a) {
    var b, c, d;
    d = getCookieArray();
    for (b = 0; b < d.length; ++b) if (c = d[b], getCookieName(c) === a) return getCookieValue(c);
    return null
}
function getGameIdInformation(a) {
    var b = null;
    return b = new GameIdInformation(a, getCookie("gameId_" + a + ".game"), getCookie("gameId_" + a + ".layout"), getCookie("gameId_" + a + ".tiles"), getCookie("gameId_" + a + ".board"), getCookie("gameId_" + a + ".lexicon"), getCookie("gameId_" + a + ".wordNum"), getCookie("gameId_" + a + ".foundWord"), getCookie("gameId_" + a + ".foundWordScore"), getCookie("gameId_" + a + ".dateTime"))
}
function GameIdInformation(a, b, c, d, e, f, g, h, j, k) {
    this.gameId = a;
    this.game = b;
    this.layout = c;
    this.tiles = d;
    this.board = e;
    this.lexicon = f;
    this.wordNum = parseInt(g);
    this.foundWord = h;
    this.foundWordScore = j;
    this.dateTime = new Date(k)
}
function pad2(a) {
    return (a < 10 ? "0" : "") + a
}
// end dependencies

// convenience attribute to access hashtable keys
Object.prototype.keys = function(){
    var keys = [];
    for(var i in this){
        if (this.hasOwnProperty(i)){
            keys.push(i);
        }
    }
    return keys;
}

// function to return cookie value by name
function readCookie(cookieName){
    cookieName += '=';
    var parts = document.cookie.split(/;\s*/);
    for (var i = 0; i < parts.length; i++){
        var part = parts[i];
        if (part.indexOf(cookieName) == 0){
            return part.substring(cookieName.length);
        }
    }
    return null;
}

function writeCookie(cookieName, cookieValue){
    var cookieString = cookieName + "=" + cookieValue;
    var expiresDate = new Date();
    var millisecondsToYears = 365*24*60*60*1000;
    expiresDate.setTime( expiresDate.getTime()+(10*millisecondsToYears) );
    var expiresString = "expires="+expiresDate.toGMTString();
    cookieString += "; " + expiresString;
    document.cookie = cookieString;
}

// prompt user for new name, save to cookie, and refresh game table
function getGameName(gameId){
    var oldGameName = gameNames[gameId];
    var newGameName = prompt("Enter a new name for game Id "+ gameId +":",oldGameName);
    gameNames[gameId] = newGameName;
    writeCookie("LWFGameNames", buildNewGameNamesCookie());
    
    refreshGameTableInterface();
}

function refreshGameTableInterface(){
    displaySavedGamesWithNames();
    attachNameClickHandlers();
    
    // we broke the table sorting...so let's redo it
    $(document).ready(function()
    {
        $("#tableSavedGames").tablesorter(
        {
            widgets: ["zebra"],
            headers: { 5: { sorter: false } },
            sortList: [[4,1],[3,1]]     // Sort on date, descending, then on score, descending.
        });
    }); 
}

// helper function to pack/serialize gameId:gameName pairs
function buildNewGameNamesCookie(){
    var savedGamePairs = [];
    var gameIds = gameNames.keys();
    for( var i=0; i<gameIds.length; i++ ){
        var gameId = gameIds[i];
        if( gameId == 'keys' ){
            continue;
        }
        savedGamePairs.push(gameId + ":" + gameNames[gameId]);
    }
    var savedGamePairsString = savedGamePairs.join("|");
    return savedGamePairsString;
}

function attachNameClickHandlers(){
    var gameIds = gameNames.keys();
    for( var i=0; i<gameIds.length; i++ ){
        var gameId = gameIds[i];
        // use a closure to deference the gameId pointer
        (function(theGameId){
            var elementId = "gameName_" + theGameId;
            var elementObj = document.getElementById(elementId);
            
            // if deleted games remain in the cookie, we have to remove them
            // a better way to do this would be to integrate with delete link...for another day
            if( elementObj === null ){
                delete gameIds[i];
            } else {
                elementObj.addEventListener("click", function(){getGameName(theGameId);}, true);
            }
        })(gameId);
    }
}

function setDefaultNames(){
    var lwfSavedGamesCookie = getCookie("gameIds");
    if (lwfSavedGamesCookie !== null && lwfSavedGamesCookie !== "") {
        var lwfSavedGames = lwfSavedGamesCookie.split(" ");
        for (var i=0; i<lwfSavedGames.length; i++) {
            var thisGameInfo = getGameIdInformation(lwfSavedGames[i]);
            gameNames[thisGameInfo.gameId] = "Unnamed";
        }
    }
}

function loadSavedGameData(){
    var savedGamesCookie = readCookie("LWFGameNames");
    if( savedGamesCookie !== null && savedGamesCookie !== "" ){
        // populate the hashtable with saved game data
        // the format of the cookie should be:
        //     LWFGameNames=gameId1:gameName1|gameId2:gameName2; expires=...
        var savedGamePairs = savedGamesCookie.split("|");
        for( var i=0; i<savedGamePairs.length; i++ ){
            var gameTuple = savedGamePairs[i].split(":");
            var gameId = gameTuple[0];
            var gameName = gameTuple[1];
            gameNames[gameId] = gameName;
        }
    }
    
    // in case we deleted any games
    writeCookie("LWFGameNames", buildNewGameNamesCookie());
}

// the main code
var savedGamesTable = document.getElementById("tableSavedGames");
if( savedGamesTable !== null ){
    
    var gameNames = new Array();
    
    // initially we use the existing LWF cookie to populate game ids into our hash
    setDefaultNames();
    
    // check for any saved game names
    loadSavedGameData();

    refreshGameTableInterface();
}
