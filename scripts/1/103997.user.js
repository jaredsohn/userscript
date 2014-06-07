// ==UserScript==
// @name           Cumulative Team Results
// @namespace      pbr/trb
// @include        http://goallineblitz.com/game/team.pl?*team_id=*
// @include        http://glb.warriorgeneral.com/game/team.pl?*team_id=*
// @copyright      2011, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        13.12.29
// ==/UserScript==

var blowout = 55;
var maxLeaders = 10;
var gamelinks = [ ];

window.setTimeout(function() {
	boxSetup();
}, 3000);

var teamPageName = null;
var teamPageId = parseInt(document.location.toString().split("team_id=")[1]);

var earliestSeason = null;
var currentSeason = null;
var useAllGames = false;

var gameTotals = new Array();
var gameHistory = new Array();

function getSeasons() {
	var inp = document.getElementById("seasonsTRB");
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
	var btn = document.getElementById("rbtbutton");
	btn.disabled = true;

	useAllGames = document.getElementById("allGamesTeam").checked;

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
	document.getElementById("rbtbutton").value = data.length+" seasons left";

	var div = document.createElement("div");
	div.innerHTML = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");

	var season = parseInt(address.split("season=")[1]);
	gameTotals[season] = new Array();

	var count = 0;
	var links = div.getElementsByTagName("a");
	for (var i=0; i<links.length; i++) {
		var a = links[i];
		if (a.href.toString().indexOf("game.pl?game_id=") != -1) {
			gamelinks.push(a.href.toString());
			count++;
		
			var obj = new Object();
			obj.opp = links[i-1].innerHTML;
			obj.oppid = parseInt(links[i-1].href.split("=")[1]);
			obj.result = links[i].innerHTML;
			obj.type = "n";

			var b = a.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling.innerHTML;
			if (b.indexOf("Playoff") != -1) obj.type = "p";
			else if (b.indexOf("Scrimmage") != -1) obj.type = "s";

			var b = a.parentNode.parentNode.innerHTML;
			if (b.indexOf(" (R)</b>") != -1) obj.type = "r";
			else if (b.indexOf(" (T)</b>") != -1) obj.type = "t";

			gameTotals[season].push(obj);
			if (gameHistory.indexOf(parseInt(obj.oppid)) == -1) {
				gameHistory.push(parseInt(obj.oppid));
			}
		}
	}
	if (data.length > 0) {
		console.log(data.length+": "+data[0]);
		getInetPage(data[0], getGameLinks, data.slice(1));
	}
	else {
		console.log(gamelinks.length+" games requested");
		document.getElementById("rbtbutton").value = "Calculating Seasons. This might take a while.";
		console.log("calculating seasons");
		seasonTotals();
		document.getElementById("rbtbutton").value = "Calculating Teams. This might take a while.";
		console.log("calculating teams");
		historicalTotals();
		document.getElementById("rbtbutton").value = "Done.";
	}
}

function createRecordTBody(title) {
	var tbody = document.createElement("tbody");

	var hrow = document.createElement("tr");
	hrow.setAttribute("class", "nonalternating_color");
	var head = ["","Overall","Playoff","<"+1*blowout,"<"+2*blowout,"<"+3*blowout,">"+3*blowout,"Ranked","Tourn.","Scrim."];

	for (var i=0; i<head.length; i++) {
		var h = head[i];
		var th = document.createElement("th");
		if (h != "") {
			th.setAttribute("style","text-align: center");
			th.colSpan = 3;
		}
		else {
			th.setAttribute("style","text-align: center");
			th.colSpan = 1;
		}
		th.innerHTML = h;
		hrow.appendChild(th);
	}
	tbody.appendChild(hrow);

	var hrow = document.createElement("tr");
	hrow.setAttribute("class", "nonalternating_color2");
	var h2 = [title];
	for (var i=1; i<head.length; i++) {
		h2.push("W");
		h2.push("L");
		h2.push("T");
	}

	for (var i=0; i<h2.length; i++) {
		var h = h2[i];
		var th = document.createElement("th");
		if (h == title) {
			th.setAttribute("style","color: black; text-align: left");
			th.colSpan = 1;
		}
		else {
			th.setAttribute("style","color: black; text-align: right");
		}
		th.innerHTML = h;
		hrow.appendChild(th);
	}
	tbody.appendChild(hrow);

	return tbody;
}

