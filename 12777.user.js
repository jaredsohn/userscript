// ==UserScript==
// @name           Yahoo! Fantasy Hockey Stat Tracker
// @namespace      www.example.com
// @description    Provides stat tracking features for fantasy hockey
// @include        http://*hockey.fantasysports.yahoo.com/hockey/*/*
// ==/UserScript==
//
// Version 2.1.3.1
//
// Copyright 2008 Benjamin Gwin
// For the latest updates, check http://userscripts.org/scripts/show/12777
// This script is released under the Mozilla Public License 1.1
// http://www.mozilla.org/MPL/
//
// Much credit goes to RoboBruin who wrote the original baseball
// stat tracker
//

var SCRIPT_VERSION = "2.1.3.1";
var SCRIPT_SITE = "http://userscripts.org/scripts/show/12777";

//Global array of games
var g_games = Array();
//Global completion statistics
var g_completed = -1;
//Global stats that the league uses
var g_skater_stats;
var g_goalie_stats;
//whether we are on a matchup page
var g_h2h;
//whether the matchup page has been prepared
var g_prepared = 0;
//stat values for point leagues
var g_point_values = Array();

//feed/update image
var g_image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJFSURBVBgZBcHda5V1AADg5/d733Oc7tjOaNs5GC6KdrEwmpPRxG7spoKghOim7oK8y0MIEQRL+geGEIQ3UXQvSJ8IafZxUbjQhRDZoU60iYsSc9t5v87b84TsVe3mrBWpHoCICIAIACixYTUfOJM2Z62YO97TOULSIKaEQAyESAzEgISAgLpi48de87MLUqmezhGyhO4SCW7f4O81YiSJiCQIkbqmNcXMIjMXeilIGsQxDp8AnKDY5teL3PyU6h4CdY3Av7cYu58R0QghZWeT9fP0v2V7i8Y4j77As2c5sAwIFAXDgjInJxURAzub/PwxMZBGphZYeIWJWZ44xdo5bl4kK8kzioohUUREd4kXP+Kpd3nkee72+epNBleAxdfoLJBlDEuKkpxoBAkBjXGm53n8ZZ45S/shrr7P75eBo6eo9zAsKCqGRBEB/1zj89e5eo7tLRr7ePJtWg9wZZV7t2i2OPQcw5JiRE4UESN1ZPc2g0tceos/LtPYx9HTaPDNe8Dhl9gtyStyUiMIJDXLp2m0GHzN2gdMzdPq0F3k+pcc/4+x/UwepKzIiSDWTB/iwBLT8xw8xt07rJ8HHj7GbkX/B+DBxyhrciIQ2N2i2AG2fiPL+OsXoNVlWPDnDaC5l6qiJJWjLlHxxRs0JhhcIyvp/8SHJylKdiu++4Tr31NW7B8nkrwzp627d9nkHM0Wsea+GSY6tDvESEyY6TIxyZ4GSUp/nTubqyF7WrvZtaKrZ4QSQ+TIMUSJHCVypGhaHW448z+h1tLAgvKk7gAAAABJRU5ErkJggg==';

//Represents a game, including the game id and the players in the game
function Game(gameid) {
	this._gameid = gameid;
	this._players = Array();
}
Game.prototype.gameid = function(arg) { if (arguments.length) this._gameid = arg; else return this._gameid;};
Game.prototype.boxScoreLink = function() { 
	return "http://sports.yahoo.com/nhl/boxscore?gid=" + this._gameid;
};
Game.prototype.addPlayer = function(p) { this._players.push(p); };
Game.prototype.players = function() { return this._players; };
Game.prototype.reset = function() { 
	for (var i = 0; i < this._players.length; i++) this._players[i] = null;
	this._players = Array();
 };

