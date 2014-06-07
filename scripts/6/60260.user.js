// ==UserScript==
// @name           GLB Homepage
// @namespace      Bogleg/Kardiackids2007
// @description    Modified version of Bogleg's latest homepage script with better player and team management links. Unnecessary player attributes have also been removed, such as catching for QB's and carrying for SS's. 
// @version        2.9.2
// @include        http://goallineblitz.com/game/home.pl
// @include        http://goallineblitz.com/game/home.pl?*
// ==/UserScript==

/* TODO:
 - clean up the max_players / notmine stuff
 - mouseover player in List View = popup floating player's panel
 */

// *** GLOBALS ********************************************************* {{{1
// var show_var_defs: [ type, label, description ], ... {{{2
var show_var_defs = {
	max_players	: [ 'int',		'MaxPlayers',		"If # players > MaxPlayers, don't run the per-player page hits (even with LoadNotMine)", ],
	notmine		: [ 'boolean',	'LoadNotMine',		"Automatically load per-player pages on other agents' home pages (if # players <= MaxPlayers)", ],
	blue_levup	: [ 'boolean',	'BlueLevelupBox',	"Turn players box blue when skill points are still available", ],
	countdown	: [ 'boolean',	'Countdown',		"Next-game clocks countdown in real time", ],
	energy		: [ 'boolean',	'Energy',			"Show players' energy bars", ],
	org_ng_txt	: [ 'boolean',	'OrigNextGame',		"Use unaltered Next-game text (incompatible with Countdown)", ],
	sort		: [ 'boolean',	'ShowSort',			"Show 'Sort Players' selection list", ],
	teamlinks	: [ 'boolean',	'TeamLinks',		"Show quick links to team mgmt/info pages", ],
	// team.pl
	record		: [ 'boolean',	'Record',			"Show teams' win-loss-tie records", ],
	chemistry	: [ 'boolean',	'Chemistry',		"Show teams'  records", ],
	teamleagues	: [ 'boolean',	'TeamLeagues',		"Show conference/league that players' teams belong to", ],
	// compare_teams.pl
	spread		: [ 'boolean',	'NextGameSpread',	"Show Next Game scouting spread (for players, not yet teams) - requires an extra page load", ],
	// boost_player.pl
	boost_cost	: [ 'boolean',	'BoostCost',		"Show overall boost cost (extra page hit per player)", ],
	boost		: [ 'boolean',	'Boost',			"Show players' available boosts (extra page hit per player)", ],
	// player.pl
	attributes	: [ 'boolean',	'Attributes',		"Show players' primary and secondary attributes", ],
	bonus		: [ 'boolean',	'BonusTokens',		"Show number of bonus tokens", ],
	cash		: [ 'boolean',	'Cash',				"Show players' current cash", ],
	contract	: [ 'boolean',	'Contract',			"Show players' contract info", ],
	fame		: [ 'boolean',	'Fame',				"Show players' fame", ],
	morale		: [ 'boolean',	'Morale',			"Show players' morale bars", ],
	overall		: [ 'boolean',	'Overall',			"Show players' scouting overall bars", ],
	scout_bars	: [ 'boolean',	'ScoutBars',		"Show players' position-specific scouting bars", ],
	shop		: [ 'boolean',	'ShoppingTokens',	"Show number of shopping tokens", ],
};

var show_defaults = { // {{{2
	globalMine : { // {{{3
		_LABEL_ : 'Global',
		max_players	: 12,
		notmine		: 0,
		countdown	: 1,
		org_ng_txt	: 0,
		sort		: 1,
		boost_cost	: 1,
	},
	globalOther : { // {{{3
		_LABEL_ : 'Global',
		max_players	: 12,
		notmine		: 0,
		countdown	: 1,
		org_ng_txt	: 0,
		sort		: 1,
	},
	gridViewTeamMine : { // {{{3
		_LABEL_ : 'Team Grid View',
		record		: 1,
		spread		: 1,
		chemistry	: 1,
		teamlinks	: 1,
	},
	gridViewTeamOther : { // {{{3
		_LABEL_ : 'Team Grid View',
		record		: 1,
		spread		: 1,
		chemistry	: 1,
		teamlinks	: 1,
	},
	listViewPlayerMine : { // {{{3
		_LABEL_ : 'List View (DOES NOT WORK YET)',
		record		: 1,
		teamleagues	: 1,
		spread		: 1,
		energy		: 1,
		boost		: 1,
		attributes	: 0,
		bonus		: 1,
		cash		: 1,
		contract	: 1,
		fame		: 1,
		morale		: 1,
		overall		: 1,
		scout_bars	: 1,
		shop		: 1,
	},
	gridViewPlayerMine : { // {{{3
		_LABEL_ : 'Grid View',
		record		: 1,
		teamleagues	: 1,
		spread		: 1,
		energy		: 1,
		boost		: 1,
		attributes	: 1,
		bonus		: 1,
		cash		: 1,
		contract	: 1,
		fame		: 1,
		morale		: 1,
		overall		: 1,
		scout_bars	: 1,
		shop		: 1,
		blue_levup	: 1,
	},
	listViewPlayerOther : { // {{{3
		_LABEL_ : 'List View (DOES NOT WORK YET)',
		record		: 1,
		teamleagues	: 1,
		spread		: 1,
		attributes	: 0,
		contract	: 1,
		fame		: 1,
		overall		: 1,
		scout_bars	: 1,
	},
	gridViewPlayerOther : { // {{{3
		_LABEL_ : 'Grid View',
		record		: 1,
		teamleagues	: 1,
		spread		: 1,
		attributes	: 1,
		contract	: 1,
		fame		: 1,
		overall		: 1,
		scout_bars	: 1,
	},
};

// Configuration setup {{{2
var isMine = true;
(function() {
	var tmp = document.getElementById('message_buttons');
	if (tmp == undefined) isMine = false;
})();

var show = {};
for (var sec in show_defaults) {
	var showSec = sec;
	if (isMine == true && /Other$/.test(sec)) continue;
	if (isMine == false && /Mine$/.test(sec)) continue;
	var s = sec.match(/^(.+?)(?:Mine|Other)$/);
	if (s) {
		showSec = s[1];
	}
	show[showSec] = {};
	for (var sd in show_defaults[sec]) {
		if (/^_/.test(sd)) continue;
		var saved = parseInt(GM_getValue('option_' + sec + '_' + sd, show_defaults[sec][sd]));
		show[showSec][sd] = saved;
	}
}
//GM_log(show.toSource());

var currentSeason = [0, 0]; // {{{2
// [ season#, day ]
(function() {
	var div = document.getElementById('season');
	if (div == undefined) return; // figure out how to do this with !isMine
	var s = div.innerHTML.match(/^Season (\d+), Day (.+?)$/);
	currentSeason = [parseInt(s[1]), parseInt(s[2])];
})();

var matchups = {}; // {{{2
/* matchups = {
	teamId: {
		teamId => teamId,
		timer => Date()_of_game,
		where => <at|vs>,
		link => link_to_matchup,
		oppTeam => opp_team_name,
		spread => +/-INT (string),
		origText => html,
	},
} */

var tData = {}; // {{{2
var numTeams = 0;
/* tData = {
	teamId: {
		teamId => int,
		id => 't' + teamId (string),
		ownedOrGMed => boolean, // is this owned or GMed, or is it a player's team?
		leagueId => int,
		leagueName => int,
		leagueLabel => int,
		leagueForumId => int,
		leagueForumIcon => html,
		conferenceId => int,
		conferenceName => int,
		conferenceLabel => int,
		record => string,
		chemOverall => int,
		chemOverallClass => string,
		chemOffense => int,
		chemOffenseClass => string,
		chemDefense => int,
		chemDefenseClass => string,
	}, ...
} */

var pData = []; // {{{2
var numPlayers = getElementsByClassName(/^content_container(?:_sp)? player_box_vet$/, 'div', document).length;
/* pData = [ {
		origIndex => int, (to preserve default order)
		isMine => boolean, (is this my player?)
		id => int,
		name => string,
		teamId => int,
		teamName => string,
		pos => string,
		level => int,
		xp => int,
		vxp => int,
		sp => int,
		tp => int,
		bt => int,
		st => int,
		cash => int,
		fame => int,
		fameText => html string,
		nextGameTimer => int,
		lastGame => stat_line_from_last_game (html string),
		contract => contract_info (string),
		contractOffers => int,
		energy => int,
		energyClass => CSS class (string),
		morale => int,
		moraleClass => CSS class (string),
		overall => int,
		overallClass => CSS class (string),
		stat1Name => string,
		stat1Class => CSS class (string),
		stat1Value => int,
		stat2Name => string,
		stat2Class => CSS class (string),
		stat2Value => int,
		boostAvail => int,
		doc => html_chunk_to_output (html string),
}, ... ] */

var attributes = { // {{{2
	'QB': {
		'pri': ['Str', 'Thr', 'Vis', 'Con'],
		'sec': ['Agi', 'Spe', 'Sta'],
	}, 'HB': {
		'pri': ['Agi', 'Spe', 'Str'],
		'sec': ['Cat', 'Car', 'Blo', 'Jum', 'Con', 'Vis', 'Sta'],
	}, 'FB': {
		'pri': ['Str', 'Blo', 'Agi'],
		'sec': ['Con', 'Vis', 'Cat', 'Car', 'Sta'],
	}, 'C': {
		'pri': ['Str', 'Blo', 'Agi'],
		'sec': ['Con', 'Vis', 'Sta'],
	}, 'G': {
		'pri': ['Str', 'Blo', 'Agi'],
		'sec': ['Con', 'Vis', 'Sta'],
	}, 'OT': {
		'pri': ['Str', 'Blo', 'Agi'],
		'sec': ['Con', 'Vis', 'Sta'],
	}, 'TE': {
		'pri': ['Str', 'Blo', 'Agi', 'Spe'],
		'sec': ['Con', 'Car', 'Cat', 'Vis', 'Sta'],
	}, 'WR': {
		'pri': ['Spe', 'Agi', 'Cat', 'Jum'],
		'sec': ['Con', 'Car', 'Vis', 'Sta'],
	}, 'DT': {
		'pri': ['Str', 'Tac', 'Agi'],
		'sec': ['Con', 'Vis', 'Spe', 'Sta'],
	}, 'DE': {
		'pri': ['Str', 'Tac', 'Agi', 'Spe'],
		'sec': ['Con', 'Vis', 'Sta'],
	}, 'LB': {
		'pri': ['Str', 'Vis', 'Tac', 'Agi', 'Spe'],
		'sec': ['Jum', 'Cat', 'Sta'],
	}, 'CB': {
		'pri': ['Spe', 'Agi', 'Jum', 'Vis', 'Cat'],
		'sec': ['Str', 'Tac', 'Con', 'Sta'],
	}, 'SS': {
		'pri': ['Str', 'Spe', 'Agi', 'Vis', 'Tac'],
		'sec': ['Jum', 'Con', 'Sta'],
	}, 'FS': {
		'pri': ['Spe', 'Agi', 'Vis', 'Tac'],
		'sec': ['Str', 'Jum', 'Cat', 'Con', 'Sta'],
	}, 'K': {
		'pri': ['Kic', 'Con', 'Str', 'Vis'],
		'sec': ['Agi', 'Spe', 'Jum'],
	}, 'P': {
		'pri': ['Pun', 'Con', 'Str', 'Vis', ],
		'sec': ['Agi', 'Spe', 'Jum'],
	}
};


