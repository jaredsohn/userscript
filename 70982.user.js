// ==UserScript==
// @name           GLB Roster Enhancements A_S
// @namespace      Bogleg
// @description    Enhances GLB Roster page
// @version        1.9.0
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var players = [];
var tables = [];
var agentCache = {};
var loadedAvatars = false;
var loadedPlayers = false;
var loadedDepth = false;
var loadedCEQ = false;
var currentSeason = 0;
var currentDay = 0;

// util {{{1
function getElementsByClassName(re, tag, par) { // {{{2
	var a = new Array();
	var els = par.getElementsByTagName(tag);
	for (var m = 0, j = els.length; m < j; m++) {
		if(re.test(els[m].className)) {
			a.push(els[m]);
		}
	}
	return a;
}

function getCurrentSeason() { // {{{2
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://goallineblitz.com/game/home.pl',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(homePage) {
			var res = homePage.responseText;
			var s = res.match(/div id="season">Season (\d+), Day (.+?)<\/div/);
			currentSeason = s[1];
			currentDay = s[2];
			// console.log('current = s' + currentSeason + ':d' + currentDay);
			for each (var p in players) {
				var diff = ((p.contractSeason - currentSeason) * 40) + p.contractDay - currentDay;
				if (diff <= 10) {
					p.contractCell.style.fontWeight = 'bold';
					p.contractCell.style.color = '#ff0000';
				} else if (diff <= 25) {
					p.contractCell.style.fontWeight = 'bold';
					p.contractCell.style.color = '#c00000';
				} else if (diff <= 40) {
					p.contractCell.style.fontWeight = 'bold';
					p.contractCell.style.color = '#900000';
				} else if (diff <= 50) {
					p.contractCell.style.fontWeight = 'normal';
					p.contractCell.style.color = '#009000';
				} else {
					p.contractCell.style.fontWeight = 'bold';
					p.contractCell.style.color = '#00a000';
				}
//				p.contractCell.innerHTML = p.contractSeason + ':' + p.contractDay;
//				p.contractCell.innerHTML = 'season ' + p.contractSeason + ' day ' + p.contractDay;
				p.contractCell.innerHTML = 's' + p.contractSeason + ':d' + p.contractDay;
			}
			var player_contract_head = getElementsByClassName(/^player_contract_head$/, 'td', document);
			for each (var td in player_contract_head) {
				td.innerHTML = 'Expires';
				td.style.width = 'auto';
			}
		}
	});
}

// avatars {{{1
function installAvatarColumn() { // {{{2
	var newCell;
	var plNum = 0;
	for each (var t in tables) {
		if (t.className != 'players') continue;
		var trs = t.getElementsByTagName('tr');
		for each (var row in trs) {
			var cells = row.getElementsByTagName('td');
			for each (var cell in cells) {
				if (cell.className.match(/^player_name_head/)) {
					newCell = document.createElement('td');
					newCell.appendChild(document.createTextNode('Pic'));
				} else if (cell.className.match(/^player_name(?:_short)?$/)) {
					newCell = document.createElement('td');
					newCell.id = 'avatar_' + ++plNum;
				} else {
					continue;
				}
				row.insertBefore(newCell, row.firstChild);
				break;
			}
		}
	}
	for each (var p in players) {
		for each (var cell in p.nameCell.parentNode.getElementsByTagName('td')) {
			if (cell.id.match(/^avatar_/)) {
				var img = document.createElement('img');
				img.style.height = '75px';
				img.style.width = '75px';
				img.src = '/game/player_pic.pl?player_id=' + p.id;
				cell.appendChild(img);
			}
		}
	}
}

function loadAvatars() { // {{{2
	if (loadedAvatars == true) return;
	loadedAvatars = true;
	var link = document.getElementById('load_avatars_link');
	link.style.display = 'none';
	link.style.visibility = 'hidden';
	installAvatarColumn();
}

// player.pl loading {{{1
function loadAgentsCache() { // {{{2
	var tmp = GM_getValue('cache_agents', '{}');
	eval ('agentCache = ' + tmp);
}

function cacheAgents() { // {{{2
	for each (var p in players) {
		if (p.agentId != undefined) {
			agentCache[p.id] = {id: p.agentId, name: p.agentName};
		}
	}
	GM_setValue('cache_agents', agentCache.toSource());
}

function setAgeStyle(p, cell) { // {{{2
	if (p.age <= 340) {
		$(cell).css({'font-weight': 'bold', 'color': '#00a000'});
	} else if (p.age <= 360) {
		$(cell).css({'font-weight': 'bold', 'color': '#20a000'});
	} else if (p.age <= 400) {
		$(cell).css({'font-weight': 'bold', 'color': '#c0a000'});
	} else if (p.age <= 440) {
		$(cell).css({'font-weight': 'bold', 'color': '#c00000'});
	} else {
		$(cell).css({'font-weight': 'bold', 'color': '#ff0000'});
	}
}