//Base player object with id, name, position, and the tr element it belongs to
function Player(tr) {
	this._pid = 0; this._position = ''; this._row = tr; this._name = '';
	this._played = false; this._g = 0; this._a = 0; this._pm = 0; this._pim = 0;
	this._ppg = 0; this._ppa = 0; this._shg = 0; this._sha = 0; this._gwg = 0;
	this._sog = 0; this._toi = '-'; this._fow = 0; this._fol = 0; this._w = 0; this._sv = 0; this._gaa = '-';
	this._sa = 0; this._l = 0;
}
Player.prototype.pid = function(arg) { if (arguments.length) this._pid = arg; else return this._pid;};
Player.prototype.position = function(arg) { if (arguments.length) this._position = arg; else return this._position;};
Player.prototype.row = function() { return this._row; };
Player.prototype.name = function(arg) { if (arguments.length) this._name = arg; else return this._name;};
Player.prototype.played = function(arg) { if (arguments.length) this._played = arg; else return this._played;};
Player.prototype.g = function(arg) { if (arguments.length) this._g = arg; else return this._g;};
Player.prototype.a = function(arg) { if (arguments.length) this._a = arg; else return this._a;};
Player.prototype.p = function() { return parseInt(this._a) + parseInt(this._g);};
Player.prototype.pm = function(arg) { if (arguments.length) this._pm = arg; else return parseInt(this._pm);};
Player.prototype.pim = function(arg) { if (arguments.length) this._pim = arg; else return this._pim;};
Player.prototype.ppg = function(arg) { if (arguments.length) this._ppg = arg; else return this._ppg;};
Player.prototype.ppa = function(arg) { if (arguments.length) this._ppa = arg; else return this._ppa;};
Player.prototype.ppp = function() { return this._ppg + this._ppa;};
Player.prototype.shg = function(arg) { if (arguments.length) this._shg = arg; else return this._shg;};
Player.prototype.sha = function(arg) { if (arguments.length) this._sha = arg; else return this._sha;};
Player.prototype.shp = function() { return this._shg + this._sha;};
Player.prototype.fow = function(arg) { if (arguments.length) this._fow = arg; else return this._fow;};
Player.prototype.fol = function(arg) { if (arguments.length) this._fol = arg; else return this._fol;};
Player.prototype.gwg = function(arg) { 
	if (arguments.length) this._gwg = arg; 
	else return this._w > 0 ? this._gwg : 0;
};
Player.prototype.sog = function(arg) { if (arguments.length) this._sog = arg; else return this._sog;};
Player.prototype.shperc = function() { 
	return new Array(this._g, this._sog);
};
Player.prototype.w = function(arg) { if (arguments.length) this._w = arg; else return this._w;};
Player.prototype.l = function(arg) { if (arguments.length) this._l = arg; else return this._l;};
Player.prototype.sv = function(arg) { if (arguments.length) this._sv = arg; else return this._sv;};
Player.prototype.ga = function() { return this._sa - this._sv;};
Player.prototype.sa = function(arg) { if (arguments.length) this._sa = arg; else return this._sa;};
Player.prototype.svperc = function() {
	return new Array(this._sv, this._sa);
}
Player.prototype.percentPlayed = function() {
	var max = 3600;
	var parts = this._toi.split(":");
	var played = parseInt(parts[0]) * 60 + parseInt(parts[1]);
	return played / max;
}
Player.prototype.gaa = function() {
	return (this.ga() / this.percentPlayed()).toFixed(2);
}
Player.prototype.sho = function() { return this.ga() > 0 ? 0 : this.w() > 0 ? 1 : 0;};
Player.prototype.toi = function(arg) { if (arguments.length) this._toi = arg; else return this._toi;};
Player.prototype.getStat = function(stat) {
	stat = stat.toString();
	stat = stat.replace(/^\s+|\s+$/g, '');
	stat = stat.toUpperCase();
	switch (stat) {
		case "G": return this.g(); case "A": return this.a();
		case "P": return this.p(); case "+/-": return this.pm();
		case "PIM": return this.pim(); case "PPG": return this.ppg();
		case "PPA": return this.ppa(); case "PPP": return this.ppp();
		case "SHG": return this.shg(); case "SHA": return this.sha();
		case "SHP": return this.shp(); case "SOG": return this.sog();
		case "FOW": return this.fow(); case "FOL": return this.fol();
		case "SH%": return this.shperc(); case "GA": return this.ga();
		case "SA": return this.sa(); case "SV": return this.sv();
		case "SV%": return this.svperc(); case "SHO": return this.sho();
		case "TOI": return this.toi(); case "W": return this.w();
		case "GWG": return this.gwg(); case "GAA": /*return this.gaa();*/ return "-";
		case "GS": return 1; case "L": return this.l();
		case "FAN PTS": return this.fanPoints();
		default: return "-";
	}
}

//calculate the number of fan points a player received
Player.prototype.fanPoints = function() {
	var stats = this.position() == 'G' ? g_goalie_stats : g_skater_stats;
	var total = 0;
	//last stat is fan pts again...don't want an infinite loop
	for (var i = 0; i < stats.length - 1; i++) {
		var stat = stats[i];
		var points = g_point_values[stat] * this.getStat(stat);
		if (!isNaN(points)) total += points;
	}
	return total.toFixed(2);
}

//takes two integers and returns the ratio between them as x.xxx
function getFormattedRatio(n, m) {
	if (n != 0 && m != 0) {
			var perc = n / m;
		perc = perc.toFixed(3);
		if (perc == 1) return perc;
		str = new String(perc);
		return str.substring(1, str.length);
	}
	return '-';
}

//returns if an object is an array or not
function isArray(arr) {
	return arr.constructor == Array;
}