var posBoostCost = { // {{{2
	'QB': 3,
	'HB': 3,
	'WR': 3,
	'FB': 2,
	'TE': 2,
	'C': 1,
	'G': 1,
	'OT': 1,
	'DT': 2,
	'DE': 2,
	'LB': 2,
	'CB': 2,
	'SS': 2,
	'FS': 2,
	'K': 1,
	'P': 1,
};
var boostCostCell = undefined;

// *** CORE UTILITY **************************************************** {{{1
function intRandom(min, max) { // {{{2
	return min + Math.floor(Math.random() * (max + 1));
}

// make a HTML DOM ID based on player ID and contents
function mkid(ob, name) { // {{{2
	return 'GLBHP_' + ob.id + '_' + name;
}

// Allow for searching and retrieving elements by class name
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

// *** CACHING ********************************************************* {{{1
var cache = { // {{{2
	compare_teams: {
	},
	player: {
	},
	boost_player: {
	},
	team: {
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
			when: timestamp of cache
			expire: timestamp to definitely expire by
			data: ...
		}
	},
	boost_player: {
		lastStore: getTime(),
		playerId: {
			when: timestamp of cache
			expire: timestamp to definitely expire by
			data: ...
		}
	},
	team: {
		lastStore: getTime(),
		teamId: {
			when: timestamp of cache
			expire: timestamp to definitely expire by
			data: ...
		}
	},
} */

var storeCacheScheduled = { // {{{2
	compare_teams:	false,
	player:			false,
	boost_player:	false,
	team:			false,
};

function purgeCache() { // {{{2
	for (var t in cache) {
		storeCacheScheduled[t] = false;
		GM_deleteValue('cache_' + t);
	}
	window.location.reload();
}

function loadCache(t) { // {{{2
	var now = new Date().getTime();
	var tmp = GM_getValue('cache_' + t, '{}');
	eval ('cache[t] = ' + tmp);
	if (cache[t] == undefined) {
//		GM_log('Failed to load cache.' + t);
		cache[t] = {};
	}
	for (var k in cache[t]) {
		if (cache[t][k].expire != undefined && cache[t][k].expire <= now) {
			delete cache[t][k];
		}
	}
	var loadFunc = {
		compare_teams: function() {
			var c = cache.compare_teams
			for (var teamId in c) {
				if (teamId == 'lastStore') continue;
				if (matchups[teamId] != undefined && matchups[teamId].spread == undefined) {
					if (matchups[teamId].link != c[teamId].data.link) {
						delete cache.compare_teams[teamId];
					} else {
						matchups[teamId].spread = c[teamId].data.spread;
					}
				}
			}
		},
	};
	if (loadFunc[t] != undefined) {
		loadFunc[t]();
	}
}

function fetchCached(t, id, d) { // {{{2
	var foundCachedData = true;
	var loadData = false;
	if (cache[t][id] == undefined) {
		if (cache[t].lastStore == undefined) {
			loadCache(t);
		}
		if (cache[t][id] == undefined) {
//			GM_log('fetchCached: cache_' + t + ' data NOT found for id ' + id);
			foundCachedData = false;
			loadData = true;
		}
	}
	if (foundCachedData) {
//		GM_log('fetchCached: cache_' + t + ' data found for id ' + id);
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
	if (loadData == true && !pendingDataLoadExists(t, id)) {
		function checkShow(sds) {
			for each (var sd in sds) {
				for (var sec in show) {
					if (show[sec][sd]) return true;
				}
			}
			return false;
		}
		if (t == 'compare_teams') {
			if (checkShow(['spread'])) {
				dataLoad(t, id, fetchCompareTeamsPage, foundCachedData, d);
			}
		} else if (t == 'player') {
			if (checkShow(['attributes', 'contract', 'fame', 'shop', 'bonus', 'cash', 'morale', 'overall', 'scout_bars'])) {
				dataLoad(t, id, fetchPlayerPage, foundCachedData, d);
			}
		} else if (t == 'boost_player') {
			if (checkShow(['boost_cost', 'boost'])) {
				dataLoad(t, id, fetchBoostPlayerPage, foundCachedData, d);
			}
		} else if (t == 'team') {
			if (checkShow(['teamleagues', 'record', 'chemistry'])) {
				dataLoad(t, id, fetchTeamPage, foundCachedData, d);
			}
		}
	}
}

function setCache(t, id, d, exp) { // {{{2
//	GM_log('setCache(' + t + ', ' + id + ', ' + d.toSource() + ')');
	var now = new Date().getTime();
	if (exp == undefined) {
		exp = now + 86400000; // default expire after 1 day
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
	if (storeCacheScheduled[t] == false) {
		storeCacheScheduled[t] = true;
		window.setTimeout(storeCache, intRandom(1000,3000), t);
	}
}

function storeCache(t) { // {{{2
//	GM_log('storeCache('+t+'): ' + cache.toSource());
	if (storeCacheScheduled[t] != true) return;
	storeCacheScheduled[t] = false;
	cache[t].lastStore = new Date().getTime();
	GM_setValue('cache_' + t, cache[t].toSource());
}

// *** DATA RETRIEVAL ************************************************** {{{1
// ****** UTIL ********************************************************* {{{2
var pendingDataLoad = { // {{{3
	compare_teams:	{},
	player:			{},
	boost_player:	{},
	team:			{},
};
var pendingDataLoadTotal = 0;
var loadPlayerAnyway = {};

function pendingDataLoadExists(page, id) { // {{{3
	return pendingDataLoad[page][id] ? true : false;
}

function pendingDataLoadAdd(page, id) { // {{{3
	++pendingDataLoadTotal;
	pendingDataLoad[page][id] = true;
}

function pendingDataLoadRemove(page, id) { // {{{3
	--pendingDataLoadTotal;
	pendingDataLoad[page][id] = false;
}

function dataLoad(page, id, loadFunc, canDelay, d) { // {{{3
	if (isMine == false && (show.global.notmine == 0 || numPlayers > show.global.max_players)) {
		if (page == 'compare_teams' || page == 'team') { // team pages
			if (tData[id] == undefined || tData[id].ownedOrGMed != true) { // loading a team page for a player profile
				var doLoad = false;
				for each (var p in pData) {
					if (p.teamId == id) {
						if (loadPlayerAnyway[p.id] == true) {
//							GM_log('dataLoad: ' + page + '(' + id + '): ' + (canDelay ? '(delay) ' : '(immed) ') + ': pending = ' + pendingDataLoadTotal + ' (OK for ' + p.name + ')');
							doLoad = true;
							break;
						}
					}
				}
				if (doLoad == false) {
//					GM_log('dataLoad: ' + page + '(' + id + '): ' + (canDelay ? '(delay) ' : '(immed) ') + ': pending = ' + pendingDataLoadTotal + ' (REFUSED)');
					return;
				}
			} else {
//				GM_log('dataLoad: ' + page + '(' + id + '): ' + (canDelay ? '(delay) ' : '(immed) ') + ': pending = ' + pendingDataLoadTotal + ' (OK -- ownedOrGMed)');
			}
		} else if (loadPlayerAnyway[id] != true) {
//			GM_log('dataLoad: ' + page + '(' + id + '): ' + (canDelay ? '(delay) ' : '(immed) ') + ': pending = ' + pendingDataLoadTotal + ' (REFUSED for ' + d.name + ')');
			return;
		}
	}
	if (canDelay && pendingDataLoadTotal > 16) {
//		GM_log('dataLoad: ' + page + '(' + id + '): ' + (canDelay ? '(delay) ' : '(immed) ') + ': pending = ' + pendingDataLoadTotal + ' (DELAYED)');
		window.setTimeout(dataLoad, intRandom(5000, 20000), page, id, loadFunc, canDelay, d);
		return;
	}
//	GM_log('dataLoad: ' + page + '(' + id + '): ' + (canDelay ? '(delay) ' : '(immed) ') + ': pending = ' + pendingDataLoadTotal);
	pendingDataLoadAdd(page, id);
	window.setTimeout(loadFunc, 1, d);
}

function dataLoadDone(page, id) { // {{{3
	pendingDataLoadRemove(page, id);
//	GM_log('dataLoadDone: ' + page + '(' + id + '): pending = ' + pendingDataLoadTotal);
}

// Load compare_teams.pl {{{2
function fetchCompareTeamsPage(ng) {
	if (ng.link == undefined) {
		return;
	}
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://goallineblitz.com' + ng.link,
		headers: {
			'User-agent': navigator.userAgent,
			'Accept': 'text/xml',
		},
		onload: function(compareTeamsPage) {
//			GM_log('Fetched compare_teams.pl for team ' + ng.teamId);
			// Add next game spread to homepage
			var doc = compareTeamsPage.responseText.replace(/\n/g, '').replace(/\s+/g, ' ').match(/Overall.+?(\d+)<\/div><\/div>/g);
			var opp = doc[0].match(/Overall.+?(\d+)<\/div><\/div>/);
			var me = doc[1].match(/Overall.+?(\d+)<\/div><\/div>/);
			opp = parseInt(opp[1]);
			me = parseInt(me[1]);
			ng.spread = me - opp;
			if (ng.spread == 0) {
				ng.spread = 'even';
			} else if (ng.spread > 0) {
				ng.spread = '+' + ng.spread;
			}
			if (show.global.countdown == 0) {
				updateClocks(ng.teamId);
			}
			setCache('compare_teams', ng.teamId, { spread: ng.spread, link: ng.link }, ng.timer.getTime());
			dataLoadDone('compare_teams', ng.teamId);
		}
	});
}

// Load boost_player.pl // {{{2
function fetchBoostPlayerPage(p) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://goallineblitz.com/game/boost_player.pl?player_id=' + p.id,
		headers: {
			'User-agent': navigator.userAgent,
			'Accept': 'text/xml',
		},
		onload: function(playerBoostPage) {
//			GM_log('Fetched boost_player.pl for ' + p.name);
			var doc = playerBoostPage.responseText.replace(/\n|\r/g, '').replace(/\s\s+/g, ' ');
			if (doc.match(/<select name="level_ups">/i)) {
//				GM_log('found level_ups ' + p.name);
				p.boostAvail = 0;
				if (doc.match(/<option value="3"/i)) {
					p.boostAvail = 3;
				} else if (doc.match(/<option value="2"/i)) {
					p.boostAvail = 2;
				} else if (doc.match(/<option value="1"/i)) {
					p.boostAvail = 1;
				}
				var s = doc.match(/Remaining.+?level_up_value.*?>\s*(\d+)</);
				if (s) {
					p.boostAvail = parseInt(s[1]);
				}
			}
			if (p.boostAvail != undefined) {
				buildPlayerContent(p);
				setCache('boost_player', p.id, { boostAvail: p.boostAvail });
			}
			updateBoostCost();
			dataLoadDone('boost_player', p.id);
		}
	});
}

