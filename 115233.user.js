// ==UserScript==
// @name           ESPN Author Blocker
// @namespace      faleij
// @description    Block Spammers
// @include        http://espn.go.com/community/conversation*
// @include        http://*.espn.go.com/*/conversation*
// @include        http://espn.go.com/community/conversation*
// @include        http://*.espn.go.com/*/conversation*
// @include        http://espn.go.com/blog/*
// @include        http://espn.go.com/*/conversations
// @include        http://espn.go.com/*/conversation* 
// @updateURL  	   http://userscripts.org/scripts/source/115233.meta.js
// @version        1.0.8
// @run-at         document-start
// ==/UserScript==
if(typeof unsafeWindow != "undefined") {
    console = unsafeWindow.console;
}

var blocked = "nope";
var banned = "nope";
var lastBlocked = "nope";
var liveChat;
var authorList;
var filterTimeout;

function saveList(){
    if(lastBlocked!="nope")
        GM_setValue("espnLastBlockedAuthor",lastBlocked);
    else
        console.log("no last blocked to save");
    if(blocked!="nope")
        GM_setValue("espnBlockedAuthors",blocked);
    else
        console.log("no blocked list to save");
    if(banned!="nope")
        GM_setValue("espnBannedAuthors",banned);
    else
        console.log("no banned list to save");
}

function createButton(author,after,value,callback,cls)
{
	if(!value)
		return;
	var button = document.createElement("a");
	button.setAttribute("class",(cls ? cls+ " eab" : "espnAuthorBlocker eab"));
	button.setAttribute("author",author);
	button.innerHTML = " "+value;
	after.appendChild(button,after);
	button.addEventListener('click', callback, false);
	button = null;
}

function handleMessage(message){
    var authorDiv = message.querySelector(".echo-item-authorName");
    if(!authorDiv){
        console.log("could not process message");
        return;
    }
	var a = authorDiv.querySelector("a");
	var controls = authorDiv.querySelector(".controls");
	if(!controls){
		authorDiv.style.width = "100%";
		var div = document.createElement("div");
		div.setAttribute("class","controls");
		div.setAttribute("style","float:right;");
		controls = div;
		a.parentNode.appendChild(div,a.parentNode);
		div = null;
	}else{
		controls.innerHTML = "";
	}
    var display = message.querySelector(".echo-item-body").style.display;
    if(blocked.match(";"+authorDiv.querySelector("a").textContent+";"))
    {
        message.querySelector(".echo-item-body").style.display = "none";
        if(!authorDiv.querySelector('.espnAuthorUnBlock'))
            createButton(a.textContent,controls,"Unignore",unblockAuthorButton,"espnAuthorUnBlock");
        if(!authorDiv.querySelector('.espnAuthorBan'))
            createButton(a.textContent,controls,"Ban",banAuthor,"espnAuthorBan");
        if(authorDiv.querySelector(".espnAuthorBlocker")){
            authorDiv.removeChild(controls.querySelector(".espnAuthorBlocker"));
        }
    }else if(banned.match(";"+a.textContent+";"))
    {
        message.parentNode.parentNode.parentNode.parentNode.parentNode.style.display="none";
    }else{
        if(display=="" && message.querySelector(".espnAuthorBlocker"))
            return;
        message.querySelector(".echo-item-body").style.display="";
        message.parentNode.parentNode.parentNode.parentNode.parentNode.style.display="";
        if(authorDiv.querySelector('.espnAuthorBan'))
            authorDiv.removeChild(controls.querySelector('.espnAuthorBan'));
        if(authorDiv.querySelector('.espnAuthorUnBlock'))
            authorDiv.removeChild(controls.querySelector('.espnAuthorUnBlock'));
        if(!message.querySelector(".espnAuthorBlocker"))
            createButton(a.textContent,controls,"Ignore",blockAuthor);
    }
	a = null;
	controls = null;
	message = null;
	authorDiv = null;
}

