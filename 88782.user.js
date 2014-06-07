// ==UserScript==
// @name           Follow Player
// @namespace      pbr
// @description    Skip replays that don't have a selected player
// @include        http://goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// @include        http://glb.warriorgeneral.com/game/replay.pl?game_id=*&pbp_id=*
// @copyright      2010, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        13.12.29
// @require        http://userscripts.org/scripts/source/54630.user.js
// ==/UserScript==

var scriptName = "Follow Player";
var scriptVersion = "13.12.29";
var scriptWebpage = "http://userscripts.org/scripts/show/88782";

var lastSelected = null;
var playerIds = new Array();
var playerNames = new Array();
var playerReplays = new Array();
var plays = null;

window.setTimeout( function() {
	init(true);
}, 1000);


function activate(e) {
    console.log("activate follow");
    lock();

	pbp();

	if (document.getElementById("player_select") == null) {
		createControls();
	}
	removePlayers();
	addPlayers();

    unlock();
}

function pbp() {
	var tag = document.getElementById("pbp");
    if (tag == null) {
    	setTimeout(pbp, 300);
    }
    else if (tag.childNodes.length == 0) {
        setTimeout(pbp, 300);
    }
    else {
		var p = new Array();
		var plText = tag.innerHTML.split("pbp_id=");
		for (var i=1; i<plText.length; i++) {
			p.push(parseInt(plText[i])+"");	
		}
		console.log("fp pl.len="+p.length);
		plays = p;
    }
}

function createControls() {
	var div = document.createElement("div");
	div.setAttribute("id","player_controls");
	div.setAttribute("style","width: 650px; margin-top: 4px;");

	var left = document.createElement("a");
	left.setAttribute("class","button left");
	left.innerHTML = "<span>&lt; Prev</span>";
    left.addEventListener("click",prevPlayer,true);

	var select = document.createElement("select");
	select.setAttribute("id","player_select");

	var right = document.createElement("a");
	right.setAttribute("class","button left");
	right.innerHTML = "<span>&gt; Next</span>";
    right.addEventListener("click",nextPlayer,true);

	var info = document.createElement("div");
	info.setAttribute("id","player_replay_count");
	
	div.appendChild(left);
	div.appendChild(select);
	div.appendChild(right);	
	div.appendChild(info);

	var footer = document.getElementById("replay_footer");
	footer.insertBefore(div,footer.childNodes[5]);
}

function removePlayers() {
	while (document.getElementById("player_select").options.length > 0) {
		document.getElementById("player_select").remove(0);
	}
}

function addPlayers() {
	var select = document.getElementById("player_select");

	for (p in unsafeWindow.players) {
		var pos = unsafeWindow.players[p].position;
		var name = unsafeWindow.players[p].name;
		var id = p;
		
		var option = document.createElement("option");
		option.text = name;

		var pos = null;
		for (var i=0; i<select.options.length; i++) {
			if (select.options[i].text > option.text) {
				pos = select.options[i];
				break;
			}
		}
		select.add(option, pos);
	}

	var others = false;
	for (var j=0; j<playerNames.length; j++) {
		var found = false;
		for (var i=0; i<select.options.length; i++) {
			if (select.options[i].text == playerNames[j]) {
				found = true;
				break;
			}
		}
		if (found == false) {
			if (others == false) {
				others = true;
				var option = document.createElement("option");
				option.text = "---------------";
				select.add(option, null);
			}
			var option = document.createElement("option");
			option.text = playerNames[j];
			select.add(option, null);
		}
	}

	var options = select.options;
	for (var i=0; i<options.length; i++) {
		if (options[i].text == lastSelected) {
			select.selectedIndex = i;
			break;
		}
	}

}

