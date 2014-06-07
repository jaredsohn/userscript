// ==UserScript==
// @name           Box Score Record Book
// @namespace      pbr/rb
// @include        http://goallineblitz.com/game/team.pl?*team_id=*
// @include        http://glb.warriorgeneral.com/game/team.pl?*team_id=*
// @copyright      2010, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        13.12.29
// ==/UserScript==

var blowout = 55;
var maxLeaders = 10;
var gamelinks = [ ];

var useAllGames = false;

window.setTimeout(function() {
	boxSetup();
}, 3000);

var stats = new Array();
var players = new Array();
var teamPageName = null;
var teamPageId = parseInt(document.location.toString().split("team_id=")[1]);

var statTypes = ["Passing", "Rushing", "Receiving", "Kicking", "Punting", "Kick/Punt Return", "Special Teams", "Offensive Line", "Defense"];

var showEverything = false;
var outButton = null;
var netTime = null;

var gameLeaders = false;
var earliestSeason = null;
var currentSeason = null;
var adjustedStats = false;

var doneTime = null;

function getSeasons() {
	var inp = document.getElementById("seasonsBSR");
	var seasons = inp.value.split(",");
	
	var output = [];
	for (var i=0; i<seasons.length; i++) {
		if (seasons[i].split("-").length > 1) {
			var first = parseInt(seasons[i].split("-")[0]);
			var second =  parseInt(seasons[i].split("-")[1])
			for (var j=Math.min(first,second); j<=Math.max(first,second); j++) {
				output.push(j);
			}
		}
		else {
			output.push(parseInt(seasons[i]));
		}
	}
	return output.sort(function(a,b) { return a-b; });
}

function mainHistorical() {
	doneTime = new Date();
console.log("main historical");
	var btn = document.getElementById("rbbutton");
	btn.disabled = true;
	outButton = btn;

	useAllGames = document.getElementById("allGames").checked;

	var links = new Array();
	var href = document.location.toString();
	if (href.match("season") != null) {
		href = href.split("season=")[0]+href.split("&")[1];
	}
	var seasons = getSeasons();
	for (var i=0; i<seasons.length; i++) {
		links.push(href+"&season="+seasons[i]);
		console.log(href+"&season="+seasons[i]);
	}

	getInetPage(links[0], getGameLinks, links.slice(1));
}

function getGameLinks(address, page, data) {
	var div = document.createElement("div");
	div.innerHTML = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");

	var season = parseInt(address.split("season=")[1]);
	
	var count = 0;
	var links = div.getElementsByTagName("a");
	for (var i=0; i<links.length; i++) {
		var a = links[i];
		if (a.href.toString().indexOf("game.pl?game_id=") != -1) {
			gamelinks.push(a.href.toString());
			count++;
		}

		if (useAllGames == true) continue;
		if ((count == 16) || (a.href.toString().indexOf("compare_teams") != -1)) break;
	}
	if (data.length > 0) {
		console.log(data.length+": "+data[0]);
		getInetPage(data[0], getGameLinks, data.slice(1));
	}
	else {
		console.log(gamelinks.length+" games requested");
		mainScripted();
	}
}

function mainScripted() {
console.log("main scripted");
	var btn = document.getElementById("rbbutton");
	btn.disabled = true;
	outButton = btn;

	teamPageName = document.getElementById("team_name").textContent.split("(")[0].split("[")[0];
	teamPageId = parseInt(document.location.toString().split("team_id=")[1]);
console.log("'"+teamPageName+"' -- '"+teamPageId+"'");

	var btn = document.getElementById("singleGameStats");
	gameLeaders = btn.checked;

	var games = new Array();
	for each (var l in gamelinks) {
		if (l.toString().split("game_id=").length == 2) {
			games.push(l);
		}
		else {
			games.push("/game/game.pl?game_id="+l);
		}
	}

	outButton.setAttribute("value","Warning: this might take a while. ("+games.length+" to go)");
	if (games.length > 0) {
		netTime = new Date();
		getInetPage(games[0], loadTeam, games);
	}
	else {
		btn.setAttribute("value","Error: No games were added to the script");
		console.log("Error: No games were added to the script");
	}
}

function boxSetup() {
console.log("boxSetup");
    var div = document.createElement("div");
	div.style.clear = "both";

    var button = document.createElement("input");
    button.setAttribute("value","Collect Box Score History");
    button.setAttribute("type","button");
    button.setAttribute("id","rbbutton");
    button.addEventListener("click",mainHistorical,false);
    div.appendChild(button);
	
    var checkBox = document.createElement("input");
    checkBox.setAttribute("type","checkbox");
    checkBox.setAttribute("id","singleGameStats");
    checkBox.setAttribute("class","GScheckbox");
	checkBox.style.marginLeft = "3px";
	checkBox.style.marginRight = "3px";
	div.appendChild(checkBox);

    var span = document.createElement("span");
	span.innerHTML = "Single Game Stats";
	div.appendChild(span);
	
    var checkBox = document.createElement("input");
    checkBox.setAttribute("type","checkbox");
    checkBox.setAttribute("id","nameChanges");
    checkBox.setAttribute("class","GScheckbox");
	checkBox.style.marginLeft = "3px";
	checkBox.style.marginRight = "3px";
	div.appendChild(checkBox);

    var span = document.createElement("span");
	span.innerHTML = "Ignore Name Changes";
	div.appendChild(span);
	
    var checkBox = document.createElement("input");
    checkBox.setAttribute("type","checkbox");
    checkBox.setAttribute("id","adjustedStats");
    checkBox.setAttribute("class","GScheckbox");
	checkBox.style.marginLeft = "3px";
	checkBox.style.marginRight = "3px";
	div.appendChild(checkBox);

    var span = document.createElement("span");
	span.innerHTML = "Adjusted Stats";
	div.appendChild(span);
	
    var checkBox = document.createElement("input");
    checkBox.setAttribute("type","checkbox");
    checkBox.setAttribute("id","allGames");
    checkBox.setAttribute("class","GScheckbox");
	checkBox.style.marginLeft = "3px";
	checkBox.style.marginRight = "3px";
	div.appendChild(checkBox);

    var span = document.createElement("span");
	span.innerHTML = "Use All Games";
	div.appendChild(span);
	
    
    var selects = document.getElementsByTagName("select");
    for (var i=0; i<selects.length; i++) {
        if (selects[i].name == "season") {
           earliestSeason = selects[i].value;
           currentSeason = selects[i].options[0].value;
        }
    }

    var textBox = document.createElement("input");
    textBox.setAttribute("type","text");
    textBox.size = 16;
    textBox.defaultValue = earliestSeason+"-"+currentSeason;
    textBox.setAttribute("id","seasonsBSR");
    textBox.setAttribute("class","GStextbox");
	textBox.style.marginLeft = "3px";
	textBox.style.marginRight = "3px";
	textBox.addEventListener("mouseover",function(e) { over(e,false); }, false);
	textBox.addEventListener("mouseout",function(e) { out(e,false); }, false);
	div.appendChild(textBox);

    var span = document.createElement("span");
	span.innerHTML = "Seasons";
	div.appendChild(span);
	
	var content = document.getElementById("content");
	content.parentNode.insertBefore(div, content.nextSibling);
}

