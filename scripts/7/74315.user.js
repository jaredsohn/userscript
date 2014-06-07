// ==UserScript==
// @name           Player Value To Matchup Page
// @namespace      pbr
// @include        http://goallineblitz.com/game/compare_teams.pl?team1=*&team2=*
// @copyright      2010, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        11.11.23
// ==/UserScript==

window.setTimeout( function() {
	var teams = document.getElementsByClassName("team_name");
	for (var i=0; i<teams.length; i++) {
		getInetPage(teams[i].firstChild.href.toString().replace("team","roster"), handleTeam);
	}
}, 100);

function handleTeam(address, page) {
	var team = page.responseText.split('"big_head subhead_head">')[1].split("<")[0];
	team = team.split("(")[0];
	team = "<a href="+address+">"+team+"</a>";

	var div = document.createElement("div");
	div.innerHTML = page.responseText.split('<div id="content_contracts')[0].replace(/<img/g,"<div").replace(/\/img/g,"/div>");
	

	var numPlayers = div.getElementsByClassName("player_name").length;
	var cpuPlayers = div.getElementsByClassName("cpu").length;
	numPlayers -= cpuPlayers;

	var text = page.responseText.split("Count:")[1].split("Roster")[0];
	var avgLevel = parseInt(text.split("Avg Lv ")[1]);
	var avgValue = parseFloat(page.responseText.split('margin-bottom: 6px;">')[3].split("</div>"));
	var effLevel = parseInt(text.split("Effective Lv ")[1]);

	var teams = document.getElementsByClassName("team_name");
	for (var i=0; i<teams.length; i++) {
		if (teams[i].firstChild.href.toString().split("=")[1] == address.split("=")[1]) {
			var div = teams[i].parentNode.getElementsByClassName("team_record")[0];
			div.innerHTML = "";
			div.innerHTML += getDiv("Human Players",numPlayers+"/"+(numPlayers+cpuPlayers));
			div.innerHTML += getDiv("Avg. Level",avgLevel);
			div.innerHTML += getDiv("Eff. Level",effLevel);
			div.innerHTML += getDiv("Avg. Value",avgValue.toFixed(2));
			break;
		}
	}
}

function getDiv(header, value) {
	return "<div><b>"+header+": </b>"+value+"</div>";
}

function getInetPage(address, func) {
//    console.log("getInetPage : "+address);
    var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onload = function() {
		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
		}
		else {
//			console.log("loaded: "+address)
			func(address,this);
		}
	};

	req.send(null);
	return req;
}


