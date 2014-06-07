// ==UserScript==
// @name          Conquer Club Game Link
// @namespace     http://userscripts.org
// @description   Adds game info popup to game links
// @include       http://www.conquerclub.com/forum/viewtopic.php*
// @include       http://www.conquerclub.com/forum/ucp.php?i=pm&mode=view*
// @include       http://www.conquerclub.com/forum/ucp.php?i=pm&mode=compose*
// ==/UserScript==


var links = {};
var body = null;
var divBaseName = "gameLinkInfo";
var cX = 0; var cY = 0; 

function gameDetails(number, name, type, order, spoils, forts, fog, troops, players, round) {
    this.gameNumber = number;
    this.mapName = name;
    this.gameType = type;
    this.playOrder = order;
    this.reinforcements = forts;
    this.spoils = spoils;
    this.fogOfWar = fog;
    this.troopDeploy = troops;
    this.players = players;
    this.round = round;
}

function playerDetails(playerName, eliminated, rankClass) {
    this.playerName = playerName;
    this.eliminated = eliminated;
    this.rankClass = rankClass;
}

function getGameLinks() {
    links = document.evaluate("//a[contains(@href,'game.php?game=')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function UpdateCursorPosition(e) { 
    cX = e.pageX; cY = e.pageY;
}

document.addEventListener("mousemove", UpdateCursorPosition, false);

function assignPosition(d) {
    d.style.left = (cX+15) + "px";
    d.style.top = (cY+10) + "px";
}

function createDivFrame(gameNumber, divID) {
    var gameInfo = document.createElement('div');
    gameInfo.id = divID;
    gameInfo.innerHTML = "Game " + gameNumber + " - <em>loading details...</em>";
    gameInfo.className = "content";
    gameInfo.style.fontSize = "12px";
    gameInfo.style.display = "none";
    gameInfo.style.position = "absolute";
    gameInfo.style.backgroundColor = "white";
    gameInfo.style.padding = "5px";
    gameInfo.style.borderStyle = "solid";
    gameInfo.style.borderColor = "black";
    gameInfo.style.borderWidth = "thin";
    gameInfo.style.zIndex = 99;
    
    body.appendChild(gameInfo);
}

function createDiv(gameNumber) {
    var divID = divBaseName + gameNumber;
    
    if(!document.getElementById(divID)) {
        createDivFrame(gameNumber, divID);
                
        var divHtml = "";
        var fail = false;
                           
        var requestPage = window.location.protocol + "//www.conquerclub.com/player.php?submit=Search&gn=" + gameNumber;
        var request = new XMLHttpRequest();
        request.open('GET', requestPage, true);
        request.onreadystatechange = function() {
            if(request.readyState == 4) {
                try {
                    var text = request.responseText;
                    var modifiedResponse = text;
                    if(text.indexOf('<a href="forum/viewtopic.php?f=1&t=109166">') > -1)
                        modifiedResponse = text.slice(0, text.indexOf('<a href="forum/viewtopic.php?f=1&t=109166">')) + text.slice(text.indexOf('</a>') + 4)
            
                    var parser = new DOMParser();
                    var dom = parser.parseFromString(modifiedResponse,"application/xml");    
                
//                    var parser = new DOMParser();
//                    var dom = parser.parseFromString(request.responseText,"application/xml");    
                    var resultsTable = dom.getElementsByTagName('table');
                    var resultRow;
                    
                    if(resultsTable[0].rows[1].cells.length == 1)
                        resultRow = resultsTable[0].rows[2];
                    else
                        resultRow = resultsTable[0].rows[1];
                        
                    var results = resultRow.cells[1].innerHTML.split('<br xmlns="http://www.w3.org/1999/xhtml"/>');

                    var gameType = results[0].trim();
                    var playOrder = results[2].trim();
                    var troopDeploy = results[1].trim();
                    
                    results = resultRow.cells[2].innerHTML.split('<br xmlns="http://www.w3.org/1999/xhtml"/>');
                    
                    var mapName = results[0].trim();
                    
                    results = resultRow.cells[3].innerHTML.split('<br xmlns="http://www.w3.org/1999/xhtml"/>');
                    
                    var spoils = results[0].trim();
                    var reinforcements = results[1].trim();
                    var fogOfWar = results[2].trim();
                    
                    results = resultRow.cells[4].innerHTML.split('<br xmlns="http://www.w3.org/1999/xhtml"/>');
                    
                    var round = results[0].trim().split(' ')[1];
                    if(round == undefined)
                        round = "n/a";
                                        
                    results = resultRow.cells[5].getElementsByTagName("ul");
                    
                    var players = getPlayersWaiting(results);
                    var details = new gameDetails(gameNumber, mapName, gameType, playOrder, spoils, reinforcements, fogOfWar, troopDeploy, players, round);
                    
                    divHtml = createDivHtml(details);
                }
                catch(e) {
                   // alert(e);
                    fail = true;
                }
                
                if(fail)
                    divHtml = "Game " + gameNumber + " details could not be found.";
                
                updateGameInfoDiv(divID, divHtml);
            }
        }
        request.send(null);
    }
}


function getPlayersStarted(responseText) {
    var parser = new DOMParser();
    var dom = parser.parseFromString(responseText,"application/xml"); 
    var lists = dom.getElementsByTagName("ul");
    var playersList;
    
    for(var listIndex = 0; listIndex < lists.length; listIndex++) {
        if(lists[listIndex].id == "players")
            playersList = lists[listIndex];
    }
    
    var players = new Array();
    
    for(var listIndex = 0; listIndex < playersList.childNodes.length; listIndex++) {
        if(playersList.childNodes[listIndex].nodeName == "li") {
            var spans = playersList.childNodes[listIndex].getElementsByClassName("player" + (players.length + 1));
            if(spans.length == 1) {
                var eliminated = playersList.childNodes[listIndex].getElementsByClassName("eliminated").length == 1 ? true : false;
                var rankClass = spans[0].parentNode.className;
                players[players.length] = new playerDetails(spans[0].innerHTML, eliminated, rankClass);
            }      
        }
    }
    
    return players;
}


function getPlayersWaiting(results) {
    var playersList;
                    
    for(var listIndex = 0; listIndex < results.length; listIndex++) {
        if(results[listIndex].className == "players")
            playersList = results[listIndex];
    }
    
    var players = new Array();
    
    for(var listIndex = 0; listIndex < playersList.childNodes.length; listIndex++) {
        if(playersList.childNodes[listIndex].nodeName == "li") {
            var player;
            
            var eliminated = playersList.childNodes[listIndex].getElementsByClassName("eliminated").length == 1 ? true : false;
            
            if(playersList.childNodes[listIndex].childNodes.length == 5)
                player = new playerDetails(playersList.childNodes[listIndex].childNodes[1].innerHTML, eliminated, playersList.childNodes[listIndex].childNodes[1].className);
            if(playersList.childNodes[listIndex].childNodes.length == 3 && playersList.childNodes[listIndex].childNodes[1].childNodes.length == 5) 
                player = new playerDetails(playersList.childNodes[listIndex].childNodes[1].childNodes[1].innerHTML, eliminated, playersList.childNodes[listIndex].childNodes[1].childNodes[1].className);
            else if(playersList.childNodes[listIndex].childNodes.length == 1)
                player = new playerDetails(playersList.childNodes[listIndex].innerHTML, eliminated, playersList.childNodes[listIndex]);
            
            if(player)                                        
                players[players.length] = player;
        }
    }
    
    return players;
}

function updateGameInfoDiv(divID, divHtml) {
    var gameInfoDiv = document.getElementById(divID);
    if(gameInfoDiv) {
        gameInfoDiv.innerHTML = divHtml;
    }
}

function getPlayers() {
    links = document.evaluate("//a[contains(@href,'game.php?game=')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function createDivHtml(gameDetails) {
    try {
        var divHtml = "<table cellspacing=0 cellpadding=2>"    
        + "<tr><td>";
        
        divHtml += "<table>"
        + "<tr><td bgcolor=#eeeeee align=right><b>Map&nbsp;Name:&nbsp;</b></td><td>" + gameDetails.mapName
        + "</td></tr><tr><td bgcolor=#eeeeee align=right><b>Game&nbsp;Type:&nbsp;</b></td><td>" + gameDetails.gameType
        + "</td></tr><tr><td bgcolor=#eeeeee align=right><b>Initial&nbsp;Troops:&nbsp;</b></td><td>" + gameDetails.troopDeploy
        + "</td></tr><tr><td bgcolor=#eeeeee align=right><b>Play&nbsp;Order:&nbsp;</b></td><td>" + gameDetails.playOrder
        + "</td></tr><tr><td bgcolor=#eeeeee align=right><b>Spoils:&nbsp;</b></td><td>" + gameDetails.spoils
        + "</td></tr><tr><td bgcolor=#eeeeee align=right><b>Forts:&nbsp;</b></td><td>" + gameDetails.reinforcements
        + "</td></tr><tr><td bgcolor=#eeeeee align=right><b>Fog&nbsp;of&nbsp;War:&nbsp;</b></td><td>" + gameDetails.fogOfWar 
        + "</td></tr><tr><td bgcolor=#eeeeee align=right><b>Round:&nbsp;</b></td><td>" + gameDetails.round + "</b></td></tr></table>";
        
        divHtml += "</td><td><table>"; 
               
        var teamSize = 1;
        switch(gameDetails.gameType) {
            case "Doubles":
                teamSize = 2;
                break;
            case "Triples":
                teamSize = 3;
                break;
            case "Quadruples":
                teamSize = 4;
                break;
            default: 
                teamSize = 1;
       }
       
        for(var playerIndex = 0; playerIndex < gameDetails.players.length; playerIndex++) {
            divHtml += "<tr><td bgcolor=#eeeeee align=right><b>";
            if(teamSize == 1 && playerIndex == 0)
                divHtml += "&nbsp;Players:";
            else if(playerIndex % teamSize == 0 && teamSize > 1) 
                divHtml += "&nbsp;Team " + (Math.floor(playerIndex / teamSize) + 1) + ":";
            divHtml += "</b>&nbsp;</td><td>";
            if(gameDetails.players[playerIndex].eliminated)
                divHtml += "<span class='eliminated'>";
            divHtml += "<span class='icon " + gameDetails.players[playerIndex].rankClass + "' style='padding-left:22px'>";  
            divHtml += gameDetails.players[playerIndex].playerName;
            divHtml += "</span>";
            if(gameDetails.players[playerIndex].eliminated)
                divHtml += "</span>";
            divHtml += "</td></tr>";
       }
       divHtml += "</table></td></tr></table>";
       
       return divHtml;
    }
    catch(e) {
        return "Game " + gameDetails.gameNumber + " details could not be found.";
    }
}

function addEventFunctions(gameNumber, link) {
    link.addEventListener("mouseover" , function () { 
        var gameInfoDiv = document.getElementById(divBaseName + gameNumber);
        assignPosition(gameInfoDiv);
        gameInfoDiv.style.display = "block";
    }, true);
    
    link.addEventListener("mouseout" , function () { 
        var gameInfoDiv = document.getElementById(divBaseName + gameNumber);
        gameInfoDiv.style.display = "none";
    }, true);
}

function processGameLinks() {
    getGameLinks();

    for(var linkIndex = 0; linkIndex < links.snapshotLength; linkIndex++) {
        var link = links.snapshotItem(linkIndex);
        var gameNumber = link.href.split("game=")[1];
        
        createDiv(gameNumber);
        addEventFunctions(gameNumber, link);
    }
}    

function trimString (str) {
  str = typeof this.valueOf() == 'string' ? this : str;
  return str.replace(/^\s+/g, '').replace(/\s+$/g, '');
}

String.prototype.trim = trimString;

 
body = document.getElementsByTagName("body")[0];

// Why don't you work? :(
//GM_addStyle("#gameInfo { display: block; position: absolute; border-style: solid; background-color: blue; padding: 5px; }");

processGameLinks();
