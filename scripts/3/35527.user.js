// ==UserScript==
// @name           Pro Bowl Score
// @description    adds justafish2002's Pro Bowl scores to full player stats page
// @namespace      pbr
// @include        http://goallineblitz.com/game/full_player_stats.pl?*player_id=*&playoffs=*
// @include        http://goallineblitz.com/game/stats.pl?*league_id=*
// @include        http://goallineblitz.com/game/team_player_stats.pl?*team_id=*
// @version		   08.12.02
// ==/UserScript==

/*
 * 
 * pabst did this 10/15/08+
 * 
 */

window.setTimeout(
	function() {
		if (window.location.toString().indexOf("full_player_stats.pl") != -1) {
			player_main();
		}
		else if (window.location.toString().indexOf("team_player_stats.pl") != -1) {
			team_main();
		}
		else {
			team_main();
		}
	}
, 3000);

function team_main() {
	if (window.location.toString().indexOf("stat=defense") != -1) {
		func = defenseScore;
	}
	else if (window.location.toString().indexOf("stat=rushing") != -1) {
		func = rushingScore;
	}
	else if (window.location.toString().indexOf("stat=receiving") != -1) {
		func = receivingScore;
	}
	else if (window.location.toString().indexOf("stat=sp_teams") != -1) {
		func = returningScore;
	}
	else if (window.location.toString().indexOf("stat=kicking") != -1) {
		func = kickingScore;
	}
	else if (window.location.toString().indexOf("stat=other") != -1) {
		func = otherScore;
	}
	else {
		func = passingScore;
	}
	var tbl = document.getElementsByClassName("stats_table")[0];
	insertScoreTeam(tbl,func);
}

function insertScoreTeam(table, scoreFunction) {
	//console.log(table.innerHTML);	
	var c = table.rows[0].insertCell(table.rows[0].cells.length);
	c.setAttribute("align","right");
	c.innerHTML = "Score";
	c.addEventListener("click",sortEvent,true);
	
	var c = table.rows[0].cells[0];
	c.addEventListener("click",sortEvent,true);

	for (var i=1; i<table.rows.length; i++) {
		//console.log(i+" -- "+table.rows.length);
		var r = table.rows[i];

		var p = new Array();
		var n = document.getElementById("player_name");
		if (n == null) {
			n = table.rows[i].cells[0].innerHTML;
		}
		p["name"] = n;
		for (var j=0; j<table.rows[0].cells.length-1; j++) {
			//console.log(j+") "+table.rows[0].cells[j].firstChild.innerHTML);
			p[table.rows[0].cells[j].firstChild.innerHTML] = parseFloat(r.cells[j].innerHTML.replace(",",""));
			//console.log(p[table.rows[0].cells[j].firstChild.innerHTML]);
		}
		var c = r.insertCell(r.cells.length);
		c.setAttribute("align","right");
		//console.log("p="+p);
		c.innerHTML = Math.round(scoreFunction(p));
		//console.log("score = "+scoreFunction(p));
	}
}


function league_main() {
}

function player_main() {
	var d = document.getElementById("content");
	var t = d.getElementsByTagName("table");
	currentStatsTable(t[1]);
	passingTable(t[2]);
	receivingTable(t[3]);
	rushingTable(t[4]);
	returningTable(t[5]);
	kickingTable(t[6]);
	defenseTable(t[7]);
	otherTable(t[8]);
	
	var t = d.getElementsByTagName("table");
	var careerScore = 0;
	var seasonScore = 0;
	for (var i=2; i<t.length; i++) {
		var s = 0;
		for (var j=1; j<t[i].rows.length-1; j++) {
			var r = t[i].rows[j];
			s += parseFloat(r.cells[r.cells.length-1].innerHTML);
			//console.log("s="+s+" || car="+careerScore);
		}
		careerScore += s;
		
		var r = t[i].rows[t[i].rows.length-1];
		var c = r.insertCell(r.cells.length);
		c.setAttribute("align","right");
   		r.cells[r.cells.length-1].innerHTML = s;
		var r = t[i].rows[t[i].rows.length-2];
		seasonScore += parseFloat(r.cells[r.cells.length-1].innerHTML);
		//console.log(seasonScore);
	}
	var d = document.getElementById("player_season_score");
	d.innerHTML = addCommas(seasonScore);
	var d = document.getElementById("player_average_score");
	d.innerHTML = addCommas(Math.round(careerScore / (t[2].rows.length-2)));
	var d = document.getElementById("player_career_score");
	d.innerHTML = addCommas(careerScore);
}

