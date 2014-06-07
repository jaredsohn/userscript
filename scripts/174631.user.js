// ==UserScript==
// @name       Dota 2 Spectator
// @namespace  http://userscripts.org/users/475731
// @version    0.1
// @description adds a button to specate someone playing Dota 2 from the Steam Profile
// @match      http://steamcommunity.com/*
// @copyright  2013+, Kolpa
// ==/UserScript==

var game = document.getElementsByClassName('profile_in_game_name')[0];

if (game.innerText == "Dota 2") {
	var addr = getGameAddr();
    if (addr != null) {
        var specaddr = getSpecAddr(addr);
        addNewButton(specaddr);
    }
}

function addNewButton(addr) {
    var parent = document.getElementsByClassName("profile_in_game")[0];
    var button = document.createElement("a");
    var bttext = document.createElement("span");
    bttext.innerText = "Spectate Game";
    button.href = addr;
    button.setAttribute("class", "btn_green_white_innerfade btn_small_thin");
    button.appendChild(bttext);
    parent.appendChild(document.createElement("br"));
    parent.appendChild(document.createElement("br"));
    parent.appendChild(button);
}

function getSpecAddr(addr) {
    var newport = "280";
    var port = parseInt(addr.substr(addr.length - 2));
    newport += port + 5;
    var target = addr.substr(0, addr.length -5) + newport;
    return target;
}

function getGameAddr() {
var links = document.getElementsByTagName("a");
	for(i in links) {
    	var link = links[i].href;
    	if (typeof link == "string") {
        	if (link.indexOf("steam://") == 0) {
            	return link;
        	}
    	}
	}
    return null;
}