function historicalTotals() {
	var table = document.createElement("table");
	table.setAttribute("class","bscTable");
	table.cellSpacing = "0";
	table.cellPadding = "0";
	table.style.marginBottom = "0px";
	table.style.width = "960px";

	var tbody = createRecordTBody("Opponent");

	for (var z=0; z<gameHistory.length; z++) {
		var id = gameHistory[z];
		var opp = null;

		var record = [0,0,0];
		var playoff = [0,0,0];
		var scrimmage = [0,0,0];
		var ranked = [0,0,0];
		var tourn = [0,0,0];
		var spreads = new Array();
		for (var s=0; s<gameTotals.length; s++) {
			if (gameTotals[s] != null) {
				for (var y=0; y<gameTotals[s].length; y++) {
					var g = gameTotals[s][y];
					if (g.oppid != id) continue;
					opp = g.opp;

					var res;
					if (g.result.indexOf("W") != -1) {
						res = 0;
					}
					else if (g.result.indexOf("L") != -1) {
						res = 1;
					}
					else if (g.result.indexOf("T") != -1) {
						res = 2;
					}

					if ((useAllGames == true) || ((g.type == "n") || (g.type == "p"))) {
						record[res]++;

						var s1 = parseInt(g.result.split(" ")[1].split("-")[0]);
						var s2 = parseInt(g.result.split(" ")[1].split("-")[1]);
						var spread = Math.max(s1,s2) - Math.min(s1,s2);
						if (spreads[Math.min(Math.floor(spread/blowout),3)] == null) {
							spreads[Math.min(Math.floor(spread/blowout),3)] = [0,0,0];
						}
						spreads[Math.min(Math.floor(spread/blowout),3)][res]++;
					}

					if (g.type == "p") playoff[res]++;
					if (g.type == "s") scrimmage[res]++;
					if (g.type == "r") ranked[res]++;
					if (g.type == "t") tourn[res]++;
				}
			}
		}

		var href = "/game/team.pl?team_id="+id;
		var str = "<tr class='alternating_color"+((id%2)+1)+"'><td><a href='"+href+"'>"+opp+"</a></td>";

		for (var i=0; i<3; i++) {
			str += "<td style='text-align:right'>"+record[i]+"</td>";
		}
		for (var i=0; i<3; i++) {
			str += "<td style='text-align:right'>"+playoff[i]+"</td>";
		}

		for (var i=0; i<4; i++) {
			for (var j=0; j<3; j++) {
				if ((spreads[i] == null) || (spreads[i][j] == null)) {
					str += "<td style='text-align:right'>0</td>";
				}
				else {
					str += "<td style='text-align:right'>"+spreads[i][j]+"</td>";
				}
			}
		}

		for (var i=0; i<3; i++) {
			str += "<td style='text-align:right'>"+ranked[i]+"</td>";
		}
		for (var i=0; i<3; i++) {
			str += "<td style='text-align:right'>"+tourn[i]+"</td>";
		}
		for (var i=0; i<3; i++) {
			str += "<td style='text-align:right'>"+scrimmage[i]+"</td>";
		}

		str += "</tr>";
		tbody.innerHTML += str;
	}

	table.appendChild(tbody);

	for (var i=2; i<table.rows.length-1; i++) {
		for (var j=i+1; j<table.rows.length; j++) {
			var r1w = parseInt(table.rows[i].cells[1].innerHTML);
			var r1l = parseInt(table.rows[i].cells[2].innerHTML);
			var r1t = parseInt(table.rows[i].cells[3].innerHTML);
			var r2w = parseInt(table.rows[j].cells[1].innerHTML);
			var r2l = parseInt(table.rows[j].cells[2].innerHTML);
			var r2t = parseInt(table.rows[j].cells[3].innerHTML);
		
			if ((r2w+r2l+r2t) > (r1w+r1l+r1t)) {
				table.insertRow(i);
				table.rows[i].innerHTML = table.rows[j+1].innerHTML;
				var r = table.deleteRow(j+1);
			}
			else if (((r2w+r2l+r2t) == (r1w+r1l+r1t)) && (r2l < r1l)) {
				table.insertRow(i);
				table.rows[i].innerHTML = table.rows[j+1].innerHTML;
				var r = table.deleteRow(j+1);
			}
			table.rows[i].setAttribute("class","alternating_color"+((i%2)+1));
		}
	}
	var div = document.createElement("div");
	div.appendChild(table);
	document.getElementById("footer").parentNode.appendChild(div);
}

