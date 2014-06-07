// ==UserScript==
// @name           GLB Homepage
// @namespace      Bogleg
// @description    Rewrite homepage with much more info and useful quicklinks
// @version        2.12.0
// @include        http://goallineblitz.com/game/home.pl
// @include        http://goallineblitz.com/game/home.pl?*
// @require        http://userscripts.org/scripts/source/74204.user.js
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
	// team.pl
	record		: [ 'boolean',	'Record',			"Show teams' win-loss-tie records", ],
	chemistry	: [ 'boolean',	'Chemistry',		"Show teams'  records", ],
	teamleagues	: [ 'boolean',	'TeamLeagues',		"Show conference/league that players' teams belong to", ],
	// compare_teams.pl
	spread		: [ 'boolean',	'NextGameSpread',	"Show Next Game scouting spread (for players, not yet teams) - requires an extra page load", ],
	// multi_boost_player.pl
	boost_cost	: [ 'boolean',	'BoostCost',		"Show overall boost cost (extra page hit per player)", ],
	boost		: [ 'boolean',	'Boost',			"Show players' available boosts (extra page hit per player)", ],
	// player.pl
	attributes	: [ 'boolean',	'Attributes',		"Show players' primary and secondary attributes", ],
	bonus		: [ 'boolean',	'BonusTokens',		"Show number of bonus tokens", ],
	contract	: [ 'boolean',	'Contract',			"Show players' contract info", ],
	fame		: [ 'boolean',	'Fame',				"Show players' fame", ],
	morale		: [ 'boolean',	'Morale',			"Show players' morale bars", ],
	overall		: [ 'boolean',	'Overall',			"Show players' scouting overall bars", ],
	scout_bars	: [ 'boolean',	'ScoutBars',		"Show players' position-specific scouting bars", ],
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
	gridTeamMine : { // {{{3
		_LABEL_ : 'Team Grid View',
		record		: 1,
		spread		: 1,
		chemistry	: 1,
	},
	gridTeamOther : { // {{{3
		_LABEL_ : 'Team Grid View',
		record		: 1,
		spread		: 1,
		chemistry	: 1,
	},
	listPlayerMine : { // {{{3
		_LABEL_ : 'List View (DOES NOT WORK YET)',
		record		: 1,
		teamleagues	: 1,
		spread		: 1,
		energy		: 1,
		boost		: 1,
		attributes	: 0,
		bonus		: 1,
		contract	: 1,
		fame		: 1,
		morale		: 1,
		overall		: 1,
		scout_bars	: 1,
	},
	gridPlayerMine : { // {{{3
		_LABEL_ : 'Grid View',
		record		: 1,
		teamleagues	: 1,
		spread		: 1,
		energy		: 1,
		boost		: 1,
		attributes	: 1,
		bonus		: 1,
		contract	: 1,
		fame		: 1,
		morale		: 1,
		overall		: 1,
		scout_bars	: 1,
		blue_levup	: 1,
	},
	listPlayerOther : { // {{{3
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
	gridPlayerOther : { // {{{3
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
var teamViewStyle = $('#teams select[name="team_view_style"]').find(':selected').attr('value');
var playerViewStyle = $('#players_teams div.view_style select[name="player_view_style"]').find(':selected').attr('value');
if (playerViewStyle == 'simple') playerViewStyle = 'grid';
// Firefox caches the <select> value sometimes.. ugh
if ($('#playerTable').length == 0) {
	if (playerViewStyle == 'list') playerViewStyle = 'grid';
} else if (playerViewStyle != 'list') playerViewStyle = 'list';
playerViewStyle += 'Player';
var isMine = ($('#message_buttons').length == 0) ? false : true;

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

// pData // {{{2
var numPlayers = $('#players div.player_box_vet, #playerTable tr.alternating_color1').length;
var pData = new Array(numPlayers);
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
		'pri': ['Str', 'Thr', 'Vis', 'Con', 'Sta'],
		'sec': ['Agi', 'Jum', 'Car', 'Spe', 'Cat'],
	}, 'HB': {
		'pri': ['Agi', 'Spe', 'Str', 'Vis', 'Con', 'Car'],
		'sec': ['Cat', 'Blo', 'Jum', 'Thr', 'Sta'],
	}, 'FB': {
		'pri': ['Str', 'Blo', 'Agi', 'Car'],
		'sec': ['Con', 'Vis', 'Cat', 'Tac', 'Sta'],
	}, 'C': {
		'pri': ['Str', 'Blo'],
		'sec': ['Con', 'Agi', 'Vis', 'Tac', 'Sta'],
	}, 'G': {
		'pri': ['Str', 'Blo', 'Con'],
		'sec': ['Agi', 'Vis', 'Tac', 'Sta'],
	}, 'OT': {
		'pri': ['Str', 'Blo', 'Con', 'Agi', 'Vis'],
		'sec': ['Tac', 'Sta'],
	}, 'TE': {
		'pri': ['Str', 'Blo', 'Cat', 'Vis'],
		'sec': ['Agi', 'Spe', 'Con', 'Car', 'Sta', 'Tac'],
	}, 'WR': {
		'pri': ['Spe', 'Agi', 'Cat', 'Jum', 'Vis', 'Sta'],
		'sec': ['Con', 'Car'],
	}, 'DT': {
		'pri': ['Str', 'Tac', 'Agi'],
		'sec': ['Blo', 'Con', 'Vis', 'Spe', 'Sta'],
	}, 'DE': {
		'pri': ['Str', 'Tac', 'Agi', 'Spe'],
		'sec': ['Blo', 'Con', 'Vis', 'Jum', 'Sta'],
	}, 'LB': {
		'pri': ['Str', 'Vis', 'Tac', 'Agi', 'Con', 'Sta'],
		'sec': ['Spe', 'Jum', 'Blo', 'Cat'],
	}, 'CB': {
		'pri': ['Spe', 'Agi', 'Jum', 'Vis', 'Cat', 'Sta'],
		'sec': ['Str', 'Tac', 'Con', 'Car'],
	}, 'SS': {
		'pri': ['Str', 'Spe', 'Vis', 'Tac', 'Sta'],
		'sec': ['Agi', 'Jum', 'Con', 'Blo', 'Cat', 'Car'],
	}, 'FS': {
		'pri': ['Spe', 'Vis', 'Tac', 'Cat', 'Sta'],
		'sec': ['Agi', 'Jum', 'Str', 'Con', 'Blo', 'Car'],
	}, 'K': {
		'pri': ['Kic', 'Con'],
		'sec': ['Str', 'Vis', 'Agi', 'Spe', 'Jum', 'Thr'],
	}, 'P': {
		'pri': ['Pun', 'Con'],
		'sec': ['Str', 'Vis', 'Agi', 'Spe', 'Jum', 'Thr'],
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
	multi_boost_player: {
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
	multi_boost_player: {
		lastStore: getTime(),
		when: timestamp of cache
		expire: timestamp to definitely expire by
		data: { playerId: { ... } ... }
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
	compare_teams:		false,
	player:				false,
	multi_boost_player:	false,
	team:				false,
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
	// Meta Cache
	if (cache[t].expire != undefined && cache[t].expire <= now) {
		cache[t] = {};
	}
	// Per-team/player/matchup
	for (var k in cache[t]) {
		if (cache[t][k].expire != undefined && cache[t][k].expire <= now) {
			delete cache[t][k];
		}
	}
	var loadFunc = {
		compare_teams: function() {
			var c = cache.compare_teams;
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
		multi_boost_player: function() {
			if (cache.multi_boost_player.data == undefined) return;
			$.each(pData, function() {
				if (this.boostAvail == undefined && cache.multi_boost_player.data[this.id] != undefined) {
					this.boostAvail = cache.multi_boost_player.data[this.id].boostAvail;
					buildPlayerContent(this);
				}
			});
			updateBoostCost();
		},
	};
	if (loadFunc[t] != undefined) {
		loadFunc[t]();
	}
}

function fetchCached(t, id, d) { // {{{2
	var foundCachedData = true;
	var loadData = false;
	if (!id) {
//		console.log('fetch[Meta]Cached: cache_' + t + ' checking.. id=', id, 'cache['+t+'].data = ', cache[t].data);
		if (cache[t].data == undefined) {
//			console.log('fetch[Meta]Cached: cache_' + t + ' data not found; load[Meta]Cache()');
			loadCache(t);
		}
		if (cache[t].data == undefined) {
//			console.log('fetch[Meta]Cached: cache_' + t + ' data NOT found');
			foundCachedData = false;
			loadData = true;
		}
	} else if (cache[t][id] == undefined) {
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
		var dat, cTop;
		if (!id) {
			cTop = cache[t];
			dat = cTop.data[d.id];
		} else {
			cTop = cache[t][id];
			dat = cTop.data;
		}
//		console.log('fetchCached: cache_' + t + ' data found for id ' + id);
		for (var k in dat) {
			if (d[k] == undefined) {
				d[k] = dat[k];
			}
		}
		// refresh if data is >= 30 minutes old
		if (cTop.when == undefined || ((new Date().getTime()) - cTop.when) > 1800000) {
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
			if (checkShow(['attributes', 'contract', 'fame', 'bonus', 'morale', 'overall', 'scout_bars'])) {
				dataLoad(t, id, fetchPlayerPage, foundCachedData, d);
			}
		} else if (t == 'multi_boost_player') {
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
//	console.log('setCache(', t, ', ', id, ', ', d, ')');
	if (id && (cache[t].lastStore == undefined)) {
		loadCache(t);
	}
	var now = new Date().getTime();
	if (exp == undefined) {
		exp = now + 86400000; // default expire after 1 day
	}
	if (id) {
		cache[t][id] = {
			data: d,
			when: now,
			expire: exp,
		};
	} else {
		cache[t] = {
			data: d,
			when: now,
			expire: exp,
		};
	}
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
	compare_teams:		{},
	player:				{},
	multi_boost_player:	{},
	team:				{},
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
	if (pendingDataLoadExists(page, id)) {
		return;
	}
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
//			GM_log('Fetched compare_teams.pl for team ' + ng.teamId + ' - http://goallineblitz.com' + ng.link);
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
//			GM_log('Fetched compare_teams.pl for team ' + ng.teamId + ' - spread is ' + ng.spread + ' - http://goallineblitz.com' + ng.link);
			setCache('compare_teams', ng.teamId, { spread: ng.spread, link: ng.link }, ng.timer.getTime());
			dataLoadDone('compare_teams', ng.teamId);
		}
	});
}

// Load multi_boost_player.pl // {{{2
function fetchBoostPlayerPage() {
	var getSelects = '<select id="boosts_(\\d+)"[^>]+>.+?<option value="([123])"[^>]*>[^<]+<\\/option>\\s*<\\/select>|<td id="boosts_(\\d+)">(None) Available<\\/td>';
	var getAll_re = new RegExp(getSelects, 'gi');
	var getPlayer_re = new RegExp(getSelects, 'i');
	$.get('/game/multi_boost_player.pl', function(boostPage) {
//		console.log('Fetched multi_boost_player.pl');
		var doc = boostPage.replace(/\n|\r/g, '').replace(/\s\s+/g, ' ');
		var p, d = {};
		var sels = $(doc.match(getAll_re)).each(function() {
			p = this.match(getPlayer_re).slice(1, 3);
			d[parseInt(p[0])] = { boostAvail: p[1] == 'None' ? 0 : parseInt(p[1]) };
		});
//		console.log(d);
		$.each(pData, function() {
			if (this.id in d) {
				this.boostAvail = d[this.id].boostAvail;
			} else {
				delete this.boostAvail;
			}
			buildPlayerContent(this);
		});
		setCache('multi_boost_player', 0, d);
		updateBoostCost();
		dataLoadDone('multi_boost_player', 0);
	});
}

// Load player.pl {{{2
function fetchPlayerPage(p) {
//	GM_log('fetchPlayerPage for ' + p.name);
	$.get('/game/player.pl?player_id=' + p.id, function(playerPage) {
//		GM_log('Fetched player.pl for ' + p.name);
		var doc = playerPage.replace(/\n/g, '').replace(/\s\s+/g, ' ');
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
		// level, sp, tp, bt
		if (s = doc.match(/<td>(\d+)<\/td><td>(\d+)<\/td><td>(\d+)<\/td><td>(\d+)<\/td>/)) {
			newData.level = parseInt(s[1]);
			newData.sp = parseInt(s[2]);
			newData.tp = parseInt(s[3]);
			newData.bt = parseInt(s[4]);
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
var sortPlayerListScheduled = 0;
// onChange for the 'Sort By' selection
function _sortPlayerList() { // {{{2
	if (pendingDataLoadTotal > 0) { // delay...
		sortPlayerListScheduled = window.setTimeout(_sortPlayerList, 500);
		return;
	}
	sortPlayerListScheduled = 0;
	if (numPlayers < 2) return; // no point in sorting 0 or 1 players
	var sortType2Key = {
		'Alphabetical':		'name',
		'Bonus Tokens':		'bt',
		'Boosts Available':	'boostAvail',
		'Contract Exp':		'contractExpirationCounter',
		'Contract Value':	'contractDaily',
		'Energy':			'energy',
		'Fame':				'fame',
		'Level':			'level',
		'Morale':			'morale',
		'Next Game':		'nextGameTimer',
		'Overall':			'overall',
		'Position':			'pos',
		'Skill Points':		'sp',
		'Team':				'teamName',
		'Training Points':	'tp',
		'VXP':				'vxp',
		'VA Points':		'vp',
		'XP':				'xp',
		'Date Created':		'origIndex',
	};
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
	var sortCmp = {
		'Ascending':	function(a, b) { return a == b ? 0 : a < b ? -1 : 1; },
		'Descending':	function(a, b) { return a == b ? 0 : a < b ? 1 : -1; },
	}
	var sortCmpPri = sortCmp[sortDir];
	var sortCmpSec = sortCmp[secondarySortDir];
	var tmp;
	var ni = new Array(numPlayers);
	for (var y = 0; y < numPlayers; y++) {
		ni[y] = y;
	}
	ni.sort(function(a, b) {
		return sortCmpPri(pData[a][sortKey], pData[b][sortKey])
			|| sortCmpSec(pData[a][secondarySortKey], pData[b][secondarySortKey])
			|| (sortCmp.Ascending)(pData[a].name, pData[b].name);
	});
	x = new Array(numPlayers);
	$.each(ni, function(i, j) {
		if (i == j) {
			x[i] = pData[i];
			return true;
		}
		x[i] = pData[j];
		x[i].div_new = pData[i].div;
		x[i].div_className = pData[j].div.className;
		x[i].div_innerHTML = pData[j].div.innerHTML;
		return true;
	});
	$.each(ni, function(i, j) {
		if (i == j) return true;
		x[i].div = x[i].div_new;
		x[i].div.className = x[i].div_className;
		x[i].div.innerHTML = x[i].div_innerHTML;
		pData[i] = x[i];
		return true;
	});
	setupReloadPlayer();
}
function sortPlayerList() { // {{{2
//	console.info('sortPlayerList: pending = ', pendingDataLoadTotal, ', scheduled = ', sortPlayerListScheduled);
	if (pendingDataLoadTotal > 0) { // delay...
		if (sortPlayerListScheduled) return; // already scheduled
		sortPlayerListScheduled = window.setTimeout(_sortPlayerList, 500);
		return;
	}
	if (sortPlayerListScheduled) {
		window.clearTimeout(sortPlayerListScheduled);
		sortPlayerListScheduled = 0;
	}
	_sortPlayerList();
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
	sp: 'Skill Points',
	vp: 'VA Points',
	tp: 'Training Points',
	bonus: 'Bonus Tokens',
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
	if (show.global.sort == 0 || numPlayers < 2) { // no point in sorting 0 or 1 players
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
		sp: false,
		vp: false,
		tp: false,
		bonus: false,
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
	var outSpread = out;
//	GM_log('show.gridTeam.spread = ' + show.gridTeam.spread + '; show[playerViewStyle].spread = ' + show[playerViewStyle].spread);
	if (show.gridTeam.spread || show[playerViewStyle].spread) {
		if (ng.spread == undefined) {
			fetchCached('compare_teams', teamId, ng);
		} else {
			outSpread += ' (' + ng.spread + ')';
		}
	}
	ng.htmlShort = outShort;
	ng.htmlSpread = outSpread;
	ng.html = out;
}

function redrawNextGame(obj) { // {{{2
//	var cell = document.getElementById(mkid(obj, 'next_game'));
	$('#' + mkid(obj, 'next_game')).each(function() {
		if (obj.teamId == undefined || matchups[obj.teamId] == undefined || matchups[obj.teamId].html == undefined) {
			// cell.innerHTML = 'None';
//			cell.parentNode.style.display = 'none';
//			cell.parentNode.style.visibility = 'hidden';
			if ($(this).parent().is('a')) { // listPlayerView object
				$(this).html('-');
			} else {
				$(this).parent().hide();
			}
		} else {
//			if (cell.parentNode.nodeName == 'TR') {
//				cell.parentNode.style.display = 'table-row';
//			} else {
//				cell.parentNode.style.display = 'inline';
//			}
//			cell.parentNode.style.visibility = 'visible';
			obj.nextGameTimer = matchups[obj.teamId].secsTil;
			if ($(this).parent().is('a')) { // listPlayerView object
				$(this).html(matchups[obj.teamId].htmlShort);
			} else {
				$(this).html(matchups[obj.teamId][ show[obj.pos ? playerViewStyle : 'gridTeam'].spread ? 'htmlSpread' : 'html' ]).parent().show();
			}
//			var html;
//			if (obj.pos == undefined) { // team
//				var html = show.gridTeam.spread ? matchups[obj.teamId].htmlSpread : matchups[obj.teamId].html;
//			} else { // player
//				var html = show[playerViewStyle].spread ? matchups[obj.teamId].htmlSpread : matchups[obj.teamId].html;
//			}
//			GM_log('obj.pos = ' + obj.pos + '; html = ' + html);
//			cell.innerHTML = html;
		}
	});
	$('#GLBHP_listView_pcell_' + obj.id + '_nextGame').each(function() {
		if (obj.teamId == undefined || matchups[obj.teamId] == undefined || matchups[obj.teamId].html == undefined) {
			$(this).html('-');
//			cell.innerHTML = '-';
		} else {
			obj.nextGameTimer = matchups[obj.teamId].secsTil;
			$(this).html(matchups[obj.teamId].htmlShort);
//			cell.innerHTML = matchups[obj.teamId].htmlShort;
		}
	});
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
	var team_data = $('div.team_data, div.team_data_simple');
	if (team_data.length == 0) return;
	$('div.team_name_container, div.teamhead').each(function(i) {
		var teamId = parseInt($(this).find('a').attr('href').match(/team_id=(\d+)/)[1]);
		var tmpId = mkid({id: teamId}, 'record_chem');
		$('#' + tmpId).remove();
		if (show.gridTeam.record || show.gridTeam.chemistry) {
			var t = loadTeam(teamId, true);
			var out = '';
			var rec = '';
			var chem = '';
			if (show.gridTeam.record && t != undefined && t.record != undefined) {
				if (!out) out = '<span id="' + tmpId + '">';
				out += ' - <span id="' + mkid({id: teamId}, 'record') + '"><b>Rank:</b> ' + t.record + '</span>';
			}
			if (show.gridTeam.chemistry && t != undefined && t.chemOverall != undefined) {
				if (!out) out = '<span id="' + tmpId + '">';
				out += ' - <span id="' + mkid({id: teamId}, 'chemistry') + '"><b>Chem:</b> '
					+ t.chemOverall + '/' + t.chemOffense + '/' + t.chemDefense + '</span>';
			}
			if (out) $(team_data[i]).find('div.team_cash').append(out);
		}
	});
}

function loadAllTeams() { // {{{2
	var teams = (teamViewStyle == 'card') ? $('div.team_content') : $('#teams,#gm_teams').find('div.content_container.team_simple');
	numTeams = teams.length;
	$.each(teams, function(i, team) {
		$('div.team_next_game', team).each(function(j, n) {
			var s = $(n).html().match(/(.+?<\/b>\s*)(.+?)(at|vs)\s*<a href="([^"]+)">(.+?)<.+?\(in\s*(.+?)\)/);
			if (s) {
				/=(\d+)$/.test(s[4]);
				var teamId = parseInt(RegExp.lastParen);
				newMatchup(teamId, s[2], s[3], s[4], s[5], s[6]);
				var t = loadTeam(teamId, true);
				$(n).html(s[1] + '<span id="' + mkid(t, 'next_game') + '"></span>');
				updateClocks(teamId);
			}
		});
	});
	/*
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
	*/
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
	sp: 'SP',
	vp: 'VP',
	tp: 'TP',
	bonus: 'BT',
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
	sp:			function(p) { return '<a href="/game/skill_points.pl?player_id=' + p.id + '"' + (p.sp >= 1 ? ' style="color:#0000ff;"' : '') + '>' + p.sp + '</a>'; },
	vp:			function(p) { return p.vp ? '<a href="/game/vet_skills.pl?player_id=' + p.id + '" style="color:#0000ff;">' + p.vp + '</a>' : 0; },
	tp:			function(p) { return '<a href="/game/training.pl?player_id=' + p.id + '"' + (p.tp >= 5 ? ' style="color:#0000ff;"' : p.tp >= 2 ? ' style="color:#007f00;"' : '') + '>' + p.tp + '</a>'; },
	bonus:		function(p) { return p.bt >= 4 ? '<a href="/game/bonus_tokens.pl?player_id=' + p.id + '"' + (p.bt >= 8 ? ' style="color:#0000ff;"' : p.bt >= 4 ? ' style="color:#007f00;"' : '') + '>' + p.bt + '</a>' : p.bt || 0; },
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
				if (cache.multi_boost_player.data[p.id] != undefined) delete cache.multi_boost_player.data[p.id];
				fetchCached('player', p.id, p);
				fetchCached('multi_boost_player', 0, p);
				if (p.teamId && matchups[p.teamId] != undefined) {
					if (cache.compare_teams[p.teamId] != undefined) delete cache.compare_teams[p.teamId];
					fetchCached('compare_teams', p.teamId, matchups[p.teamId]);
				}
			}
		}
	}
}

function unSetupReloadPlayer() { // {{{2
	$('div.player_photo', $('#players')[0]).css('cursor', 'auto').die();
	/*
	for each (var p in pData) {
		var imgDiv = getElementsByClassName(/^player_photo$/, 'div', p.div)[0];
		imgDiv.removeEventListener('click', reloadPlayer, false);
		imgDiv.style.cursor = 'auto';
	}
	*/
}

function setupReloadPlayer() { // {{{2
	$('div.player_photo', $('#players')[0]).css('cursor', 'pointer').live('click', function(e) {
		reloadPlayer(e);
		return false;
	});
	/*
	for each (var p in pData) {
		var imgDiv = getElementsByClassName(/^player_photo$/, 'div', p.div)[0];
		imgDiv.addEventListener('click', reloadPlayer, false);
		imgDiv.style.cursor = 'pointer';
	}
	*/
}

function extractPlayerStatsFromHomePageListView() { // {{{2
	$('#playerTable').find('tr.alternating_color1').each(function(i, player) {
//		console.info('i = ', i, "\nplayer = ", player);
		pData[i] = {
			div: player,
			isMine: isMine,
			origIndex: i,
			teamId: 0,
		};
	}).end().find('td.list_name a').each(function(i) {
		// playerId, name
		pData[i].id = parseInt(this.href.match(/player_id=(\d+)/)[1]);
		pData[i].name = $(this).text();
	}).end().find('td.list_team a[href^="/game/team.pl"]').each(function(i) {
		// teamId, teamName
		pData[i].teamId = parseInt(this.href.match(/team_id=(\d+)/)[1]);
		pData[i].teamName = $(this).text();
		loadTeam(pData[i].teamId, false);
	}).end().find('td.list_lv').each(function(i) {
		// level
		pData[i].level = parseInt($(this).text());
	}).end().find('td.list_pos div.position').each(function(i) {
		// position
		pData[i].pos = $(this).text();
	}).end().find('td.list_xp').each(function(i) {
		// xp
		pData[i].xp = parseInt($(this).text());
	}).end().find('td.list_vxp').each(function(i) {
		// vxp
		pData[i].vxp = parseInt($(this).text());
	}).end().find('td.list_sp').each(function(i) {
		// skill points
		pData[i].sp = parseInt($(this).text());
	}).end().find('td.list_vp').each(function(i) {
		// veteran points
		pData[i].vp = parseInt($(this).text());
	}).end().find('td.list_tp').each(function(i) {
		// training points
		pData[i].tp = parseInt($(this).text());
	}).end().find('td.list_bt').each(function(i) {
		// bonus tokens
		pData[i].bt = parseInt($(this).text());
	}).end().find('td.list_energy').each(function(i) {
		// energy
		pData[i].energyClass = $(this).find('.rating_bar_fill')[0].className.match(/(rating_bar_fill_\d+)/)[0];
		pData[i].energy = parseInt($(this).text());
	}).end().find('td.list_nextgame').each(function(i) {
		// next game
		$(this).find('a[href^="/game/team.pl"]').each(function(zz, link) {
			var ng = matchups[pData[i].teamId];
			var s;
			if (pData[i].teamId != 0) {
				if (ng == undefined && link.href.match(/team_id=(\d+)/)) {
					newMatchup(pData[i].teamId, '', '', '/game/compare_teams.pl?team1='+pData[i].teamId+'&team2='+RegExp.lastParen, '', $(link).text());
				}
				$(link).html('<span id="' + mkid({id: pData[i].id}, 'next_game') + '">' + $(link).text() + '</span>');
			}
		});
	}).end().find('td.list_lastgame').each(function(i) {
		// last game
		pData[i].lastGame = $(this).html();
		/*
		out.lastGame = 'Unknown';
		if (s = pdoc.match(/<div id="watch_player_\d+"><a href="\/game\/game\.pl\?game_id=.+?Watch<\/a>.+?<\/a>.+?<\/a><\/div>/)) { // scores hidden
			out.lastGame = s[0];
		} else if (s = pdoc.match(/<a href="\/game\/game\.pl\?game_id=.+?<\/a>/)) {
			out.lastGame = s[0];
		}
		*/
	});
//	buildPlayerContentListView(p);
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
	if (playerViewStyle == 'listPlayer') {
		return;
	}
	function bigBoldCell(label) {
		var cell = document.createElement('td');
		cell.style.fontWeight = 'bold';
		cell.style.fontSize = '12px';
		cell.appendChild(document.createTextNode(label));
		return cell;
	}
	fetchCached('player', p.id, p);
	fetchCached('multi_boost_player', 0, p);
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
		[ '/game/equipment.pl?player_id=' + p.id, 'EQ' ],
		[ '/game/player_tactics.pl?player_id=' + p.id, 'Tactics' ],
	];
	if (p.teamId) {
		playerMgmtLinks.push(['/game/forum_thread_list.pl?team_id=' + p.teamId, 'Forum']);
		playerMgmtLinks.push(['/game/depth_chart.pl?team_id=' + p.teamId, 'Depth']);
		playerMgmtLinks.push(['/game/team_player_stats.pl?team_id=' + p.teamId, 'Leaders']);
	}
	if (p.isMine == true) {
		var boostShow = (!show.gridPlayer.boost || p.boostAvail == undefined || p.boostAvail == 0) ? '' :
			' <span style="color:#0000ff;">(' + p.boostAvail + ')</span>';
		var tpShow =
			(p.tp >= 5) ? (' <span style="color:#0000ff;">(' + p.tp + ')</span>') :
			(p.tp >= 2) ? (' <span style="color:#007f00;">(' + p.tp + ')</span>') :
			(' (' + p.tp + ')');
		var btShow = (!show.gridPlayer.bonus || p.bt == undefined) ? '' :
			(p.bt >= 8) ? (' <span style="color:#0000ff;">(' + p.bt + ')</span>') :
			(p.bt >= 4) ? (' <span style="color:#007f00;">(' + p.bt + ')</span>') :
			(' (' + p.bt + ')');
		if (boostShow.length > 0) playerMgmtLinks.push(['/game/boost_player.pl?player_id=' + p.id, 'Boost' + boostShow]);
		if (p.tp > 0) playerMgmtLinks.push(['/game/training.pl?player_id=' + p.id, 'Train' + tpShow]);
		if (p.bt > 0) playerMgmtLinks.push(['/game/bonus_tokens.pl?player_id=' + p.id, 'Bonus' + btShow]);
		playerMgmtLinks.push(['/game/adv_equipment.pl?player_id=' + p.id, 'Shop']);
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
		if (show.gridPlayer.record && t != undefined && t.record != undefined) {
			cell.appendChild(document.createTextNode(' ' + t.record));
		}
		if (show.gridPlayer.teamleagues && t != undefined && t.leagueId != undefined) {
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
	if (show.gridPlayer.energy && p.energy != undefined && show.gridPlayer.morale && p.morale != undefined) {
		row.appendChild(getRatingBar('Energy', p.energyClass, p.energy, 'medium'));
		row.appendChild(getRatingBar('Morale', p.moraleClass, p.morale, 'medium'));
	} else if (show.gridPlayer.energy && p.energy != undefined) {
		row.appendChild(getRatingBar('Energy', p.energyClass, p.energy, 'large'));
	} else if (show.gridPlayer.morale && p.morale != undefined) {
		row.appendChild(getRatingBar('Morale', p.moraleClass, p.morale, 'large'));
	}
	if (row.hasChildNodes()) {
		pv.appendChild(row);
		pv.appendChild(document.createTextNode("\n"));
	}
	// overall & scout bars
	var nBars = 0;
	if (show.gridPlayer.overall && p.overall != undefined) nBars++;
	if (show.gridPlayer.scout_bars && p.stat1Name != undefined) nBars += (p.stat2Name != undefined) ? 2 : 1;
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
	} else if (show.gridPlayer.overall && p.overall != undefined) { // overall
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
	if (show.gridPlayer.contract && p.contract != undefined && show.gridPlayer.fame && p.fame != undefined) {
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
	} else if (show.gridPlayer.contract && p.contract != undefined) {
		cell = bigBoldCell('Contract:');
		row.appendChild(cell);
		cell = document.createElement('td');
		cell.setAttribute('colspan', 11);
		cell.appendChild(document.createTextNode(p.contract));
		if (p.contractOffers != undefined) cell.appendChild(contractOffersLink(p.contractOffers));
		row.appendChild(cell);
	} else if (show.gridPlayer.fame && p.fame != undefined) {
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
	if (show.gridPlayer.attributes && p.attributes != undefined) {
		row = document.createElement('tr');
		cell = document.createElement('td');
		cell.setAttribute('colspan', 12);
		cell.innerHTML = p.attributes;
		row.appendChild(cell);
		pv.appendChild(row);
	}
	if (p.sp > 0 && show.gridPlayer.blue_levup == 1) {
		p.div.className = 'content_container_sp player_box_vet';
	} else {
		p.div.className = 'content_container player_box_vet';
	}
}

function redrawAllPlayers() { // {{{2
	for each (var p in pData) {
		buildPlayerContent(p);
	}
}

function loadAllPlayers() { // {{{2
	// Retrieve players HTML blurbs
	if (playerViewStyle == 'listPlayer') {
		extractPlayerStatsFromHomePageListView();
//		buildPlayerContentListView();
	} else if (playerViewStyle == 'gridPlayer') {
		$('#players div.player_box_vet').each(function(i, player) {
//			console.info('i = ', i, "\nplayer = ", player);
			var p = extractPlayerStatsFromHomePage(player);
			if (p == undefined) return true;
			p.isMine = isMine;
			p.origIndex = i;
			pData[i] = p;
			buildPlayerContent(p);
		});
	} /* else unknown playerViewStyle! */
	if (show.global.sort) sortPlayerList();
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
	// from <= 2.9.3
	GM_deleteValue('option_gridViewTeamMine_teamlinks');
	GM_deleteValue('option_gridViewTeamOther_teamlinks');
	// from <= 2.11.0
	GM_deleteValue('option_gridViewPlayerMine_shop');
	GM_deleteValue('option_listViewPlayerMine_shop');
	GM_deleteValue('option_gridViewPlayerMine_cash');
	GM_deleteValue('option_listViewPlayerMine_cash');
	GM_deleteValue('cache_boost_player');
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
//window.setTimeout(setupReloadPlayer, 800); // doesn't work otherwise
setupReloadPlayer();

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