function over(e, left) {
	unsafeWindow.set_tip("Ex. 1,2,3,10,18,19,20 or 1-3,10,18-20", left, null, true);
}

function out(e) {
	unsafeWindow.unset_tip();
}


function v1BoxScore(id, div) {
	var modifier = 1;
	if (document.getElementById("adjustedStats").checked == true) {
		var quarters = div.getElementsByClassName("quarter");
		var w = 0;
		for (var i=5; i<10; i++) {
			w += parseFloat(quarters[i].innerHTML);	
		}
		var l = 0;
		for (var i=10; i<15; i++) {
			l += parseFloat(quarters[i].innerHTML);
		}
		modifier = Math.min(1/(0.0001+(Math.max(w,l)-Math.min(w,l))/blowout),1);
//		console.log(w+":"+l+" ==> "+modifier);
	}
	
	var tables = div.getElementsByTagName("table");
	for (var i=3; i<tables.length; i++) {
		var type = tables[i].getElementsByTagName("td")[0].innerHTML;

		var team1 = tables[i];
//console.log(team1.innerHTML);

		var name1 = team1.getElementsByClassName("nonalternating_color2")[0].cells[0].innerHTML;
		var name2 = team1.getElementsByClassName("nonalternating_color2")[1].cells[0].innerHTML;
//console.log(team1.innerHTML+" || "+team2.innerHTML);
//console.log(name1+" vs. "+name2+" : "+type);

		if (showEverything == false) {
			if (id[0] == teamPageId) loadPlayersV1(team1, type, name1, id[0], modifier);
			if (id[1] == teamPageId) loadPlayersV1(team1, type, name2, id[1], modifier);
		}
		else {
			loadPlayersV1(team1, type, name1, id[0], modifier);
			loadPlayersV1(team1, type, name2, id[1], modifier);
		}
	}
}

function v2BoxScore(id, div) {
	var modifier = 1;
	if (document.getElementById("adjustedStats").checked == true) {
		var quarters = div.getElementsByClassName("quarter");
		var w = 0;
		for (var i=5; i<10; i++) {
			w += parseFloat(quarters[i].innerHTML);	
		}
		var l = 0;
		for (var i=10; i<15; i++) {
			l += parseFloat(quarters[i].innerHTML);
		}
		modifier = Math.min(1/(0.0001+(Math.max(w,l)-Math.min(w,l))/blowout),1);
//		console.log(w+":"+l+" ==> "+modifier);
	}
	
	var tables = div.getElementsByTagName("table");
	for (var i=3; i<tables.length; i = i+3) {
		var type = tables[i].getElementsByTagName("td")[0].innerHTML;

		var team1 = tables[i+1];
		var name1 = team1.getElementsByTagName("th")[0].innerHTML;

		var team2 = tables[i+2];
		var name2 = team2.getElementsByTagName("th")[0].innerHTML;
//console.log(team1.innerHTML+" || "+team2.innerHTML);
//console.log(name1+" vs. "+name2+" : "+type);
		if (showEverything == false) {
			if (id[0] == teamPageId) loadPlayers(team1, type, name1, id[0], modifier);
			if (id[1] == teamPageId) loadPlayers(team2, type, name2, id[1], modifier);
		}
		else {
			loadPlayers(team1, type, name1, id[0], modifier);
			loadPlayers(team2, type, name2, id[1], modifier);
		}
	}
}