function seasonTotals() {
	var table = document.createElement("table");
	table.setAttribute("class","bscTable");
	table.cellSpacing = "0";
	table.cellPadding = "0";
	table.style.marginBottom = "0px";
	table.style.width = "960px";

	var tbody = createRecordTBody("Season");

	var totals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	for (var s=0; s<gameTotals.length; s++) {
		var record = [0,0,0];
		var playoff = [0,0,0];
		var scrimmage = [0,0,0];
		var ranked = [0,0,0];
		var tourn = [0,0,0];
		var spreads = new Array();

		if (gameTotals[s] != null) {
			var str = "<tr class='alternating_color"+((s%2)+1)+"'>";
			str += "<td>"+s+"</td>";
			for (var z=0; z<gameTotals[s].length; z++) {
				var g = gameTotals[s][z];
				var res;
				if (g.result.indexOf("W") != -1) {
					res = 0;
				}
				else if (g.result.indexOf("L") != -1) {
					res = 1;
				}
				else if (g.result.indexOf("T") != -1) {
					res = 2;
				}
				if ((useAllGames == true) || ((g.type == "n") || (g.type == "p"))) {
					record[res]++;

					var s1 = parseInt(g.result.split(" ")[1].split("-")[0]);
					var s2 = parseInt(g.result.split(" ")[1].split("-")[1]);
					var spread = Math.max(s1,s2) - Math.min(s1,s2);
					if (spreads[Math.min(Math.floor(spread/blowout),3)] == null) {
						spreads[Math.min(Math.floor(spread/blowout),3)] = [0,0,0];
					}
					spreads[Math.min(Math.floor(spread/blowout),3)][res]++;
				}

				if (g.type == "p") playoff[res]++;
				if (g.type == "s") scrimmage[res]++;
				if (g.type == "r") ranked[res]++;
				if (g.type == "t") tourn[res]++;
			}

			for (var i=0; i<3; i++) {
				str += "<td style='text-align:right'>"+record[i]+"</td>";
				totals[i] += record[i];
			}
			for (var i=0; i<3; i++) {
				str += "<td style='text-align:right'>"+playoff[i]+"</td>";
				totals[i+3] += playoff[i];
			}
			for (var i=0; i<4; i++) {
				for (var j=0; j<3; j++) {
					if ((spreads[i] == null) || (spreads[i][j] == null)) {
						str += "<td style='text-align:right'>0</td>";
					}
					else {
						str += "<td style='text-align:right'>"+spreads[i][j]+"</td>";
						totals[3+3+i*3+j] += spreads[i][j];
					}
				}
			}

			for (var i=0; i<3; i++) {
				str += "<td style='text-align:right'>"+ranked[i]+"</td>";
				totals[i+18] += ranked[i];
			}
			for (var i=0; i<3; i++) {
				str += "<td style='text-align:right'>"+tourn[i]+"</td>";
				totals[i+21] += tourn[i];
			}
			for (var i=0; i<3; i++) {
				str += "<td style='text-align:right'>"+scrimmage[i]+"</td>";
				totals[i+24] += scrimmage[i];
			}
			str += "</tr>";

			tbody.innerHTML += str;
		}
	}

	var str = "<tr class='alternating_color"+((s%2)+1)+"'><td>Total</td>";
	for (var i=0; i<totals.length; i++) {
		str += "<td style='text-align:right'>"+totals[i]+"</td>";	
	}
	str += "</tr>";
	tbody.innerHTML += str;

	table.appendChild(tbody);

	var div = document.createElement("div");
	div.appendChild(table);
	document.getElementById("footer").parentNode.appendChild(div);
}

function boxSetup() {
    var div = document.createElement("div");
	div.style.clear = "both";

    var button = document.createElement("input");
    button.setAttribute("value","Collect Team History");
    button.setAttribute("type","button");
    button.setAttribute("id","rbtbutton");
    button.addEventListener("click",mainHistorical,false);
    div.appendChild(button);
	
    var checkBox = document.createElement("input");
    checkBox.setAttribute("type","checkbox");
    checkBox.setAttribute("id","allGamesTeam");
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
    textBox.setAttribute("id","seasonsTRB");
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

function getInetPage(address, func, data) {
    var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onload = function() {
		if (this.status != 200) {
			inetErrors++;
			func(address, this, data);
		}
		else {
			func(address, this, data);
		}
	};

	req.send(null);
	return req;
}

