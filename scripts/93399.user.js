// ==UserScript==
// @name           Box Score Collection
// @namespace      pbr/bsc
// @include        http://goallineblitz.com/game/team.pl?*team_id=*
// @copyright      2010, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        11.03.09
// ==/UserScript==

// if you want to use a specific set of games that are not on the visible team profile page (for creating team record books and the like), put their game_id's in this array.  Invalid data or non-existent games WILL cause errors.
// ex. var gamelinks = [ 1417307, 1417068, 1417135, 1417829, 1418408, 1418092, 1417042, 1417825, 1417211, 1417211, 1417034, 1417308, 1417821, 1417059, 1417239, 1418169, 1417822, 1417045, 1417136, 1417226, 1419379, 1417401, 1417067, 1417044, 1417886, 1419117, 1419291, 1419215, 1419172, 1418407, 1419306, 1419711, 1419178, 1418998, 1419052, 1419661, 1419747 ];
//		or
// ex. var gamelinks = ['http://goallineblitz.com/game/game.pl?game_id=1417307' , 'http://goallineblitz.com/game/game.pl?game_id=1417068' , http://goallineblitz.com/game/game.pl?game_id=1417135' ]; 
//
// Take note that the full http links have quotes around them.  It does make a difference.

var gamelinks = [ ];

window.setTimeout(function() {
	boxSetup();
}, 3000);

var stats = new Array();
var players = new Array();
var teamPageName = null;

var statTypes = ["Passing", "Rushing", "Receiving", "Kicking", "Punting", "Kick/Punt Return", "Special Teams", "Offensive Line", "Defense"];

var showEverything = false;
var outButton = null;
var netTime = null;

function mainVisible() {
console.log("main visible");
	teamPageName = document.getElementById("team_name").textContent.split("[")[0];
	showEverything = document.getElementById("showEverything").checked;

	var btn = document.getElementById("bsencbutton");
	btn.disabled = true;
	var btn = document.getElementById("bsbutton");
	btn.disabled = true;
	outButton = btn;

	var games = new Array();
	var boxes = document.getElementsByClassName("GScheckbox");
	for (var i=0; i<boxes.length; i++) {
		if ((boxes[i].checked == true) && (boxes[i].id.indexOf("game.pl") != -1)) {
			games.push(boxes[i].id.split("\&")[0]);
			console.log(i+") added "+boxes[i].id.split("\&")[0]);
		}
	}

	outButton.setAttribute("value","Warning: this might take a while. ("+gamelinks.length+"->"+games.length+")");
	if (games.length > 0) {
		netTime = new Date();
		getInetPage(games[0], loadTeam, games);
	}
	else {
		console.log("Error: You didn't select any games.");

		var btn = document.getElementById("bsbutton");
		btn.setAttribute("value","Error: You didn't select any games.");
		btn.disabled = false;
		var btn = document.getElementById("bsencbutton");
		btn.disabled = false;
	}
}

function mainScripted() {
console.log("main scripted");
	teamPageName = document.getElementById("team_name").textContent.split("[")[0];
	showEverything = document.getElementById("showEverything").checked;

	var btn = document.getElementById("bsbutton");
	btn.disabled = true;
	var btn = document.getElementById("bsencbutton");
	btn.disabled = true;
	outButton = btn;

	var games = new Array();
	for each (var l in gamelinks) {
		if (l.toString().split("game_id=").length == 2) {
			games.push(l);
		}
		else {
			games.push("http://goallineblitz.com/game/game.pl?game_id="+l);
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
    var scheduleContent = document.getElementsByClassName("schedule_content");
	var cboxes = document.getElementsByClassName("GScheckbox");
    if ((scheduleContent.length > 0) && (cboxes.length == 0)) {
        for (var scidx=0; scidx<scheduleContent.length; scidx++) {
            var schedules = scheduleContent[scidx];
            var rows = schedules.rows;
            rows[0].cells[1].innerHTML = "[GS] "+rows[0].cells[1].innerHTML;
            for (var i=1; i<rows.length; i++) {
                var link = rows[i].cells[2].firstChild.href;
	
                var oldCell = rows[i].cells[1];
                rows[i].deleteCell(1);
	
                var checkBox = document.createElement("input");
                checkBox.setAttribute("type","checkbox");
                checkBox.setAttribute("id",link);
                checkBox.setAttribute("class","GScheckbox");
	
                var div = document.createElement("span");
                div.appendChild(checkBox);
                for (var cidx=0; cidx<oldCell.childNodes.length; cidx++) {
                    var c = oldCell.childNodes[cidx];
                    if (c == null) continue;
                    var c2 = c.nextSibling;
                    div.appendChild(c);
                    if (c2 != null) {
                        div.appendChild(c2);
                    }
                }
                var newCell = rows[i].insertCell(1);
                newCell.appendChild(div);
            }
        }
    }
	else {
		console.log("not adding boxes");
	}

    var div = document.createElement("div");
	div.style.clear = "both";

    var button = document.createElement("input");
    button.setAttribute("value","Collect Marked Box Scores");
    button.setAttribute("type","button");
    button.setAttribute("id","bsbutton");
    button.addEventListener("click",mainVisible,false);
    div.appendChild(button);

    var button = document.createElement("input");
    button.setAttribute("value","Collect Scripted Box Scores");
    button.setAttribute("type","button");
    button.setAttribute("id","bsencbutton");
    button.addEventListener("click",mainScripted,false);
    div.appendChild(button);

    var checkBox = document.createElement("input");
    checkBox.setAttribute("type","checkbox");
    checkBox.setAttribute("id","showEverything");
    checkBox.setAttribute("class","GScheckbox");
	checkBox.style.marginLeft = "3px";
	checkBox.style.marginRight = "3px";
	div.appendChild(checkBox);

    var span = document.createElement("span");
	span.innerHTML = "Show Everyone";
	div.appendChild(span);
	
	var content = document.getElementById("content");
	content.parentNode.insertBefore(div, content.nextSibling);
}

function loadTeam(address, page, data) {
console.log(address+" loaded ... "+data.indexOf(address)+"/"+data.length);
	var html = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
	var div = document.createElement("div");
	div.innerHTML = html;
//console.log(html);
	var tables = div.getElementsByTagName("table");
	for (var i=3; i<tables.length; i = i+3) {
//console.log("loading table");
		var type = tables[i].getElementsByTagName("td")[0].innerHTML;

		var team1 = tables[i+1];
		var name1 = team1.getElementsByTagName("th")[0].innerHTML;

		var team2 = tables[i+2];
		var name2 = team2.getElementsByTagName("th")[0].innerHTML;

//console.log(name1+" vs. "+name2+" : "+type);
		loadPlayers(team1, type, name1);
		loadPlayers(team2, type, name2);
	}

	outButton.setAttribute("value","Warning: this might take a while. ("+data.length+" to go)");
	if (data.length > 1) {
		getInetPage(data[1], loadTeam, data.slice(1));
	}
	else {
		console.log("transfer time : "+(new Date()-netTime).toFixed(0)+"ms");

		var addTime = new Date();
		addition();	
		console.log("addition time : "+(new Date()-addTime).toFixed(0)+"ms");

		createOutputTable();
	}
}

function loadPlayers(table, heading, tname) {
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
//console.log(statName+" : "+value);
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
			s[statName] = value;
		}
		players[pid].stats[heading].push(s);
	}
}