var countedGames = 0;
var skippedGames = 0;
var inetErrors = 0;
function loadTeam(address, page, data) {
console.log(address+" loaded ... "+data.indexOf(address)+"/"+data.length);

	var error = false;
	if (page.responseText.indexOf("Sorry, this game is private, available to the participants only.") != -1) {
		console.log("Skipping private game: "+address);
		skippedGames++;
	}
	else {
		try {
			var html = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
			var div = document.createElement("div");
			div.innerHTML = html;

			var exitEarly = !document.getElementById("nameChanges").checked;
			var id = new Array();
			var links = div.getElementsByTagName("a");
			for (var i=0; i<links.length; i++) {
				var a = links[i];
				if (a.href.toString().indexOf("game/team.pl") != -1) {
					var left = a.innerHTML.replace(/\s/g, "");
					left = left.replace(/&nbsp;/g, "");
					left = left.replace(/^\s+|\s+$/g,"");
					var right = teamPageName.replace(/\s/g,"");
					right = right.replace(/&nbsp;/g, "");
					right = right.replace(/^\s+|\s+$/g,"");
					if (left == right) {
						exitEarly = false;
					}
					//console.log(i+") "+exitEarly+" --- "+left+"' || '"+right+"'");
					id.push(parseInt(a.href.toString().split("=")[1]));
					if (id.length == 2) break;
				}
			}

			if (exitEarly == false) {
				try {
					console.log("processing v2 box score: "+address);
					v2BoxScore(id, div);
				}
				catch (e) {
					console.log("processing v2 box score failed: "+e);
					console.log("processing v1 box score: "+address);
					v1BoxScore(id, div);
				}
				countedGames++;
			}
			else {
				console.log("skipping a game: "+address);
				skippedGames++;
			}
		}
		catch (e) {
			console.log("Error dealing with this page (new box score?): "+address);
			console.log(e);
			console.log("Aborting with "+gamelinks.length+" games left");
			error = true;
		}
	}

	outButton.setAttribute("value","Warning: this might take a while. ("+data.length+" to go)");
	if ((data.length > 0) && (error == false)) {
		getInetPage(data[1], loadTeam, data.slice(1));
	}
	else {
//		alert("Games: counted="+countedGames+" || skipped="+skippedGames+" || inetErrors="+inetErrors+"\n"+
//			  "transfer time : "+(new Date()-netTime).toFixed(0)+"ms");
		console.log("Games: counted="+countedGames+" || skipped="+skippedGames+" || inetErrors="+inetErrors);
		console.log("transfer time : "+(new Date()-netTime).toFixed(0)+"ms");

		if (gameLeaders == false) {
			var addTime = new Date();
			addition();
			console.log("addition time : "+(new Date()-addTime).toFixed(0)+"ms");
		}
		else {
			var leadTime = new Date();
			getGameLeaders();
			console.log("leaders time : "+(new Date()-leadTime).toFixed(0)+"ms");

			var addTime = new Date();
			addition();
			console.log("addition time : "+(new Date()-addTime).toFixed(0)+"ms");
		}
		createOutputTable();

		doneTime = ((new Date()-doneTime)/1000).toFixed(0);
		console.log("total time : "+doneTime+"secs");
	}
}

function loadPlayersV1(incomingTable, heading, tname, tid, modifier) {
//console.log(table+" | "+heading+" | "+tname);
	var table = document.createElement("table");
	table.innerHTML = incomingTable.innerHTML;

	var nonac2 = table.getElementsByClassName("nonalternating_color2");
	var start = nonac2[0].rowIndex;
	var end = nonac2[1].rowIndex;

	if (nonac2[0].cells[0].innerHTML != tname) {
		for (var i=start; i<end; i++) {
			table.deleteRow(1);
		}
	}
	else {
		while (table.rows.length > end) {
			table.deleteRow(end);
		}
	}
//	console.log(table.innerHTML);

	for (var i=2; i<table.rows.length; i++) {
		var r = table.rows[i];
		var pname = r.cells[0].getElementsByTagName("a")[0].innerHTML;
		var pid = r.cells[0].getElementsByTagName("a")[0].href.toString().split("=")[1];
		var ppos = r.cells[0].firstChild.innerHTML;
		var pteam = tname;
	
		if (players[pid] == null) {
			var player = new Object();
			player.name = pname.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			player.id = pid;
			player.pos = ppos.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			player.tname = pteam.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			player.tid = tid;

			player.stats = new Array();
			for each (var type in statTypes) {
				player.stats[type] = new Array();
			}

			players[pid] = player;
//console.log(heading+") "+player.name+"/"+player.id+"/"+player.pos+"/"+player.tname+"/"+player.tid);
		}
		var s = new Array();
		for (var j=1; j<r.cells.length; j++) {
			var statName = table.rows[1].cells[j].innerHTML;
			var value = r.cells[j].innerHTML.replace(",","");
			if (statName == "Yds") value = Math.round(parseFloat(value));
			if (statName == "SackYd") value = Math.round(parseFloat(value));
			if (heading == "Kick/Punt Return") {
				if (statName == "Yds") {
					if (s["KYds"] == null) statName = "KYds";
					else statName = "PYds";
				}
				else if (statName == "TD") {
					if (s["KTD"] == null) statName = "KTD";
					else statName = "PTD";
				}
			}
			if (heading == "Defense") {
				if (statName == "Yds") {
					if (s["SYds"] == null) statName = "SYds";
					else statName = "IYds";
				}
			}
			if (statName.indexOf("-") != -1) {
				var ma = Math.ceil(value.split("/")[0] * modifier);
				var mi = Math.ceil(value.split("/")[1] * modifier);
				s[statName] = ma+"/"+mi;
//				console.log(value+" - "+ma+" - "+mi+" : "+s[statName]);
			}
			else {
				s[statName] = Math.ceil(parseFloat(value)*modifier);
			}
		}
		players[pid].stats[heading].push(s);
	}
}

