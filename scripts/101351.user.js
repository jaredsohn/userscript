// ==UserScript==
// @name           PFR Player Value
// @namespace      pbr/pval
// @include	   	   http://goallineblitz.com/game/team_player_stats.pl?team_id=*
// @copyright      2011, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        11.06.01
// ==/UserScript==

/*
 * This script implements this: 
 * http://www.pro-football-reference.com/blog/?page_id=8061
 *
*/

window.setTimeout(function() {
    var button = document.createElement("input");
    button.setAttribute("value","Get PFR Player Values");
    button.setAttribute("type","button");
    button.setAttribute("id","pfrbutton");
    button.addEventListener("click",getProfile,false);

	var add = window.location.toString();
	if ((add.indexOf("passing") != -1) || (add.indexOf("rushing") != -1) || (add.indexOf("receiving") != -1)
		|| (add.indexOf("&stat=") == -1)) {
		var h = document.getElementsByTagName("h2")[0];
		h.parentNode.insertBefore(button, h);
	}
}, 1000);

var linkTypes = ["passing","rushing","receiving","sp_teams","kicking","defense","other"];
var statTypes = ["Passing", "Rushing", "Receiving","Kick/Punt Ret", "Kicking/Punting", "Defense", "Blocking/Other"];

var headings = [];
headings["Passing"] = ["G","Yds","Comp","Att","TD","Int","Hurried","Sack","YdsAlwd","TD Alwd"];
headings["Rushing"] = ["G","Rush","Yds","TD","Fum","FumL","YdsAlwd","TD Alwd"];
headings["Receiving"] = ["G","Rec","Yds","Avg YAC","TD","Drops"];
headings["Kick/Punt Ret"] = ["G","KR","KR Yds","KR TD","PR","PR Yds","PR TD"];
headings["Kicking/Punting"] = ["G","FGM","FGA","0-19","20-29","30-39","40-49","50+","XPM","XPA","P"];
headings["Defense"] = ["G","Tk","MsTk","Hurry","Sack","SackYd","PD","Int","Int Ret Yds","Int Ret TD", "FFum","Fum Rec","Fum Ret Yds","Fum Ret TD","Sfty"];
headings["Blocking/Other"] = ["G","Pancake","Total TD","O Plays","D Plays","PtsScd","PtsAlw"];

var stats = new Array();
var players = new Array();

var links = [];

function getProfile() {
	var btn = document.getElementById("pfrbutton");
	btn.setAttribute("value","Warning: this can take a while.");
	btn.disabled = true;

	var link = document.location.toString().replace("team_player_stats","team.pl");
	getInetPage(link, getLeague);
}

function getLeague(address, page) {
	var html = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
	var div = document.createElement("div");
	div.innerHTML = html;

	var links = div.getElementsByTagName("a");
	for each (var a in links) {
		if (a.href.indexOf("league.pl") != -1) {
			var link = a.href.toString();
			link = link.split("&")[0];
			link = link.replace("league.pl","team_stats.pl");
			link += "&conference_stats=0&playoffs=0";
			getInetPage(link+"&stat="+linkTypes[0], loadPage, 0);
			break;
		}
	}
}

function loadPage(address, page, data) {
console.log(address+" loaded ... "+(data+1)+"/"+linkTypes.length);
	var html = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
	var div = document.createElement("div");
	div.innerHTML = html;
//console.log(html);
	var table = div.getElementsByTagName("table")[0];

	loadTeams(table, statTypes[data], null);
	if (linkTypes[data+1] != null) {
		data++;
		getInetPage(address.replace(linkTypes[data-1],linkTypes[data]), loadPage, data);
	}
	else {
		addition();
//		createOutputText();
		loadLeaders();
	}
}

function loadTeams(table, heading, tname) {
//console.log(table+" | "+heading+" | "+tname);
	for (var i=1; i<table.rows.length; i++) {
		var r = table.rows[i];
		var pname = r.cells[0].getElementsByTagName("a")[0].innerHTML;
		var pid = r.cells[0].getElementsByTagName("a")[0].href.toString().split("=")[1];
		if (players[pid] == null) {
			var player = new Object();
			player.name = pname;
			player.id = pid;

			player.stats = new Array();
			for each (var type in statTypes) {
				player.stats[type] = new Array();
			}

			players[pid] = player;
		}

		var s = new Array();
		for (var j=1; j<r.cells.length; j++) {
			var statName = table.rows[0].cells[j].firstChild.innerHTML;
			if (statName == null) statName = "G";
			var value = r.cells[j].innerHTML.replace(",","");
			s[statName] = parseFloat(value);
//console.log("s["+statName+"] = "+value);
		}
		players[pid].stats[heading].push(s)
//console.log("players["+pid+"].stats["+heading+"].push("+s+")"+" -- "+players[pid].stats[heading].length);
	}
}

var saved = new Array();
function loadLeaders() {
	var add = window.location.toString();
	var s = add.split("=");
	var t = s[1].split("&");
	var addresses = [];
	for each (var p in players) {
		addresses.push(add.replace(t[0],p.id));
		getInetPage(addresses[addresses.length-1], waitForPages, null);
	}
}