function addition() {
console.log("getting totals");
	outButton.setAttribute("value","Warning: this might take a while. (adding results)");
	var i=0;
	for each (var player in players) {
		i++;
//		console.log(i+") "+player.id+") "+player.name);
		for each (var type in statTypes) {
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
//			player.stats["Defense"]["Ply"] -= player.stats["Special Teams"]["Plays"];
			player.stats["Defense"]["Tk"] -= player.stats["Special Teams"]["Tk"];
			player.stats["Defense"]["MsTk"] -= player.stats["Special Teams"]["MsTk"];
			player.stats["Defense"]["FFum"] -= player.stats["Special Teams"]["FFum"];
			player.stats["Defense"]["FRec"] -= player.stats["Special Teams"]["FRec"];
//			player.stats["Defense"]["Pnkd"] -= player.stats["Special Teams"]["Pnkd"];

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
headings["Defense"] = ["Ply","Tk","MsTk","Sack","SYds","Hry","TFL","FFum","FumR","Targ","RecAlw","KL","PD","Int","IYds","DefTD","Pnkd"];

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
					if (teamPageName.indexOf(player.tname) != 0) {
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
					if (teamPageName.indexOf(player.tname) != 0) {
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
					if (teamPageName.indexOf(player.tname) != 0) {
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

	return div;
}

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
		table.style.width = "1000px";
		var tbody = document.createElement("tbody");

		var tr = document.createElement("tr");
		tr.setAttribute("class","nonalternating_color");

		var td = document.createElement("td");
		td.innerHTML = statTypes[i];
		td.colSpan = headings[statTypes[i]].length + 1;

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
				if (teamPageName.indexOf(player.tname) != 0) {
					continue;
				}
			}
			if (player.stats[statTypes[i]] != null) {
				var pRow = getOutputRow(statTypes[i], player);

				var inserted = false;
				for (var ridx=2; ridx<table.rows.length; ridx++) {
					if (parseFloat(pRow.cells[sortable[statTypes[i]]].textContent) >= parseFloat(table.rows[ridx].cells[sortable[statTypes[i]]].textContent)) {
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
		}
		output.appendChild(table);

		var time = new Date() - ttime;
		console.log("single table ("+statTypes[i]+") : "+time.toFixed(0)+"ms");
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
	for (var i=0; i<results.length; i++) {
		results[i].setAttribute("class","alternating_color"+(i%2+1));
		tbl.appendChild(results[i]);
	}
	results = null;
	var time = new Date() - stime;
    console.log("append time : "+time.toFixed(0)+"ms");

	tbl.style.visibility = "visible";
}

function getArray(list) {
	var output = new Array();
    for(var i=2, len = list.length; i < len; i++) {
        output.push(list[i]);
    }
    return output;
}; 

function getOutputRow(type, player) {
	var tr = document.createElement("tr");	
	tr.innerHTML = "<td>"+
				   "<span class='cpu'>"+player.pos+"</span>"+
				   "<a href='/game/player.pl?player_id="+player.id+"'>"+player.name+"</a>"+
				   "<span class='cpu'> ("+player.tname+")</span>"+
				   "</td>";
	for each (var s in headings[type]) {
		var td = document.createElement("td");
		td.setAttribute("style", "color: black; text-align: right;");
		td.innerHTML = player.stats[type][s];
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

	var k = ["FGM","FGA","XPM","XPA","KO","TB","Yds"];
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

	var k = ["0-19","20-29","30-39","40-49","50+"];
	for each (var h in k) {
		output[h] = "0/0";
		for (var i=0; i<stats.length; i++) {
			var l = parseInt(stats[i][h].split("/")[0]);
			var r = parseInt(stats[i][h].split("/")[1]);
			output[h] = (parseInt(output[h].split("/")[0])+l)+"/"+(parseInt(output[h].split("/")[1])+r);
		}
	}
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
				total += Math.abs(parseFloat(stats[i][h]));
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