function prevPlayer() {
	if (plays == null) setTimeout(prevPlayer, 500);
	console.log("prevPlayer: plays.length="+plays.length);

	var select = document.getElementById("player_select");
	if (select.selectedIndex < 0) return;

	var id = null;
	var name = select.options[select.selectedIndex].text;
	for (var i=0; i<playerNames.length; i++) {
		if (name == playerNames[i]) {
			id = playerIds[i];
			break;
		}
	}
	if (id == null) {
		for (p in unsafeWindow.players) {
			if (unsafeWindow.players[p].name == name) {
				id = p;
				break;
			}
		}
	}
	if (id == null) {
		console.log(id+") "+name+" : player not found?");
		return;
	}

	var data = null;
	for (var i=0; i<playerIds.length; i++) {
		if (playerIds[i] == id) {
			data = playerReplays[i];
			playerNames[i] = name;
			lastSelected = name;
			break;
		}
	}

	if (data == null) {
		if (id == null) return;	
		
		var address = document.location.href.toString();
		address = address.split("&")[0];
		address = address.replace("replay","player_replays");
		address += "&player_id="+id;
		console.log(address);

		getInetPage(address,loadPlayer,null);
		setTimeout(prevPlayer, 500);
		return;
	}
	else {
		var currentPlay = document.getElementById("rrplay").value;
		currentPlay = parseInt(currentPlay.split("pbp_id=")[1]);
		console.log("current play is : "+currentPlay);

		for (var i=1; i<data.length; i++) {
			if (data[i] >= currentPlay) {
				var prevPlay = data[i-1];
				console.log("prev play is : "+prevPlay);

				for (var j=0; j<plays.length; j++) {
					if (plays[j] == prevPlay) {
						var pplaybtn = document.getElementsByClassName("pplaybtn")[0];
						pplaybtn.setAttribute("id",j);
						console.log(prevPlay+" : "+currentPlay+" : "+j);

						var info = document.getElementById("player_replay_count");
						info.innerHTML = (i)+" of "+data.length;

						var evt = document.createEvent("MouseEvents");
						evt.initMouseEvent("click", false, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
						pplaybtn.firstChild.dispatchEvent(evt);
						break;
					}
				}
				break;
			}
		}
	}
}

function nextPlayer() {
	if (plays == null) setTimeout(nextPlayer, 500);
	console.log("nextPlayer: plays.length="+plays.length);

	var select = document.getElementById("player_select");
	if (select.selectedIndex < 0) return;

	var id = null;
	var name = select.options[select.selectedIndex].text;
	for (var i=0; i<playerNames.length; i++) {
		if (name == playerNames[i]) {
			id = playerIds[i];
			break;
		}
	}
	if (id == null) {
		for (p in unsafeWindow.players) {
			if (unsafeWindow.players[p].name == name) {
				id = p;
				break;
			}
		}
	}
	if (id == null) {
		console.log(id+") "+name+" : player not found?");
		return;
	}

	var data = null;
	for (var i=0; i<playerIds.length; i++) {
		if (playerIds[i] == id) {
			data = playerReplays[i];
			playerNames[i] = name;
			lastSelected = name;
			break;
		}
	}

	if (data == null) {
		if (id == null) return;	
		
		var address = document.location.href.toString();
		address = address.split("&")[0];
		address = address.replace("replay","player_replays");
		address += "&player_id="+id;
		console.log(address);

		getInetPage(address,loadPlayer,null);
		setTimeout(nextPlayer, 500);
		return;
	}
	else {
		var currentPlay = document.getElementById("rrplay").value;
		currentPlay = parseInt(currentPlay.split("pbp_id=")[1]);
		console.log("current play is : "+currentPlay);

		for (var i=0; i<data.length; i++) {
			if (data[i] > currentPlay) {
				var nextPlay = data[i];
				console.log("next play is : "+nextPlay);

				for (var j=0; j<plays.length; j++) {
					if (plays[j] == nextPlay) {
						var nplaybtn = document.getElementsByClassName("nplaybtn")[0];
						nplaybtn.setAttribute("id",j);
						console.log(nextPlay+" : "+currentPlay+" : "+j);

						var info = document.getElementById("player_replay_count");
						info.innerHTML = (i+1)+" of "+data.length;

						var evt = document.createEvent("MouseEvents");
						evt.initMouseEvent("click", false, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
						nplaybtn.firstChild.dispatchEvent(evt);
						break;
					}
				}
				break;
			}
		}
	}
}

function loadPlayer(address, page) {
	var playerId = parseInt(address.split("player_id=")[1])+"";

	var pbp = new Array();
	var text = page.responseText.split("pbp_id=");
	for (var i=1; i<text.length; i++) {
		pbp.push(parseInt(text[i])+"");
	}

	playerIds.push(playerId);
	playerReplays.push(pbp);
}



