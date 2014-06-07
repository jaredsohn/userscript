// ==UserScript==
// @name          chatsniffer - Conquer Club Game Chat Notifier 
// @namespace     http://userscripts.org/Foxglove
// @description   Displays a notification in the left-hand menu when game chat has been updated in your games
// @include       http://www.conquerclub.com/*
// ==/UserScript==

var _newGameChat = 0;
var _activeGames = [];
var _gameChatLinesKey = "cgGameChatLines";
var _gameChatCurrentGameNumberKey = "cgCurrentGameNumber";
var _currentGame = 0;
var _gameLinks = [];
var _gamesToUpdate = -1;

function GameChatInfo(gameNumber, previousChatLines, newChat) {
    this.gameNumber = gameNumber;
    this.previousChatLines = previousChatLines;
    this.currentChatLines = previousChatLines;
    this.newChatFlag = newChat;
}

Array.prototype.contains = function(key) {
	if(this.indexOf(key) > -1)
	    return true;
	else
	    return false;
};

Array.prototype.remove = function(key) {
    var index = this.indexOf(key);
    if(index > -1)
        this.splice(index, 1);
}

function countChatLines(chat) {
    return chat.split(/<br|<br>|<br \/>/).length;   
}

function addNotificationContainer() {
    var gameMenu = getGameMenu();
    
    var gameChatItem = document.createElement("li");
    var gameChatHtml = "<a id='gameChatNotificationLink' href='http://www.conquerclub.com/player.php?mode=mygames1'>Game Chat";
    if(_newGameChat > 0)
        gameChatHtml += "&nbsp;&nbsp;[ <span class=\"inbox\" id=\"gameChatCount\">" + _newGameChat + "</span> ]";
    gameChatHtml += "</a>";
    gameChatItem.innerHTML = gameChatHtml;
    
    gameMenu.appendChild(gameChatItem);
    
}

function updateGameChatCount() {
    _newGameChat = 0;
    
    for(var gameIndex = 0; gameIndex < _activeGames.length; gameIndex++) {
        if(_activeGames[gameIndex].newChatFlag == "true" || _activeGames[gameIndex].newChatFlag == true) {
            _newGameChat++;
        }
    }
    
    updateNotificationContainer();
}

function updateNotificationContainer() {
    var gameChatCount = document.getElementById("gameChatCount");
    
    if(!gameChatCount && _newGameChat > 0) {
        var gameChatItem = document.getElementById("gameChatNotificationLink");
        gameChatItem.innerHTML += "&nbsp;&nbsp;[ <span class=\"inbox\" id=\"gameChatCount\">" + _newGameChat + "</span> ]";
    }
    else if(_newGameChat < 1) {
        var gameChatItem = document.getElementById("gameChatNotificationLink");
        gameChatItem.innerHTML = "Game Chat";
    }
    else {
        gameChatCount.innerHTML = _newGameChat;
    }
}

function inGame() {
    return /game.php\?game=/.test(location.href);
}

function myGamesPage() {
    return /player.php\?mode=mygames/.test(location.href);
}

function getGameMenuHeader() {
    var tag;
    var tags = document.getElementsByTagName("h3");
    
    for(var tagIndex = 0; tagIndex < tags.length; tagIndex++) {
        if(tags[tagIndex].innerHTML == "Game Menu") {
            tag = tags[tagIndex];
            break;
        }
    }
    
    return tag;
}

function getGameMenu() {
    var header = getGameMenuHeader();
    
    return header.nextSibling.nextSibling;
}

function getLeftMenu() {
    var leftColumn = document.getElementById("leftColumn");
    var uls = leftColumn.getElementsByTagName("ul");
    return uls[0].parentNode;
}

function syncGameObjects(gameNumbers) {
    var currentGames = [];
    
    for(var gameIndex = 0; gameIndex < _activeGames.length; gameIndex++) {
        var gameNumber = _activeGames[gameIndex].gameNumber;
        if(gameNumbers.contains(gameNumber)) {
            currentGames.push(_activeGames[gameIndex]);
            gameNumbers.remove(gameNumber);
        }
    }
    
    for(var gameIndex = 0; gameIndex < gameNumbers.length; gameIndex++) {
        var game = new GameChatInfo(gameNumbers[gameIndex], 0, false);
        currentGames.push(game);
    }
    
    _activeGames = currentGames;    
}