function waitForPages(address, page, data) {
	var div = document.createElement("div");
	div.innerHTML = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");

	var tbl = div.getElementsByClassName("stats_table")[0];
	saved.push([parseInt(address.split("=")[1]), tbl]);

	if (saved.length != 32) {
		return;
	}
	console.log("got all teams!");

	console.log("calculating totals");
	for (var i=0; i<32; i++) {
		var tbl = document.getElementsByClassName("stats_table")[0];		
		tbl.innerHTML = saved[i][1].innerHTML;
		createOutputText(saved[i][0]);
		saved[i][1] = document.getElementsByClassName("stats_table")[0].innerHTML;
	}

	console.log("adding tables");
	var tbl = document.getElementsByClassName("stats_table")[0];
	tbl.innerHTML = saved[0][1];
	for (var i=1; i<32; i++) {
		tbl.innerHTML += saved[i][1];
	}

	sort();
}

function sort() {
	console.log("removing useless stuff");
	while (document.getElementsByClassName("nonalternating_color").length > 2) {
		var list = document.getElementsByClassName("nonalternating_color");
		list[list.length-1].parentNode.removeChild(list[list.length-1]);
	}

	var table = document.getElementsByClassName("stats_table")[0];
	for (var i=table.rows.length-1; i>0; i--) {
		if (parseFloat(table.rows[i].cells[2].innerHTML) == 0) {
			table.deleteRow(i);
		}
	}

	console.log("sorting");
	var table = document.getElementsByClassName("stats_table")[0];
	for (var j=1; j<table.rows.length-1; j++) {
		for (var i=j+1; i<table.rows.length; i++) {
			var l = parseFloat(table.rows[i].cells[1].innerHTML);
			var r = parseFloat(table.rows[j].cells[1].innerHTML);
			if (l > r) {
				var temp = table.rows[j].innerHTML;
				table.rows[j].innerHTML = table.rows[i].innerHTML;
				table.rows[i].innerHTML = temp;
			}
		}
		table.rows[j].setAttribute("class","alternating_color"+((j%2)+1));
		table.rows[j].insertCell(1);
		table.rows[j].cells[1].innerHTML = j;
	}
	table.rows[table.rows.length-1].insertCell(1);
	table.rows[table.rows.length-1].cells[1].innerHTML = j;

	table.rows[0].cells[1].innerHTML = "PFR AV";
	table.rows[0].insertCell(1);
	table.rows[0].cells[1].innerHTML = "#";
}