function addCommas(nStr){
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
	x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function currentStatsTable(table) {
	var trow = table.rows[0];
	var tcell = trow.insertCell(trow.cells.length);
	tcell.setAttribute("class","current_stats_head");
	tcell.innerHTML = "SScore";

	var trow = table.rows[0];
	var tcell = trow.insertCell(trow.cells.length);
	tcell.setAttribute("class","current_stats_head");
	tcell.innerHTML = "AScore";

	var trow = table.rows[0];
	var tcell = trow.insertCell(trow.cells.length);
	tcell.setAttribute("class","current_stats_head");
	tcell.innerHTML = "CScore";

	var drow = table.rows[1];
	var dcell = drow.insertCell(drow.cells.length);
	dcell.setAttribute("class","current_stats_value");
	dcell.setAttribute("id","player_season_score");

	var drow = table.rows[1];
	var dcell = drow.insertCell(drow.cells.length);
	dcell.setAttribute("class","current_stats_value");
	dcell.setAttribute("id","player_average_score");

	var drow = table.rows[1];
	var dcell = drow.insertCell(drow.cells.length);
	dcell.setAttribute("class","current_stats_value");
	dcell.setAttribute("id","player_career_score");
}

function passingTable(table) {
	insertScore(table, passingScore);
}
function receivingTable(table) {
	insertScore(table, receivingScore);
}
function rushingTable(table) {
	insertScore(table, rushingScore);
}
function defenseTable(table) {
	insertScore(table, defenseScore);
}
function returningTable(table) {
	table.rows[0].cells[4].innerHTML = "KAvg";
	table.rows[0].cells[6].innerHTML = "KTD";
	table.rows[0].cells[9].innerHTML = "PAvg";
	table.rows[0].cells[11].innerHTML = "PTD";
	insertScore(table, returningScore);
}
function kickingTable(table) {
	insertScore(table, kickingScore);
}
function otherTable(table) {
	insertScore(table, otherScore);
}

function passingScore(arr) {
	if (arr["QBRat"] == null) {
		var x = arr["Comp"] / arr["Att"];
		x -= 0.3;
		x /= 0.2;
		x = Math.max(x,0);
		x = Math.min(x,2.375);
		
		var y = arr["Yds"] / arr["Att"];
		y -= 3;
		y /= 4;
		y = Math.max(y,0);
		y = Math.min(y,2.375);
		
		var z = arr["TD"] / arr["Att"];
		z /= 0.05;
		z = Math.max(z,0);
		z = Math.min(z,2.375);
		
		var w = arr["Int"] / arr["Att"];
		w = 0.095 - w;
		w /= 0.04;
		w = Math.max(w,0);
		w = Math.min(w,2.375);
		//console.log(x+" - "+y+" - "+z+" - "+w);
		arr["QBRat"] = (x+y+z+w)*100/6;
		arr["QBRat"] = Math.round(arr["QBRat"]*10);
		arr["QBRat"] /= 10;	
	}
	var score = arr["QBRat"] + arr["TD"]*3 + arr["Yds"]/12.5 - arr["Int"]*3;
	score = score * (arr["Pct"]/100);
	return score;
}
function receivingScore(arr) {
	var score = arr["Rec"] - arr["Drops"] + arr["TD"]*4 + arr["Yds"]/12.5;
	return score;
}
function rushingScore(arr) {
	var score = arr["TD"]*3 + arr["Yds"]/12.5;
	if (arr["Fum"] == null) arr["Fum"] = 0;
	score = score - arr["Fum"]*3;
	return score; 
}
function returningScore(arr) {
	if (arr["KAvg"] == null) arr["KAvg"] = arr["KR Avg"];
	if (arr["PAvg"] == null) arr["PAvg"] = arr["PR Avg"];
	if (arr["KTD"] == null) arr["KTD"] = arr["KR TD"];
	if (arr["PTD"] == null) arr["PTD"] = arr["PR TD"];
	var score = arr["KAvg"]*2 + arr["KTD"]*6 + arr["PAvg"]*2 + arr["PTD"]*6;
	return score;
}
function kickingScore(arr) {
	if (arr["PuntYd"] == null) arr["PuntYd"] = arr["P Yds"];
	if (arr["Punts"] == null) arr["Punts"] = arr["P"];
	if (arr["Yds/Punt"] == null) arr["Yds/Punt"] = arr["Avg P Yds"];
	var score = (arr["Yds/Punt"]/10) * Math.pow(arr["PuntYd"],1/3) * (Math.pow(arr["Punts"],1/3));
	if (isNaN(score) == true) score = 0;
	
    var fg = arr["0-19"]*1 + arr["20-29"]*2 + arr["30-39"]*3 + arr["40-49"]*4 + arr["50+"]*5;
    fg += (2*arr["FGM"]-arr["FGA"])*3;
    fg = fg * (arr["FGM"]/arr["FGA"]);
	if (isNaN(fg) == true) fg = 0;

	var xp = (arr["XPM"]*2-(arr["XPA"]))*(arr["XPM"]/arr["XPA"]);
	if (isNaN(xp) == true) xp = 0;
	
	//console.log(score+" -- "+fg+" -- "+xp);
	return score+fg+xp;
}
function defenseScore(arr) {
	if (arr["DefTD"] == null) {
		arr["DefTD"] = arr["Int Ret TD"] + arr["Fum Ret TD"];
	}
	if (arr["TFL"] == null) {
		arr["TFL"] = 0;
	}
    if (arr["Hry"] == null) {
    	arr["Hry"] = arr["Hurry"];
    }
    if (arr["FumRec"] == null) {
    	arr["FumRec"] = arr["Fum Rec"];
    }
	                    
	var score = arr["Hry"] + arr["FFum"]*3;
	score += arr["DefTD"]*4 + arr["Sfty"]*3.5;
	
	var isdb = false;
	var d = document.getElementById("player_name");
	if (d != null) {
		if ((d.innerHTML.indexOf("(CB)") == 0) || 
				(d.innerHTML.indexOf("(FS)") == 0) ||
				(d.innerHTML.indexOf("(SS)") == 0)) {
			isdb = true;
		}
	}
	else {
		var n = arr["name"];
		if ((n.indexOf(">CB<") != -1) || (n.indexOf(">FS<") != -1) ||
				(n.indexOf(">SS<") != -1)) {
			isdb = true;
		}
	}
	
	if (isdb == true) {
		score += (arr["Tk"]-arr["MsTk"])/4 + arr["Sack"];
		score += (arr["FumRec"]+arr["PD"])*2;
		score += arr["TFL"]*2 + arr["Int"]*4;
	}
	else {
		score += arr["Tk"] - arr["MsTk"] + arr["Sack"]*2.5;
		score += arr["FumRec"] + arr["PD"];
		score += arr["TFL"]*1.5 + arr["Int"]*3;
	}
	return score;
}
function otherScore(arr) {
	if (arr["Fum"] == null) arr["Fum"] = 0;
	var score = arr["Pancakes"]*2 - arr["Fum"]*3;
	return score;
}

function insertScore(table, scoreFunction) {
	//console.log(table.innerHTML);	
	var c = table.rows[0].insertCell(table.rows[0].cells.length);
	c.setAttribute("align","right");
	c.innerHTML = "Score";

	for (var i=1; i<table.rows.length-1; i++) {
		var r = table.rows[i];

		var p = new Array();
		for (var j=0; j<table.rows[0].cells.length-1; j++) {
			//console.log(j+") "+table.rows[0].cells[j].innerHTML);
			p[table.rows[0].cells[j].innerHTML] = parseFloat(r.cells[j].innerHTML.replace(",",""));
		}
		var c = r.insertCell(r.cells.length);
		c.setAttribute("align","right");
		c.innerHTML = Math.round(scoreFunction(p));
	}
}

function sortEvent(evt) {
	sortTable(evt.target.parentNode.parentNode,evt.target.cellIndex);
	return true;
}

function sortTable(table, column) {
	var rows = table.rows;
	var viz = table.getAttribute("style");	
	var i=2;

	table.setAttribute("style","visibility: hidden;");
	for (var i=1; i<rows.length-1; i++) {		
		if (rows[i+1].getAttribute("class").match("nonalternating_color") != null) {
			i += 1;
			continue;
		}
		var swap = i;
		for (var j=i; j<rows.length-1; j++) {
			if (rows[j+1].getAttribute("class").match("nonalternating_color") != null) {
				break;
			}
				
			var lrow = rows.item(swap);
			var lcell = lrow.cells.item(column);
			var rrow = rows.item(j+1);
			var rcell = rrow.cells.item(column);
			
			var left = parseFloat(lcell.innerHTML);
			var right = parseFloat(rcell.innerHTML);
			
			if (isNaN(left) || isNaN(right)) {
				left = lcell.firstChild.innerHTML.toLowerCase();
				right = rcell.firstChild.innerHTML.toLowerCase();
				if (left == right) {
					left = lcell.lastChild.innerHTML.toLowerCase();
					right = rcell.lastChild.innerHTML.toLowerCase();
				}
				
				if (left > right) {
					swap = j+1;
				}
			}
			else {
				if (left < right) {
					swap = j+1;
				}
			}
		}
		if (swap != -1) {
			var r = table.rows.item(swap);
			table.deleteRow(swap);
			var newRow = table.insertRow(i);
			newRow.setAttribute("class",r.getAttribute("class"));
			for (var x=0; x<r.cells.length; x++) {
				var cell = newRow.insertCell(x);		
				cell.setAttribute("class",r.cells.item(x).getAttribute("class"));
				cell.setAttribute("align",r.cells.item(x).getAttribute("align"));
				cell.innerHTML = r.cells.item(x).innerHTML;
			}
		}
		var r = table.rows.item(i);
	}
	
	for (var i=1; i<table.rows.length; i++) {
		var r = table.rows.item(i);
		var attr = r.getAttribute("class");
		if (attr.indexOf("nonalternating_color") != -1) continue;
		attr = attr.slice(0,17) + ((i%2)+1) + attr.slice(18);
		r.setAttribute("class",attr);
	}
	
	table.setAttribute("style",viz);
}