function getUserGames() {
    var username = encodeURI(/logout.php\">logout\s<b>([^"\r\n]*)<\/b>/(document.getElementById("leftColumn").innerHTML)[1]);
    var requestPage = window.location.protocol + "//www.conquerclub.com/api.php?mode=gamelist&names=Y&gs=A&p1un=" + username;
    var request = new XMLHttpRequest();
    request.open('GET', requestPage, true);
    request.onreadystatechange = function() {
        if(request.readyState == 4) {
            var parser = new DOMParser();
            var dom = parser.parseFromString(request.responseText,"application/xml");    

            var games = dom.getElementsByTagName("game_number");
            var gameNumbers = new Array();            
            
            for(var gameIndex = 0; gameIndex < games.length; gameIndex++) {
	            gameNumbers.push(games[gameIndex].firstChild.nodeValue);
	        }
	        
	        syncGameObjects(gameNumbers);

            var currentGameNumberToParse = retrieve(_gameChatCurrentGameNumberKey);
            var gameIndex = 0;
            
            // find starting index
            if(currentGameNumberToParse && currentGameNumberToParse > 0) {
                for(var index = 0; index < _activeGames.length; index++) {
                    if(_activeGames[index].gameNumber == currentGameNumberToParse) {
                        gameIndex = index;
                        break;
                    }
                }            
            }
            
            _gamesToUpdate = _activeGames.length;
            
            // Get current chat line count for each game
	        for(; gameIndex < _activeGames.length; gameIndex++) {
	            if(_activeGames[gameIndex].newChatFlag != "true") {	            
	                getGameChatLineCount(_activeGames[gameIndex].gameNumber);
	                save(_gameChatCurrentGameNumberKey, _activeGames[gameIndex].gameNumber);
    	        }
    	        else {
    	            _gamesToUpdate--;
    	        }
	        }
	    }
    }
    request.send(null);
}

function updateMenu() {
    if(_gamesToUpdate == 0) {
        saveChatLineCount();
    	        
        // we're done!
        save(_gameChatCurrentGameNumberKey, 0);
        
        updateGameChatCount();
        
        if(myGamesPage()) {
            updateGameLinks();
        }
    }
}

function updateCountValues() {
    updateCurrentGameLineCount();
    
    var chatValues = "";
    
    for(var gameIndex = 0; gameIndex < _activeGames.length; gameIndex++) {
        chatValues += _activeGames[gameIndex].gameNumber + ":" + _activeGames[gameIndex].previousChatLines + ":" + _activeGames[gameIndex].newChatFlag;
        
        if(gameIndex < _activeGames.length - 1)
            chatValues += ";";
    }
        
    window.setTimeout( function() { GM_setValue(_gameChatLinesKey, chatValues) }, 0);
}

function updateGameLinks() {
    _gameLinks = document.evaluate("//a[contains(@href,'game.php?game=')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    for(var gameIndex = 0; gameIndex < _activeGames.length; gameIndex++) {
        if(_activeGames[gameIndex].newChatFlag == "true" || _activeGames[gameIndex].newChatFlag == true) {
            updateGameLink(_activeGames[gameIndex].gameNumber);           
        }
    }
}

function updateGameLink(gameNumber) {
    for(var linkIndex = 0; linkIndex < _gameLinks.snapshotLength; linkIndex++) {
        var link = _gameLinks.snapshotItem(linkIndex);
        var linkGameNumber = link.href.split("game=")[1];
        if(gameNumber == linkGameNumber && link.parentNode.innerHTML.indexOf("new chat") == -1)
            link.parentNode.innerHTML += "<span class='errormsg-inline'>new chat!</span>";
    }
}