function getPlayer(p) { // {{{2
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://goallineblitz.com/game/player.pl?player_id=' + p.id,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(playerPage) {
			var res = playerPage.responseText.replace(/\r|\n/, '').replace(/  /g, ' ');
			if (s = res.match(/ - (\d+)d old/)) { // age
				p.age = parseInt(s[1]);
			}
			var s = res.match(/home\.pl\?user_id=(\d+)">([^<]+)</);
			p.agentId = s[1];
			p.agentName = s[2];
			for each (var cell in p.nameCell.parentNode.getElementsByTagName('td')) {
				if (cell.id.match(/^agent_/)) {
					cell.innerHTML = '<a href="/game/home.pl?user_id=' + p.agentId + '">' + p.agentName + '</a>';
				} else if (cell.id.match(/^age_/) && p.age) {
					cell.innerHTML = p.age;
					setAgeStyle(p, cell);
				}
			}
			cacheAgents();
			if (s = res.match(/<td class="current_stats_value">(.+?)<\/td>/)) { // Effective Level
				p.levelCell.innerHTML = s[1].replace(/<div style=".+?">/, '<div>');
			}
			if (s = res.match(/div id="player_stats/)) { // open build
				p.nameCell.style.fontWeight = 'bold';
			}
		}
	});
}

function installAgentColumn() { // {{{2
	var newCell;
	var plNum = 0;
	for each (var t in tables) {
		if (t.className != 'players') continue;
		var trs = t.getElementsByTagName('tr');
		for each (var row in trs) {
			var cells = row.getElementsByTagName('td');
			for each (var cell in cells) {
				if (cell.className.match(/^player_name_head/)) {
					newCell = document.createElement('td');
					newCell.innerHTML = 'Agent';
				} else if (cell.className.match(/^player_name(?:_short)?$/)) {
					newCell = document.createElement('td');
					newCell.id = 'agent_' + ++plNum;
					newCell.innerHTML = '&nbsp;';
				} else {
					continue;
				}
				row.insertBefore(newCell, cell.nextSibling);
			}
		}
	}
	for each (var p in players) {
		if (p.agentId != undefined) {
			for each (var cell in p.nameCell.parentNode.getElementsByTagName('td')) {
				if (cell.id.match(/^agent_/)) {
					cell.innerHTML = '<a href="/game/home.pl?user_id=' + p.agentId + '">' + p.agentName + '</a>';
				}
			}
		}
	}
}

function installAgeColumn() { // {{{2
	var newCell;
	var plNum = 0;
	for each (var t in tables) {
		if (t.className != 'players') continue;
		var trs = t.getElementsByTagName('tr');
		for each (var row in trs) {
			var cells = row.getElementsByTagName('td');
			for each (var cell in cells) {
				if (cell.className == 'player_level_head') {
					newCell = document.createElement('td');
					newCell.innerHTML = 'Age';
				} else if (cell.className == 'player_level') {
					newCell = document.createElement('td');
					newCell.id = 'age_' + ++plNum;
					newCell.innerHTML = '&nbsp;';
				} else {
					continue;
				}
				row.insertBefore(newCell, cell.nextSibling);
			}
		}
	}
	for each (var p in players) {
		if (p.age != undefined) {
			for each (var cell in p.nameCell.parentNode.getElementsByTagName('td')) {
				if (cell.id.match(/^age_/)) {
					cell.innerHTML = p.age;
					setAgeStyle(p, cell);
				}
			}
		}
	}
}

function loadPlayers() { // {{{2
	if (loadedPlayers == true) return;
	loadedPlayers = true;
	/*
	var link = document.getElementById('load_agents_link');
	link.style.display = 'none';
	link.style.visibility = 'hidden';
	*/
	installAgentColumn();
	installAgeColumn();
	for each (var p in players) {
//		if (p.agentId == undefined) {
			window.setTimeout(getPlayer, 300, p);
//		}
	}
}

