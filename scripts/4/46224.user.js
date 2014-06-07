// ==UserScript==
// @name           GLB League Page Enhancements
// @namespace      Bogleg
// @description    Enhances the GLB League page
// @version        1.2.1
// @include        http://goallineblitz.com/game/league.pl*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// *** GLOBALS ********************************************************* {{{1
var compareTeamId = undefined; // {{{2
var teams = {'Select team': 0, 'Bannockburn Warrior Scots': 6080}; // {{{2
/* teams = {
	teamName: teamId,
	...
} */

var matchups = {}; // {{{2
/* matchups = {
	myTeamId_oppTeamId: {
		myTeamId: teamId,
		oppTeamId: teamId,
		spread: +/-INT (string),
	},
} */

// *** CORE UTILITY **************************************************** {{{1
function intRandom(min, max) { // {{{2
	return min + Math.floor(Math.random() * (max + 1));
}

function mkIdPair(myId, oppId) { // {{{2
	return myId + '_' + oppId;
}

function loadTeamIds() { // {{{2
	$('div#conferences td a[href*="/team.pl?team_id="]').each(function() {
		teams[$(this).text()] = parseInt(this.href.match(/team_id=(\d+)/)[1]);
	});
}

// *** CACHING ********************************************************* {{{1
var cache = { // {{{2
	compare_teams: {
	},
	player: {
	},
};
/* cache = {
	compare_teams: {
		lastStore: getTime(),
		teamId: {
			when: timestamp of cache
			expire: timestamp to definitely expire by
			data: ...
		}
	}
	player: {
		lastStore: getTime(),
		playerId: {
			when: ...
			expire: ...
			data: {
				teamId: int,
				teamName: string,
			}
		}
	}
} */

var pendingDataLoad = { // {{{2
	compare_teams:	{},
	player: {},
};

var storeCacheScheduled = { // {{{2
	compare_teams:	false,
	player: false,
};

function loadCache(t) { // {{{2
	var now = new Date().getTime();
	var tmp = GM_getValue('cache_' + t, '{}');
	eval ('cache[t] = ' + tmp);
	if (cache[t] == undefined) {
//		console.log('Failed to load cache.' + t);
		cache[t] = {};
	}
	for (var k in cache[t]) {
		if (cache[t][k].expire != undefined && cache[t][k].expire <= now) {
			delete cache[t][k];
		}
	}
	var loadFunc = {
		compare_teams: function() {
			var c = cache.compare_teams;
			for (var idPair in c) {
				if (matchups[idPair] != undefined && matchups[idPair].spread == undefined) {
					matchups[idPair].spread = c[idPair].data.spread;
				}
			}
		},
	};
	if (loadFunc[t] != undefined) {
		loadFunc[t]();
	}
}

function fetchCached(t, id, d) { // {{{2
	var out = 1; // returns 1 if cached data was found, 0 otherwise
	var loadData = false;
	if (cache[t][id] == undefined) {
		if (cache[t].lastStore == undefined) {
			loadCache(t);
		}
		if (cache[t][id] == undefined) {
//			console.log('fetchCached: cache_' + t + ' data NOT found for id ' + id);
			out = 0;
			loadData = true;
		}
	}
	if (out == 1) {
//		console.log('fetchCached: cache_' + t + ' data found for id ' + id);
		for (var k in cache[t][id].data) {
			if (d[k] == undefined) {
				d[k] = cache[t][id].data[k];
			}
		}
		// refresh if data is >= 30 minutes old
		if (cache[t][id].when == undefined || ((new Date().getTime()) - cache[t][id].when) > 1800000) {
			loadData = true;
		}
	}
	if (loadData == true && pendingDataLoad[t][id] != true) {
		pendingDataLoad[t][id] = true;
		if (t == 'compare_teams') {
//			window.setTimeout(fetchCompareTeamsPage, (out == 1) ? intRandom(5000,10000) : 1, d);
			fetchCompareTeamsPage(d);
		}
		if (t == 'player') {
//			window.setTimeout(fetchPlayerPage, 1, id);
			fetchPlayerPage(id);
		}
	}
	return out;
}

function setCache(t, id, d, exp) { // {{{2
//	console.log('setCache(' + t + ', ' + id + ', ' + d.toSource() + ')');
	var now = new Date().getTime();
	if (exp == undefined) {
		exp = now + 3600000; // default expire after 1 hour
	}
	if (cache[t].lastStore == undefined) {
		loadCache(t);
	}
	cache[t][id] = {
		data: d,
		when: now,
		expire: exp,
	};
	scheduleStoreCache(t);
}

function scheduleStoreCache(t) { // {{{2
//	console.log('scheduleStoreCache('+t+')');
	if (storeCacheScheduled[t] == false) {
		storeCacheScheduled[t] = true;
		window.setTimeout(storeCache, intRandom(1000,3000), t);
	}
}

function storeCache(t) { // {{{2
//	console.log('storeCache('+t+'): ' + cache.toSource());
	storeCacheScheduled[t] = false;
	cache[t].lastStore = new Date().getTime();
	GM_setValue('cache_' + t, cache[t].toSource());
}