function fastFilter(){
    var messages = liveChat.querySelectorAll(".echo-item-content .echo-item-frame"); //echo-item-authorName>input
    for(i in messages)
        if(!messages[i].querySelector("echo-item-authorName>.eab"))
			handleMessage(messages[i]);
	messages = null;
}

function filter(){
    var messages = liveChat.querySelectorAll(".echo-item-content .echo-item-frame");
    for(i in messages)
        handleMessage(messages[i]);
	messages = null;
}

function unblockAuthorButton(){
    var author = this.getAttribute("author");
    if(!author)
        var author = prompt("Could not get author to unblock. Please write authors name to unblock:", lastBlocked);
    if(!author)
        return;
    blocked = blocked.replace(author+";","");
    saveList();
    console.log(author + " is now unblocked");
    refreshBlockedAuthorList();
    filter();
}

function blockAuthor(){
    var author = this.getAttribute("author");
    if(!blocked.match(";"+author+";"))
    {
        blocked +=author+";";
        lastBlocked = author;
        saveList();
        console.log(author + " is now blocked");
    }
    saveList();
    refreshBlockedAuthorList();
    filter();
}

function banAuthor(){
    var author = this.getAttribute("author");
    if(!banned.match(";"+author+";"))
    {
        blocked = blocked.replace(author+";","");
        banned +=author+";";
        lastBlocked = author;
        saveList();
        console.log(author + " is now banned");
    }
    saveList();
    refreshBlockedAuthorList();
    filter();
}

function unblockAuthor(){
    var author = document.querySelector("#ESPNblockAuthorList").value;
	console.log("unblocking "+author);
    if(!author)
        author = prompt("Could not get author to unblock. Please write authors name to unblock:", lastBlocked);
    if(!author)
        return;
    if(blocked.match(author))
        blocked = blocked.replace(author+";","");
    else if(banned.match(author))
        banned = banned.replace(author+";","");
    saveList();
    console.log(author + " is now unblocked/unbanned");
    refreshBlockedAuthorList();
    filter();
}

function refreshBlockedAuthorList(){
    var blockedAuthors = (blocked+banned).split(";");
    var list = "";
	authorList = document.querySelector("#ESPNblockAuthorList");
	authorList.options.length = 0;
    for( x = 0; x < blockedAuthors.length-1; x++){
		document.querySelector("#ESPNblockAuthorList").add(new Option( blockedAuthors[x], blockedAuthors[x] ));
    }
    authorList.selectedIndex=0;
}

function importList(){
    var newList = prompt("Paste your exported blocked list here:");
    if(newList){
        blocked = newList;
    }
    var newBanList = prompt("Paste your exported banned list here:");
    if(newBanList){
        banned = newBanList;   
    }
    saveList();
    refreshBlockedAuthorList();
    filter();
}

function exportList(){
    prompt("Here is your exported blocked list:",blocked);
    prompt("Here is your exported banned list:",banned);
}

function filterTimer(){
	clearTimeout(filterTimeout);
	filterTimeout = setTimeout(fastFilter,500)
}

function start(){
    if(document)
	if(document.querySelector(".echo-stream-streamStateButtons"))
	{
            startInt = clearInterval(startInt);
            
            blocked = GM_getValue("espnBlockedAuthors",";");
            lastBlocked = GM_getValue("espnLastBlockedAuthor","");
            banned = GM_getValue("espnBannedAuthors",";");
            
            liveChat = document.querySelector(".echo-stream-body");
            liveChat.addEventListener("DOMNodeInserted", filterTimer, false);
            
            var echoButtons = document.querySelector(".echo-stream-streamStateButtons");
            
            authorList = document.createElement("select");		
            authorList.setAttribute("id","ESPNblockAuthorList");
            authorList.style.width="200px";
            echoButtons.appendChild(authorList,echoButtons);
            refreshBlockedAuthorList();
            
            createButton("none",echoButtons,"Unignore an Author",unblockAuthor);
            createButton("none",echoButtons,"Export",exportList);
            createButton("none",echoButtons,"Import",importList);
            echoButtons = null;
	}
}
var startInt = setInterval(start,500);