// depth_chart.pl loading {{{1
function installDepthColumn() { // {{{2
	var newCell;
	var plNum = 0;
	for each (var t in tables) {
		if (t.className != 'players') continue;
		var trs = t.getElementsByTagName('tr');
		for each (var row in trs) {
			var cells = row.getElementsByTagName('td');
			for each (var cell in cells) {
				if (cell.className.match(/^player_name_head/)) {
					newCell = document.createElement('td');
					newCell.innerHTML = 'Depth';
				} else if (cell.className.match(/^player_name(?:_short)?$/)) {
					newCell = document.createElement('td');
					newCell.id = 'depth_' + ++plNum;
					newCell.innerHTML = '&nbsp;';
				} else {
					continue;
				}
				row.insertBefore(newCell, cell.nextSibling);
			}
		}
	}
	for each (var p in players) {
		for each (var cell in p.nameCell.parentNode.getElementsByTagName('td')) {
			if (cell.id.match(/^depth_/)) {
				if (p.depth != undefined) {
					cell.innerHTML = p.depth.sort().join(' ');
				} else {
					cell.innerHTML = '';
				}
			}
		}
	}
}

function loadDepth() { // {{{2
	if (loadedDepth == true) return;
	var url = window.location.href;
	var teamId = parseInt(url.match(/team_id=(\d+)/)[1]);
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://goallineblitz.com/game/depth_chart.pl?team_id=' + teamId,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(depthPage) {
			var res = depthPage.responseText;
			var s = res.split(/(positionIds)\['(.+?)'\] = \['(.+?)'\]/g);
			// GM_log(s);
			for (var i = 1; i < s.length; i += 4) {
				if (s[i] != 'positionIds') {
					break;
				}
				var pos = s[i + 1];
				var pIds = s[i + 2].split(/',\s*'/);
				var needNum = false;
				if (pIds.length > 1) needNum = true;
				for (var j = 0; j < pIds.length; j++) {
					for each (var p in players) {
						if (p.id == parseInt(pIds[j])) {
							if (p.depth == undefined) p.depth = [];
							if (needNum == true) {
								p.depth.push(pos + '(' + (j + 1) + ')');
							} else {
								p.depth.push(pos);
							}
						}
					}
				}
			}
			loadedDepth = true;
			installDepthColumn();
		}
	});
}

// CEQ {{{1
function installCEQColumn() { // {{{2
	var newCell;
	var plNum = 0;
	for each (var t in tables) {
	if (t.className != 'players') continue;
		var trs = t.getElementsByTagName('tr');
		for each (var row in trs) {
			var cells = row.getElementsByTagName('td');
			for each (var cell in cells) {
				if (cell.className.match(/^player_name_head/)) {
					newCell = document.createElement('td');
					newCell.appendChild(document.createTextNode('CEQ'));
				} else if (cell.className.match(/^player_name(?:_short)?$/)) {
					newCell = document.createElement('td');
					newCell.id = 'CEQ_' + ++plNum;
				} else {
					continue;
				}
				row.insertBefore(newCell, row.firstChild);
				break;
			}
		}
	}
}

function loadCEQ() { // {{{2
	if (loadedCEQ == true) return;
	loadedCEQ = true;
	var link = document.getElementById('load_CEQ_link');
	link.style.display = 'none';
	link.style.visibility = 'hidden';
	installCEQColumn();
	for each (var p in players) {
		window.setTimeout(getCEQ, 300, p);
	}
}

function getCEQ(p) { // {{{2
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://goallineblitz.com/game/equipment.pl?player_id=' + p.id,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(playerPage) {
			var res = playerPage.responseText;
			var s = res.match(/="custom"><([^>]+)><img src="([^"]+)".*onmouseover="(.*)" onmouseout/);
			if (s) {
				for each (var cell in p.nameCell.parentNode.getElementsByTagName('td')) {
					if (cell.id.match(/^CEQ_/)) {
						var img = document.createElement('img');
						img.src = s[2];
						img.style.height = '75px';
						img.style.width = '75px';
						img.setAttribute('onmouseover', s[3]);
						img.setAttribute('onmouseout', "unset_tip()");
						img.border="0";
						cell.appendChild(img);
					}
				}
			}
		}
	});
}

function makeSomeRoom() { // {{{1
	var rep = {
		'tab_depth_chart': [' Chart', ''],
		'tab_sell_team': ['Sale Options', 'Sell'],
		'tab_assign_gm': ['Assign ', ''],
		'tab_team_loan': [' Options', ''],
		'tab_item_fund': ['Equipment', 'EQ'],
		'tab_team_offers': ['Received/Sent ', ''],
	};
	for (var c in rep) {
		var div = document.getElementById(c);
		if (div != undefined) {
			div.innerHTML = div.innerHTML.replace(rep[c][0], rep[c][1]);
		}
	}
}