function loadPlayers(table, heading, tname, tid, modifier) {
//console.log(table+" | "+heading+" | "+tname);
	for (var i=1; i<table.rows.length; i++) {
		var r = table.rows[i];
		var pname = r.cells[0].getElementsByTagName("a")[0].innerHTML;
		var pid = r.cells[0].getElementsByTagName("a")[0].href.toString().split("=")[1];
		var ppos = r.cells[0].firstChild.innerHTML;
		var pteam = tname;
		if (players[pid] == null) {
			var player = new Object();
			player.name = pname.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			player.id = pid;
			player.pos = ppos.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			player.tname = pteam.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			player.tid = tid;

			player.stats = new Array();
			for each (var type in statTypes) {
				player.stats[type] = new Array();
			}

			players[pid] = player;
		}

		var s = new Array();
		for (var j=1; j<r.cells.length; j++) {
			var statName = table.rows[0].cells[j].innerHTML;
			var value = r.cells[j].innerHTML.replace(",","");
//console.log(statName+" : "+value+" = "+(value*modifier));
			if (heading == "Kick/Punt Return") {
				if (statName == "Yds") {
					if (s["KYds"] == null) statName = "KYds";
					else statName = "PYds";
				}
				else if (statName == "TD") {
					if (s["KTD"] == null) statName = "KTD";
					else statName = "PTD";
				}
			}
			else if (heading == "Defense") {
				if (statName == "Yds") {
					if (s["SYds"] == null) statName = "SYds";
					else statName = "IYds";
				}
			}
			if ((statName == "Plays") || (statName == "Plys")) {
				s[statName] = parseInt(value);
			}
			else if (statName.indexOf("-") != -1) {
				var ma = Math.ceil(value.split("/")[0] * modifier);
				var mi = Math.ceil(value.split("/")[1] * modifier);
				s[statName] = ma+"/"+mi;
//				console.log(value+" - "+ma+" - "+mi+" : "+s[statName]);
			}
			else {
				s[statName] = Math.ceil(parseFloat(value)*modifier);
			}
		}
		players[pid].stats[heading].push(s);
	}
}

var getStats = new Array();
getStats["Passing"] = getPassing;
getStats["Rushing"] = getRushing;
getStats["Receiving"] = getReceiving;
getStats["Kicking"] = getKicking;
getStats["Punting"] = getPunting;
getStats["Kick/Punt Return"] = getReturns;
getStats["Special Teams"] = getSpecialTeams;
getStats["Offensive Line"] = getOffensiveLine;
getStats["Defense"] = getDefense;

var headings = [];
headings["Passing"] = ["Plays","Comp","Att","Yds","Pct","Y/A","Hurry","Sack","SackYd","BadTh","Drop","Int","TD","Rating"];
headings["Rushing"] = ["Plays","Rush","Yds","Avg","TD","BrTk","TFL","Fum","FumL"];
headings["Receiving"] = ["Plays","Targ","Rec","Yds","Avg","YAC","TD","Drop","TargRZ","Targ3d","Fum","FumL"];
headings["Kicking"] = ["FGM","FGA","0-19","20-29","30-39","40-49","50+","XPM","XPA","Points","KO","TB","Yds","Avg"];
headings["Punting"] = ["Punts","Yds","Avg","TB","CofCrn","Inside5","Inside10","Inside20"];
headings["Kick/Punt Return"] = ["KR","KYds","KAvg","KTD","PR","PYds","PAvg","PTD"];
headings["Offensive Line"] = ["Plays","Pancakes","RevPnkd","HryAlw","SackAlw"];
headings["Special Teams"] = ["Plays","Tk","MsTk","FFum","FRec","FumRTD","Pnkd","BrTk","Fum","FumL"];
headings["Defense"] = ["Ply","Tk","MsTk","Sack","SYds","Hry","TFL","FFum","FumR","Targ","RecAlw","KL","PD","Int","IYds","DefTD","Pnkd","RevPnk"];

var sortable = [];
sortable["Passing"] = 4;
sortable["Rushing"] = 3;
sortable["Receiving"] = 4;
sortable["Kicking"] = 10;
sortable["Punting"] = 2;
sortable["Kick/Punt Return"] = 2;
sortable["Special Teams"] = 2;
sortable["Offensive Line"] = 2;
sortable["Defense"] = 2;

function insert(arr, val) {
	if (arr == null) return false;
	if (isNaN(parseFloat(val)) == true) { 
//		console.log("returning false : "+val); 
		return false; 
}

	var pos = -1;
	for (var i=0; i<Math.min(arr.length, maxLeaders); i++) {
		if (parseFloat(val) > arr[i]) {
			pos = i;
			break;
		}
	}

	if (pos != -1) {
		arr.splice(pos,0,val);
		arr = arr.slice(0,maxLeaders);
		return true;
	}

	if (arr.length < maxLeaders) {
		arr.push(val);
		return true;
	}

	return false;
}

function getGameLeaders() {
console.log("getting leaders");
	outButton.setAttribute("value","Warning: this might take a while. (adding results)");

	var leaders = new Array();

	var limits = [];
	for each (var type in statTypes) {
		limits[type] = new Array();
		for each (var h in headings[type]) {
			limits[type][h] = new Array();
		}
	}

	var i=0;
	for each (var player in players) {
		outButton.setAttribute("value","Warning: this might take a while. (adding results : "+i+")");
		i++;
		for each (var type in statTypes) {
			for (var x=0; x<player.stats[type].length; x++) {
				for each (var h in headings[type]) {
					if ((h == "Name") || (h == "Plays") || (h == "Plys")) continue;
					var val = player.stats[type][x][h];
//console.log(h+" : "+val+" : "+limits[type][h].length);
					var result = insert(limits[type][h], val);
					if (result == true) {
						var p = new Object();
						p.name = player.name;
						p.id = player.id;
						p.pos = player.pos;
						p.tname = player.tname;
						p.tid = player.tid;
						p.stats = new Array();
						p.stats[type] = [player.stats[type][x]];
//console.log("pushing ("+x+") "+p.name+" -- "+h+"/"+val+" == "+leaders.length);

						for (var l=0; l<headings[type].indexOf(h); l++) {
							var val = player.stats[type][x][l];
							insert(limits[type][headings[type][l]], val);
						}
						for (var l=headings[type].indexOf(h)+1; l < headings[type].length; l++) {
							var val = player.stats[type][x][l];
							insert(limits[type][headings[type][l]], val);
						}

						leaders.push(p);
						break;
					}
				}
			}
		}

		if (i%25 == 0) {
			console.log("purge loop : "+leaders.length);
			var p = 0;
			for (var lidx=0; lidx<leaders.length; lidx++) {
				var leader = leaders[lidx];
				if (leader == null) continue;
				if (leader.stats == null) continue;

				for each (var type in statTypes) {
					if (leader.stats[type] == null) continue;

					var result = false;
					for each (var h in headings[type]) {
						if ((h == "Name") || (h == "Plays") || (h == "Plys")) continue;
						if (limits[type][h].length > 0) {
							var val = leader.stats[type][0][h];
							var cmp = limits[type][h][ Math.min(limits[type][h].length-1, maxLeaders-1) ];
							if (val >= cmp) {
//console.log("keeping because of: "+type+":"+h+" : "+val+">="+cmp+" :: "+limits[type][h]+" .. "+limits[type][h].length);
								result = true;
								break;
							}
						}
					}
					if (result == false) {
						p++;
						leader.stats[type] = null;
						leader.stats = null;
						leaders.splice(lidx,1);
						lidx--;
						break;
					}
				}
			}
			console.log("purged: "+p+" players : length is "+leaders.length);
		}
	}

	console.log(leaders.length+" -- "+i);
	players = leaders;
}

