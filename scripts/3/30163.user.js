// ==UserScript==
// @name           teamleaders
// @namespace      potl
// @description    Add player positions to the team leaders pages.
// @include        http://goallineblitz.com/game/team_player_stats.pl?team_id=*
// @include        http://glb.warriorgeneral.com/game/team_player_stats.pl?team_id=*
// @version        13.12.29
// ==/UserScript==

/*
 * writen by pabst 7/17/08+
 */

var names = new Array();

window.setTimeout( function() {
	var inetAddress = "/game/roster.pl?team_id=";
	var id = (window.location+"").indexOf("team_id=")+"team_id=".length;
	id = (window.location+"").slice(id);
	if (id.indexOf("&") != -1) {
		id = id.slice(0,id.indexOf("&"));
	}
	inetAddress += id;

	console.log("Downloading "+inetAddress);
	getPage(inetAddress);
}, 300);

function getPage(address) {
	var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onload = function() {
		if (this.status != 200) {
			console.log("Error "+this.status+" loading "+address);
		}
		else {
			console.log("finished");
			handleRoster(this.responseText);
		}
	};
	
	req.send(null); 
	return req;
}

function handleRoster(html) {
	var div = document.createElement("div");
	div.innerHTML = html.replace(/<img/g,"<div").replace(/\/img/g,"/div>");

//console.log(div.innerHTML);
	var content = div.getElementsByClassName("content_container")[1];
	var nDiv = content.getElementsByClassName("player_name");
	var posDiv = content.getElementsByClassName("player_position");
	for (var i=0; i<nDiv.length; i++) {
		var p = nDiv[i];
		var name = p.getElementsByTagName("a")[0].innerHTML;
		var id = p.getElementsByTagName("a")[0].href.split("=")[1];
		var pos = posDiv[i].firstChild.innerHTML;

		names[id.toString()] = pos;
	}
	modifyPlayers();

	stripTables();
}

function modifyPlayers() {
	var players = document.getElementsByClassName("stat_column_player");
	for (var i=1; i < players.length; i++) {
		var p = players[i];
		if (p == null) continue;

		var id = p.firstChild.href.split("=")[1];
		var y = document.createElement("span");
		y.className = "cpu";
		y.innerHTML = names[id];
		while (y.innerHTML.length < 3) {
			y.innerHTML += " ";
		}

		players[i].insertBefore(y,players[i].firstChild);
	}
}

function stripTables() {
	var keepers = [];
	var players = document.getElementsByClassName("stat_column_player");
	for (var i=0; i<players.length; i++) {
		var player = players[i];
		if (player != null) {
			var parent = player.parentNode;
			var keep = 0;
			for each (var cell in parent.cells) {
				if ((cell.innerHTML != "0") && (cell.innerHTML != "0/0") && (cell.innerHTML != null)) {
					keep++;
					if (keep >= 3) {
						keepers.push(i);
						break;
					}
				}
			}
		}
	}
	for (var i=players.length-1; i>0; i--) {
		if (keepers.indexOf(i) == -1) {
			players[i].parentNode.parentNode.removeChild(players[i].parentNode);
		}
	}
	
	var players = document.getElementsByClassName("stat_column_player");
	var row = players[players.length-1].parentNode;
	var cls = row.getAttribute("class");
	cls = cls.split(" ")[1];
	cls = "alternating_color"+(players.length%2+1)+" "+cls;
	var cls = row.setAttribute("class",cls);
}