function doItAll() { // {{{1
	var s;
	loadAgentsCache();
	var need_loadPlayers = false;
	for each (var t in document.getElementsByTagName('table')) {
		if (t.className != 'players') continue;
		tables.push(t);
		var trs = t.getElementsByTagName('tr');
		var plNum = 0;
		for each (var row in trs) {
			var newCell = document.createElement('td');
			if (/^alternating_color[12]$/.test(row.className)) {
				newCell.innerHTML = ++plNum;
				var player = {};
				var cells = row.getElementsByTagName('td');
				for each (var cell in cells) {
					if (cell.className.match(/^player_name(?:_short)?$/)) {
						s = cell.innerHTML.match(/player_id=(\d+)">([^<]+)</)
						if (s == undefined) GM_log(cell.innerHTML);
						player.nameCell = cell;
						player.id = parseInt(s[1]);
						player.name = s[2];
						if (agentCache[player.id] != undefined) {
							player.agentId = agentCache[player.id].id;
							player.agentName = agentCache[player.id].name;
						} else {
							need_loadPlayers = true;
						}
						continue;
					}
					if (cell.className == 'player_level') {
						player.level = parseInt(cell.innerHTML);
						player.levelCell = cell;
						continue;
					}
					if (cell.className == 'player_contract') {
						cell.style.width = 'auto';
						if (s = cell.innerHTML.match(/(\d+).+?eason.+?ay\s+(.+)/)) {
							player.contractSeason = parseInt(s[1]);
							player.contractDay = parseInt(s[2]);
						}
						player.contractCell = cell;
						continue;
					}
					if (cell.className.match(/^player_trade/)) {
						cell.style.width = 'auto';
						continue;
					}
				}
				players.push(player);
			} else if (/^nonalternating_color$/.test(row.className)) {
				var cells = row.getElementsByTagName('td');
				for each (var cell in cells) {
					if (cell.className.match(/^player_trade/)) {
						cell.style.paddingLeft = '0px';
						cell.style.paddingRight = '0px';
						cell.style.width = 'auto';
						continue;
					}
				}
			} else {
				newCell.innerHTML = '#';
			}
			row.insertBefore(newCell, row.firstChild);
		}
	}
	loadDepth();
	players.sort(function(a, b) { return b.level - a.level });
	var num = players.length;
	var median = 0;
	var mean = 0;
	for (var i in players) {
		mean += players[i].level;
	}
	mean /= num;
	if (num % 2) {
		var i = Math.round(num / 2) - 1;
		median = players[i].level;
	} else {
		var i = num / 2;
		median = parseFloat((players[i].level + players[i-1].level) / 2);
	}
	var div = document.createElement('div');
	div.className = 'medium_head';
	div.innerHTML = 'Median Level of ' + num + ' players is ' + median + '; mean is ' + mean + "<br />\n<span style=\"font-size: 10px;\">Levels: " + players.map(function(e) { return e.level }).join(',') + '</span>';
	tables[2].parentNode.insertBefore(div, tables[2].nextSibling);
//	if (need_loadPlayers == true) {
		// create loadPlayers link
		var link = document.createElement('a');
		link.setAttribute('href', 'javascript:;');
		link.innerHTML = "Load Players";
		link.addEventListener('click', loadPlayers, false);
		var div = document.createElement('div');
		div.className = 'tab_off';
		div.id = 'load_agents_link';
		div.appendChild(link);
		// subhead_link_bar
		var subhead_link_bar = getElementsByClassName(/^subhead_link_bar$/, 'div', document);
		subhead_link_bar[0].appendChild(div);
//	} else {
//		installAgentColumn();
//	}
	if (true) {
		// create loadAvatars link
		var link = document.createElement('a');
		link.setAttribute('href', 'javascript:;');
		link.innerHTML = "Load Avatars";
		link.addEventListener('click', loadAvatars, false);
		var div = document.createElement('div');
		div.className = 'tab_off';
		div.id = 'load_avatars_link';
		div.appendChild(link);
		// subhead_link_bar
		var subhead_link_bar = getElementsByClassName(/^subhead_link_bar$/, 'div', document);
		subhead_link_bar[0].appendChild(div);
	}
	if (true) {
		// create loadCEQ link
		var link = document.createElement('a');
		link.setAttribute('href', 'javascript:;');
		link.innerHTML = "Load CEQ";
		link.addEventListener('click', loadCEQ, false);
		var div = document.createElement('div');
		div.className = 'tab_off';
		div.id = 'load_CEQ_link';
		div.appendChild(link);
		// subhead_link_bar
		var subhead_link_bar = getElementsByClassName(/^subhead_link_bar$/, 'div', document);
		subhead_link_bar[0].appendChild(div);
	}
}

// main {{{1

makeSomeRoom();
doItAll();
getCurrentSeason();

// vim: foldmethod=marker