function statFix(type, out) {
	if (type == "Passing") {
		if (out["Att"] == 0) {
			out["Rating"] = "0.0";

			out["Pct"] = "0.0";
			out["Y/A"] = "0.0";
		}
		else {
			var a = Math.max(0,Math.min(2.375, (out["Comp"]/out["Att"]-0.3)*5));
			var b = Math.max(0,Math.min(2.375, (out["Yds"]/out["Att"]-3)*0.25));
			var c = Math.max(0,Math.min(2.375, (out["TD"]/out["Att"])*20));
			var d = Math.max(0,Math.min(2.375, 2.375 - (out["Int"]/out["Att"])*25));
			out["Rating"] = (100*(a + b + c + d)/6).toFixed(1);

			out["Pct"] = (100*out["Comp"] / out["Att"]).toFixed(1);
			out["Y/A"] = (parseFloat(out["Yds"]) / parseFloat(out["Att"])).toFixed(1);
		}
	}
	else if (type == "Rushing") {
		out["Avg"] = (parseFloat(out["Yds"]) / parseFloat(out["Rush"])).toFixed(2);
		if (isNaN(out["Avg"]) == true) out["Avg"] = 0.00;
	}
	else if (type == "Receiving") {
		out["YAC"] = (out["YAC"]*out["Rec"]).toFixed(1);
		if (isNaN(out["YAC"]) == true) out["YAC"] = 0.0;
		out["Avg"] = (parseFloat(out["Yds"]) / parseFloat(out["Rec"])).toFixed(1);
		if (isNaN(out["Avg"]) == true) out["Avg"] = 0.0;
	}
	else if (type == "Kicking") {
//console.log(out["20-29"]+" -- "+out["30-39"]+" -- "+out["40-49"]+" -- "+out["50+"]);
		out["Points"] = out["FGM"]*3 + out["XPM"]*1;
	}
	else if (type == "Punting") {
		out["Avg"] = (parseFloat(out["Yds"]) / parseFloat(out["Punts"])).toFixed(1);
		if (isNaN(out["Avg"]) == true) out["Avg"] = 0.0;
	}
	else if (type == "Kick/Punt Return") {
		out["KAvg"] = (parseFloat(out["KYds"]) / parseFloat(out["KR"]) ).toFixed(1);
		if (isNaN(out["KAvg"]) == true) out["KAvg"] = 0.0;
		out["PAvg"] = (parseFloat(out["PYds"]) / parseFloat(out["PR"]) ).toFixed(1);
		if (isNaN(out["PAvg"]) == true) out["PAvg"] = 0.0;
	}
}

function addition() {
console.log("getting totals");
	outButton.setAttribute("value","Warning: this might take a while. (adding results)");
	var i=0;
	for each (var player in players) {
		i++;
		if ((showEverything == false) && (player.tid != teamPageId)) {
//			console.log("skipping: "+i+") "+player.id+") "+player.name+" ("+player.tid+")");
			continue;
		}
//		console.log(i+") "+player.id+") "+player.name+" ("+player.tid+")");
		for each (var type in statTypes) {
			if (player.stats[type] == null) continue;
			var total = getStats[type](player.stats[type]);
			player.stats[type] = total;
		}

		if ((player.stats["Passing"] != null) && (player.stats["Rushing"] != null)) {
			player.stats["Rushing"]["Rush"] -= player.stats["Passing"]["Sack"];
			player.stats["Rushing"]["Yds"] -= player.stats["Passing"]["SackYd"];
			if (player.stats["Rushing"]["Rush"] == 0) {
				player.stats["Rushing"] = null;
			}
			else {
				player.stats["Rushing"]["Avg"] = (parseFloat(player.stats["Rushing"]["Yds"]) / parseFloat(player.stats["Rushing"]["Rush"])).toFixed(2);
			}
		}

		if ((player.stats["Special Teams"] != null) && (player.stats["Defense"] != null)) {
			player.stats["Defense"]["Tk"] -= player.stats["Special Teams"]["Tk"];
			player.stats["Defense"]["MsTk"] -= player.stats["Special Teams"]["MsTk"];
			player.stats["Defense"]["FFum"] -= player.stats["Special Teams"]["FFum"];
			player.stats["Defense"]["FRec"] -= player.stats["Special Teams"]["FRec"];

			var sum = 0;
			for each (var s in headings["Defense"]) {
				if (s == "Ply") continue;
				sum += parseFloat(player.stats["Defense"][s]);
			}	
			if (sum == 0) player.stats["Defense"] = null;		
		}

	}
	console.log(players.length+" -- "+i);
}