// *** DATA RETRIEVAL ************************************************** {{{1
// Load compare_teams.pl {{{2
function fetchCompareTeamsPage(m) {
	if (m.myTeamId == undefined || m.oppTeamId == undefined || m.idPair == undefined) {
		return;
	}
	$.get('/game/compare_teams.pl?team1=' + m.myTeamId + '&team2=' + m.oppTeamId, function(data) {
		var r = [];
		$('div.team', data).find('div.rating:eq(0) div.rating_bar_fill').each(function(i) {
			r.push(parseInt($(this).text()));
		});
		m.spread = r[0] - r[1];
		if (m.spread == 0) {
			m.spread = 'even';
		} else if (m.spread > 0) {
			m.spread = '+' + m.spread;
		}
		setCache('compare_teams', m.idPair, {
			myTeamId: m.myTeamId,
			oppTeamId: m.oppTeamId,
			idPair: m.idPair,
			spread: m.spread
		});
		updateSpreadCell(m.oppTeamId, $(m.cell));
		pendingDataLoad.compare_teams[m.idPair] = false;
	});
}

// Load player.pl {{{2
function fetchPlayerPage(playerId) {
//	console.log('fetchPlayerPage ' + playerId);
	$.get('/game/player.pl?player_id=' + playerId, function(data) {
//		console.log('fetchPlayerPage ' + playerId + ' - got page');
		var newData = {
			teamId: undefined,
			teamName: 'None',
		};
		$('#player_vitals td.vital_data a[href*="/team.pl?team_id="]', data).each(function() {
			newData.teamId = parseInt(this.href.match(/team_id=(\d+)/)[1]);
			newData.teamName = $(this).text();
		});
		$('#endorsement_team_' + playerId).html((newData.teamId == undefined) ? 'None' : '<a href="/game/team.pl?team_id=' + newData.teamId + '">' + newData.teamName + '</a>');
		if (newData.teamId != undefined) setCache('player', playerId, newData);
	});
}

// *** CALLBACK ******************************************************** {{{1
function updateComparisons() { // {{{2
	compareTeamId = teams[$('#select_compare_team').val()] || 0;
	GM_setValue('compareTeamId', compareTeamId);
	if (!compareTeamId) compareTeamId = undefined;
	updateSpreads();
}

function loadEndorsementTeams() { // {{{2
	$('span#load_endorsement_teams_link').remove();
	$('#endorsements tr').eq(0)
		.find('td:eq(1)').after('<td>Team</td>').end()
	.end().slice(1)
		.find('td:eq(2) a').each(function() {
			var p = parseInt(this.href.match(/player_id=(\d+)/)[1]);
			var pc = {};
			$(this).parent().before('<td id="endorsement_team_' + p + '">' + ((fetchCached('player', p, pc) && pc.teamId != undefined) ? '<a href="/game/team.pl?team_id=' + pc.teamId + '">' + pc.teamName + '</a>' : 'None') + '</td>');
		});
}

// *** PAGE MANIPULATION *********************************************** {{{1
function installCompareList() { // {{{2
	compareTeamId = GM_getValue('compareTeamId', undefined) || undefined;
	$('#conferences').before('<div class="medium_head">Compare to <select id="select_compare_team" style="font-weight: normal;"><option value="0" selected>Select team</option></select></div>');
	var cmpList = $('#select_compare_team');
	var ts = [];
	for (var team in teams) {
		if (teams[team] == 0) continue;
		ts.push(team);
	}
	for each (var team in ts.sort(function(a, b) {
		return (a < b) ? -1 : (a > b) ? 1 : 0;
	})) {
		var sel = (compareTeamId == teams[team]) ? ' selected="selected">' : '>';
		cmpList.append('<option' + sel + team + '</option>');
	}
	cmpList.change(updateComparisons);
	updateComparisons();
}

function installLoadEndorsementTeamsLink() { // {{{2
	$('#endorsements div:eq(0)').append('<span id="load_endorsement_teams_link"> (<a href="javascript:;">load teams</a>)</span>').find('#load_endorsement_teams_link').click(function(e) {
		e.preventDefault();
		loadEndorsementTeams();
	});
}

function updateSpreadCell(oppTeamId, cell) { // {{{2
	if (compareTeamId == undefined || oppTeamId == compareTeamId) {
		$('span', cell).remove();
		return;
	}
	var idPair = mkIdPair(compareTeamId, oppTeamId);
	if (matchups[idPair] == undefined || matchups[idPair].spread == undefined) {
		var m = {
			idPair: idPair,
			myTeamId: compareTeamId,
			oppTeamId: oppTeamId,
			cell: cell,
		};
		matchups[idPair] = m;
		fetchCached('compare_teams', idPair, matchups[idPair]);
	}
	if (matchups[idPair].spread != undefined) {
		matchups[idPair].cell = cell;
		cell.find('span').remove().end().append('<span> (<a href="/game/compare_teams.pl?team1=' + compareTeamId + '&team2=' + oppTeamId + '">' + matchups[idPair].spread + '</a>)</span>');
	}
}

function updateSpreads() { // {{{2
	$('div#conferences td a[href*="/team.pl?team_id="]').each(function() {
		updateSpreadCell(parseInt(this.href.match(/team_id=(\d+)/)[1]), $(this).parent());
	});
}

// *** MAIN ************************************************************ {{{1
// function main() {{{2

loadTeamIds();
installCompareList();
installLoadEndorsementTeamsLink();

// vim: foldmethod=marker
