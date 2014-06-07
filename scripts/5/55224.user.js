// ==UserScript==
// @name           Player Levels On League Page
// @namespace      pbr/lolp
// @include        http://goallineblitz.com/game/league.pl?*league_id=*
// @version        09.07.31
// @copyright      2009, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// ==/UserScript==

window.setTimeout( function() {
	return;
	main();
}, 100);

function main() {
    var conf = document.getElementsByClassName("conference_table");
    for (var c=0; c<conf.length; c++) {
	var rows = conf[c].rows;
	for (var r=0; r<rows.length; r++) {
	    if (rows[r].getAttribute("class").indexOf("alternating") == 0) {
		var team = rows[r].cells[1].firstChild;
		console.log(team.innerHTML+" -- "+team.href);
		var address = team.href.replace("team.pl","roster.pl");
		getPage(address);
	    }
	}
    }

}

function mysort(x, y) {
    return parseFloat(x) > parseFloat(y);
}

function rosterLoader(address, html) {
    var div = document.createElement("div");
    div.innerHTML = html;
    
    var list = new Array();
    var levels = div.getElementsByClassName("player_level");
    for (var i=0; i<levels.length; i++) {
	list.push(levels[i].innerHTML);
    }

    list = list.sort(mysort);
    if (address.indexOf("7294") != -1) {
	console.log(list);
    }
    var min = list[0];
    var max = list[list.length-1];
    var median = list[(list.length>>1)-1];
    if (min == null) min = 0;
    if (max == null) max = 0;
    if (median == null) median = 0;

    var link = address.replace("roster.pl","team.pl");
    var conf = document.getElementsByClassName("conference_table");
    for (var c=0; c<conf.length; c++) {
	var teams = conf[c].getElementsByTagName("a");
	for (var i=0; i<teams.length; i++) {
	    if (teams[i].href.toString() == link) {
		teams[i].parentNode.parentNode.cells[3].innerHTML = min+","+median+","+max;
	    }
	}
    }
}

function getPage(address) {
    var req = new XMLHttpRequest();
    req.open( 'GET', address, true );
    req.onload = function() {
	if (this.status != 200) {
	    alert("pbr gm script: Error "+this.status+" loading "+address);
	}
	else {
	    rosterLoader(address, this.responseText);
	}
    };
    
    req.send(null); 
    return req;
}
