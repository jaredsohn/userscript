// ==UserScript==
// @name           teamleaders
// @namespace      http://www.goallinebliz.com
// @description    Add player positions to the team leaders pages.
// @include        http://goallineblitz.com/game/team_player_stats.pl?team_id=*
// @version        08.12.23
// ==/UserScript==

/*
 * writen by pabst 7/17/08+
 */

//------------------- main -----------------------

var names = new Array();
var positions = [];

stripTables();

var inetAddress = "http://goallineblitz.com/game/roster.pl?team_id=";
var id = (window.location+"").indexOf("team_id=")+"team_id=".length;
id = (window.location+"").slice(id);
if (id.indexOf("&") != -1) {
	id = id.slice(0,id.indexOf("&"));
}
inetAddress += id;

console.log("Downloading "+inetAddress);
getPage(inetAddress);

//----------------------- main ---------------------------


function getPage(address) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: address,
		headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
		'Accept': 'text/xml'
	},
	onload: function(page) { 
		if (page.status != 200) {
			console.log("Error "+page.status+" loading "+address);
		}
		else {
			console.log("finished");
			handleRoster(page.responseText);
		}
	}
	});
}

function handleRoster(html) {
	var t = html;

	var nstr = '<td class="player_name';
	var pstr = '<td class="player_position">';

	var s = html.split(nstr);
	for (var i=1; i<s.length; i++) {
		s[i] = s[i].slice(s[i].indexOf("player_id="));
		s[i] = s[i].slice(s[i].indexOf('">')+2);
		while (s[i].indexOf("&quot;") != -1) {
			s[i] = s[i].replace("&quot;",'"');
		}
		while (s[i].indexOf("&#39;") != -1) {
			s[i] = s[i].replace("&#39;","'");
		}
		var nend = s[i].indexOf("</a>");
		var playerName = s[i].slice(0,nend);

		var p = s[i].indexOf(pstr);
		s[i] = s[i].slice(p+pstr.length);
		var pend = s[i].indexOf("</td>");
		var playerPosition = s[i].slice(0,pend);
		playerPosition = playerPosition.slice(playerPosition.indexOf(">")+1);
		playerPosition = playerPosition.slice(0,playerPosition.indexOf("<"));
		
		names[playerName] = playerPosition;
	}
	modifyPlayers();
}

function modifyPlayers() {
	var players = document.getElementsByClassName("stat_column_player");
	for (var i=1; i < players.length; i++) {
		var p = players[i];
		if (p == null) continue;
		var span = '<span class="position">';
		span += names[p.firstChild.innerHTML];
		span += '</span>';

		var y = document.createElement("span");
		y.className = "cpu";
		y.innerHTML = names[p.firstChild.innerHTML];
		while (y.innerHTML.length < 3) {
			y.innerHTML += " ";
		}

		var children = new Array();
		children.push(y);
		while (p.hasChildNodes() == true) {
			children.push(p.removeChild(p.firstChild));
		}
		for each (var c in children) {
			p.appendChild(c);
		}
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
				if ((cell.innerHTML != "0") && (cell.innerHTML != "0/0")) {
					keep++;
					if (keep >= 3) break;
				}
			}
			if (keep >= 3) {
				keepers.push(i);
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





