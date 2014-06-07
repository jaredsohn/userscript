// ==UserScript==
// @name           Auto-Select Chess Moves Tab
// @namespace      http://userscripts.org/users/162760
// @description    Automatically selects the Chess.com 'Moves' tab when viewing games.
// @include        http://www.chess.com/echess/game.html?id=*
// ==/UserScript==

// Clicks the Moves Tab...
// Puts (x) number of chats into chats tab
if (document.getElementById('c15')) {
	location.assign("javascript:" + document.getElementById('c15').getAttribute("onclick").replace("return false;", "void(0);"));
	var myChats = document.evaluate("count(//p[@class='me'])", document, null, XPathResult.ANY_TYPE, null);
	var yourChats = document.evaluate("count(//p[@class='you'])", document, null, XPathResult.ANY_TYPE, null);
	document.getElementById('c14').innerHTML = "Chat (" + (myChats.numberValue + yourChats.numberValue) + ")";
	
}