function createOutputTable() {
	var stime = new Date();
	console.log("creating output");
	var output = document.createElement("div");
	output.appendChild(createOutputButtons());

	for (var i=0; i<statTypes.length; i++) {
		outButton.setAttribute("value","Warning: this might take a while. (creating "+statTypes[i]+" table)");
		var ttime = new Date();

		var table = document.createElement("table");
		table.setAttribute("class","bscTable");
		table.cellSpacing = "0";
		table.cellPadding = "0";
		table.style.marginBottom = "0px";
		table.style.width = "1050px";
		var tbody = document.createElement("tbody");

		var tr = document.createElement("tr");
		tr.setAttribute("class","nonalternating_color");

		var td = document.createElement("td");
		td.innerHTML = statTypes[i];
		td.colSpan = headings[statTypes[i]].length + 3;

		tr.appendChild(td);
		tbody.appendChild(tr);
		table.appendChild(tbody);

		var hrow = document.createElement("tr");
		hrow.setAttribute("class", "nonalternating_color2");
		var head = ["Name"].concat(headings[statTypes[i]]);
		for each (var h in head) {
			var th = document.createElement("th");
			if (h == "Name") {
				th.setAttribute("style","color: black; text-align: left");
				th.colSpan = 2;
			}
			else {
				th.setAttribute("style","color: black; text-align: right");
			}
			th.innerHTML = h;
			hrow.appendChild(th);
		}
		table.appendChild(hrow);

		for each (var player in players) {
			if (showEverything == false) {
				if (teamPageId != player.tid) {
					continue;
				}
			}
			if (player.stats[statTypes[i]] != null) {
				var pRow = getOutputRow(statTypes[i], player);
				if (pRow.cells[sortable[statTypes[i]]].textContent == "undefined") {
					continue;
				}

				var inserted = false;
				for (var ridx=2; ridx<table.rows.length; ridx++) {
					var l = parseFloat(pRow.cells[sortable[statTypes[i]]].textContent);
					var r = parseFloat(table.rows[ridx].cells[sortable[statTypes[i]]].textContent);
					if (l > r) {
						inserted = true;
						table.insertBefore(pRow, table.rows[ridx]);
						break;					
					}
				}
				if (inserted == false) {
					table.appendChild(pRow);
				}
			}
		}
		for (var x=2; x<table.rows.length; x++) {
			table.rows[x].setAttribute("class","alternating_color"+(x%2+1));
			if (gameLeaders == true) {
				if (x > (maxLeaders+2)) {
					table.rows[x].style.visibility = "hidden";
					table.rows[x].style.display = "none";
				}
			}
		}
		output.appendChild(table);

		var time = new Date() - ttime;
		console.log("single table ("+statTypes[i]+","+table.rows.length+") : "+time.toFixed(0)+"ms");
	}
	document.getElementById("footer").appendChild(output);

	var time = new Date() - stime;
    console.log("create time : "+time.toFixed(0)+"ms");

	console.log("make sortable");
	outButton.setAttribute("value","Warning: this might take a while. (making sortable)");
	makeSortable();

	console.log("done");
	outButton.setAttribute("value","Done.");
}

function merge(a, b, sortidx) {
	if (a.length == 0) return b;
	if (b.length == 0) return a;

	var output = new Array();
	var idx = 0, aidx = 0, bidx = 0;

	while ((aidx < a.length) && (bidx < b.length)) {
		if (parseFloat(a[aidx].cells[sortidx].textContent) > parseFloat(b[bidx].cells[sortidx].textContent)) {
			output.push(a[aidx++]);
		}
		else {
			output.push(b[bidx++]);
		}
	}	

	for (; aidx<a.length; aidx++) {
		output.push(a[aidx]);
	}
	for (; bidx<b.length; bidx++) {
		output.push(b[bidx]);
	}

	return output;
}

function sortColumn(data, sortidx) {
// sort broken?
	if (data.length == 1) return data;

	var center = Math.round(data.length/2);

	var left = data.slice(0,center);
	left = sortColumn(left, sortidx);

	var right = data.slice(center);
	right = sortColumn(right, sortidx);

	var output = merge(left, right, sortidx);
	return output;
}

function emit(target) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click",false,false);
    target.dispatchEvent(evt);
}

function makeSortable() {
	var tables = document.getElementsByClassName("bscTable");
	for (var j=0; j<tables.length; j++) {
		var t = tables[j];
		var head = t.getElementsByTagName("th");
		for (var i=0; i<head.length; i++) {
			var th = head[i];
			th.addEventListener("click", sort, false);
		}
	}
}

function sort(event) {
	var tbl = event.target.parentNode.parentNode;
	var tbody = tbl.getElementsByTagName("tbody")[0];

	var idx = event.target.cellIndex;
	if (idx == -1) return;

	tbl.style.visibility = "hidden";

	var stime = new Date();
	var results = sortColumn(getArray(tbl.rows), idx);
	var time = new Date() - stime;
    console.log("sort time : "+time.toFixed(0)+"ms");

	var stime = new Date();
	while (tbl.rows.length > 2) {
		tbl.deleteRow(2);
	}
	var time = new Date() - stime;
    console.log("delete time : "+time.toFixed(0)+"ms");

	var stime = new Date();
	for (var i=0; i<Math.min(results.length, results.length+2); i++) {
		results[i].setAttribute("class","alternating_color"+(i%2+1));
		if (gameLeaders == true) {
			if (i > (maxLeaders+2)) {
				results[i].style.visibility = "hidden";
				results[i].style.display = "none";
			}
			else {
				results[i].style.visibility = "visible";
				results[i].style.display = null;
			}
		}
		tbl.appendChild(results[i]);
	}
	results = null;
	var time = new Date() - stime;
    console.log("append time : "+time.toFixed(0)+"ms");

	tbl.style.visibility = "visible";
}

function getArray(list) {
	var o = new Array();
    for(var i=2, len = list.length; i < len; i++) {
        o.push(list[i]);
    }
    return o;
}; 

