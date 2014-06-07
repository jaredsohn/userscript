// ==UserScript==
// @name           Search Mail
// @author         System Failure
// @description    Search your Incoming/Outgoing mails
// @include 	http://*.travian*.*/*.php*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude		http://*.travian*.*/log*.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*/*log
// @exclude 	*.css
// @exclude 	*.js

// @email          systems.community@gmail.com
// @version        1.0
// ==/UserScript==

var newElem = document.createElement("script");
newElem.language="javascript";
newElem.type="text/javascript";
newElem.innerHTML='function searchM(){var userID = document.getElementById("searchInput").value;if (userID){switch (document.getElementById("searchSelect").selectedIndex){case 0:window.location = "nachrichten.php?t=3&from=" + userID;break;case 1:window.location = "nachrichten.php?t=2&to=" + userID;break;}}else{}}';
document.body.appendChild(newElem);


var newElem = document.createElement("div");
newElem.id="searcMail";
document.body.appendChild(newElem);

var newElem = document.createElement("input");
newElem.id="searchInput";
newElem.type="text";
newElem.width="100";
document.getElementById("searcMail").appendChild(newElem);

var newElem = document.createElement("select");
newElem.id="searchSelect";
document.getElementById("searcMail").appendChild(newElem);

var newElem = document.createElement("option");
newElem.id="searchSelectIncoming";
newElem.value="0";
newElem.innerHTML="Incoming";
document.getElementById("searchSelect").appendChild(newElem);

var newElem = document.createElement("option");
newElem.id="searchSelectOutgoing";
newElem.value="1";
newElem.innerHTML="Outgoing";
document.getElementById("searchSelect").appendChild(newElem);

var newElem = document.createElement("input");
newElem.id="searchButton";
newElem.type="button";
newElem.value="Search";
newElem.setAttribute("onclick","searchM()");
document.getElementById("searcMail").appendChild(newElem);

document.getElementById("searcMail").style.position = "absolute";
document.getElementById("searcMail").style.top = "40px";
document.getElementById("searcMail").style.right = "20px";