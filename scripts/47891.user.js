// ==UserScript==
// @name           GLB Roster Enhancements - modified
// @namespace      rayzilla
// @description    Enhances GLB Roster page -- i stole bogleg's script (http://userscripts.org/scripts/show/45968) and made it calculate the total median/mean instead of top 25% median/mean
// @version        1.0
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// ==/UserScript==


var players = [];
          var tables = [];
          var loadedAgents = false;
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
          
          function getCurrentSeason() { // {{{1
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
          				}
          //				p.contractCell.innerHTML = p.contractSeason + ':' + p.contractDay;
          				p.contractCell.innerHTML = 'season ' + p.contractSeason + ' day ' + p.contractDay;
          			}
          		}
          	});
          }
          
          // agent loading {{{1
          
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
          
          function getAgentName(p) { // {{{2
          	GM_xmlhttpRequest({
          		method: 'GET',
          		url: 'http://goallineblitz.com/game/player.pl?player_id=' + p.id,
          		headers: {
          			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          			'Accept': 'application/atom+xml,application/xml,text/xml',
          		},
          		onload: function(playerPage) {
          			var res = playerPage.responseText;
          			var s = res.match(/home\.pl\?user_id=(\d+)">([^<]+)</);
          			p.agentId = s[1];
          			p.agentName = s[2];
          			for each (var cell in p.nameCell.parentNode.getElementsByTagName('td')) {
          				if (cell.id.match(/^agent_/)) {
          					cell.innerHTML = '<a href="/game/home.pl?user_id=' + p.agentId + '">' + p.agentName + '</a>';
          				}
          			}
          			cacheAgents();
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
          
          function loadAgents() { // {{{2
          	if (loadedAgents == true) return;
          	loadedAgents = true;
          	var link = document.getElementById('load_link');
          	link.style.display = 'none';
          	link.style.visibility = 'hidden';
          	installAgentColumn();
          	for each (var p in players) {
          		if (p.agentId == undefined) {
          			getAgentName(p);
          		}
          	}
          }
          
          function doItAll() { // {{{1
          	var s;
          	loadAgentsCache();
          	var need_loadAgents = false;
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
          							need_loadAgents = true;
          						}
          					}
          					if (cell.className == 'player_level') {
          						player.level = parseInt(cell.innerHTML);
          					}
          					if (cell.className == 'player_contract') {
          						if (s = cell.innerHTML.match(/(\d+).+?eason.+?ay\s+(.+)/)) {
          							player.contractSeason = parseInt(s[1]);
          							player.contractDay = parseInt(s[2]);
          						}
          						player.contractCell = cell;
          					}
          				}
          				players.push(player);
          			} else {
          				newCell.innerHTML = '#';
          			}
          			row.insertBefore(newCell, row.firstChild);
          		}
          	}
          	players.sort(function(a, b) { return b.level - a.level });
          	var num = players.length;
          	var numTop25 = Math.round(num / 4);
          	var medianTop25 = 0;
          	var meanTop25 = 0;
          	for (var i in players) {
          		meanTop25 += players[i].level;
          	}
          	meanTop25 /= num;
          	if (num % 2) {
          		var i = Math.round(num / 2) - 1;
          		medianTop25 = players[i].level;
          	} else {
          		var i = num / 2;
          		medianTop25 = parseFloat((players[i].level + players[i-1].level) / 2);
          	}
                var el = document.getElementsByClassName("medium_head")[0];
          	var div = document.createElement('div');
          	div.className = 'medium_head';
          	div.innerHTML = 'Median Level is ' + medianTop25 + '; mean is ' + meanTop25.toFixed(2);
          	(el.parentNode).insertBefore(div, el);
          	if (need_loadAgents == true) {
          		//create loadAgent link
          		var loadLink = document.createElement('a');
          		loadLink.setAttribute('href', 'javascript:;');
          		loadLink.innerHTML = "Load Agents";
          		loadLink.addEventListener('click',loadAgents, false);
          		loadLink.id = 'load_link';
          		// subhead_link_bar
          		var subhead_link_bar = getElementsByClassName(/^subhead_link_bar$/, 'div', document);
          		subhead_link_bar[0].innerHTML = subhead_link_bar[0].innerHTML + " ";
          		subhead_link_bar[0].appendChild(loadLink);
          	} else {
          		installAgentColumn();
          	}
          }
          
          // main {{{1
          
          doItAll();
          getCurrentSeason();
          
          // vim: foldmethod=marker