function getOutputRow(type, player) {
	var tr = document.createElement("tr");
	tr.innerHTML = "<td colspan='2'>"+
				   "<span class='cpu'>"+player.pos+"</span>"+
				   "<a href='/game/player.pl?player_id="+player.id+"'>"+player.name+"</a>"+
				   "<span class='cpu'> ("+player.tname+")</span>"+
				   "</td>";
	for each (var s in headings[type]) {
		var td = document.createElement("td");
		td.setAttribute("style", "color: black; text-align: right;");
		var val = player.stats[type][s];
		td.innerHTML = val;
		tr.appendChild(td);
	}
	return tr;
}

function getPassing(stats) {
	var out = getGeneric(headings["Passing"], stats);

	if (out != null) {
		if ((out["Att"] == 0) && (out["Sack"] == 0)) return null;
		if (out["Att"] == 0) {
			out["Rating"] = "0.0";

			out["Pct"] = "0.0";
			out["Y/A"] = "0.0";
		}
		else {
			var a = Math.max(0,Math.min(2.375, (out["Comp"]/out["Att"]-0.3)*5));
			var b = Math.max(0,Math.min(2.375, (out["Yds"]/out["Att"]-3)*0.25));
			var c = Math.max(0,Math.min(2.375, (out["TD"]/out["Att"])*20));
			var d = Math.max(0,Math.min(2.375, 2.375 - (out["Int"]/out["Att"])*25));
			out["Rating"] = (100*(a + b + c + d)/6).toFixed(1);

			out["Pct"] = (100*out["Comp"] / out["Att"]).toFixed(1);
			out["Y/A"] = (parseFloat(out["Yds"]) / parseFloat(out["Att"])).toFixed(1);
		}
	}
	return out;
}
function getRushing(stats) {
	var out = getGeneric(headings["Rushing"], stats);
	if (out != null) {
		out["Avg"] = (parseFloat(out["Yds"]) / parseFloat(out["Rush"])).toFixed(2);
		if (isNaN(out["Avg"]) == true) out["Avg"] = 0.00;
	}
	return out;
}
function getReceiving(stats) {
	for each (var s in stats) {
		s["YAC"] = s["YAC"] * s["Rec"];
	}
	var out = getGeneric(headings["Receiving"], stats);
	if (out != null) {
		out["YAC"] = (out["YAC"]/out["Rec"]).toFixed(1);
		if (isNaN(out["YAC"]) == true) out["YAC"] = 0.0;
		out["Avg"] = (parseFloat(out["Yds"]) / parseFloat(out["Rec"])).toFixed(1);
		if (isNaN(out["Avg"]) == true) out["Avg"] = 0.0;
	}
	return out;
}
function getKicking(stats) {
	var output = new Array();

	var k = ["XPM","XPA","KO","TB","Yds"];
	for each (var h in k) {
		output[h] = 0;
		for (var i=0; i<stats.length; i++) {
			var v = parseFloat(stats[i][h]);
			if (isNaN(v) == true) v = 0;
			output[h] += v;
		}
	}
	if (output["KO"] > 0) {
		output["Avg"] = (output["Yds"]/output["KO"]).toFixed(1);
	}
	else {
		output["Avg"] = 0.0;
	}

	var fgm = 0;
	var fga = 0;
	var k = ["0-19","20-29","30-39","40-49","50+"];
	for each (var h in k) {
		output[h] = "0/0";
		for (var i=0; i<stats.length; i++) {
			if (stats[i][h].toString().indexOf("/") != -1) {
				var l = parseInt(stats[i][h].split("/")[0]);
				var r = parseInt(stats[i][h].split("/")[1]);
				fgm += l;
				fga += r;
				try {
					output[h] = (parseInt(output[h].split("/")[0])+l)+"/"+(parseInt(output[h].split("/")[1])+r);
				}
				catch(e) {
					output[h] = (0+l)+"/"+(0+r);
				}
			}
			else {
				output[h] = Math.ceil(stats[i][h]);
			}
		}
	}
	output["FGM"] = fgm;
	output["FGA"] = fga;
	output["Points"] = output["FGM"]*3 + output["XPM"]*1;

	if ((output["FGA"] == 0) && (output["XPA"] == 0) && (output["KO"] == 0)) return null;
	return output;
}

function getPunting(stats) {
	var out = getGeneric(headings["Punting"], stats);
	if (out != null) {
		out["Avg"] = (parseFloat(out["Yds"]) / parseFloat(out["Punts"])).toFixed(1);
		if (isNaN(out["Avg"]) == true) out["Avg"] = 0.0;
	}
	return out;
}
function getReturns(stats) {
	var out = getGeneric(headings["Kick/Punt Return"], stats);
	if (out != null) {
		out["KAvg"] = (parseFloat(out["KYds"]) / parseFloat(out["KR"]) ).toFixed(1);
		if (isNaN(out["KAvg"]) == true) out["KAvg"] = 0.0;
		out["PAvg"] = (parseFloat(out["PYds"]) / parseFloat(out["PR"]) ).toFixed(1);
		if (isNaN(out["PAvg"]) == true) out["PAvg"] = 0.0;
	}
	return out;
}
function getSpecialTeams(stats) {
	return getGeneric(headings["Special Teams"], stats);
}
function getOffensiveLine(stats) {
	return getGeneric(headings["Offensive Line"], stats);
}
function getDefense(stats) {
	return getGeneric(headings["Defense"], stats);	
}
function getGeneric(headings, stats) {
	var val = 0;
	var total = 0;
	var output = new Array();
	for each (var h in headings) {
		output[h] = 0;

		for (var i=0; i<stats.length; i++) {
			val = parseFloat(stats[i][h]);
			if (isNaN(val) == true) val = 0;
			output[h] += val;
			if ((h != "Name") && (h != "Plays") && (h != "Ply")) {
				total += parseFloat(stats[i][h]); //removed math.abs
			}
		}
	}
	if (total != 0) {
		return output;
	}
	else {
		return null;
	}
}