//Runs xpath on a node
function xpath(node, xpath) {
	return document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

//Main function to begin the stat retrieving process
function parseDocument() {
	if (g_completed >= 0) return;
	
	if (g_h2h && (g_prepared < 2)) {
		prepareMatchup();
		return;
	}
	
	var playerNodes = xpath(document, "//table[starts-with(@id, 'statTable')]/tbody/tr[starts-with(@class, 'odd')" +
		" or starts-with(@class, 'even')]");
	
	for (var i = 0; i < playerNodes.snapshotLength; i++) {
		var row = playerNodes.snapshotItem(i);
		parseRow(row);
	}
	
	if (g_games.length == 0) return;
	
	g_completed = 0;
	setProgress(0.04);
	for (var i = 0; i < g_games.length; i++) {
		fetchStats(g_games[i]);
	}

}

//Takes a row from a stat table and puts them into the global array of players
function parseRow(tr) {
	var p = new Player(tr);
	var cells = tr.getElementsByTagName('td');
	var position = xpath(tr, ".//td[@class='pos first']").snapshotItem(0).innerHTML;
	
	//dumb hack for benched/injured goalies
	var table = tr.parentNode.parentNode;
	var idNum = getId(table);
	if (!isSkaterTable(idNum)) position = 'G';
	
	p.position(position);
	var playerLink = xpath(tr, ".//td[@class='player']//a[@class='name']").snapshotItem(0);
	if (!playerLink) return;
	if (playerLink.tagName == "A") {
		var matches = /[0-9]+/.exec(playerLink.href);
		p.pid(matches[0]);
		p.name(playerLink.innerHTML);
	}
	var boxScoreLink = xpath(tr, ".//td[@class='gametime']").snapshotItem(0);
	if (!boxScoreLink) return;
	boxScoreLink = boxScoreLink.getElementsByTagName('a')[0];
	var gid = 0;
	if (boxScoreLink) {
		var matches = /[0-9]+/.exec(boxScoreLink.href);
		gid = matches[0];
		if (boxScoreLink.innerHTML.indexOf('W') >= 0)  {
			p.w(1);
		} else if (boxScoreLink.innerHTML.indexOf('L') >= 0) {
			p.l(1);
		}
	}
	if (gid == 0) return;
	var game = getGame(gid);
	game.addPlayer(p);
}

//Gets the game with a specified game id
function getGame(gid) {
	for (var i = 0; i < g_games.length; i++) {
		if (g_games[i].gameid() == gid) return g_games[i];
	}
	var g = new Game();
	g.gameid(gid);
	g_games.push(g);
	return g;
}

//Begins fetching stats for a single game
function fetchStats(game) {
	var url = game.boxScoreLink();
	GM_xmlhttpRequest({
		method:"GET",
		url: url,
		headers:{
	    	"User-Agent":"Mozilla/5.0",
	    	"Accept":"text/xml"
		},
		onload:function(response) {
			if (!(response.readyState == 4)) return;
			var div = document.createElement('div');
			div.innerHTML = response.responseText;
			parseBoxScore(div, game.players());
			game.reset();
		}
	});
}

//parses the box score and updates the players with their stats
function parseBoxScore(html, players) {
	//some ugly code for getting gwg
	var score = xpath(html, "//td[@class='yspsctnhdln']");
	if (!score.snapshotItem(0)) {
		boxScoreWasParsed(html);
		return;
	}
	score = score.snapshotItem(0).innerHTML;
	score = score.replace(/\n/g, "");
	var matches = /.*>(\w+).*(\d+).*>(\w+).*(\d+)/.exec(score);
	if (!matches) {
		boxScoreWasParsed(html);
		return;
	}
	var winner = (matches[2] > matches[4]) ? matches[1] : matches[3];
	var gwg = (matches[2] > matches[4]) ? parseInt(matches[4]) + 1 : parseInt(matches[2]) + 1;
	var goals = 0;
	
	//parse main stat table
	var nodes = xpath(html, "//tr[starts-with(@class, 'ysprow')]");
	for (var i = 0; i < nodes.snapshotLength; i++) {
		var row = nodes.snapshotItem(i);
		var cells = row.getElementsByTagName('td');
		var playerLink = cells[0].getElementsByTagName('a')[0];
		if (!playerLink) continue;
		var matches = /[0-9]+/.exec(playerLink.href)
		var pid = 0;
		if (matches) pid = matches[0];
		var p = null;
		for (j = 0; j < players.length; j++) {
			if (players[j].pid() == pid) {
				p = players[j];
				break;
			}
		}
		if (p == null) continue;
		p.played(true);
		if (p.position() != 'G') {
			p.toi(cells[1].innerHTML);
			p.g(cells[2].innerHTML);
			p.a(cells[3].innerHTML);
			p.pm(cells[4].innerHTML);
			p.sog(cells[5].innerHTML);
			p.pim(parseInt(cells[6].innerHTML));
		} else {
			p.sa(cells[1].innerHTML);
			p.sv(parseInt(cells[3].innerHTML));
		}
	}
	
	//look for powerplay/shorthanded goals and gwg
	//won't work for players with the same name but can't do anything about it
	nodes = xpath(html, "//table[contains(., 'Scoring Summary') and @class='yspwhitebg']/tbody/tr[not(@class)]/td");
	for (var i = 0; i < nodes.snapshotLength; i++) {
		var text = nodes.snapshotItem(i).innerHTML;
		if (text.match(winner)) {
			goals++;
			continue;
		} else if (text.indexOf('(') == -1) {
			continue;
		}
		var pp = 0;
		if (text.match('power play')) {
			pp = 1;
			text = text.replace('(power play)', '');
		} else if (text.match('shorthanded')) {
			pp = 2;
			text = text.replace('(shorthanded)', '');
		}
		text = text.replace(/&nbsp;/g, ' ');
		var parts = text.split('(');
		for (var j = 0; j < players.length; j++) {
			var p = players[j];
			if (parts[0].match(p.name())) {
				if (pp == 1) {
					p.ppg(p.ppg() + 1);
				} else if (pp == 2) {
					p.shg(p.shg() + 1);
				}
				if (goals == gwg) {
					p.gwg(1);
				}
			} else if (parts[1].match(p.name())) {
				if (pp == 1) {
					p.ppa(p.ppa() + 1);
				} else if (pp == 2) {
					p.sha(p.sha() + 1);
				}
			}
		}
	}
	
	for (var i = 0; i < players.length; i++) {
		updateRow(players[i]);
	}

	boxScoreWasParsed(html);
	
}

//updates a players row with its stats
function updateRow(p) {
	if (!p.played()) return;
	animate(p.row(), 0, 1, 0.03, 'opacity', 25, '');
	var stats = (p.position() == 'G') ? g_goalie_stats : g_skater_stats;
	//non stat columns
	var cells = p.row().getElementsByTagName('td');
	var stat = 0;
	for (var i = 0; i < cells.length; i++) {
		var cell = cells[i];
		var class = cell.getAttribute('class');
		if (!(class == 'stat' || class == 'stat last' || class == 'pts last')) continue;
		var obj = p.getStat(stats[stat++]);
		var val = obj;
		if (val == '-') continue;
		if (isArray(obj)) {
			var n1 = obj[0];
			var n2 = obj[1];
			val = getFormattedRatio(n1, n2);
			cells[i].setAttribute('data1', n1);
			cells[i].setAttribute('data2', n2);
		}
		cells[i].innerHTML = val;
	}
	p.row().setAttribute('updated', 'true');
}

//Adds the show stats button and prepares the progress bar
function setupPage() {
	if (g_h2h) {
		var div = document.getElementById('matchup-wall');
		var newDiv = document.createElement('div');
		newDiv.setAttribute('class', 'moduletabs navlist');
		var ul = document.createElement('ul');
		newDiv.appendChild(ul);
		div.parentNode.insertBefore(newDiv, div.nextSibling);
		GM_addStyle('div.sumstats table{margin-bottom:0;}div.sumstats div.sum{margin:0 10px 10px;border-bottom:1px solid #ABAB9E;'
			+ 'width:auto;background:#D8D9D5;}div.sumstats div.sum ul{float:right;margin:0;padding:0;list-style-type:none;}'
			+ 'div.editable div.sum{top:-1px;position:relative;border-top:1px solid #ABAB9E;}'
			+ 'div.sumstats div.sum li{float:left;width:36px;padding:5px 2px;font:bold 77% Verdana;text-align:right;}div.sumstats div.sum li.last{width:30px;*width:31px;}' 
			+ 'div.sumstats div.ptstotal li.last{width:42px;*width:43px;}div.sumstats div.sum em{float:left;padding:5px 2px;font:bold 77% Verdana;}');
	}
	var node = xpath(document, "//div[@class='moduletabs navlist']/ul");
	var list = node.snapshotItem(0);
	var li = document.createElement('li');
	li.id = 'showStatsLi';
	li.style.position = 'absolute';
	li.style.right = '0';
	var a = document.createElement('a');
	a.href = "javascript:void(0)";
	a.addEventListener('click', parseDocument, true);
	a.innerHTML = "<em>Show Stats</em>";
	li.appendChild(a);
	list.appendChild(li);
	
	var progress = document.createElement('div');
	progress.setAttribute('style', 'position: absolute; bottom: 0; height: 3px;' +
		'padding: 0; margin-bottom: -2px; width: 99%; ');
	progress.style.display = 'none';
	progress.id = "progressDiv";
	var bar = document.createElement('div');
	bar.innerHTML = '&nbsp;';
	bar.id = 'progressBar';
	bar.setAttribute('style', 'background-color: #00ff00; width: 0%; height: 3px;');
	progress.appendChild(bar);
	li.appendChild(progress);
	
	var tables = xpath(document, '//table[starts-with(@id, "statTable")]');
	for (var i = 0; i < tables.snapshotLength; i++) {
		var table = tables.snapshotItem(i);
		var id = getId(table);
		setupTable(table, isSkaterTable(id));
	}
	if ((GM_getValue('autorun') == 1) && (/\/hockey\/\d+\/\d{1,2}$/.test(window.location.href))) {
		parseDocument();
	}
	
	checkUpdates();
}

//sets up the stat table if the stat tracker ad is present and/or adds extra columns
//also adds total rows for H2H
function setupTable(table, skaters) {
	stats = skaters ? g_skater_stats : g_goalie_stats;
	var nodes = xpath(table, ".//thead/tr/th[@class = 'stat' or @class = 'stat last' or @class = 'pts last']");
	var count = nodes.snapshotLength;
	for (var i = count; i < stats.length; i++) {
		addColumn(table, stats[i]);
	}
	if (g_h2h) {
		//the style of this stuff is mainly set by some ugly stuff in setupPage
		var div = document.createElement('div');
		div.className = 'sum';
		div.innerHTML = "<em>Todays Totals</em>";
		div.style.height = '24px';
		div.style.marginLeft = '0';
		div.style.width = '100%';
		var ul = document.createElement('ul');
		for (var i = 0; i < stats.length; i++) {
			var li = document.createElement('li');
			li.innerHTML = '-';
			ul.appendChild(li);
		}
		div.appendChild(ul);
		var wrap = document.createElement('div');
		wrap.id = table.id + '-wrap';
		wrap.className = 'tablewrap sumstats editable';
		table.parentNode.insertBefore(wrap, table);
		wrap.appendChild(table);
		wrap.appendChild(div);
	}
}

//Sets the progress bar's completion. Takes a number 0-1.00
function setProgress(prog) {
	var bar = document.getElementById('progressBar');
	if (prog < 0) {
		bar.parentNode.style.display = 'none';
		bar.style.width = '0%';
		return;
	}
	bar.parentNode.style.display = 'block';
	bar.style.opacity = 1;
	var start = parseInt(bar.style.width);
	var stop = prog * 100;
	animate(bar, start, stop, 5, 'width', 15, '%', null);
	if (prog >= 1) {
		window.setTimeout(function() { animate(bar, 1, 0, 0.05, 'opacity', 15, '') }, 1000);
		window.setTimeout(function() { animate(bar, 100, 0, 5 , 'width', 15, '%') }, 1000);
		g_completed = -1;
		documentWasParsed();
	}
}

//called when a game is finished parsing
function boxScoreWasParsed(div) {
	div = null;
	setProgress(++g_completed / g_games.length);
}

function getId(table) {
	return parseInt(table.id.charAt(table.id.length - 1));
}

//called when parsing is complete
//tabulate total stats
function documentWasParsed() {
	removeStatTrackerAd();
	var tables = xpath(document, "//table[starts-with(@id, 'statTable')]");
	for (var i = 0; i < tables.snapshotLength; i++) {
		var table = tables.snapshotItem(i);
		var list = table.nextSibling;
		if (!list) continue;
		var totals = Array();
		var rows = table.getElementsByTagName('tr');
		for (var j = 2; j < rows.length; j++) {
			var row = rows[j];
			var pos = row.firstChild.innerHTML;
			if ((pos == 'BN') || (pos == 'IR') || (row.getAttribute('updated') != 'true')) continue;
			var cells = xpath(row, "td[@class = 'stat' or @class = 'stat last' or @class = 'pts last']");
			for (var k = 0; k < cells.snapshotLength; k++) {
				var cell = cells.snapshotItem(k);
				var val;
				if (cell.getAttribute('data1')) {
					val = new Array(parseFloat(cell.getAttribute('data1')), parseFloat(cell.getAttribute('data2')));
				} else {
					val = parseFloat(cell.textContent);
				}
				if (typeof(totals[k]) == 'undefined') totals[k] = (isArray(val) ? new Array(0, 0) : 0);
				if (isArray(val)) {
					totals[k][0] += val[0];
					totals[k][1] += val[1];
				} else {
					if (!isNaN(val)) totals[k] += val;
				}
			}
		}
		var items = list.getElementsByTagName('li');
		for (var j = 0; j < items.length; j++) {
			if (typeof totals[j] != "undefined") {
				items[j].innerHTML = (isArray(totals[j]) ? getFormattedRatio(totals[j][0], totals[j][1]) : totals[j]);
			}
		}
	}
}

//get a doucment that contains stat headers
//either the current page, or a different page if the
//stat tracker ad is displayed
function getStats() {
	var stupidAd = document.getElementById('statspromo');
	if (!stupidAd && !g_h2h) {
		parseStats(document);
		return;
	} else {
		removeStatTrackerAd();
		var stupidAdCells = xpath(document, '//*[@class = "statspromo stat last"]');
		for (var i = 0; i < stupidAdCells.snapshotLength; i++) {
			var cell = stupidAdCells.snapshotItem(i);
			cell.parentNode.removeChild(cell);
		}
	}
	
	var url = window.location.href;
	//hack to make sure we are in the future so that stat headers show up
	url = url.replace(/\/(\d+)\/.*/, "/$1/1?date=2020-11-02");
	
	GM_xmlhttpRequest({
		method:"GET",
		url: url,
		headers:{
	    	"User-Agent":"Mozilla/5.0",
	    	"Accept":"text/xml"
		},
		onload:function(response) {
			if (!(response.readyState == 4)) return;
			var div = document.createElement('div');
			div.innerHTML = response.responseText;
			parseStats(div);
		}
	});
}

//reads stat columns and gets the goalie and player stats
//then, call to have the page setup
function parseStats(doc) {
	g_skater_stats = Array();
	var nodes = xpath(doc, "//table[@id='statTable0']/*/tr[@class='headerRow1']/th[@class = 'stat' or @class = 'stat last' or @class = 'pts last']/div");
	for (var i = 0; i < nodes.snapshotLength; i++) {
		g_skater_stats.push(nodes.snapshotItem(i).innerHTML);
	}
	
	g_goalie_stats = Array();
	var nodes = xpath(doc, "//table[@id='statTable1']/*/tr[@class='headerRow1']/th[@class = 'stat' or @class = 'stat last' or @class = 'pts last']/div");
	for (var i = 0; i < nodes.snapshotLength; i++) {
		g_goalie_stats.push(nodes.snapshotItem(i).innerHTML);
	}
	
	var custom = GM_getValue('stats');
	if ((typeof(custom) != "undefined") && custom.length) {
		var sections = custom.split(';');
		var skaterStats = sections[0].split(' ');
		for (var i in skaterStats) {
			if (skaterStats[i].length) {
				g_skater_stats.push(skaterStats[i]);
				addTotalSpot(true);
			}
		}
		if (sections[1]) {
			var goalieStats = sections[1].split(' ');
			for (var i in goalieStats) {
				if (goalieStats[i].length) {
					g_goalie_stats.push(goalieStats[i]);
					addTotalSpot(false);
				}
			}
		}
		if (g_point_values.length) {
			g_skater_stats.push("Fan Pts");
			g_goalie_stats.push("Fan Pts");
		}
	}
	setupPage();
}

//adds a column to a stat table with a title of header
function addColumn(table, header) {
	var rows = table.getElementsByTagName('tr');
	var cells = rows[0].getElementsByTagName('th');
	var cell = cells[cells.length - 1];
	cell.setAttribute('colspan', parseInt(cell.getAttribute('colspan')) + 1);
	
	for (var i = 1; i < rows.length; i++) {
		var elem;
		var cells;
		if (i == 1) {
			elem = document.createElement('th');
			elem.innerHTML = header;
			cells = rows[i].getElementsByTagName('th');
		} else {
		 	elem = document.createElement('td');
			elem.innerHTML = '-';
			cells = rows[i].getElementsByTagName('td');
		}
		if (cells[cells.length - 1].getAttribute('class') != 'gametime') {
			cells[cells.length - 1].setAttribute('class', 'stat');
		}
		elem.setAttribute('class', 'stat last');
		rows[i].appendChild(elem);
		
	}
}

//adds an entry to the total rows
//skaters: whether it is a skater or goalie stat
function addTotalSpot(skaters) {
	//todo h2h
	var id = skaters ? 'statTable0' : 'statTable1';
	var list = document.getElementById(id).parentNode.getElementsByTagName('ul')[0];
	var li = document.createElement('li');
	li.innerHTML = '-';
	li.setAttribute('class', 'last');
	var elems = list.getElementsByTagName('li');
	elems[elems.length - 1].setAttribute('class', '');
	list.appendChild(li);
}

//animates a css attribute
//params: element to animate, start val, end val, amount to increment by,
//which attribute to animate, time for each step in ms, anything to append to style,
function animate(elem, start, stop, incr, attr, time, app) {
	var steps = Math.abs(stop - start) / incr;
	var j = start;
	if (start < stop) {
		for (var i = 0; i <= steps; i++) {
			window.setTimeout(function() {
				j += incr; 
				if (j > stop) j = stop;
				var newVal = j + app;
				elem.style[attr] = newVal;
			}, i * time);
		}
	} else if (start > stop) {
		for (var i = 0; i <= steps; i++) {
			window.setTimeout(function() {
				j -= incr; 
				if (j < stop) j = stop;
				var newVal = j + app;
				elem.style[attr] = newVal;
			}, i * time);
		}
	}
}

function removeStatTrackerAd() {
	var ad = document.getElementById('statspromo');
	if (ad) {
		ad.parentNode.removeChild(ad);
	}
}

//returns todays date as dd-mm-yyyy
function getFormattedDate() {
	var d = new Date();
	return d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
}

function addUpdateButton() {
	var img = document.createElement('img');
	img.src = g_image;
	var a = document.createElement('a');
	a.href = SCRIPT_SITE;
	a.title = "A new version of this script is available";
	a.style.position = "absolute";
	a.style.left = '-20px';
	a.style.top = '3px';
	a.appendChild(img);
	var showStats = document.getElementById('showStatsLi');
	if (showStats) {
		showStats.appendChild(a);
	}
}

//Takes an id number and returns if it is a skater table or not
function isSkaterTable(id) {
	if (g_h2h) {
		return id <= 2;
	} else {
		return id == 0;
	}
}

//Prepares a matchup page by adding hidden box links to each table
function prepareMatchup() {
	var teams = xpath(document, "//table[@id='matchup-summary-table']/tbody/tr/td[1]/a");
	for (var i = 0; i < teams.snapshotLength; i++) {
		var url = teams.snapshotItem(i).href;
		GM_xmlhttpRequest({method:"GET", url: url, headers:{"User-Agent":"Mozilla/5.0", "Accept":"text/xml"},
			onload:function(response) {
				if (response.readyState == 4) {
					var div = document.createElement('div');
					div.innerHTML = response.responseText;
					addMatchupLinks(div);
				}
			}
		});
	}
}

function addMatchupLinks(html) {
	var xp = ".//table[starts-with(@id, 'statTable')]/tbody/tr[starts-with(@class, 'odd')" +
		" or starts-with(@class, 'even')]";
	var allRows = xpath(document, xp);
	for (var i = 0; i < allRows.snapshotLength; i++) {
		clearRow(allRows.snapshotItem(i));
	}
	var playerNodes = xpath(html, xp);
	for (var i = 0; i < playerNodes.snapshotLength; i++) {
		var row = playerNodes.snapshotItem(i);
		var cells = xpath(row, ".//td[@class='player' or @class='gametime']");
		var name = cells.snapshotItem(0).textContent;
		name = name.replace(/(.*)\(.*/, "$1");
		name = name.replace(/^\s+|\s+$/g, '');
		var link = cells.snapshotItem(1).innerHTML;
		if (!/<a/.test(link)) continue;
		var row = xpath(document, Array('//table[contains(@id, "statTable")]//tr[contains(., "', name, '")]').join("")).snapshotItem(0);
		var td = document.createElement('td');
		td.setAttribute('class', 'gametime');
		td.style.display = 'none';
		td.innerHTML = link;
		row.appendChild(td);
	}
	if (++g_prepared >= 2) parseDocument();
}

//replaces all stats with dashes
function clearRow(row) {
	var cells = xpath(row, ".//td[starts-with(@class, 'stat')]");
	for (var i = 0; i < cells.snapshotLength; i++) {
		cells.snapshotItem(i).innerHTML = "-";
	}
}

function checkUpdates() {
	var lastChecked = GM_getValue('updateCheck');
	if ((lastChecked != getFormattedDate())) {
		GM_xmlhttpRequest({
			method:"GET",
			url: SCRIPT_SITE,
			headers:{
		    	"User-Agent":"Mozilla/5.0",
		    	"Accept":"text/xml"
			},
			onload:function(response) {
				if (!(response.readyState == 4)) return;
				var version = /.*>Script version (.*?)<.*/.exec(response.responseText);
				if (version) {
					version = version[1];
					if (version != SCRIPT_VERSION) {
						addUpdateButton();
					}
				}
				GM_setValue('updateCheck', getFormattedDate());
			}
		});
	}
}

// Gets and sets the fan points for this league
// Should only retrieve them once, and load them from prefs otherwise
function setFanPoints() {
	var url = window.location.href;
	var settingsUrl = url.replace(/(http:\/\/hockey.fantasysports.yahoo.com\/hockey\/\d+)\/.*/, '$1/settings');
	var matches = url.match(/hockey\/(\d+)\//);
	var key = "customPoints_" + matches[1];
	if (GM_getValue(key)) {
		var points = GM_getValue(key);
		g_point_values = arrayFromString(points);
		return;
	}
	GM_xmlhttpRequest({
		method:"GET",
		url: settingsUrl,
		headers:{
	    	"User-Agent":"Mozilla/5.0",
	    	"Accept":"text/xml"
		},
		onload:function(response) {
			if (!(response.readyState == 4)) return;
			var div = document.createElement('div');
			div.innerHTML = response.responseText;
			var nodes = xpath(div, "//table[@class = 'teamtable'][2]/tbody/tr[position() > 0]");
			var str = "";
			for (var i = 0; i < nodes.snapshotLength; i++) {
				var row = nodes.snapshotItem(i);
				var cells = row.getElementsByTagName('td');
				var stat = cells[0].textContent;
				var val = parseFloat(cells[1].textContent);
				g_point_values[stat] = val;
				str += stat + ":" + val + ",";
			}
			str = str.substring(0, str.length - 2);
			GM_setValue(key, str);
		}
	});
}

function arrayFromString(str) {
	var arr = Object();
	var parts = str.split(',');
	for (var i = 0; i < parts.length; i++) {
		var parts2 = parts[i].split(':');
		arr[parts2[0]] = parts2[1];
	}
	return arr;
}

function init() {
	//Find out if this is a matchup page for h2h
	g_h2h = /\/matchup\?/.test(window.location.href);
	
	//should we run?
	var nodes = xpath(document, "//a[@title='Current Date']");
	if ((nodes.snapshotLength == 0) && !g_h2h) return;
	
	//Check if we are in a fan league
	//and retrieve fan points if we are
	if (/Fan Pts/.test(document.body.innerHTML)) {
		setFanPoints();
	}
	
	//get the stat headers
	getStats();
	
	GM_registerMenuCommand("Add Stats", function() {
		var str = prompt("You can enter extra stats here separated by a space. Separate skater "
		+ "and goalie stats by a semi colon. e.g. 'PPP SOG;GA SA'", GM_getValue('stats'));
		if (str == null) str = "";
		GM_setValue('stats', str);
	});
	GM_registerMenuCommand("Enable/Disable Autorun", function() {
		var val = GM_getValue('autorun');
		var str;
		if (val == 1) {
			str = 'disabled';
			GM_setValue('autorun', '0');
		} else {
			str = 'enabled';
			GM_setValue('autorun', '1');
		}
		alert('Autorun ' + str);
	});
}

/**
 Things start here
 */
init();

/* Version History
 * 1.2.1 - Oct. 25, 2007 - Last change to version 1.x
 * 2.0 - Oct. 6, 2008 - Version 2.0 of the script produced
 *						-complete overhaul of GUI
 *						-each game link is only fetched once instead of once for each player
 *						-I actually rewrote everything, hopefully things are more efficient
 * 2.0.1 - Oct. 29, 2008 - Fixed bug with points being added as strings
 * 2.0.2 - Oct. 30, 2008 - Removed time checking because of time zone troubles...
 * 2.0.3 - Oct. 30, 2008 - Fixed bug with GWG
 * 2.0.4 - Oct. 30, 2008 - Tried to stop bug with stat tracker ad remaining
 * 2.0.5 - Nov. 3, 2008 - Tried to fix bug where stat headers are not being retrieved right
 * 2.0.6 - Nov. 21, 2008 - Added an auto run option and added a version checker
 * 2.0.6.1 - Nov. 21, 2008 - Removed nonfunctional gaa display
 * 2.1 - Nov. 22, 2008 - Finished up some basic H2H functionality
 * 2.1.0.1 - Nov. 23, 2008 - Fixed stupid bug with empty players
 * 2.1.0.2 - Nov. 23, 2008 - Moved the update check to compensate for slow computers
 * 2.1.0.3 - Nov. 23, 2008 - Fixed a poor feature
 * 2.1.1 - Nov. 23, 2008 - Made the H2H pages a bit more useful
 * 2.1.2 - Dec. 19, 2008 - Changed H2H implementation, implemented totals for SV% etc.
 * 2.1.2.1 - Dec. 20, 2008 - Fixed doing H2H with players with apostrophes in their name
 * 2.1.3 - Mar. 28, 2009 - Added functionality for point leagues
 * 2.1.3.1 - Mar. 28, 2009 - Fixed the way fantasy points was done
 * ==================================
 * TODO:
 * - Update score for H2H
 * - Save stats for leagues so that they don't need to be compiled every time
 * - Find real box scores that don't suck
 * - ??? fix bugs that will inevitably pop up
 * - even more sweet superfluous visual effects
 */