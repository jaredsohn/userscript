// ==UserScript==
// @name        Player Plays Only
// @namespace   GLB
// @description Starts a replay containing only your player's plays
// @include     http://goallineblitz.com/game/user_games.pl*
// @include     http://goallineblitz.com/game/*
// @include    http://goallineblitz.com/game/replay.pl?game_id=*
// @include     http://glb.warriorgeneral.com/game/user_games.pl*
// @include     http://glb.warriorgeneral.com/game/*
// @include    http://glb.warriorgeneral.com/game/replay.pl?game_id=*
// @version     1
// @grant       GM_xmlhttpRequest
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_getValue
// ==/UserScript==
// Written by awsalick

var pageName = (function () {
		var a = window.location.href,
		b = a.lastIndexOf("/");
		c = a.lastIndexOf("?");
		if(c==-1) {c=a.length;}
        return a.substr(b + 1,c-b-1);
    }());

if(pageName=="replay.pl" && GM_getValue('replaylinks')!=undefined) {
	var gameID = window.location.href;
	b = gameID.lastIndexOf("game_id=");
	c = gameID.lastIndexOf("&");
	if(c==-1) {c=gameID.length;}
	gameID = gameID.substr(b+8,c-b-8);
	if(gameID==GM_getValue('replayGame')) {
		replayPage();
	} else {
		GM_deleteValue('replayGame');
		GM_deleteValue('replaylinks');
	}
} else {
		gamePage();
}



function gamePage() {
	GM_deleteValue('replaylinks');
	GM_deleteValue('replayGame');
	var showScoreReplacement = 'function showScore(id) {showElement("players_" + id);}';	
	
	var script = document.createElement('script');
	script.innerHTML = showScoreReplacement;
	
	document.getElementsByTagName('head')[0].appendChild(script);
	
	var links = document.evaluate("//a[contains(@href, 'player_replays.pl')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	for (var i=0; i < links.snapshotLength; i++) { 
		var thisLink = links.snapshotItem(i);
		
		thisLink.addEventListener('click', function(event) {
			event.preventDefault();
			launchCustomGame(event.target.parentNode.href);
		}, true);
	} 
}



function launchCustomGame(playerURL) {	
	GM_xmlhttpRequest( {
		method :"GET",
		url : playerURL,
		headers : {
			"User-agent": "Mozilla/5.0 (compatible) Greasemonkey",
			"Accept": "text/html,application/xml,text/xml"
		},
		onload : function(response) {
			var dt = document.implementation.createDocumentType("html","-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
			doc = document.implementation.createDocument('', '', dt),html = doc.createElement('html');
	
			html.innerHTML = response.responseText;
			doc.appendChild(html);
			var links = doc.evaluate("//a[contains(@href, 'replay.pl')]", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
			var linkArray = new Array();
			for (var i=0; i < links.snapshotLength; i++) { 
				linkArray[i]="http://" + window.location.hostname + links.snapshotItem(i);
			}
			
			var gameID = linkArray[0];
			b = gameID.lastIndexOf("game_id=");
			c = gameID.lastIndexOf("&");
			if(c==-1) {c=gameID.length;}
			gameID = gameID.substr(b+8,c-b-8);
			GM_setValue('replayGame',gameID);
			
			linkArray.push("");
			launchPlay(linkArray);
		}
	});
}
	
function launchPlay(links) {
	var playURL = links.shift();
	GM_setValue("replaylinks",JSON.stringify((links)));
	window.location.href=playURL;
}

function replayPage() {
	links = JSON.parse(GM_getValue('replaylinks'));
	var playURL = links.shift();
	
	
	control_buttons = document.getElementById("controls").getElementsByClassName("button left");
	last_button = control_buttons[control_buttons.length-2];	
	last_button.href=playURL;
	
	b = playURL.lastIndexOf("=");
	playURL= playURL.substr(b + 1);
	
	unsafeWindow.next_play_id = playURL;
	if(playURL="") {
		GM_deleteValue('replaylinks');	
	} else {
		GM_setValue("replaylinks",JSON.stringify((links)));
	}
}