function getInetPage(address, func, data) {
//    console.log("getInetPage : "+address);
    var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onload = function() {
		if (this.status != 200) {
//			alert("pbr gm script: Error "+this.status+" loading "+address);
			inetErrors++;
			func(address, this, data);
		}
		else {
//			console.log("loaded: "+address)
			func(address, this, data);
		}
	};

	req.send(null);
	return req;
}

function spacing(w, s) {
	s = Math.min(s,12);
	if (w.length < s) {
		var output = " ";
		for (var i=w.length-1; i<(s-1); i++) {
			output += ".";
		}
		output = output.slice(0,-1)+" ";
		output += w;
		return output;
	}
	return w;
}
 
function createForumOutput() {
	console.log("creating half-assed output for Bort's ridiculous 'hey, no one needs to format anything' forum software");
	var output = "";
	for each (var type in statTypes) {
		output += "\n"+type + "\n";
		for each (var h in headings[type]) {
			output += spacing(h, h.length*3)
		}
		output += " .... Pos . Name .(Team)";
		output += "\n";

		for each (var player in players) {
			if (player.stats[type] != null) {
				if (showEverything == false) {
					if (teamPageId != player.tid) {
						continue;
					}
				}
				for each (var h in headings[type]) {
					output += spacing(player.stats[type][h].toString(), h.length*3);
				}
				output += " ..... "+spacing(player.pos, 3)+" "+spacing(player.name,7)+" ("+player.tname+")";
				output += "\n";
			}
		}
		output += "\n";
	}
	console.log(output);
}

function createHTMLOutput() {
	console.log("creating HTML output");
	var div = document.createElement("div");
	div.innerHTML = document.getElementsByClassName("bscTable")[0].parentNode.innerHTML;	
	div.removeChild(div.childNodes[0]);
	console.log(div.innerHTML);
}

function createDelimitedOutput() {
	console.log("creating delimited output");
	var output = "";
	for each (var type in statTypes) {
		output += "\n"+type + "\n";
		output += "Pos,Name,Team,";
		for each (var h in headings[type]) {
			output += h+",";
		}
		output += "\n";

		for each (var player in players) {
			if (player.stats[type] != null) {
				if (showEverything == false) {
					if (teamPageId != player.tid) {
						continue;
					}
				}
				output += player.pos+","+player.name.replace(/,/g,"").slice(0,25)+","+player.tname.replace(/,/g,"").slice(0,25)+",";
				for each (var h in headings[type]) {
					output += player.stats[type][h].toString()+",";
				}
				output += "\n";
			}
		}
		output += "\n";
	}
	console.log(output);
}

function createWikiOutput() {
	console.log("creating wiki output");
	var output = "";
	for each (var type in statTypes) {
		output += "\n";
		output += "{| class='wikitable sortable'\n";

		output += "|-\n";
		output += "!Pos";
		output += "!!Name";
		output += "!!Team";
		for each (var h in headings[type]) {
			output += "!!"+h;
		}
		output += "\n";

		for each (var player in players) {
			if (player.stats[type] != null) {
				if (showEverything == false) {
					if (teamPageId != player.tid) {
						continue;
					}
				}
				output += "|-\n";
				output += "|"+player.pos;
				output += "||"+player.name;
				output += "||"+player.tname;
				for each (var h in headings[type]) {
					var s = player.stats[type][h];
					if (s < 0) {
						s = "{{msym}}"+(s*-1);
					}
					output += "||"+s.toString();
				}
				output += "\n";
			}
		}
		output += "|}\n";
	}
	console.log(output);
}

function createTextDump() {
	console.log("creating text dump");
	var output = "";
	for each (var type in statTypes) {
		for each (var h in headings[type]) {
			output += "\n" + type + ": " + h + "\n";
			
			var sorted = new Array();
			for each (var player in players) {
				if (player.stats[type] == null) continue;
				if (player.stats[type][h] == null) continue;

				var str = player.stats[type][h].toString() + " ... ";
				str += "([i]" + player.pos + "[/i]) [b]" + player.name + "[/b]";

				var pos = -1;
				for (var i=0; i<Math.min(sorted.length,maxLeaders); i++) {
					var val = parseFloat(sorted[i].split("..."));
					if (parseFloat(player.stats[type][h]) > val) {
						pos = i;
						break
					}
				}

				if (pos != -1) sorted.splice(pos,0,str);
				else if (sorted.length < maxLeaders) sorted.push(str);
			}
			for (var i=0; i<Math.min(sorted.length,maxLeaders); i++) {
				output += ("("+(i+1)+") ...").slice(0,7) + " "+sorted[i]+"\n";
			}
			output += "\n";
		}
	}
	console.log(output);
}

function createOutputButtons() {
	var div = document.createElement("span");
	var btn = document.createElement("input");
	btn.type = "button";
	btn.setAttribute("value","Delimited Export");
	btn.addEventListener("click", createDelimitedOutput, false);
	div.appendChild(btn);

	var btn = document.createElement("input");
	btn.type = "button";
	btn.setAttribute("value","Half-Assed Forum Export");
	btn.addEventListener("click", createForumOutput, false);
	div.appendChild(btn);

	var btn = document.createElement("input");
	btn.type = "button";
	btn.setAttribute("value","HTML Export");
	btn.addEventListener("click", createHTMLOutput, false);
	div.appendChild(btn);

	var btn = document.createElement("input");
	btn.type = "button";
	btn.setAttribute("value","Wiki Export");
	btn.addEventListener("click", createWikiOutput, false);
	div.appendChild(btn);

	var btn = document.createElement("input");
	btn.type = "button";
	btn.setAttribute("value","Text Dump");
	btn.addEventListener("click", createTextDump, false);
	div.appendChild(btn);

	return div;
}