function updateCurrentGameLineCount() {
    var chat = document.getElementById("chat");
    var chatLineCount = countChatLines(chat.innerHTML);
    
    var gameNumber = (/game=([0-9]*)/(window.location.href))[1]; 
    
    for(var gameIndex = 0; gameIndex < _activeGames.length; gameIndex++) {
        if(_activeGames[gameIndex].gameNumber == gameNumber) {
            _activeGames[gameIndex].previousChatLines = chatLineCount;
            _activeGames[gameIndex].newChatFlag = false;
            break;
        }
    }
}

function getGameChatLineCount(gameNumber) {
    var gamePage = window.location.protocol + "//www.conquerclub.com/game.php?game=" + gameNumber;
    var gameRequest = new XMLHttpRequest();
    gameRequest.open('GET', gamePage, true);
    gameRequest.onreadystatechange = function() {
        if(gameRequest.readyState == 4) {
            // TOTAL HAITI HACK!!!
            var text = gameRequest.responseText;
            var modifiedResponse = text;
            if(text.indexOf('<a href="forum/viewtopic.php?f=1&t=109166">') > -1)
                modifiedResponse = text.slice(0, text.indexOf('<a href="forum/viewtopic.php?f=1&t=109166">')) + text.slice(text.indexOf('</a>') + 4)
            // END SAD HACK

            var parser = new DOMParser();
            var dom = parser.parseFromString(modifiedResponse,"application/xml");    
            var chat = dom.getElementById("chat");
            var chatLineCount = countChatLines(chat.innerHTML);
            
            updateCurrentLineCount(gameNumber, chatLineCount);
            
            _gamesToUpdate--;
            updateMenu();
        }
    }
    gameRequest.send(null);
}

function updateCurrentLineCount(gameNumber, lineCount) {
    for(var gameIndex = 0; gameIndex < _activeGames.length; gameIndex++) {
        if(_activeGames[gameIndex].gameNumber == gameNumber) {
            _activeGames[gameIndex].currentChatLines = lineCount;
            if(_activeGames[gameIndex].currentChatLines != _activeGames[gameIndex].previousChatLines) {
                _activeGames[gameIndex].newChatFlag = true;
                return;
            }
        }
    }
}

function updateLineCount(gameNumber, previousLineCount) {
    for(var gameIndex = 0; gameIndex < _activeGames.length; gameIndex++) {
        if(_activeGames[gameIndex].gameNumber == gameNumber) {
            _activeGames[gameIndex].previousChatLines = previousLineCount;
            break;  
        }        
    }
}

function addChatLinesListener() {
    var chat = document.getElementById("chat");
    chat.addEventListener("DOMNodeInserted", updateCountValues, false);
}


function initializeGameObjects() {
     var gameInfoString = GM_getValue(_gameChatLinesKey);
    
    if(gameInfoString) {
        var games = gameInfoString.split(";");
    
        for(var gameIndex = 0; gameIndex < games.length; gameIndex++) {
            var gameDetails = games[gameIndex].split(":");
            _activeGames[gameIndex] = new GameChatInfo(gameDetails[0], gameDetails[1], gameDetails[2]);
        }
    }
}

function saveChatLineCount() {
    var chatValues = "";
    
    for(var gameIndex = 0; gameIndex < _activeGames.length; gameIndex++) {
        chatValues += _activeGames[gameIndex].gameNumber + ":" + _activeGames[gameIndex].previousChatLines + ":" + _activeGames[gameIndex].newChatFlag;
        
        if(gameIndex < _activeGames.length - 1)
            chatValues += ";";
    }
    
    save(_gameChatLinesKey, chatValues);
}

function save(key, value) {
    GM_setValue(key, value);
}

function retrieve(key) {
    GM_getValue(key);
}

function initialize() {
    initializeGameObjects();
    addNotificationContainer();

    if(inGame()) {
        updateCurrentGameLineCount();
        saveChatLineCount();
    } 
    
    updateGameChatCount();

    if(inGame()) {
        addChatLinesListener();
    }

    if(myGamesPage()) {
        updateGameLinks();
    }
    getUserGames();
}

// And, go!
initialize();