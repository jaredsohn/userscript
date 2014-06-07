// ==UserScript==
// @name          chatglove - Conquer Club Floating Game Chat 
// @version       1.6.16
// @namespace     http://userscripts.org
// @description   Allows game chat window to float and be dragged and resized
// @include       http*://www.conquerclub.com/*
// ==/UserScript==
var version = "1.6.16";
var forumUrl = "http://www.conquerclub.com/forum/viewtopic.php?f=527&t=132761";

/******************************************************************************
Chrome support
******************************************************************************/

if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
    var namespace = "BOB.";
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
        value = value.slice(1);
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
        var i,result = [];
        for (i = 0; i < localStorage.length; i++) {
            var name = localStorage.key(i);
            if (name.indexOf(namespace) == 0) {
                result.push(name.slice(namespace.length));
            }
        }
        return result;
    }
    GM_xmlhttpRequest=function(obj) {
    var request=new XMLHttpRequest();
    request.onreadystatechange=function() {
            if(obj.onreadystatechange) {
                obj.onreadystatechange(request);
            };
            if(request.readyState==4 && obj.onload) {
                obj.onload(request);
            }
        }
    request.onerror=function() {
            if(obj.onerror) {
                obj.onerror(request);
            }
        }
    try {
            request.open(obj.method,obj.url,true);
        } catch(e) {
            if(obj.onerror) {
                obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} );
            };
            return request;
        }
    if(obj.headers) { 
            for(var name in obj.headers) {
                request.setRequestHeader(name,obj.headers[name]);
            }
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

GM_addStyle(".chatFrame {position: absolute; margin: 0px; z-index: 100; border-color: black; border-style: solid; border-width: 1px; background-color: #ffffff;}");
GM_addStyle(".dragHandle {cursor: move;}");
GM_addStyle(".resizeHandle { position: absolute; float: right; width: 16px; height: 16px; font-size: 1px; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAOVJREFUOE+VkMkKg0AQRBNBEfz/uwuKuCtePPlRguAW83TAJOho7MMwU1PdVdXPeZ4ft4qGW/XYs6dpko1wHOegQcZ2XXfx/qcfZhuGIVX4dsU9jmNGZ1m2bOhEQbRFUQS7LEvBvLDkeZ6mafQ0TXPRMI5jmqaKouBkGAbYnGdbyvMcJ0mSdF0HG3tVVUm3xAZVVfV9f0toWRbsYwUxidmvtVAwTVPXdfCD0GInYRiKFfV9X9c1SBAEB6HxwB8niaHCIDeIbdvcAT8KbduCCidiEg3ogBRFwRPCj8KSZs20pdwj4usNaGtsP1UCS/kAAAAASUVORK5CYII=); bottom: 0px; right: 0px; cursor: se-resize;}"); //border: 1px solid #333;

var _initializing = true;
var _positionKey = "cgPosition";
var _initialPositionKey = "cgInitialPosition";
var _defaultCheckboxBehaviorKey = "cgDefaultCheckboxBehavior";
var _ignoredBaseKey = "cgIgnoreGame";
var _oldChatLineCount = 0;
var features = "";
var originalDisplayPosition = 1;
var restoring = false;
var _isTeamGame = true;
var _myGamesPage = false;
var _inGame = false;
var _defaultCheckboxBehavior = 1;

var _chatsniffEnabled = 1;
var _chatsniffEnabledKey = "cgChatsniffEnabled";
var _newGameChat = 0;
var _activeGames = [];
var _gameChatLinesKey = "cgGameChatLines";
var _gameLinks = [];
var _gamesToUpdate = -1;
var _chatsniffIntervalKey = "cgSniffInterval";
var _chatsniffInterval = 0;
var _chatsniffLastUpdateKey = "cgSniffLastUpdate";

var _ignoreText = "Ignore game chats";
var _showText = "Show game chats";

function GameChatInfo(gameNumber, previousChatLines, currentChatLines, newChat) {
    this.gameNumber = gameNumber;
    this.previousChatLines = previousChatLines;
    this.currentChatLines = currentChatLines;
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

function getGameNumber(url) {
    return (/game=([0-9]*)/.exec(url))[1];
}

function detachChat() {
    detachChat(true);
}

function detachChat(scrollToChat) {
    var gameChatFrame = showChatFrame(true);
    
    showDetachHeader(false);
    showChatForm(false);
    
    addMessageBox();
    
    adjustChatDimensions(gameChatFrame);
    
    if(scrollToChat)
        scrollWindowToChat(gameChatFrame);
    
    addChatLinesListener(true);
}

function restoreChat() {
    restoring = true;

    showDetachHeader(true);

    showChatForm(true);

    addChatLinesListener(false);

    showChatFrame(false);

    restoreChatLog();

    restoring = false;
}

function addChatLinesListener(add) {
    chat = document.getElementById("chat");    
    if(add)
        chat.addEventListener("DOMNodeInserted", getChatLines, false);
    else
        chat.removeEventListener("DOMNodeInserted", getChatLines, false);
}

function addChatSniffLinesListener() {
    var chat = document.getElementById("chat");
    chat.addEventListener("DOMNodeInserted", updateCountValues, false);
}


function getChatLines() {
    //var chat = document.getElementById("chat");
    //var lines = chat.innerHTML.split(/<br>|<br \/>/);

    //if(lines.length != _oldChatLineCount) {
        adjustChatScroll();
        
     //   _oldChatLineCount = lines.length;
    //}
}

function addMessageBox() {
    var messageCell = document.getElementById("messageCell");
    messageCell.appendChild(document.getElementById("message"));
}

function adjustChatDimensions(chatFrame) {
    if(ExtractNumber(chatFrame.style.width) > 0)
        adjustMessageInputWidth(chatFrame.style.width);
        
    if(ExtractNumber(chatFrame.style.height) > 0) {
        adjustChatHeight(chatFrame.style.height);
        adjustChatScroll();
    }
}

function scrollWindowToChat(chatFrame) {
    if(getXCoord(chatFrame) > 0 && getYCoord(chatFrame) > 0)
        window.scrollTo(getXCoord(chatFrame), getYCoord(chatFrame));
}

function restoreChatLog() {
    var chatLog = document.getElementById("chat");
    var chatHeaderFrame = document.getElementById("chatHeaderFrame");
    var parent = chatHeaderFrame.parentNode;
    parent.insertBefore(chatLog, chatHeaderFrame.nextSibling);
    
    chatLog.style.marginBottom = "20px";
    chatLog.style.padding = "0px";
    chatLog.style.borderBottom = "0px";
    chatLog.style.height = "150px";
    chatLog.scrollTop = chatLog.scrollHeight;
}

function createParentFrame() {
    var gameChatParent = document.getElementById("gameChatFrame");
    
    if(gameChatParent == null) {
        gameChatParent = document.createElement('div');
        gameChatParent.id = "gameChatFrame";
        gameChatParent.className = "chatFrame";
        gameChatParent.innerHTML = "<table cellpadding='2' cellspacing='0' border='0' width='100%' style='background:#bcb;border-bottom: 1px solid #454;'><tr><td id='gameChatFrameHandle' class='dragHandle' width='100%'><b><span>chatglove</span></b></td><td align='right'>[<a id='restoreChatLink'>restore</a>]</td></tr></table>";

        var log = document.getElementById("log");
        var parent = log.parentNode;
        parent.appendChild(gameChatParent);
        
        var restoreLink = document.getElementById('restoreChatLink');
        restoreLink.addEventListener("click", restoreChat, false);
    }
    
    var resizeHandleDiv = document.getElementById("resizeHandle");
    if(resizeHandleDiv == null) {
        resizeHandleDiv = document.createElement("div");
        resizeHandleDiv.id = "resizeHandle";
        resizeHandleDiv.className = "resizeHandle";
    }
        
    gameChatParent.appendChild(resizeHandleDiv);
    
    gameChatParent.style.display = "block";
    
    return gameChatParent;
}

function initializeLocation() {
    var gameChatParent = document.getElementById("gameChatFrame");
    
    try {
        var positions = GM_getValue(_positionKey);
        var position = positions.split(",");
        
        if(position.length != 4)
            throw "Position not set.";
            
        gameChatParent.style.zIndex = 1000;
        gameChatParent.style.position = "absolute";
        gameChatParent.style.top = position[0] - 95 + "px";
        gameChatParent.style.left = position[1] - 208 + "px";
        gameChatParent.style.width = position[2];
        gameChatParent.style.height = position[3];
        
        adjustChatHeight(ExtractNumber(position[3]));
    }
    catch(e) {
        gameChatParent.style.zIndex = 1000;
        gameChatParent.style.position = "absolute";
        gameChatParent.style.top = "10px";
        gameChatParent.style.left = "10px";
        gameChatParent.style.width = "400px";
        gameChatParent.style.height = "300px";
    }
}

function getChatForm(restoreMessage) {
    var chatForm = document.getElementById("chat-form");
    /*var forms = document.getElementsByTagName("form");

    for(var formIndex = 0; formIndex < forms.length; formIndex++) {
        var legends = forms[formIndex].getElementsByTagName("legend");
        
        if(legends.length == 1 && legends[0].innerHTML.toLowerCase() == "write to game chat") {
            chatForm = forms[formIndex];
        }
    }*/
    
    if(restoreMessage) {
        var divs = chatForm.getElementsByTagName("div");
        if(divs.length > 0) {
            divs[0].appendChild(document.getElementById("message"));
        }
    }
    
    return chatForm;
}

function adjustChatScroll() {
    var chat = document.getElementById("chat");
    chat.scrollTop = chat.scrollHeight;
}

function getChatFrame() {
    var gameChatParent = createParentFrame();    
    
    var chatLog = document.getElementById("chat");
    chatLog.style.marginBottom = "0px";
    chatLog.style.padding = "5px";
    chatLog.style.borderBottom = "1px solid #454";
    chatLog.style.background = "#eeeeee";
    gameChatParent.appendChild(chatLog);
    
    var message = getMessageFrame(gameChatParent);
    gameChatParent.appendChild(message);

    if(_initializing) {
        initializeLocation();
        
        var dragChat = new dragObject(gameChatParent, document.getElementById("gameChatFrameHandle"), document.getElementById("resizeHandle"));
        _initializing = false;
    }
    
    return gameChatParent;
}

function getMessageFrame(gameChatParent) {
    var message = document.getElementById("postMessageDiv");
    
    if(message == null) {
       message = document.createElement("div");
        message.id = "postMessageDiv";
        message.style.width = "100%";
        var messageHtml = "<table cellpadding=0 cellspacing=5 border=0><tr><td><label class='field-label' for='messagecg'>Message: </label></td><td id='messageCell' colspan=2>";
        messageHtml += "</td></tr><tr><td>&nbsp;</td><td><input type='checkbox' id='cgTeamOnly' name='cgTeamOnly'";
        if(_isTeamGame)
            messageHtml += " checked='checked'><label for='cgTeamOnly'>team only?</label>";
        else    
            messageHtml += "><label for='cgTeamOnly'>note to self?</label>";
        messageHtml += "</td><td align='right'><input type='button' value='Post' id='cgSubmit'/>&nbsp;</td></tr></table> ";
        message.innerHTML = messageHtml;
        gameChatParent.appendChild(message);
        
        var cgSubmit = document.getElementById("cgSubmit");
        var cgMessage = document.getElementById("message");
        var submit = document.getElementById("submit2");
        
        if(submit.disabled)  {
            cgSubmit.disabled = "disabled";
            var cgTeamOnly = document.getElementById("cgTeamOnly");
            cgTeamOnly.disabled = "disabled";
        }
        else {
            cgSubmit.addEventListener("click", cgSubmitClick, false);
            cgMessage.addEventListener("keypress", cgKeyPress, false);
        }
    }
    
    return message;
}

function isTeamGame() {
    try {
        var playerList = document.getElementById("players");
        var firstChildId = getFirstChildElement(playerList).getAttribute("id");
        return ( firstChildId == null );
    }
    catch(e)
    {
        return false;
    }
}

function cgSubmitClick() {
    var submit = document.getElementById("submit2");
    var cgTeamOnly = document.getElementById("cgTeamOnly");
    var teamOnly = document.getElementById("team");
    
    if(teamOnly != null)
        teamOnly.checked = cgTeamOnly.checked;
        
    submit.click();
    
    if(_defaultCheckboxBehavior) {
        if(_isTeamGame)
            cgTeamOnly.checked = true;    
        else
            cgTeamOnly.checked = false;
    }
}

function cgKeyPress(e) {
    if(e.keyCode == 13)
        cgSubmitClick();
}

function getPreviousSibling(n)
{
    x=n.previousSibling;
    while (x.nodeType!=1)
    {
        x=x.previousSibling;
    }
    return x;
}

function getNextSibling(n)
{
    x=n.nextSibling;
    while (x.nodeType!=1)
    {
        x=x.nextSibling;
    }
    return x;
}

function getFirstChildElement(n)
{
    x=n.childNodes[0];
    while (x.nodeType!=1)
    {
        x=x.nextSibling;
    }
    return x;
}

function getGameChatHeader() {
    var chatWindow = document.getElementById("chat");
    var tag = getPreviousSibling(chatWindow);
    
    /*var tag;
    var tags = document.getElementsByTagName("h3");
    
    for(var tagIndex = 0; tagIndex < tags.length; tagIndex++) {
        if(tags[tagIndex].innerHTML == "Geme-a Chet") {
            tag = tags[tagIndex];
            break;
        }
    }*/
    
    return tag;
}

function createDetachLinkHeader() {
    var coreChatHeader = getGameChatHeader();
    
    var chatHeader = document.createElement("div");
    chatHeader.id = "chatHeaderFrame";
    chatHeader.innerHTML = "<table cellpadding='0' cellspacing='0' border='0' width='100%'><tr><td id='chatHeaderCell' width='100%'></td><td align='right'>&nbsp;<br>[<a id='detachChatLink'>detach&nbsp;chat</a>]</td></tr></table>";

    var gameLog = document.getElementById("chat");
    var parent = gameLog.parentNode;
    parent.insertBefore(chatHeader, gameLog);

    var chatHeaderCell = document.getElementById("chatHeaderCell");
    chatHeaderCell.appendChild(coreChatHeader);

    var detachLink = document.getElementById('detachChatLink');
    detachLink.addEventListener("click", detachChat, false);
}

function showDetachHeader(show) {
    var chatHeaderFrame = document.getElementById("chatHeaderFrame");
    
    if(show)
        chatHeaderFrame.style.display = "inline";
    else    
        chatHeaderFrame.style.display = "none";
}

function showChatForm(show) {
    var chatForm = getChatForm(show);
    
    if(show)
        chatForm.style.visibility = "visible";
    else
        chatForm.style.visibility = "hidden";
}

function showChatFrame(show) {
    var chatFrame = getChatFrame();
    
    if(show) 
        chatFrame.style.display = "block";
    else
        chatFrame.style.display = "none";
        
    return chatFrame;
}

function dragObject(dragElement, dragHandle, resizeHandle) {
    var _startX = 0; // mouse starting positions 
    var _startY = 0; 
    var _offsetX = 0; // current element offset 
    var _offsetY = 0; 
    var _oldZIndex = 0; // we temporarily increase the z-index during drag 
    var _startXResize = 0; // mouse starting positions 
    var _startYResize = 0; 
    var _startWidth = 0;
    var _startHeight = 0;

    if(dragHandle == null)
        dragHandle = dragElement;

    dragHandle.addEventListener("mousedown", OnMouseDown, false);
    resizeHandle.addEventListener("mousedown", OnMouseDownResize, false);
    
    if(dragElement.style.left.length == 0) {
        var x = getXCoord(dragElement);
        var y = getYCoord(dragElement);
        
        dragElement.style.left = x;
        dragElement.style.top = y;
    }
    
    if(dragElement.style.width.length == 0) {
        dragElement.style.width = dragElement.style.offsetWidth;
        dragElement.style.height = dragElement.style.offsetHeight;
    }
    
    function OnMouseDown(e) { 
        var target = e.target;

        if (e.button == 0) { 
            _startX = e.clientX; 
            _startY = e.clientY; 
            
            _offsetX = ExtractNumber(dragElement.style.left); 
            _offsetY = ExtractNumber(dragElement.style.top);
            
            _oldZIndex = dragElement.style.zIndex;
            dragElement.style.zIndex = 10000;
            
            document.addEventListener("mousemove", OnMouseMove, false);
            document.addEventListener("mouseup", OnMouseUp, false);
            
            // cancel out any text selections 
            document.body.focus(); 
            
            return false; 
        } 
    }
    
    function OnMouseDownResize(e) {
        var target = e.target;
        
        if(e.button == 0) {
            _startXResize = e.clientX; 
            _startYResize = e.clientY; 
            
            _offsetXResize = ExtractNumber(dragElement.style.left); 
            _offsetYResize = ExtractNumber(dragElement.style.top);
            
            _startWidth = ExtractNumber(dragElement.style.width);
            _startHeight = ExtractNumber(dragElement.style.height);
            
            document.addEventListener("mousemove", OnMouseMoveResize, false);
            document.addEventListener("mouseup", OnMouseUpResize, false);
            
            document.body.focus();
            
            return false;
        }
    }

    function OnMouseMove(e) { 
        var newLeft = _offsetX + e.clientX - _startX;
        var newTop = _offsetY + e.clientY - _startY;
        
        dragElement.style.left = newLeft + 'px'; 
        dragElement.style.top = newTop + 'px'; 
    }

    function OnMouseUp(e) { 
        if (dragElement != null) { 
            dragElement.style.zIndex = _oldZIndex; 
            
            document.removeEventListener("mousemove", OnMouseMove, false);
            document.removeEventListener("mouseup", OnMouseUp, false);
            
            savePosition();
        } 
    }    
    
    function OnMouseMoveResize(e) { 
        var deltaX = e.clientX - _startXResize;
        var deltaY = e.clientY - _startYResize;
        
        var newWidth = _startWidth + deltaX;
        var newHeight = _startHeight + deltaY;
        
        if(newWidth < 230)
           newWidth = 230;
        if(newHeight < 100)
            newHeight = 100;
        
        adjustChatHeight(newHeight);
        adjustMessageInputWidth(newWidth);
        
        dragElement.style.width = newWidth + 'px'; 
        dragElement.style.height = newHeight + 'px'; 
    }

    function OnMouseUpResize(e) { 
        document.removeEventListener("mousemove", OnMouseMoveResize, false);
        document.removeEventListener("mouseup", OnMouseUpResize, false);
        
        savePosition();
        
        adjustChatScroll();
    }    
}

function adjustChatHeight(newFrameHeight) {
    document.getElementById("chat").style.height = ExtractNumber(newFrameHeight) - 100 + "px";
}

function adjustMessageInputWidth(newFrameWidth) {
    document.getElementById("message").style.width = ExtractNumber(newFrameWidth) - 90 + "px";
}

function savePosition() {
    var parentFrame = document.getElementById("gameChatFrame");
    var top = getYCoord(parentFrame);
    var left = getXCoord(parentFrame);
    var width = parentFrame.style.width;
    var height = parentFrame.style.height;
    
    GM_setValue(_positionKey, top + "," + left + "," + width + "," + height);
}


function updateGameChatCount() {
    _newGameChat = 0;
    
    for(var gameIndex = 0; gameIndex < _activeGames.length; gameIndex++) {
        if( (_activeGames[gameIndex].newChatFlag == "true" || _activeGames[gameIndex].newChatFlag == true) 
                && !isGameIgnored(_activeGames[gameIndex].gameNumber) ) {
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

function goToFirstUnreadChatGame() {
    for(var gameIndex = 0; gameIndex < _activeGames.length; gameIndex++) {
        if( (_activeGames[gameIndex].newChatFlag == "true" || _activeGames[gameIndex].newChatFlag == true) 
                && !isGameIgnored(_activeGames[gameIndex].gameNumber) ) {
            window.location.href = window.location.protocol + "//www.conquerclub.com/game.php?game=" + _activeGames[gameIndex].gameNumber;
            return;
        }
    }
    window.location.href = window.location.protocol + "//www.conquerclub.com/player.php?mode=mygames";
}

function getUsername() {
    return encodeURI(/logout.php\">[^"\r\n]*\s<b>([^"\r\n]*)<\/b>/.exec(document.getElementById("leftColumn").innerHTML)[1]);
}

function saveChatLineCount() {
    var chatValues = "";
    
    for(var gameIndex = 0; gameIndex < _activeGames.length; gameIndex++) {
        chatValues += _activeGames[gameIndex].gameNumber + ":" + _activeGames[gameIndex].previousChatLines + ":" +  _activeGames[gameIndex].currentChatLines + ":" + _activeGames[gameIndex].newChatFlag;
        
        if(gameIndex < _activeGames.length - 1)
            chatValues += ";";
    }
    
    window.setTimeout( function() { /* alert('chat values: ' + chatValues); */ GM_setValue(_gameChatLinesKey + "_" + getUsername(), chatValues) }, 0);
}


function initializeGameObjects() {
     var gameInfoString = GM_getValue(_gameChatLinesKey + "_" + getUsername());
    
    if(gameInfoString) {
        var games = gameInfoString.split(";");
    
        for(var gameIndex = 0; gameIndex < games.length; gameIndex++) {
            var gameDetails = games[gameIndex].split(":");
            if(gameDetails.length == 3)
                _activeGames[gameIndex] = new GameChatInfo(gameDetails[0], gameDetails[1], gameDetails[1], gameDetails[2]);
            else
                _activeGames[gameIndex] = new GameChatInfo(gameDetails[0], gameDetails[1], gameDetails[2], gameDetails[3]);
        }
    }
}

function getGameMenu() {
    var leftColumn = document.getElementById("leftColumn");
    return getNextSibling(getNextSibling(getFirstChildElement(getFirstChildElement(getFirstChildElement(leftColumn)))));
}

function addNotificationContainer() {
    var gameMenu = getGameMenu();
    
    var gameChatItem = document.createElement("li");
    var gameChatHtml = "<a id='gameChatNotificationLink' href='javascript:void(0)'>Game Chat";
    if(_newGameChat > 0)
        gameChatHtml += "&nbsp;&nbsp;[ <span class=\"inbox\" id=\"gameChatCount\">" + _newGameChat + "</span> ]";
    gameChatHtml += "</a>";
    gameChatItem.innerHTML = gameChatHtml;
    
    gameChatItem.addEventListener("click", goToFirstUnreadChatGame, true);
    
    gameMenu.appendChild(gameChatItem);
    
}

function updateCountValues() {
    updateCurrentGameLineCount();
    saveChatLineCount();
}


function updateCurrentGameLineCount() {
    try {
        var chat = document.getElementById("chat");
        var chatLineCount = countChatLines(chat.innerHTML);
        
        var gameNumber = getGameNumber(window.location.href); 
        
        for(var gameIndex = 0; gameIndex < _activeGames.length; gameIndex++) {
            if(_activeGames[gameIndex].gameNumber == gameNumber) {
                _activeGames[gameIndex].previousChatLines = chatLineCount;
                _activeGames[gameIndex].newChatFlag = false;
                
                break;
            }
        }
    }
    catch (e) { } 
}

function countChatLines(chat) {
    var lines = chat.split(/<br>|<br|<br\/>|<br \/>/);
    var res = /(\d+)-(\d+)-(\d+)\s(\d+):(\d+):(\d+)/.exec(lines[lines.length-2]);
    var date = new Date(res[1], res[2], res[3], res[4], res[5], res[6]);
    
    return date.getTime();
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
    if ( !isGameIgnored(gameNumber) )
    {
        for(var linkIndex = 0; linkIndex < _gameLinks.snapshotLength; linkIndex++) {
            var link = _gameLinks.snapshotItem(linkIndex);
            var linkGameNumber = getGameNumber(link.href);
            
            if(gameNumber == linkGameNumber && link.parentNode.innerHTML.indexOf("new chat") == -1)
                link.parentNode.innerHTML += "<span class='errormsg-inline'>new chat!</span>";
        }
    }
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
        var game = new GameChatInfo(gameNumbers[gameIndex], 0, 0, false);
        currentGames.push(game);
    }
    
    _activeGames = currentGames;    
}


function getUserGames() {
    var username = getUsername();
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

            var gameIndex = 0;
            _gamesToUpdate = _activeGames.length;
            
            // Get current chat line count for each game
            for(; gameIndex < _activeGames.length; gameIndex++) {
                getGameChatLineCount(_activeGames[gameIndex].gameNumber);
            }
        }
    }
    request.send(null);
}

function getGameChatLineCount(gameNumber) {
    var gamePage = window.location.protocol + "//www.conquerclub.com/game.php?game=" + gameNumber;
    var gameRequest = new XMLHttpRequest();
    gameRequest.open('GET', gamePage, true);
    gameRequest.onreadystatechange = function() {
        if(gameRequest.readyState == 4) {
            var text = gameRequest.responseText;
            var modifiedResponse = text;
            var chatContent = "";
            try {
                var parser = new DOMParser();
                var dom = parser.parseFromString(modifiedResponse,"application/xml");    
                var chat = dom.getElementById("chat");
                chatContent = chat.innerHTML;
            }
            catch(e) { 
                var start = modifiedResponse.indexOf("<div id=\"chat") + 15;
                chatContent = modifiedResponse.substring(start, modifiedResponse.indexOf("</div>", start));
            }
            
            try {
                var chatLineCount = countChatLines(chatContent);
                updateCurrentLineCount(gameNumber, chatLineCount);
            }
            catch (e) { }
            
            _gamesToUpdate--;
            updateMenu();
        }
    }
    gameRequest.send(null);
}

function updateMenu() {
    if(_gamesToUpdate == 0) {
        saveChatLineCount();
                
        updateGameChatCount();
        
        if(myGamesPage()) {
            updateGameLinks();
        }
    }
}


function updateCurrentLineCount(gameNumber, lineCount) {
    for(var gameIndex = 0; gameIndex < _activeGames.length; gameIndex++) {
        if(_activeGames[gameIndex].gameNumber == gameNumber) {
            _activeGames[gameIndex].currentChatLines = lineCount;
           
            var current = parseInt(_activeGames[gameIndex].currentChatLines);
            var previous = parseInt(_activeGames[gameIndex].previousChatLines);
            
            if(current != previous) {
                //alert("game number: " + _activeGames[gameIndex].gameNumber + ": current: " + _activeGames[gameIndex].currentChatLines + "; previous: " + _activeGames[gameIndex].previousChatLines);
                _activeGames[gameIndex].newChatFlag = true;
                return;
            }
        }
    }
}


function ExtractNumber(value) { 
    var n = parseInt(value); 
    return n == null || isNaN(n) ? 0 : n; 
} 

function getXCoord(el) {
    x = 0;
    while(el){
        x += el.offsetLeft;
        el = el.offsetParent;
    }
    return x;
}
function getYCoord(el) {
    y = 0;
    while(el){
        y += el.offsetTop;
        el = el.offsetParent;
    }
    return y;
}

function getLeftMenu() {
    var leftColumn = document.getElementById("leftColumn");
    var uls = leftColumn.getElementsByTagName("ul");
    return uls[0].parentNode;
}


function showMenu() {
    var cgMenu = document.createElement('div');
    var protocol = window.location.protocol;
    cgMenu.id = "chatgloveMenu";
    var html = "<h3><b>chatglove <span style='font-size:7pt;' ><a href='" + forumUrl + "'>" + version + "</a></span></b></h3>";
    cgMenu.innerHTML = html;
    
    var leftMenu = getLeftMenu();
    leftMenu.appendChild(cgMenu);
    
    var ul = document.createElement("ul");
    ul.style.borderWidth = "1px 1px 0px 1px";
    ul.style.width = "151px";
    var html = "<li><a href='javascript:void(0)'   onclick=\"document.getElementById('cgOptions').style.display=(document.getElementById('cgOptions').style.display == ''? 'none':'');\">Options</a></li>";
    html += "<div id='cgOptions' style='display:none; border-bottom-style: solid; border-bottom-width:1px'>&nbsp;<b>Initial State</b><br>";
    html += "<input type='radio' name='cgDefaultDisplay' id='cgDisplayOriginal'";
    if(originalDisplayPosition)
        html += " checked";
    html += ">&nbsp;Original<br><input type='radio' name='cgDefaultDisplay' id='cgDisplayDetached'";
    if(!originalDisplayPosition)
        html += " checked";
    html += ">&nbsp;Detached<br>";
    html += "&nbsp;<b>Self/Team Checkbox</b><br>";
    html += "<input type='radio' name='cgDefaultCheckbox' id='cgDefaultCheckboxBehavior'";
    if(_defaultCheckboxBehavior)
        html += " checked";
    html += ">&nbsp;Original<br><input type='radio' name='cgDefaultCheckbox' id='cgPersistentCheckboxBehavior'";
    if(!_defaultCheckboxBehavior)
        html += " checked";
    html += ">&nbsp;Persistent<br>";
    html += "&nbsp;<b>chatsniffer</b><br>";
    html += "<input type='checkbox' name='cgEnableChatsniff' id='cgEnableChatsniff'";
    if(_chatsniffEnabled)
        html += " checked";
    html += ">&nbsp;Enabled<br>";
    html += "&nbsp;<b>chatsniff Interval</b><br>";
    html += "<input type='radio' name='cgSniffInterval' id='cgIntervalEveryPage'";
    if(_chatsniffInterval == 0)
        html += " checked";
    html += ">&nbsp;every page load<br><input type='radio' name='cgSniffInterval' id='cgInterval1min'";
    if(_chatsniffInterval == 1)
        html += " checked";
    html += ">&nbsp;1 minute<br><input type='radio' name='cgSniffInterval' id='cgInterval5min'";    
    if(_chatsniffInterval == 5)
        html += " checked";
    html += ">&nbsp;5 minutes<br>"; 
    html += "</div>";
    
    ul.innerHTML = html;
    cgMenu.appendChild(ul);
    
    if(_chatsniffEnabled) {
        var ulSniff = document.createElement("ul");
        ulSniff.style.borderWidth = "0px 1px 0px 1px";
        ulSniff.style.width = "151px";
        var sniffHtml = "<li><a href='javascript:void(0)' id='cgMarkChatRead'>Mark all chat as read</a></li>";
        ulSniff.innerHTML = sniffHtml;
        cgMenu.appendChild(ulSniff);
    }
    
    if(_inGame) {
        var ulReset = document.createElement("ul");
        ulReset.style.borderWidth = "0px 1px 0px 1px";
        ulReset.style.width = "151px";
        var resetHtml = "<li><a href='javascript:void(0)' id='cgResetChatglove'>Reset chat position</a></li>";
        ulReset.innerHTML = resetHtml;
        cgMenu.appendChild(ulReset);
        
        var ulIgnore = document.createElement("ul");
        ulIgnore.style.borderWidth = "0px 1px 0px 1px";
        ulIgnore.style.width = "151px";
        var menuText = _ignoreText;
        if ( isGameIgnored(getGameNumber(window.location.href)) )
        {
            menuText = _showText;
        }
        var ignoreHtml = "<li><a href='javascript:void(0)' id='cgIgnoreChatglove'>" + menuText + "</a></li>";
        ulIgnore.innerHTML = ignoreHtml;
        cgMenu.appendChild(ulIgnore);
    }
    
    document.getElementById('cgDisplayOriginal').addEventListener("click" , function () {
        displayOriginal = (this.checked == true)? 1 : 0;
        GM_setValue(_initialPositionKey, displayOriginal);
    }, true);
    document.getElementById('cgDisplayDetached').addEventListener("click" , function () {
        displayOriginal = (this.checked == true)? 0 : 1;
        GM_setValue(_initialPositionKey, displayOriginal);
    }, true);
    document.getElementById('cgDefaultCheckboxBehavior').addEventListener("click" , function () {
        _defaultCheckboxBehavior = (this.checked == true)? 1 : 0;
        GM_setValue(_defaultCheckboxBehaviorKey, _defaultCheckboxBehavior);
    }, true);
    document.getElementById('cgPersistentCheckboxBehavior').addEventListener("click" , function () {
        _defaultCheckboxBehavior = (this.checked == true)? 0 : 1;
        GM_setValue(_defaultCheckboxBehaviorKey, _defaultCheckboxBehavior);
    }, true);
    document.getElementById('cgEnableChatsniff').addEventListener("click" , function () {
        _chatsniffEnabled = (this.checked == true)? 1 : 0;
        GM_setValue(_chatsniffEnabledKey, _chatsniffEnabled);        
    }, true);
     document.getElementById('cgIntervalEveryPage').addEventListener("click" , function () {
        _chatsniffInterval = (this.checked == true)? 0 : _chatsniffInterval;
        GM_setValue(_chatsniffIntervalKey, _chatsniffInterval);        
    }, true);
    document.getElementById('cgInterval1min').addEventListener("click" , function () {
        _chatsniffInterval = (this.checked == true)? 1 : _chatsniffInterval;
        GM_setValue(_chatsniffIntervalKey, _chatsniffInterval);        
    }, true);
    document.getElementById('cgInterval5min').addEventListener("click" , function () {
        _chatsniffInterval = (this.checked == true)? 5 : _chatsniffInterval;
        GM_setValue(_chatsniffIntervalKey, _chatsniffInterval);        
    }, true);
    if(_chatsniffEnabled) {
        document.getElementById('cgMarkChatRead').addEventListener("click", function() {
            markAllChatAsRead();
        }, true);
    }
    if(_inGame) {
        document.getElementById('cgResetChatglove').addEventListener("click", function () {
            if (confirm("This will reset the position of the floating chat window. Continue?"))
            {
                resetPosition();
            }
        }, true);
        
        document.getElementById('cgIgnoreChatglove').addEventListener("click", function () {
            toggleIgnore();
        }, true);
    }
}

function markAllChatAsRead() {
    for(var gameIndex = 0; gameIndex < _activeGames.length; gameIndex++) {
        _activeGames[gameIndex].previousChatLines = _activeGames[gameIndex].currentChatLines;
        _activeGames[gameIndex].newChatFlag = false;
    }   
    
    updateGameChatCount();
    saveChatLineCount();
    
    if(_myGamesPage)
        clearGameLinks();
}

function resetPosition() {
    try {
        var gameChatParent = document.getElementById("gameChatFrame");
        
        if(gameChatParent) {
            gameChatParent.style.position = "absolute";
            gameChatParent.style.top = "10px";
            gameChatParent.style.left = "10px";
            gameChatParent.style.width = "400px";
            gameChatParent.style.height = "300px";
            
            adjustChatDimensions(gameChatParent);
            
            savePosition();
        }
    }
    catch(e) {
        GM_setValue(_positionKey, "10,10,400px,300px");
    }

}

function clearGameLinks() {
    _gameLinks = document.evaluate("//a[contains(@href,'game.php?game=')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    for(var linkIndex = 0; linkIndex < _gameLinks.snapshotLength; linkIndex++) {
        var link = _gameLinks.snapshotItem(linkIndex);
        var newChatIndex = link.parentNode.innerHTML.indexOf("<span class=\"errormsg-inline\">new chat");
        if(newChatIndex > -1)
            link.parentNode.innerHTML = link.parentNode.innerHTML.replace("<span class=\"errormsg-inline\">new chat!</span>", "");
    }
}

function checkForUpdate() {
    var lastversion = GM_getValue('lastupdate', 0);
    if (lastversion < new Date().getTime() - 60*60*1000) {
        GM_setValue('lastupdate', new Date().getTime() + "");
        GM_xmlhttpRequest({
            method: 'GET',
            url: forumUrl,
            onload: updateServerNumber
        });
    }
    else {
        updateOptionsMenu();
    }
}

function updateServerNumber(response) {
    try {
     var serverVersion = /version\s+(\d+.\d+.\d+)/.exec(response.responseText)[1];
     GM_setValue('updateavailable', serverVersion);
     updateOptionsMenu();
    }catch(e){}
}

function isNewVersion() {
    var serverVersion = GM_getValue('updateavailable', false);
    if (serverVersion) {
        var newVersion = serverVersion.split('.').map(function(string) {
                return parseInt(string,10);
         });
         var thisVersion = version.split('.').map(function(string) {
                return parseInt(string,10);
         });
         return (newVersion[0]>thisVersion[0] || (newVersion[0]==thisVersion[0] && (newVersion[1]>thisVersion[1] || (newVersion[1]==thisVersion[1] && newVersion[2]>thisVersion[2]))));
    }
    return false;
}

function updateOptionsMenu() {
    var cgMenu = document.getElementById("chatgloveMenu");
    var ul = document.createElement('ul');
    ul.style.borderWidth = "0px 1px 0px 1px";
    ul.style.width = "151px";
    var source = "http://userscripts.org/scripts/source/92257.user.js";
    if(isNewVersion()) {
        ul.innerHTML = "<li><a id=\"cgVersionInfo\" href=" + source + "><span class=\"attention\">New Update Available</span></a></li>";
        cgMenu.appendChild(ul);
    }
    else {
        ul.innerHTML = "<li><a id=\"cgVersionInfo\" href=" + source + "><span>Latest Version Installed</span></a></li>";
        cgMenu.appendChild(ul);
    }
    /*var ftext = features.join("\n");
    document.getElementById('cgVersionInfo').addEventListener("click" , function () {
         alert('New version features\n' + ftext);
        },true);*/
}

function isGameIgnored(gamenumber) {
    return GM_getValue(_ignoredBaseKey + gamenumber,false);
}

function toggleIgnore() {
    var gameNumber = getGameNumber(window.location.href);
    
    var currentlyIgnored = isGameIgnored(gameNumber);
    ignoreGame(gameNumber,!currentlyIgnored);
    
    if ( currentlyIgnored )
    {
        document.getElementById("cgIgnoreChatglove").innerHTML = _ignoreText;
    }
    else
    {
        document.getElementById("cgIgnoreChatglove").innerHTML = _showText;
    }
}

function ignoreGame(gamenumber,shouldignore) {
    GM_setValue(_ignoredBaseKey + gamenumber,shouldignore);
}

function initializeOptionValues() {
    var value = GM_getValue(_initialPositionKey);
    if(typeof(value) == "undefined") 
        GM_setValue(_initialPositionKey, originalDisplayPosition);
    else 
        originalDisplayPosition = value;
        
    var checkboxValue = GM_getValue(_defaultCheckboxBehaviorKey);
    
    if(typeof(checkboxValue) == "undefined") 
        GM_setValue(_defaultCheckboxBehaviorKey, _defaultCheckboxBehavior);
    else 
        _defaultCheckboxBehavior = checkboxValue;
        
    var chatsniffEnabledValue = GM_getValue(_chatsniffEnabledKey);
    
    if(typeof(chatsniffEnabledValue) == "undefined") 
        GM_setValue(_chatsniffEnabledKey, _chatsniffEnabled);
    else 
        _chatsniffEnabled = chatsniffEnabledValue;  
        
    var chatsniffIntervalValue = GM_getValue(_chatsniffIntervalKey);
    if(typeof(chatsniffIntervalValue) == "undefined") 
        GM_setValue(_chatsniffIntervalKey, _chatsniffInterval);
    else 
        _chatsniffInterval = chatsniffIntervalValue;      
}

function inGame() {
    return /game.php\?game=/.test(location.href);
}

function myGamesPage() {
    return /player.php\?mode=mygames/.test(location.href);
}

function initialize() {
    _inGame = inGame();
    _myGamesPage = myGamesPage();
    
    initializeOptionValues();
    showMenu();
    
    if(_inGame) {
        _isTeamGame = isTeamGame();
        createDetachLinkHeader();
        
        
        if(!originalDisplayPosition) {
            var chat = document.getElementById("chat");
            chat.addEventListener("DOMNodeRemoved", nodeRemoved, false);

            detachChat(false);
        }
    }
    
    if(_chatsniffEnabled) {
        initializeGameObjects();
        addNotificationContainer();

        if(_inGame) {
            updateCurrentGameLineCount();
            saveChatLineCount();
        } 
    
        updateGameChatCount();

        if(_inGame) {
            addChatSniffLinesListener();
        }

        if(_myGamesPage) {
            updateGameLinks();
        }
        
        if(checkUserGames()) {
            getUserGames();
        }
    }
    
    checkForUpdate();
}

function checkUserGames() {
    var lastUpdate = GM_getValue(_chatsniffLastUpdateKey, 0);
    _chatsniffInterval = GM_getValue(_chatsniffIntervalKey, 0);
    if (lastUpdate < new Date().getTime() - 60 * _chatsniffInterval * 1000) {
        GM_setValue(_chatsniffLastUpdateKey, new Date().getTime() + "");
        return true;
    }
    else {
        return false;
    }
}

function nodeRemoved(event) {
    if(event.relatedNode.id == "gameChatFrame" && !restoring) {
        
        // hey there bob, give it back!
        setTimeout(function () {
            var chat = document.getElementById("chat");
            chat.removeEventListener("DOMNodeRemoved", nodeRemoved, false);
            
            detachChat(false);
        }, 100);
    }
}

// And, go!
initialize();