var lavg;
var ratio;
var opped;
var rushing;
var passing;
function createOutputText(teamId) {
	if (opped == null) {
		var total = 0;
		var teams = 0;

opped = new Array();
		var atts = 0;
	
rushing = new Array();
		rushing.att = 0;
		rushing.yards = 0;

passing = new Array();
		passing.att = 0;
		passing.yards = 0;
		passing.td = 0;
		passing.int = 0;
		passing.sack = 0;

		for each (var team in players) {
			var td = parseFloat(team.stats["Blocking/Other"]["Total TD"]);
			var fgm = parseFloat(team.stats["Kicking/Punting"]["FGM"]);
			var fga = parseFloat(team.stats["Kicking/Punting"]["FGA"]);
			var punts = parseFloat(team.stats["Kicking/Punting"]["P"]);
			if (team.stats["Receiving"]["FumL"] == null) team.stats["Receiving"]["FumL"] = 0;
			var to = parseFloat(team.stats["Receiving"]["FumL"] + team.stats["Rushing"]["FumL"]);
	//console.log(td+":"+fgm+":"+fga+":"+punts+":"+to);

			opped[team.id] = (7*td + 3*fgm) / (td + fga + punts + to);
			total += opped[team.id];
			teams++;

	//		console.log(team.name+" : opped = "+opped[team.id]);

			rushing.att += parseFloat(team.stats["Rushing"]["Rush"]);
			rushing.yards += parseFloat(team.stats["Rushing"]["Yds"]);

			passing.att += parseFloat(team.stats["Passing"]["Att"]);
			passing.yards += parseFloat(team.stats["Passing"]["Yds"]);
			passing.int += parseFloat(team.stats["Passing"]["Int"]);
			passing.td += parseFloat(team.stats["Passing"]["TD"]);
			passing.sack += parseFloat(team.stats["Passing"]["Sack"]);
		}
		rushing.ypc = rushing.yards / rushing.att;
		passing.aya = (passing.yards + passing.td*20 - passing.int * 45 - passing.sack * 5) / (passing.att + passing.sack);

lavg = total / teams;
ratio = rushing.yards / (rushing.yards + passing.yards);
	}

	if (teamId == null) {
		teamId = parseInt(window.location.toString().split("team_id=")[1]);
	}
	for each (var team in players) {
		if (team.id != teamId) continue;

		team.stats["Passing"]["AYA"] = (team.stats["Passing"]["Yds"] + team.stats["Passing"]["TD"]*20 - team.stats["Passing"]["Int"]*45 - team.stats["Passing"]["Sack"]*5) / (team.stats["Passing"]["Att"] + team.stats["Passing"]["Sack"]);

		var t = (opped[team.id] / lavg) * 100;
		var teamYards = team.stats["Rushing"]["Yds"] + team.stats["Passing"]["Yds"];

		var blkpts = t*5/11;
		var runpts = (t-blkpts) * 0.22 * ((team.stats["Rushing"]["Yds"] / teamYards) / ratio);
		var recpts = (t-blkpts-runpts) * 0.74;
		var paspts = (t-blkpts-runpts) * 0.26;
//console.log(team.name+" : "+parseInt(blkpts)+" - "+parseInt(runpts)+" - "+parseInt(recpts)+" - "+parseInt(paspts));

		var tname = players[teamId].name.split(" ")[0];
		if (window.location.toString().indexOf("receiving") != -1) {
			var table = document.getElementsByClassName("stats_table")[0];
			for (var i=1; i<table.rows.length; i++) {
				var yards = parseFloat(table.rows[i].cells[4].innerHTML);
				if (yards == 0) {
					table.rows[i].cells[1].innerHTML = "&nbsp;";
					continue;
				}

				var rec = parseFloat(table.rows[i].cells[2].innerHTML);
				var td = parseFloat(table.rows[i].cells[8].innerHTML);
				var drop = parseFloat(table.rows[i].cells[9].innerHTML);
				var aya = (yards + 20 * td) / (rec + drop);
//console.log(aya+" || "+passing.aya+" || "+yards + " <> " + td + " <> "+drop);

				var bonus;
				if (aya > passing.aya) {
					bonus = 2 * (aya - passing.aya) * yards / team.stats["Passing"]["Yds"];
				}
				else {
					bonus = 0.5 * (aya - passing.aya);
				}

				var value = (recpts * yards/ team.stats["Passing"]["Yds"]) + bonus;
				table.rows[i].cells[1].innerHTML = value.toFixed(2);
				table.rows[i].cells[0].innerHTML += "<span class='cpu'>("+tname+")</span>";
			}
		}
		else if (window.location.toString().indexOf("rushing") != -1) {
			var table = document.getElementsByClassName("stats_table")[0];
			for (var i=1; i<table.rows.length; i++) {
				var yards = parseFloat(table.rows[i].cells[4].innerHTML);
				if (yards == 0) {
					table.rows[i].cells[1].innerHTML = "&nbsp;";
					continue;
				}

				var td = parseFloat(table.rows[i].cells[7].innerHTML);
				var fum = parseFloat(table.rows[i].cells[8].innerHTML);

				var ypc = (yards + 15*td - 30*fum) / (parseFloat(table.rows[i].cells[2].innerHTML) + fum);

				var bonus;
				if (ypc > rushing.ypc) {
					bonus = 2 * (ypc - rushing.ypc) * yards / team.stats["Rushing"]["Yds"];
				}
				else {
					bonus = 0.75 * (ypc - rushing.ypc);
				}
//console.log("("+runpts+" * "+yards+" / "+team.stats["Rushing"]["Yds"]+") + "+bonus);
//console.log(0.75+" * "+ypc+" - "+rushing.ypc+" == "+rushing.yards+"/"+rushing.att);
				var value = (yards / team.stats["Rushing"]["Yds"]) * runpts + bonus;
				table.rows[i].cells[1].innerHTML = value.toFixed(2);
				table.rows[i].cells[0].innerHTML += "<span class='cpu'>("+tname+")</span>";
			}
		}
		else if ((window.location.toString().indexOf("passing") != -1) || 
				 (window.location.toString().indexOf("&stat=") == -1)) {
			var table = document.getElementsByClassName("stats_table")[0];
			for (var i=1; i<table.rows.length; i++) {
				var yards = parseFloat(table.rows[i].cells[2].innerHTML);

				if (yards == 0) {
					table.rows[i].cells[1].innerHTML = "&nbsp;";
					continue;
				}

				var value = (yards / team.stats["Passing"]["Yds"]) * paspts;
				table.rows[i].cells[1].innerHTML = value.toFixed(2);
				table.rows[i].cells[0].innerHTML += "<span class='cpu'>("+tname+")</span>";
			}
		}
	}
}

function addition() {
console.log("getting totals");
	var i=0;
	for each (var player in players) {
		i++;
//		console.log(i+") "+player.id+") "+player.name+" ("+player.stats.length+")");
		for each (var type in statTypes) {
			player.stats[type] = player.stats[type][0];
		}
	}
	console.log(players.length+" -- "+i);
}

function getGeneric(headings, stats) {
//console.log(headings+" -- "+stats.length);
	var output = new Array();
	for each (var h in headings) {
		output[h] = 0;

		for (var i=0; i<stats.length; i++) {
			output[h] += parseFloat(stats[i][h]);
		}
	}
	return output;
}

function getInetPage(address, func, data) {
    console.log("getInetPage : "+address);
    var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onload = function() {
		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
		}
		else {
			console.log("loaded: "+address)
			func(address, this, data);
		}
	};

	req.send(null);
	return req;
}