// Load player.pl {{{2
function fetchPlayerPage(p) {
//	GM_log('fetchPlayerPage for ' + p.name);
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://goallineblitz.com/game/player.pl?player_id=' + p.id,
		headers: {
			'User-agent': navigator.userAgent,
			'Accept': 'text/xml',
		},
		onload: function(playerPage) {
//			GM_log('Fetched player.pl for ' + p.name);
			var doc = playerPage.responseText.replace(/\n/g, '').replace(/\s\s+/g, ' ');
			var newData = {};
			var s, a, as, av = {};
			// teamId, teamName
			if (s = doc.match(/"vital_data".+?eam_id=(\d+)">([^<]+)</)) {
				newData.teamId = parseInt(s[1]);
				newData.teamName = s[2];
			}
			// attributes
			if (s = doc.match(/="stat_head_tall">[a-z]+:.+?value_tall(?:_boosted)?">[0-9\.]+/gi)) {
				for each (a in s) {
					if (as = a.split(/="stat_head_tall">([a-z]{3})[a-z]+:.+?value_tall(_boosted)?">([0-9\.]+)/gi)) {
						av[as[1]] = { 'boost': as[2] ? 1 : 0, 'value': as[3] };
					}
				}
				as = '<span style="color:#0000ff; font-weight:bold;">';
				newData.attributes = '<span style="font-weight:bold; font-size:10px;">';
				a = 0;
				for each (s in attributes[p.pos].pri) {
					if (a++ != 0) newData.attributes += '&nbsp;';
					newData.attributes += '<span style="color:#00a000">' + s + ':</span>' + (av[s].boost ? as : '') + av[s].value + (av[s].boost ? '</span>' : '');
				}
				if (a == 0) newData.attributes = '<span style="font-weight:bold; font-size:10px;">'; else newData.attributes += '<br />';
				a = 0;
				for each (s in attributes[p.pos].sec) {
					if (a++ != 0) newData.attributes += '&nbsp;';
					newData.attributes += s + ':' + (av[s].boost ? as : '<span style="font-weight:bold;">') + av[s].value + '</span>';
				}
				newData.attributes += '</span>';
			}
			// contract
			if (s = doc.match(/Contract Offers \((\d+)\)/)) {
				newData.contractOffers = parseInt(s[1]);
			}
			if (s = doc.match(/\$([,\d]+)(?:\.\d\d)\/yr - exp\. season\s*(\d+).+?day\s*(\d+)(.+?)\/td>/i)) {
				newData.contractDaily = parseInt(s[1].replace(/,/g, '')) / 40;
				newData.contractExpirationSeason = parseInt(s[2]);
				newData.contractExpirationDay = parseInt(s[3]);
				newData.contractExpirationCounter = (newData.contractExpirationSeason * 100) + newData.contractExpirationDay;
				newData.contract = '$' + newData.contractDaily + '/day (exp ' + newData.contractExpirationSeason + ':' + newData.contractExpirationDay + ')';
				if (/No Trade/.test(s[3])) {
					newData.contract += ' (NT)';
				}
				var diff = ((newData.contractExpirationSeason - currentSeason[0]) * 40) + newData.contractExpirationDay - currentSeason[1];
				if (diff <= 10) {
					newData.contractExpirationStyle = 'font-weight: bold; color: #ff0000;';
				} else if (diff <= 25) {
					newData.contractExpirationStyle = 'font-weight: bold; color: #c00000;';
				} else if (diff <= 40) {
					newData.contractExpirationStyle = 'font-weight: bold; color: #900000;';
				}
			} else if (s = doc.match(/>Daily Salary:<.+?\$(\d+)/)) {
				newData.contractDaily = parseInt(s[1]);
				newData.contract = '$' + newData.contractDaily + '/day';
			}
			// fame
			if (s = doc.match(/ass="current_stats_fame".*?>(\d+(?:\s*<a href.+?<\/a>)?)</)) {
				newData.fameText = s[1];
				s = newData.fameText.match(/(\d+)/);
				newData.fame = parseInt(s[1]);
			}
			// cash
			if (s = doc.match(/ass="player_money">.+?\$(\d+)/)) {
				newData.cash = parseInt(s[1]);
			}
			// overall, morale, key stats
			if (as = doc.match(/rating_head">(.+?):?<.+?width:\s*(\d+)/g)) {
				av = 0;
				for each (a in as) {
					if (s = a.match(/rating_head">(.+?):?<.+?(rating_bar_fill_\d+).+?width:\s*(\d+)/)) {
						if (s[1] == 'Overall') {
							newData.overallClass = s[2];
							newData.overall = parseInt(s[3]);
						} else if (s[1] == 'Morale') {
							newData.moraleClass = s[2];
							newData.morale = parseInt(s[3]);
						} else if (s[1] == 'Energy') {
							newData.energyClass = s[2];
							newData.energy = parseInt(s[3]);
						} else {
							var n = s[1].replace('ing', '').replace('ense', '').replace(/Rece\S+/, 'Rec').replace('Tackl', 'Tackle').replace(/\s/g, '');
							var c = s[2];
							var v = parseInt(s[3]);
							if (av++ == 0) {
								newData.stat1Name = n;
								newData.stat1Class = c;
								newData.stat1Value = v;
							} else {
								newData.stat2Name = n;
								newData.stat2Class = c;
								newData.stat2Value = v;
							}
						}
					}
				}
			}
			// level, sp, tp, bt, st
			if (s = doc.match(/<td>(\d+)<\/td><td>(\d+)<\/td><td>(\d+)<\/td><td>(\d+)<\/td><td>(\d+)<\/td>/)) {
				newData.level = parseInt(s[1]);
				newData.sp = parseInt(s[2]);
				newData.tp = parseInt(s[3]);
				newData.bt = parseInt(s[4]);
				newData.st = parseInt(s[5]);
			}
			// xp
			if (s = doc.match(/Next Level:.+?(\d+)\/1000/)) {
				newData.xp = parseInt(s[1]);
			}
			// vp
			if (s = doc.match(/\/vet_skills\.pl\?player_id=\d+">(\d+)</)) {
				newData.vp = parseInt(s[1]);
			}
			// vxp
			// ??????????
			// ?? TODO ??
			// ??????????
			// nextGame & lastGame are unavailable on this page .. you have to reload the homepage to get those updated
			setCache('player', p.id, newData);
			for (s in newData) {
				p[s] = newData[s];
			}
			buildPlayerContent(p);
			sortPlayerList();
			dataLoadDone('player', p.id);
		}
	});
}

// Load team.pl // {{{2
function fetchTeamPage(t) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://goallineblitz.com/game/team.pl?team_id=' + t.teamId,
		headers: {
			'User-agent': navigator.userAgent,
			'Accept': 'text/xml',
		},
		onload: function(teamPage) {
//			GM_log('Fetched team.pl for team ' + t.teamId);
			var doc = teamPage.responseText.replace(/\n/g, '').replace(/\s\s+/g, ' ');
			var gotSome = false;
			var s = doc.match(/team_league"><a href="\/game\/league\.pl\?league_id=(\d+)">(.+?)<\/a>(.+?)conference_id=(\d+)">(.+?)<\/a>/);
			if (s) {
				t.leagueId = s[1];
				t.leagueName = s[2];
				t.leagueLabel = s[2].replace(/ League|[ae]stern |urope|ian|outh |merica/g, '').replace(' East', 'E').replace('Southeast Asia', 'SEA').replace('Pee Wee', 'PW').replace('Minors Lv ', 'Cap').replace('Casual Lv ', 'Cas').replace('Minors Uncapped', 'UnCap').replace(' #', '#');
				var sf = s[3];
				t.conferenceId = s[4];
				t.conferenceName = s[5];
				t.conferenceLabel = s[5].replace(' Conference', '').replace('ern','');
				gotSome = true;
				if (s = sf.match(/<a href="\/game\/forum_thread_list\.pl\?forum_id=(\d+).+?>(.+?)<\/a>/)) {
					t.leagueForumId = s[1];
					t.leagueForumIcon = s[2];
				}
			}
			if (s = doc.match(/<b>Record<\/b>: (.+?)<\/div>/)) {
				t.record = s[1].replace(/ place\)/, '').replace(' (', '|');
				if (s = t.record.match(/(.+?)\|(.+)/)) {
					t.record = s[2] + ' ' + s[1];
				}
				gotSome = true;
			}
			if (s = doc.match(/id="chemistry">.+?Overall.+?(rating_bar_fill_\d+)".+?>(\d+)<.+?Offense.+?(rating_bar_fill_\d+)".+?>(\d+)<.+?Defense.+?(rating_bar_fill_\d+)".+?>(\d+)</)) {
				t.chemOverallClass = s[1];
				t.chemOverall = parseInt(s[2]);
				t.chemOffenseClass = s[3];
				t.chemOffense = parseInt(s[4]);
				t.chemDefenseClass = s[5];
				t.chemDefense = parseInt(s[6]);
			}
			if (gotSome) {
				setCache('team', t.teamId, t);
				redrawAllPlayers();
				redrawAllTeams();
			}
			dataLoadDone('team', t.teamId);
		}
	});
}

// *** OPTIONS ********************************************************* {{{1
function toggleShowOptions(e) { // {{{2
	var tgt = document.getElementById('GLBHP_options_rows');
	var href = document.getElementById('GLBHP_options_toggleShow');
	if (tgt.style.display == 'none') {
		tgt.style.display = 'inline';
		tgt.style.visibility = 'visible';
		href.innerHTML = '(hide)';
	} else {
		tgt.style.display = 'none';
		tgt.style.visibility = 'hidden';
		href.innerHTML = '(show)';
	}
}

function changeOption(e) { // {{{2
	var evt = e || window.event;
	var tgt = evt.target || evt.srcElement;
	var opt = tgt.getAttribute('name');
	var s = opt.match(/^(.+?)\.(.+)$/);
	if (!s) {
		GM_log('changeOption() from input with unknown name ' + opt);
		return;
	}
	opt = s[2];
	s = s[1];
	if (show_var_defs[opt][0] == 'int') {
		show[s][opt] = parseInt(tgt.value);
	} else if (show_var_defs[opt][0] == 'boolean') {
		show[s][opt] = tgt.checked ? 1 : 0;
	}
	var mineOther = isMine ? 'Mine' : 'Other';
	GM_setValue('option_' + s + mineOther + '_' + opt, show[s][opt]);
	redrawAllTeams();
	installLoadPlayersLink();
	installSortOptions();
	/*
	buildPlayerListViewHead();
	*/
	redrawAllPlayers();
	updateBoostCost();
}

function installOptionsBoxen() { // {{{2
	// figure out table widths
	var tabExtra = {};
	var fields = {};
	var tabWidth = 6;
	for (var s in show) {
		fields[s] = [];
		for (var k in show[s]) {
			if (/^_/.test(k)) continue;
			fields[s].push(k);
		}
		var numRows = Math.ceil(fields[s].length / 6);
		tabExtra[s] = (tabWidth * numRows) - fields[s].length;
	}
	var cellWidth = Math.ceil(100 / 6);
	// build the table header
	var optBox = document.createElement('div');
	var div = document.createElement('div');
	div.setAttribute('class', 'medium_head');
	div.appendChild(document.createTextNode('Homepage Options'));
	div.appendChild(document.createTextNode(' '));
	var href = document.createElement('a');
	href.id = 'GLBHP_options_toggleShow';
	href.href = 'javascript:;';
	href.addEventListener('click', toggleShowOptions, true);
	href.appendChild(document.createTextNode('(show)'));
	div.appendChild(href);
	href = document.createElement('a');
	href.id = 'GLBHP_options_purgeCache';
	href.href = 'javascript:;';
	href.addEventListener('click', purgeCache, true);
	href.appendChild(document.createTextNode('Purge Cache'));
	div.appendChild(document.createTextNode(' :: '));
	div.appendChild(href);
	optBox.appendChild(div);
	// build the options rows
	div = document.createElement('div');
	div.id = 'GLBHP_options_rows';
	div.style.display = 'none';
	div.style.visibility = 'hidden';
	var table = document.createElement('table');
	table.setAttribute('width', '100%');
	var rowNum = 1;
	var mineOther = isMine ? 'Mine' : 'Other';
	for (var s in show) {
		row = document.createElement('tr');
		row.setAttribute('class', 'alternating_color' + rowNum);
		if (++rowNum > 2) rowNum = 1;
		cell = document.createElement('td');
		cell.setAttribute('colspan', tabWidth);
		cell.style.fontWeight = 'bold';
		cell.appendChild(document.createTextNode(show_defaults[s + mineOther]._LABEL_));
		row.appendChild(cell);
		table.appendChild(row);
		for (i = 0; i < fields[s].length; i++) {
			if (!(i % tabWidth)) {
				if (i > 0) table.appendChild(row);
				row = document.createElement('tr');
				row.setAttribute('class', 'alternating_color' + rowNum);
				if (++rowNum > 2) rowNum = 1;
			}
			var f = fields[s][i];
			cell = document.createElement('td');
			cell.style.width = cellWidth + '%';
			cell.style.fontSize = '10px';
			var span = document.createElement('span');
			span.setAttribute('onmouseover', "set_tip('" + show_var_defs[f][2].replace(/'/g,"\\'") + "', 0, 1, 1, 1)");
			span.setAttribute('onmouseout', "unset_tip()");
			var tmp = document.createElement('input');
			if (show_var_defs[f][0] == 'int') {
				tmp.type = 'text';
				tmp.size = 4;
				tmp.value = show[s][f];
			} else if (show_var_defs[f][0] == 'boolean') {
				tmp.type = 'checkbox';
				tmp.checked = show[s][f] ? 1 : 0;
			} else {
				GM_log('unknown show_var_defs type for ' + f + ': ' + show_var_defs[f][0]);
				continue;
			}
			tmp.setAttribute('name', s + '.' + f);
			tmp.id = 'GLBHP_option__' + s + '__' + f;
			var label = document.createElement('label');
			label.setAttribute('for', tmp.id);
			label.setAttribute('htmlFor', tmp.id);
			tmp.data = label.innerHTML = show_var_defs[f][1];
			tmp.addEventListener('change', changeOption, true);
			span.appendChild(tmp);
			span.appendChild(label);
			cell.appendChild(span);
			row.appendChild(cell);
		}
		if (tabExtra[s]) {
			cell = document.createElement('td');
			cell.setAttribute('colspan', tabExtra[s]);
			row.appendChild(cell);
		}
		table.appendChild(row);
	}
	div.appendChild(table);
	optBox.appendChild(div);
	// insert the node tree
	var container = document.getElementById('players_teams');
	var after = document.getElementById('teams');
	container.insertBefore(optBox, after);
}

function installLoadPlayersLink() { // {{{2
	var tmp = document.getElementById('GLBHP_load_players');
	if (isMine || (show.global.notmine == 1 && numPlayers <= show.global.max_players)) {
		if (tmp) tmp.parentNode.removeChild(tmp);
		return;
	} else if (tmp) {
		return;
	}
	var span = document.createElement('span');
	span.id = 'GLBHP_load_players';
	var a = document.createElement('a');
	a.href = 'javascript:;';
	a.addEventListener('click', forceLoadAllPlayers, true);
	a.appendChild(document.createTextNode('(load details)'));
	span.appendChild(a);
	var container = getElementsByClassName(/^medium_head$/, 'div', document)[0];
	container.appendChild(document.createTextNode(' '));
	container.appendChild(span);
}

// *** SORTING PLAYERS ************************************************* {{{1
function sortPlayerList() { // {{{2
// onChange for the 'Sort By' selection
	var sortType2Key = {
		'Alphabetical':		'name',
		'Bonus Tokens':		'bt',
		'Boosts Available':	'boostAvail',
		'Cash':				'cash',
		'Contract Exp':		'contractExpirationCounter',
		'Contract Value':	'contractDaily',
		'Energy':			'energy',
		'Fame':				'fame',
		'Level':			'level',
		'Morale':			'morale',
		'Next Game':		'nextGameTimer',
		'Overall':			'overall',
		'Position':			'pos',
		'Shopping Tokens':	'st',
		'Skill Points':		'sp',
		'Team':				'teamName',
		'Training Points':	'tp',
		'VXP':				'vxp',
		'VA Points':		'vp',
		'XP':				'xp',
		'Date Created':		'origIndex',
	};
	var x, y;
	var sel;
	sel = document.getElementById('plSortType1');
	var sortType = sel.options[sel.selectedIndex].value;
	sel = document.getElementById('plSortDir1');
	var sortDir = sel.options[sel.selectedIndex].value;
	var sortKey = sortType2Key[sortType] || 'origIndex';
	sel = document.getElementById('plSortType2');
	var secondarySortType = sel.options[sel.selectedIndex].value;
	sel = document.getElementById('plSortDir2');
	var secondarySortDir = sel.options[sel.selectedIndex].value;
	var secondarySortKey = sortType2Key[secondarySortType] || 'name';
	var pfx = (isMine == false) ? 'OtherAgent' : 'My';
	GM_setValue(pfx + 'SortType', sortType);
	GM_setValue(pfx + 'SortDir', sortDir);
	GM_setValue(pfx + 'SortType_2', secondarySortType);
	GM_setValue(pfx + 'SortDir_2', secondarySortDir);
	unSetupReloadPlayer(); // otherwise it reloads images.. ugh!
	// The bubble sort method
	var sortDebug = 0;
	var note = '';
	var checkUndef = function(a, b, c) {
		if (sortDebug) note += 'comparing a=' + a + ' b=' + b + ' (c=' + c + ')' + "\n";
		return ((b == undefined) ? 0 : (a == undefined) ? 1 : c);
	};
	var sortCmp = {
		'Ascending':	function(a, b) { return checkUndef(a, b, ((a > b) ? 1 : 0)); },
		'Descending':	function(a, b) { return checkUndef(a, b, ((a < b) ? 1 : 0)); },
	}
	var holder;
	x = pData.length;
	var doswap, swapped;
	do {
		swapped = false;
		x--;
		if (sortDebug) note = 'x = ' + x + "\n";
		for (y = 0; y < x; y++) {
			doswap = false;
			if (pData[y][sortKey] == pData[y+1][sortKey]) {
				if (pData[y][secondarySortKey] == pData[y+1][secondarySortKey]) {
					if ((sortCmp.Ascending)(pData[y]['name'], pData[y+1]['name'])) {
						note += "\n" + 'y = ' + y + ' - NAME: swapping ' + pData[y]['name'] + ' and ' + pData[y+1]['name'] + "\n";
						doswap = true;
					}
				} else if ((sortCmp[secondarySortDir])(pData[y][secondarySortKey], pData[y+1][secondarySortKey])) {
					note += "\n" + 'y = ' + y + ' - PRIOR: swapping ' + pData[y]['name'] + ' and ' + pData[y+1]['name'] + "\n";
					doswap = true;
				} else {
					note += "\n" + 'y = ' + y + ' - NOT SWAPPING[1]: ' + pData[y]['name'] + ' and ' + pData[y+1]['name'] + "\n";
				}
			} else if ((sortCmp[sortDir])(pData[y][sortKey], pData[y+1][sortKey])) {
				note += "\n" + 'y = ' + y + ' - CURRENT: swapping ' + pData[y]['name'] + ' and ' + pData[y+1]['name'] + "\n";
				doswap = true;
			} else {
				note += "\n" + 'y = ' + y + ' - NOT SWAPPING[2]: ' + pData[y]['name'] + ' and ' + pData[y+1]['name'] + "\n";
			}
			if (doswap == true) {
				// div.className
				holder = pData[y+1].div.className;
				pData[y+1].div.className = pData[y].div.className;
				pData[y].div.className = holder;
				// div.innerHTML
				holder = pData[y+1].div.innerHTML;
				pData[y+1].div.innerHTML = pData[y].div.innerHTML;
				pData[y].div.innerHTML = holder;
				// div
				holder = pData[y+1].div;
				pData[y+1].div = pData[y].div;
				pData[y].div = holder;
				/*
				// listViewRow.innerHTML
				holder = pData[y+1].listViewRow.innerHTML;
				pData[y+1].listViewRow.innerHTML = pData[y].listViewRow.innerHTML;
				pData[y].listViewRow.innerHTML = holder;
				// listViewRow
				holder = pData[y+1].listViewRow;
				pData[y+1].listViewRow = pData[y].listViewRow;
				pData[y].listViewRow = holder;
				*/
				// playerObj
				holder = pData[y+1];
				pData[y+1] = pData[y];
				pData[y] = holder;
				swapped = true;
			}
		}
		if (sortDebug) GM_log(note);
	} while (swapped == true);
	setupReloadPlayer();
}

var playerListViewSortKey = { // {{{2
	num: 'Date Created',
	name: 'Alphabetical',
	level: 'Level',
	pos: 'Position',
	boost: 'Boosts Available',
	team: 'Team',
	xp: 'XP',
	vxp: 'VXP',
	cash: 'Cash',
	sp: 'Skill Points',
	vp: 'VA Points',
	tp: 'Training Points',
	bonus: 'Bonus Tokens',
	shop: 'Shopping Tokens',
	lastGame: undefined,
	nextGame: 'Next Game',
	energy: 'Energy',
	morale: 'Morale',
	contract: 'Contract Exp',
	fame: 'Fame',
	overall: 'Overall',
	scout_bars: undefined,
	attributes: undefined,
};

function sortPlayerListView(e) { // {{{2
	var evt = e || window.event;
	var tgt = evt.target || evt.srcElement;
	if (tgt.nodeName != 'TD') {
		GM_log('wtf tgt.nodeName = ' + tgt.nodeName);
		return;
	}
	var s = tgt.id.match(/^GLBHP_listView_head_(.+)$/);
	var label = s[1];
	var sortKey = playerListViewSortKey[label];
	if (sortKey == undefined) return;
	var sel = document.getElementById('plSortType1');
	var sortType = sel.options[sel.selectedIndex].value;
	if (sortType == sortKey) {
		sel = document.getElementById('plSortDir1');
		sel.selectedIndex = (sel.selectedIndex == 1) ? 0 : 1;
	} else {
		for (var i = 0; i < sel.options.length; i++) {
			if (sel.options[i].value == sortKey) {
				sel.selectedIndex = i;
				break;
			}
		}
	}
	sortPlayerList();
}

function installSortOptions() { // {{{2
	var tmp = document.getElementById('GLBHP_player_sort');
	if (show.global.sort == 0) {
		if (tmp) tmp.parentNode.removeChild(tmp);
		return;
	} else if (tmp) {
		return;
	}
	// load saved sort
	var pfx;
	var sortTypes;
	if (isMine == true) {
		pfx = 'My';
		sortTypes = [
			'Alphabetical',
			'Bonus Tokens',
			'Boosts Available',
			'Cash',
			'Contract Exp',
			'Contract Value',
			'Date Created',
			'Energy',
			'Fame',
			'Level',
			'Morale',
			'Next Game',
			'Overall',
			'Position',
			'Shopping Tokens',
			'Skill Points',
			'Team',
			'Training Points',
			'VA Points',
			'VXP',
			'XP'
		];
	} else {
		pfx = 'OtherAgent';
		sortTypes = [
			'Alphabetical',
			'Contract Exp',
			'Contract Value',
			'Date Created',
			'Fame',
			'Level',
			'Next Game',
			'Overall',
			'Position',
			'Team',
		];
	}
	var savedSortType = GM_getValue(pfx + 'SortType', 'Level');
	var savedSortDir = GM_getValue(pfx + 'SortDir', 'Descending');
	var savedSecondarySortType = GM_getValue(pfx + 'SortType_2', 'Alphabetical');
	var savedSecondarySortDir = GM_getValue(pfx + 'SortDir_2', 'Ascending');
	var div = document.createElement('div');
	div.id = 'GLBHP_player_sort';
	div.appendChild(document.createTextNode('Sort by '));
	function mksel(id) {
		var out = document.createElement('select');
		out.id = id;
		out.style.fontWeight = 'normal';
		out.addEventListener('change', sortPlayerList, true);
		return out;
	}
	// sortType options -- primary
	var s = mksel('plSortType1');
	tmp = '';
	for(var i = 0; i < sortTypes.length; i++) {
		var sel = (sortTypes[i] == savedSortType) ? ' selected="selected">' : '>';
		tmp += '<option value="' + sortTypes[i] + '"' + sel + sortTypes[i] + '</option>';
	}
	s.innerHTML = tmp;
	div.appendChild(s);
	// sortDir options -- primary
	s = mksel('plSortDir1');
	s.innerHTML = '<option value="Descending">Descending</option><option value="Ascending">Ascending</option>';
	if (savedSortDir != '0') {
		s.options[(savedSortDir == 'Ascending') ? 1 : 0].selected = true;
	}
	div.appendChild(s);
	div.appendChild(document.createTextNode(' then by '));
	// sortType options -- secondary
	s = mksel('plSortType2');
	tmp = '';
	for(var i = 0; i < sortTypes.length; i++) {
		var sel = (sortTypes[i] == savedSecondarySortType) ? ' selected="selected">' : '>';
		tmp += '<option value="' + sortTypes[i] + '"' + sel + sortTypes[i] + '</option>';
	}
	s.innerHTML = tmp;
	div.appendChild(s);
	// sortDir options -- secondary
	s = mksel('plSortDir2');
	s.innerHTML = '<option value="Descending">Descending</option><option value="Ascending">Ascending</option>';
	if (savedSortDir != '0') {
		s.options[(savedSecondarySortDir == 'Ascending') ? 1 : 0].selected = true;
	}
	div.appendChild(s);
	div.className = 'medium_head';
	var sib = document.getElementById('players');
	sib.parentNode.insertBefore(div, sib);
}

// *** UTILITY ********************************************************* {{{1
function infoAvailable(label) { // {{{2
	return isMine ? true : {
		num: true,
		pos: true,
		name: true,
		level: true,
		boost: false,
		team: true,
		xp: false,
		vxp: false,
		cash: false,
		sp: false,
		vp: false,
		tp: false,
		bonus: false,
		shop: false,
		lastGame: true,
		nextGame: true,
		energy: false,
		morale: false,
		contract: true,
		fame: true,
		overall: true,
		scout_bars: true,
		attributes: true,
	}[label];
}

function getRatingBar(nam, fill, val, width) { // {{{2
	var containerWidth = {
		small: 65,
		medium: 120,
		large: 320,
	}[width];
	var ratingBarWidth = Math.round(val * (containerWidth-5) / 100);
	var cs = (width == 'small') ? 3 : (width == 'medium') ? 5 : 11;
	var bar = document.createDocumentFragment();
	var cell = document.createElement('td');
	cell.style.fontSize = '12px';
	cell.style.fontWeight = 'bold';
	cell.appendChild(document.createTextNode(nam + ':'));
	bar.appendChild(cell);
	cell = document.createElement('td');
	cell.setAttribute('colspan', cs);
	var outerDiv = document.createElement('div');
	outerDiv.setAttribute('class', 'rating_bar');
	outerDiv.style.width = containerWidth + 'px';
	outerDiv.style.height = '12px';
	outerDiv.style.marginTop = '0px';
	var innerDiv = document.createElement('div');
	innerDiv.setAttribute('class', 'rating_bar_fill ' + fill);
	innerDiv.style.height = '10px';
	innerDiv.style.lineHeight = '10px';
	innerDiv.style.maxWidth = containerWidth + 'px';
	innerDiv.style.width = ratingBarWidth + 'px';
	innerDiv.innerHTML = val;
	outerDiv.appendChild(innerDiv);
	cell.appendChild(outerDiv);
	bar.appendChild(cell);
	return bar;
}

function newMatchup(teamId, gameDay, where, link, oppTeam, when) { // {{{2
	var ng = matchups[teamId];
	if (ng != undefined) return;
	ng = {};
	matchups[teamId] = ng;
	ng.where = where;
	ng.link = link.replace(/&amp;/g, '&');
	ng.oppTeam = oppTeam;
	ng.teamId = teamId;
	ng.origText = gameDay + ng.where + ' <a href="' + ng.link + '">' + ng.oppTeam + '</a> (in ' + when + ')';
	ng.timer = new Date();
	var now = new Date();
	var t;
	if (t = when.match(/^(\d+):(\d+):(\d+)/)) {
		ng.timer.setHours(now.getHours() + parseInt(t[1]));
		ng.timer.setMinutes(now.getMinutes() + parseInt(t[2]));
		ng.timer.setSeconds(now.getSeconds() + parseInt(t[3]) + 2);
	} else if (t = when.match(/^(\d+):(\d+)/)) {
		ng.timer.setMinutes(now.getMinutes() + parseInt(t[1]));
		ng.timer.setSeconds(now.getSeconds() + parseInt(t[2]) + 2);
	} else { // give up -- good enough to sort by?
		ng.timer.setSeconds(now.getSeconds() + parseInt(when) + 2);
	}
	fetchCached('compare_teams', teamId, ng);
}

function setNextGame(teamId) { // {{{2
	var ng = matchups[teamId];
	if (ng == undefined) return;
	var out = '';
	var outShort = '';
	if (show.global.countdown != 1 && show.global.org_ng_txt) {
		out += ng.origText;
	} else {
		var t = ng.timer.getTime() - new Date().getTime();
		if (t < 0) {
			out += '<span style="font-size:10px">(game over; <a href="javascript:window.location.reload();">refresh</a>)</span>';
			outShort += '<span style="font-size:10px"><a href="javascript:window.location.reload();">refresh</a></span>';
		} else {
			out += 'in ';
			outShort += '<a href="' + ng.link + '">';
			t = Math.floor(t / 1000);
			ng.secsTil = t;
			if (t > 86400) {
				var days = Math.floor(t / 86400);
				t -= Math.floor(t / 86400) * 86400;
				out += days + '+';
				outShort += days + '+';
			}
			out += Math.floor(t / 3600) + ':';
			outShort += Math.floor(t / 3600) + ':';
			t -= Math.floor(t / 3600) * 3600;
			out += (((t / 60) < 10) ? '0' : '') + Math.floor(t / 60);
			outShort += (((t / 60) < 10) ? '0' : '') + Math.floor(t / 60);
			t -= Math.floor(t / 60) * 60;
			out += ':' + ((t < 10) ? '0' : '') + t;
			outShort += '</a>';
		}
		out += ' ' + ng.where + ' <a href="' + ng.link + '">' + ng.oppTeam + '</a>';
	}
	if (show.global.spread) {
		if (ng.spread == undefined) {
			fetchCached('compare_teams', teamId, ng);
		} else {
			out += ' (' + ng.spread + ')';
		}
	}
	ng.htmlShort = outShort;
	ng.html = out;
}

function redrawNextGame(obj) { // {{{2
	var cell = document.getElementById(mkid(obj, 'next_game'));
	if (cell != undefined) {
		if (obj.teamId == undefined || matchups[obj.teamId] == undefined || matchups[obj.teamId].html == undefined) {
			// cell.innerHTML = 'None';
			cell.parentNode.style.display = 'none';
			cell.parentNode.style.visibility = 'hidden';
		} else {
			if (cell.parentNode.nodeName == 'TR') {
				cell.parentNode.style.display = 'table-row';
			} else {
				cell.parentNode.style.display = 'inline';
			}
			cell.parentNode.style.visibility = 'visible';
			obj.nextGameTimer = matchups[obj.teamId].secsTil;
			cell.innerHTML = matchups[obj.teamId].html;
		}
	}
	cell = document.getElementById('GLBHP_listView_pcell_' + obj.id + '_nextGame');
	if (cell != undefined) {
		if (obj.teamId == undefined || matchups[obj.teamId] == undefined || matchups[obj.teamId].html == undefined) {
			cell.innerHTML = '-';
		} else {
			obj.nextGameTimer = matchups[obj.teamId].secsTil;
			cell.innerHTML = matchups[obj.teamId].htmlShort;
		}
	}
}

function updateClocks(t) { // {{{2
	if (t != undefined && t > 0) {
		setNextGame(t);
		for each (var ob in pData) {
			if (ob.teamId == t) redrawNextGame(ob);
		}
		for each (var ob in tData) {
			if (ob.teamId == t) redrawNextGame(ob);
		}
		return;
	}
	if (show.global.countdown == 1) {
		for (var teamId in matchups) {
			setNextGame(teamId);
		}
		for each (var ob in pData) {
			redrawNextGame(ob);
		}
		for each (var ob in tData) {
			redrawNextGame(ob);
		}
	}
	window.setTimeout(updateClocks, 1000, 0);
}

function updateBoostCost() { // {{{2
	if (isMine == false) return;
	if (boostCostCell == undefined) {
		if (!show.global.boost_cost) return;
		var inboxRow = document.getElementById('message_buttons').parentNode;
		var boostRow = document.createElement('tr');
		var cell = document.createElement('td');
		cell.className = 'account_head';
		cell.appendChild(document.createTextNode('Boost Cost:'));
		boostRow.appendChild(cell);
		boostCostCell = document.createElement('td');
		boostCostCell.className = 'account_value';
		boostRow.appendChild(boostCostCell);
		inboxRow.parentNode.insertBefore(boostRow, inboxRow);
	}
	if (!show.global.boost_cost) {
		boostCostCell.parentNode.parentNode.removeChild(boostCostCell.parentNode);
		boostCostCell = undefined;
		return;
	}
	var totalCost = 0;
	var remainingCost = 0;
	for each (var p in pData) {
//		GM_log(p.name + ': ' + p.boostAvail);
		var pCost = posBoostCost[p.pos] * 100;
		totalCost += pCost * 3;
		if (p.boostAvail != undefined) {
			remainingCost += pCost * p.boostAvail;
		} else {
			remainingCost += pCost * 3;
		}
	}
	boostCostCell.innerHTML = totalCost + ' (' + remainingCost + ' left)';
}

// *** TEAM ************************************************************ {{{1
function loadTeam(teamId, ownedOrGMed) { // {{{2
	var t = tData[teamId];
	if (t == undefined) {
		t = {};
		t.teamId = teamId;
		t.ownedOrGMed = ownedOrGMed;
		t.id = 't' + teamId; // keep it unique from player id's
		tData[teamId] = t;
	}
	fetchCached('team', teamId, t);
	return t;
}

function redrawAllTeams() { // {{{2
	var view_style_div = getElementsByClassName(/^view_style$/, 'div', document)[0];
	var team_view_select = view_style_div.getElementsByTagName('form')[0].getElementsByTagName('select')[0];
	var team_view_value = team_view_select.options[team_view_select.selectedIndex].value;
	var teams = getElementsByClassName((team_view_value == 'card') ? /^team_name_container$/ : /^large_title_bar teamhead$/, 'div', document);
	if (!teams) return;
	var team_data = getElementsByClassName((team_view_value == 'card') ? /^team_data$/ : /^team_data_simple$/, 'div', document);
	if (!team_data) return;
	for (var i = 0; i < teams.length; i++) {
		var teamId = parseInt(teams[i].innerHTML.substring(teams[i].innerHTML.indexOf('team_id=') + 8, teams[i].innerHTML.indexOf('">')));
		// record & chemistry
		var tmp = document.getElementById(mkid({id:teamId}, 'record_chem'));
		if (tmp) tmp.parentNode.removeChild(tmp);
		if (show.gridViewTeam.record || show.gridViewTeam.chemistry) {
			var t = loadTeam(teamId, true);
			var rec = 0;
			var chem = 0;
			if (show.gridViewTeam.record && t != undefined && t.record != undefined) {
				rec = document.createElement('span');
				rec.id = mkid({id:teamId}, 'record');
				rec.innerHTML = '<b>Rank:</b> ' + t.record;
			}
			if (show.gridViewTeam.chemistry && t != undefined && t.chemOverall != undefined) {
				chem = document.createElement('span');
				chem.id = mkid({id:teamId}, 'chemistry');
				chem.innerHTML = '<b>Chem:</b> ' + t.chemOverall + '/' + t.chemOffense + '/' + t.chemDefense;
			}
			if (rec || chem) {
				tmp = document.createElement('span');
				tmp.id = mkid({id:teamId}, 'record_chem');
				tmp.appendChild(document.createTextNode(' - '));
				if (rec) tmp.appendChild(rec);
				if (rec && chem) tmp.appendChild(document.createTextNode(' - '));
				if (chem) tmp.appendChild(chem);
				var container = getElementsByClassName(/^team_cash$/, 'div', team_data[i])[0];
				container.appendChild(tmp);
			}
		}
		// teamlinks
		var tmp = document.getElementById(mkid({id:teamId}, 'links'));
		var leagueForumLink = document.getElementById(mkid({id:teamId}, 'forum_link'));
		if (show.gridViewTeam.teamlinks) {
			if (tmp) {
				tmp.style.display = 'inline';
				tmp.style.visibility = 'visible';
			} else {
				team_data[i].innerHTML = '<span id="' + mkid({id:teamId}, 'links') + '" style="font-weight:bold; font-size:10px;">'
					+ '<a href="/game/roster.pl?team_id=' + teamId + '">Roster</a>'
					+ ' | <a href="/game/depth_chart.pl?team_id=' + teamId + '">Depth</a>'
                                        + ' | <a href="/game/team_offensive_playbook.pl?team_id=' + teamId + '">Off. Playbook</a>'
                                        + ' | <a href="/game/team_create_defense.pl?team_id=' + teamId + '">D Plays</a>'
                                        + ' | <a href="/game/team_package.pl?team_id=' + teamId + '">AI Packages</a>'
                                        + ' | <a href="/game/team_offense_ai.pl?team_id=' + teamId + '">OAI</a>'
                                        + ' | <a href="/game/team_defense_ai.pl?team_id=' + teamId + '">DAI</a>'
					+ '<br /></span>' + team_data[i].innerHTML;
			}
			team_data[i].style.paddingTop = '1px';
			team_data[i].style.paddingBottom = '1px';
			for each (var div in getElementsByClassName(/^team_(?:league|cash|next_game)$/, 'div', team_data[i])) {
				div.style.marginBottom = '0px';
			}
			if (leagueForumLink) {
				leagueForumLink.style.display = 'inline';
				leagueForumLink.style.visibility = 'visible';
			} else {
				var t = loadTeam(teamId, true);
				if (t.leagueForumId != undefined) {
					leagueForumLink = '<span id="' + mkid({id:teamId}, 'forum_link') + '"><a href="/game/forum_thread_list.pl?forum_id=' + t.leagueForumId + '">' + t.leagueForumIcon + '</a></span>';
					var leagueDiv = getElementsByClassName(/^team_league$/, 'div', team_data[i]);
					if (leagueDiv != undefined) {
						leagueDiv[0].innerHTML = leagueDiv[0].innerHTML.replace('</a> (<a', '</a>' + leagueForumLink + ' (<a');
					}
				}
			}
		} else if (tmp || leagueForumLink) {
			if (tmp) {
				tmp.style.display = 'none';
				tmp.style.visibility = 'hidden';
			}
			team_data[i].style.paddingTop = '5px';
			team_data[i].style.paddingBottom = '5px';
			for each (var div in getElementsByClassName(/^team_(?:league|cash|next_game)$/, 'div', team_data[i])) {
				div.style.marginBottom = '3px';
			}
			if (leagueForumLink) {
				leagueForumLink.style.display = 'none';
				leagueForumLink.style.visibility = 'hidden';
			}
		}
	}
}

function loadAllTeams() { // {{{2
	var view_style_div = getElementsByClassName(/^view_style$/, 'div', document)[0];
	var team_view_select = view_style_div.getElementsByTagName('form')[0].getElementsByTagName('select')[0];
	var team_view_value = team_view_select.options[team_view_select.selectedIndex].value;
	var teams = getElementsByClassName((team_view_value == "card") ? /^team_content$/ : /^content_container team_simple$/, 'div', document);
	numTeams = teams.length;
	for each (var team in teams) {
//		team.style.height = 'auto';
		for each (var n in getElementsByClassName(/^team_next_game$/, 'div', team)) {
			if (s = n.innerHTML.match(/(.+?<\/b>\s*)(.+?)(at|vs)\s*<a href="([^"]+)">(.+?)<.+?\(in\s*(.+?)\)/)) {
				/=(\d+)$/.test(s[4]);
				var teamId = parseInt(RegExp.lastParen);
				newMatchup(teamId, s[2], s[3], s[4], s[5], s[6]);
				var t = loadTeam(teamId, true);
				n.innerHTML = s[1] + '<span id="' + mkid(t, 'next_game') + '"></span>';
				updateClocks(teamId);
			}
		}
	}
}

// *** PLAYER ********************************************************** {{{1
var playerListViewHeads = { // {{{2
	num: '#',
	name: 'Name',
	level: 'Lv',
	pos: 'Po',
	boost: 'B',
	team: 'Tm',
	xp: 'XP',
	vxp: 'VXP',
	cash: 'Cash',
	sp: 'SP',
	vp: 'VP',
	tp: 'TP',
	bonus: 'BT',
	shop: 'ST',
	lastGame: 'Last',
	nextGame: 'Next',
	energy: 'En',
	morale: 'Mo',
	contract: 'Contract',
	fame: 'Fm',
	overall: 'Ov',
	scout_bars: 'Scout',
	attributes: 'Attributes',
};

var playerListViewVals = { // {{{2
	num:		function(p) { return p.origIndex + 1; },
	name:		function(p) { return '<a href="/game/player.pl?player_id=' + p.id + '" style="overflow: hidden; display: block; float: left; max-width: 400px; height: 20px;">' + p.name + '</a>'; },
	level:		function(p) { return p.level; },
	pos:		function(p) { return p.pos; },
	boost:		function(p) { return p.boostAvail ? '<a href="/game/boost_player.pl?player_id=' + p.id + '" style="color:#0000ff;">' + p.boostAvail + '</a>' : 0; },
	team:		function(p) { return p.teamId ? '<a href="/game/team.pl?team_id=' + p.teamId + '">' + p.teamName.replace(/^.+$/, /^.../.exec(p.teamName).toString().toUpperCase().replace(/\s+/g, '')) + '</a>' : 'None'; },
	xp:			function(p) { return p.xp; },
	vxp:		function(p) { return p.vxp ? p.vxp : p.level < 25 ? '-' : 0; },
	cash:		function(p) { return p.cash >= 10000000 ? parseInt(p.cash / 1000000) + 'M' : p.cash >= 10000 ? parseInt(p.cash / 1000) + 'K' : p.cash; },
	sp:			function(p) { return '<a href="/game/skill_points.pl?player_id=' + p.id + '"' + (p.sp >= 1 ? ' style="color:#0000ff;"' : '') + '>' + p.sp + '</a>'; },
	vp:			function(p) { return p.vp ? '<a href="/game/vet_skills.pl?player_id=' + p.id + '" style="color:#0000ff;">' + p.vp + '</a>' : 0; },
	tp:			function(p) { return '<a href="/game/training.pl?player_id=' + p.id + '"' + (p.tp >= 5 ? ' style="color:#0000ff;"' : p.tp >= 2 ? ' style="color:#007f00;"' : '') + '>' + p.tp + '</a>'; },
	bonus:		function(p) { return p.bt >= 4 ? '<a href="/game/bonus_tokens.pl?player_id=' + p.id + '"' + (p.bt >= 8 ? ' style="color:#0000ff;"' : p.bt >= 4 ? ' style="color:#007f00;"' : '') + '>' + p.bt + '</a>' : p.bt || 0; },
	shop:		function(p) { return '<a href="/game/adv_equipment.pl?player_id=' + p.id + '"' + (p.st >= 1 ? ' style="color:#0000ff;"' : '') + '>' + p.st + '</a>'; },
	lastGame:	function(p) {
		var lg = p.lastGame;
		if (lg.match(/<div id="watch_player_\d+"><a href="\/game\/game\.pl\?game_id=.+?Watch<\/a>.+?<\/a>.+?<\/a><\/div>/)) { // scores hidden
			lg = lg.replace('Watch', 'W').replace('Show Score', 'Show').replace(/>[\s\n\r]+/g, '>').replace(/[\s\n\r]+</g, '<');
		}
		var s = lg.match(/(>[WL] \d+-\d+).+?</);
		if (s) {
			lg = lg.replace(s[0], s[1].replace(/[\s\n\r]/g, '&nbsp;') + '<');
		}
		return lg;
	},
	nextGame:	function(p) { return undefined; },
	energy:		function(p) { return p.energy; },
	morale:		function(p) { return p.morale; },
	contract:	function(p) {
		var exp = p.contractExpirationSeason + ':' + p.contractExpirationDay;
		if (p.contractExpirationStyle != undefined) {
			exp = '<span style="' + p.contractExpirationStyle + '">' + exp + '</span>';
		}
		return (p.contractDaily >= 10000 ? parseInt(p.contractDaily / 1000) + 'K' : p.contractDaily) + '/' + exp;
	},
	fame:		function(p) { return p.fameText; },
	overall:	function(p) { return p.overall; },
	scout_bars:	function(p) { return p.stat1Value == undefined ? undefined : p.stat2Value == undefined ? p.stat1Value : p.stat1Value + ' ' + p.stat2Value; },
	attributes:	function(p) { return p.attributes || '&lt;build closed&gt;'; },
};

function buildPlayerListViewCell(label, p) { // {{{2
	if (!infoAvailable(label)) return;
	var cell = document.getElementById('GLBHP_listView_pcell_' + p.id + '_' + label);
	if (cell == undefined) {
		GM_log('pcell ' + p.name + ' -> ' + p.id + '_' + label + ' not found!');
		return;
	}
	if (show.listViewPlayer[label] != undefined && show.listViewPlayer[label] != 1) {
		cell.style.display = 'none';
		cell.style.visibility = 'hidden';
		return;
	}
	cell.style.display = 'table-cell';
	cell.style.visibility = 'visible';
	var val = playerListViewVals[label](p);
	if (val != undefined) {
		cell.innerHTML = val;
	}
}

function buildPlayerListViewRow(p) { // {{{2
	var prow = p.listViewRow;
	if (prow == undefined) { // SHOULD NOT HAPPEN!
		GM_log('prow ' + p.name + ' not found!');
		return;
	}
	var i = 0;
	for (var row in prow.parentNode.getElementsByTagName('tr')) {
		row.className = 'alternating_color' + (i + 1);
		i = i ? 0 : 1;
	}
	for (var label in playerListViewVals) {
		buildPlayerListViewCell(label, p);
	}
}

function createPlayerListViewRow(p) { // {{{2
	var prow = p.listViewRow;
	if (prow == undefined) {
		prow = document.createElement('tr');
		p.listViewRow = prow;
		prow.className = 'alternating_color' + ((p.origIndex % 2) + 1);
//		prow.id = 'GLBHP_listView_prow_' + p.id;
		for (var label in playerListViewVals) {
			if (!infoAvailable(label)) continue;
			var cell = document.createElement('td');
			cell.id = 'GLBHP_listView_pcell_' + p.id + '_' + label;
			/*
			cell.innerHTML = playerListViewVals[label](p);
			cell.style.display = 'table-cell';
			cell.style.visibility = 'visible';
			*/
			prow.appendChild(cell);
		}
	}
	return prow;
}

function setupPlayerListViewHeadSorting() { // {{{2
	for (var label in playerListViewHeads) {
		if (!infoAvailable(label)) continue;
		if (playerListViewSortKey[label] == undefined) continue;
		var phcell = document.getElementById('GLBHP_listView_head_' + label);
		if (phcell == undefined) {
			GM_log('sPLVHS: phcell ' + label + ' not found!');
			continue;
		}
		phcell.addEventListener('click', sortPlayerListView, false);
		phcell.style.cursor = 'pointer';
	}
}

function buildPlayerListViewHead() { // {{{2
	for (var label in playerListViewHeads) {
		if (!infoAvailable(label)) continue;
		var phcell = document.getElementById('GLBHP_listView_head_' + label);
		if (phcell == undefined) {
			GM_log('phcell ' + label + ' not found!');
			continue;
		}
		if (show.listViewPlayer[label] != undefined && show.listViewPlayer[label] != 1) {
			phcell.style.display = 'none';
			phcell.style.visibility = 'hidden';
			continue;
		}
		phcell.style.display = 'table-cell';
		phcell.style.visibility = 'visible';
	}
}

/*
function installPlayerListViewTable() { // {{{2
	var pdiv = document.createElement('div');
	pdiv.id = 'GLBHP_players_list';
	var ptab = document.createElement('table');
	ptab.className = 'players';
	ptab.id = 'GLBHP_players_list_table';
	ptab.style.width = '100%';
	var phead = document.createElement('tr');
	phead.className = 'nonalternating_color';
	phead.id = 'GLBHP_listView_head';
	for (var label in playerListViewHeads) {
		if (!infoAvailable(label)) continue;
		var cell = document.createElement('td');
		cell.id = 'GLBHP_listView_head_' + label;
		cell.innerHTML = playerListViewHeads[label];
		phead.appendChild(cell);
		if (show.listViewPlayer[label] != undefined && show.listViewPlayer[label] != 1) {
			cell.style.display = 'none';
			cell.style.visibility = 'hidden';
		}
	}
	ptab.appendChild(phead);
	pdiv.appendChild(ptab);
	var div = document.getElementById('players')
	div.insertBefore(pdiv, div.firstChild.nextSibling.nextSibling);
}
*/

function reloadPlayer(e) { // {{{2
	var evt = e || window.event;
	var tgt = evt.target || evt.srcElement;
	if (tgt.nodeName != 'IMG') {
		tgt = tgt.getElementsByTagName('img')[0];
	}
	if (e = tgt.src.match(/player_id=(\d+)/)) {
		var playerId = parseInt(e[1]);
		for each (var p in pData) {
			if (p.id == playerId) {
//				GM_log('Reloading ' + p.name);
				loadPlayerAnyway[p.id] = true;
				if (cache.player[p.id] != undefined) delete cache.player[p.id];
				if (cache.boost_player[p.id] != undefined) delete cache.boost_player[p.id];
				fetchCached('player', p.id, p);
				fetchCached('boost_player', p.id, p);
				if (p.teamId && matchups[p.teamId] != undefined) {
					if (cache.compare_teams[p.teamId] != undefined) delete cache.compare_teams[p.teamId];
					fetchCached('compare_teams', p.teamId, matchups[p.teamId]);
				}
			}
		}
	}
}

function unSetupReloadPlayer() { // {{{2
	for each (var p in pData) {
		var imgDiv = getElementsByClassName(/^player_photo$/, 'div', p.div)[0];
		imgDiv.removeEventListener('click', reloadPlayer, false);
		imgDiv.style.cursor = 'auto';
	}
}

function setupReloadPlayer() { // {{{2
	for each (var p in pData) {
		var imgDiv = getElementsByClassName(/^player_photo$/, 'div', p.div)[0];
		imgDiv.addEventListener('click', reloadPlayer, false);
		imgDiv.style.cursor = 'pointer';
	}
}

function extractPlayerStatsFromHomePage(player) { // {{{2
	var pdoc = player.innerHTML.replace(/\n/g, '').replace(/\s\s+/g, ' ');
	var out = { div: player };
	// playerId, position, name
	var s = pdoc.split(/ass="position ([^"]+)".+?yer_id=(\d+).+?>(.+?)<\/a>/);
	out.pos = s[1];
	out.id = s[2];
	out.name = s[3];
	if (!out.id) return undefined;
	// level
	s = />Lv\.\s*(\d+)/.test(pdoc);
	out.level = parseInt(RegExp.lastParen);
	// xp
	if (s = />\s*(\d+)\/1000\s*XP/.test(pdoc)) {
		out.xp = parseInt(RegExp.lastParen);
	}
	// vxp
	if (s = />\s*(\d+)\/1000\s*VXP/.test(pdoc)) {
		out.vxp = parseInt(RegExp.lastParen);
	}
	// team: id and name
	var teamId = 0;
	if (s = pdoc.split(/\/team\.pl\?team_id=(\d+).*?>(.+?)<\/a>/)) {
		out.teamId = teamId = parseInt(s[1]);
		out.teamName = s[2];
		loadTeam(teamId, false);
	}
	// skill points
	out.sp = 0;
	if (/id="level_button"><div>(\d+)/.test(pdoc)) {
		out.sp = parseInt(RegExp.lastParen);
	}
	// training points
	out.tp = 0;
	if (/<td>(\d+)\s*\(<a href="\/game\/training\.pl/.test(pdoc)) {
		out.tp = parseInt(RegExp.lastParen);
	}
	// next game
	var ng = matchups[teamId];
	if (teamId != 0 && ng == undefined && (s = pdoc.match(/Next Game.*>([^>]+?)\s+(at|vs)\s+<a href="(\/game\/compare_teams\.pl\?[^"]+)">(.+?)<.+?\(in\s*(.+?)\)<\/td>/))) {
		newMatchup(teamId, s[1], s[2], s[3], s[4], s[5]);
	}
	// last game
	out.lastGame = 'Unknown';
	if (s = pdoc.match(/<div id="watch_player_\d+"><a href="\/game\/game\.pl\?game_id=.+?Watch<\/a>.+?<\/a>.+?<\/a><\/div>/)) { // scores hidden
		out.lastGame = s[0];
	} else if (s = pdoc.match(/<a href="\/game\/game\.pl\?game_id=.+?<\/a>/)) {
		out.lastGame = s[0];
	}
	// energy
	if (s = pdoc.match(/<div class="rating_bar">.+?(rating_bar_fill_\d+).+?(\d+)<\/div><\/div>/)) {
		out.energyClass = s[1];
		out.energy = s[2];
	}
	return out;
}

function buildPlayerContent(p) { // {{{2
	function bigBoldCell(label) {
		var cell = document.createElement('td');
		cell.style.fontWeight = 'bold';
		cell.style.fontSize = '12px';
		cell.appendChild(document.createTextNode(label));
		return cell;
	}
	fetchCached('player', p.id, p);
	fetchCached('boost_player', p.id, p);
	p.div.style.height = 'auto';
	p.div.style.paddingBottom = '3px';
	var container = getElementsByClassName(/^simple_level_container$/, 'div', p.div)[0];
	// level
	if (p.level != undefined) {
		var levDiv = container.getElementsByTagName('div')[0];
		levDiv.innerHTML = 'Lv. ' + p.level;
	}
	// xp
	if (p.xp != undefined) {
		var xpDiv = container.getElementsByTagName('div')[1];
		xpDiv.innerHTML = p.xp + ' XP';
	}
	// vxp
	if (p.vxp != undefined) {
		var vxpDiv = container.getElementsByTagName('div')[2];
		vxpDiv.innerHTML = p.vxp + ' VXP';
	}
	// cash
	var id = mkid(p, 'cash');
	var div = document.getElementById(id);
	if (show.gridViewPlayer.cash && p.isMine == true && p.cash != undefined) {
		if (!div) {
			div = document.createElement('div');
			div.id = mkid(p, 'cash');
			div.setAttribute('class', 'player_xp');
		}
		div.innerHTML = '$' + p.cash;
		container.appendChild(div);
	} else if (div) {
		div.parentNode.removeChild(div);
		div = undefined;
	}
	// find the table body that holds the player vitals and clean it out
	var pv = getElementsByClassName(/^player_vitals$/, 'table', p.div)[0];
	pv.style.marginLeft = '0px';
	pv.style.marginRight = '0px';
	pv.style.width = '395px';
	for (var n = pv.firstChild; n; n = pv.firstChild) {
		pv.removeChild(n);
	}
	pv.appendChild(document.createTextNode("\n"));
	// player mgmt links
	// [ href, label ]
	var playerMgmtLinks = [
                [ 'game/player_awards.pl?player_id=' + p.id, 'Awards' ],
		[ '/game/equipment.pl?player_id=' + p.id, 'EQ' ],
		[ '/game/player_tactics.pl?player_id=' + p.id, 'Tactics' ],
	];
	if (p.teamId) {
		playerMgmtLinks.push(['/game/forum_thread_list.pl?team_id=' + p.teamId, 'Forum']);
		playerMgmtLinks.push(['/game/depth_chart.pl?team_id=' + p.teamId, 'Depth']);
	}
	if (p.isMine == true) {
		var boostShow = (!show.gridViewPlayer.boost || p.boostAvail == undefined || p.boostAvail == 0) ? '' :
			' <span style="color:#0000ff;">(' + p.boostAvail + ')</span>';
		var tpShow =
			(p.tp >= 5) ? (' <span style="color:#0000ff;">(' + p.tp + ')</span>') :
			(p.tp >= 2) ? (' <span style="color:#007f00;">(' + p.tp + ')</span>') :
			(' (' + p.tp + ')');
		var btShow = (!show.gridViewPlayer.bonus || p.bt == undefined) ? '' :
			(p.bt >= 8) ? (' <span style="color:#0000ff;">(' + p.bt + ')</span>') :
			(p.bt >= 4) ? (' <span style="color:#007f00;">(' + p.bt + ')</span>') :
			(' (' + p.bt + ')');
		var stShow = (!show.gridViewPlayer.shop || p.st == undefined) ? '' :
			(p.st >= 1) ? (' <span style="color:#0000ff;">(' + p.st + ')</span>') :
			(' (' + p.st + ')');
		if (boostShow.length > 0) playerMgmtLinks.push(['/game/boost_player.pl?player_id=' + p.id, 'Boost' + boostShow]);
		if (p.tp > 0) playerMgmtLinks.push(['/game/training.pl?player_id=' + p.id, 'Train' + tpShow]);
		if (p.bt > 0) playerMgmtLinks.push(['/game/bonus_tokens.pl?player_id=' + p.id, 'Bonus' + btShow]);
		playerMgmtLinks.push(['/game/adv_equipment.pl?player_id=' + p.id, 'Shop' + stShow]);
	}
	var row = document.createElement('tr');
	var cell = document.createElement('td');
	cell.setAttribute('colspan', 12);
	cell.style.fontWeight = 'bold';
	cell.style.fontSize = '10px';
	for (var i in playerMgmtLinks) {
		var link = playerMgmtLinks[i];
		var a = document.createElement('a');
		a.href = link[0];
		a.innerHTML += link[1];
		cell.appendChild(a);
		if (i < (playerMgmtLinks.length - 1)) {
			cell.innerHTML += ' &nbsp;';
//			cell.appendChild(document.createTextNode(' | '));
		}
	}
	row.appendChild(cell);
	pv.appendChild(row);
	pv.appendChild(document.createTextNode("\n"));
	// team
	row = document.createElement('tr');
	cell = bigBoldCell('Team:');
	cell.style.width = '50px';
	row.appendChild(cell);
	cell = document.createElement('td');
	cell.setAttribute('colspan', 11);
	if (p.teamId) {
		var a = document.createElement('a');
		a.href = '/game/team.pl?team_id=' + p.teamId;
		a.appendChild(document.createTextNode(p.teamName));
		cell.appendChild(a);
		var t = tData[p.teamId];
		if (show.gridViewPlayer.record && t != undefined && t.record != undefined) {
			cell.appendChild(document.createTextNode(' ' + t.record));
		}
		if (show.gridViewPlayer.teamleagues && t != undefined && t.leagueId != undefined) {
			cell.appendChild(document.createTextNode(' ('));
			a = document.createElement('a');
			a.href = '/game/league.pl?league_id=' + t.leagueId;
			a.appendChild(document.createTextNode(t.leagueLabel));
			cell.appendChild(a);
			if (t.leagueForumId != undefined) {
				a = document.createElement('a');
				a.href = '/game/forum_thread_list.pl?forum_id=' + t.leagueForumId;
				a.innerHTML = t.leagueForumIcon;
				cell.appendChild(a);
			}
			cell.appendChild(document.createTextNode('/'));
			a = document.createElement('a');
			a.href = '/game/league.pl?league_id=' + t.leagueId + '&conference_id=' + t.conferenceId;
			a.appendChild(document.createTextNode(t.conferenceLabel));
			cell.appendChild(a);
			cell.appendChild(document.createTextNode(')'));
		}
	} else {
		cell.appendChild(document.createTextNode('None'));
	}
	row.appendChild(cell);
	pv.appendChild(row);
	pv.appendChild(document.createTextNode("\n"));
	// last game
	if (p.lastGame != 'Unknown') {
		row = document.createElement('tr');
		cell = bigBoldCell('Last:');
		row.appendChild(cell);
		cell = document.createElement('td');
		cell.setAttribute('colspan', 11);
		cell.innerHTML = p.lastGame;
		row.appendChild(cell);
		pv.appendChild(row);
		pv.appendChild(document.createTextNode("\n"));
	}
	// next game
	if (p.teamId) {
		row = document.createElement('tr');
		cell = bigBoldCell('Next:');
		row.appendChild(cell);
		cell = document.createElement('td');
		cell.setAttribute('colspan', 11);
		cell.id = mkid(p, 'next_game');
		row.appendChild(cell);
		pv.appendChild(row);
		updateClocks(p.teamId);
		pv.appendChild(document.createTextNode("\n"));
	}
	// energy & morale
	row = document.createElement('tr');
	if (show.gridViewPlayer.energy && p.energy != undefined && show.gridViewPlayer.morale && p.morale != undefined) {
		row.appendChild(getRatingBar('Energy', p.energyClass, p.energy, 'medium'));
		row.appendChild(getRatingBar('Morale', p.moraleClass, p.morale, 'medium'));
	} else if (show.gridViewPlayer.energy && p.energy != undefined) {
		row.appendChild(getRatingBar('Energy', p.energyClass, p.energy, 'large'));
	} else if (show.gridViewPlayer.morale && p.morale != undefined) {
		row.appendChild(getRatingBar('Morale', p.moraleClass, p.morale, 'large'));
	}
	if (row.hasChildNodes()) {
		pv.appendChild(row);
		pv.appendChild(document.createTextNode("\n"));
	}
	// overall & scout bars
	var nBars = 0;
	if (show.gridViewPlayer.overall && p.overall != undefined) nBars++;
	if (show.gridViewPlayer.scout_bars && p.stat1Name != undefined) nBars += (p.stat2Name != undefined) ? 2 : 1;
	row = document.createElement('tr');
	if (nBars == 3) { // overall, stat1, stat2
		row.appendChild(getRatingBar('Overall', p.overallClass, p.overall, 'small'));
		row.appendChild(getRatingBar(p.stat1Name, p.stat1Class, p.stat1Value, 'small'));
		row.appendChild(getRatingBar(p.stat2Name, p.stat2Class, p.stat2Value, 'small'));
	} else if (nBars == 2 && p.stat2Name == undefined) { // overall & stat1
		row.appendChild(getRatingBar('Overall', p.overallClass, p.overall, 'medium'));
		row.appendChild(getRatingBar(p.stat1Name, p.stat1Class, p.stat1Value, 'medium'));
	} else if (nBars == 2) { // stat1 & stat2
		row.appendChild(getRatingBar(p.stat1Name, p.stat1Class, p.stat1Value, 'medium'));
		row.appendChild(getRatingBar(p.stat2Name, p.stat2Class, p.stat2Value, 'medium'));
	} else if (show.gridViewPlayer.overall && p.overall != undefined) { // overall
		row.appendChild(getRatingBar('Overall', p.overallClass, p.overall, 'large'));
	} else if (nBars == 1) { // stat1
		row.appendChild(getRatingBar(p.stat1Name, p.stat1Class, p.stat1Value, 'large'));
	}
	if (row.hasChildNodes()) {
		pv.appendChild(row);
		pv.appendChild(document.createTextNode("\n"));
	}
	// contract & fame
	row = document.createElement('tr');
	function contractOffersLink(num) {
		if (num == 0) return document.createTextNode('');
		var span = document.createElement('span');
		span.appendChild(document.createTextNode(' ('));
		var a = document.createElement('a');
		a.href = '/game/offers.pl?player_id=' + p.id;
		a.appendChild(document.createTextNode(num + ' offer' + ((num == 1) ? '' : 's')));
		span.appendChild(a);
		span.appendChild(document.createTextNode(')'));
		return span;
	}
	if (show.gridViewPlayer.contract && p.contract != undefined && show.gridViewPlayer.fame && p.fame != undefined) {
		cell = bigBoldCell('Contract:');
		row.appendChild(cell);
		cell = document.createElement('td');
		cell.setAttribute('colspan', 10);
		cell.appendChild(document.createTextNode(p.contract));
		if (p.contractOffers != undefined) cell.appendChild(contractOffersLink(p.contractOffers));
		row.appendChild(cell);
		cell = document.createElement('td');
		var outerSpan = document.createElement('span');
		outerSpan.style.cssFloat = 'right';
		var span = document.createElement('span');
		span.style.fontWeight = 'bold';
		span.style.fontSize = '12px';
		span.appendChild(document.createTextNode('Fame:'));
		outerSpan.appendChild(span);
		outerSpan.innerHTML += ' ' + p.fameText;
		cell.appendChild(outerSpan);
		row.appendChild(cell);
	} else if (show.gridViewPlayer.contract && p.contract != undefined) {
		cell = bigBoldCell('Contract:');
		row.appendChild(cell);
		cell = document.createElement('td');
		cell.setAttribute('colspan', 11);
		cell.appendChild(document.createTextNode(p.contract));
		if (p.contractOffers != undefined) cell.appendChild(contractOffersLink(p.contractOffers));
		row.appendChild(cell);
	} else if (show.gridViewPlayer.fame && p.fame != undefined) {
		cell = bigBoldCell('Fame:');
		row.appendChild(cell);
		cell = document.createElement('td');
		cell.setAttribute('colspan', 11);
		cell.innerHTML = p.fameText;
		row.appendChild(cell);
	}
	if (row.hasChildNodes()) {
		pv.appendChild(row);
		pv.appendChild(document.createTextNode("\n"));
	}
	// attributes
	if (show.gridViewPlayer.attributes && p.attributes != undefined) {
		row = document.createElement('tr');
		cell = document.createElement('td');
		cell.setAttribute('colspan', 12);
		cell.innerHTML = p.attributes;
		row.appendChild(cell);
		pv.appendChild(row);
	}
	if (p.sp > 0 && show.gridViewPlayer.blue_levup == 1) {
		p.div.className = 'content_container_sp player_box_vet';
	} else {
		p.div.className = 'content_container player_box_vet';
	}
	/*
	buildPlayerListViewRow(p);
	*/
}

function redrawAllPlayers() { // {{{2
	for each (var p in pData) {
		buildPlayerContent(p);
	}
}

function loadAllPlayers() { // {{{2
	// Retrieve players HTML blurbs
	var players = getElementsByClassName(/^content_container(?:_sp)? player_box_vet$/, 'div', document);
	var ptab = document.getElementById('GLBHP_players_list_table');
	// Loop through each player
	for (var i = 0; i < numPlayers; i++) {
		var p = extractPlayerStatsFromHomePage(players[i]);
		if (p == undefined) continue;
		p.isMine = isMine;
		p.origIndex = i;
		pData.push(p)
		/*
		var prow = createPlayerListViewRow(p);
		ptab.appendChild(prow);
		*/
		buildPlayerContent(p);
	}
	sortPlayerList();
}

function forceLoadAllPlayers() { // {{{2
	for each (var p in pData) {
		loadPlayerAnyway[p.id] = true;
	}
	redrawAllPlayers();
}

// *** MAIN ************************************************************ {{{1
function oldVersionCleanup() { // {{{2
	// from somewhere < 2.1.0
	GM_deleteValue('sortType');
	GM_deleteValue('sortDir');
	GM_deleteValue('SortType_2');
	GM_deleteValue('SortDir_2');
	GM_deleteValue('priorSortType');
	GM_deleteValue('priorSortDir');
	GM_deleteValue('GLBHP_option_contract');
	GM_deleteValue('GLBHP_option_sort');
	GM_deleteValue('GLBHP_option_shop');
	// from <= 2.9.0
	GM_deleteValue('option_orig_ng_text');
	GM_deleteValue('option_blue_levelup_box');
	GM_deleteValue('option_max_players');
	GM_deleteValue('option_notmine');
	GM_deleteValue('option_countdown');
	GM_deleteValue('option_energy');
	GM_deleteValue('option_sort');
	GM_deleteValue('option_teamlinks');
	GM_deleteValue('option_record');
	GM_deleteValue('option_chemistry');
	GM_deleteValue('option_teamleagues');
	GM_deleteValue('option_spread');
	GM_deleteValue('option_boost');
	GM_deleteValue('option_attributes');
	GM_deleteValue('option_bonus');
	GM_deleteValue('option_cash');
	GM_deleteValue('option_contract');
	GM_deleteValue('option_fame');
	GM_deleteValue('option_morale');
	GM_deleteValue('option_overall');
	GM_deleteValue('option_scout_bars');
	GM_deleteValue('option_shop');
	// from <= 2.9.1
	GM_deleteValue('option_gridViewTeamMine_teamleagues');
	GM_deleteValue('option_gridViewTeamOther_teamleagues');
}

// function main() {{{2

oldVersionCleanup();
installOptionsBoxen();
installLoadPlayersLink();
installSortOptions();
loadAllTeams();
redrawAllTeams();
loadAllPlayers();
updateClocks(0);
updateBoostCost();
window.setTimeout(setupReloadPlayer, 800); // doesn't work otherwise
/*
window.setTimeout(setupPlayerListViewHeadSorting, 800); // doesn't work otherwise
*/

// setup for showing tooltips correctly... {{{2

(function() {
	var scripts = [
		"http://goallineblitz.com/javascript/mouse.js",
		"http://goallineblitz.com/javascript/tooltip.js"
	];
	var script;
	for (i in scripts) {
		script = document.createElement("script");
		script.src = scripts[i];
		script.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(script);
	}
	var style = document.createElement('link');
	style.setAttribute('rel', 'stylesheet');
	style.setAttribute('type', 'text/css');
	style.setAttribute('href', 'http://goallineblitz.com/css/tooltip.css');
	document.body.previousSibling.appendChild(style);
	for each (var h in getElementsByClassName(/ subhead_head/, 'div', document)) {
		h.style.paddingBottom = '0px';
	}
}
)();

// vim: foldmethod=marker
