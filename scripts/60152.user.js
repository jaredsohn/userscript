// ==UserScript==
// @name           GLB Homepage s12
// @namespace      Bogleg, tiffman, josh2otter
// @description    Rewrite homepage with much more info and useful quicklinks
// @version        2.0.1
// @include        http://goallineblitz.com/game/home.pl
// @include        http://goallineblitz.com/game/home.pl?*
// ==/UserScript==

// *** GLOBALS ********************************************************* {{{1
// var show_defaults: [ default_value, require_player_page, label, description ], ... {{{2
var show_defaults = {
	max_players			: [ 12,	'int',		'MaxPlayers',		"If # players > MaxPlayers, don't run the per-player page hits (even with LoadNotMine)", ],
	notmine				: [ 0,	'boolean',	'LoadNotMine',		"Automatically load per-player pages on other agents' home pages (if # players <= MaxPlayers)", ],
	blue_levelup_box	: [ 1,	'boolean',	'BlueLevelupBox',	"Turn players box blue when skill points are still available", ],
	countdown			: [ 1,	'boolean',	'Countdown',			"Next-game clocks countdown in real time", ],
	energy				: [ 1,	'boolean',	'Energy',			"Show players' energy bars", ],
	orig_ng_text		: [ 0,	'boolean',	'OrigNextGame',		"Use unaltered Next-game text (incompatible with Countdown)", ],
	sort				: [ 1,	'boolean',	'ShowSort',			"Show 'Sort Players' selection list", ],
	teamlinks			: [ 1,	'boolean',	'TeamLinks',			"Show quick links to team mgmt/info pages", ],
	// team.pl
	record				: [ 1,	'boolean',	'Record',			"Show teams' win-loss-tie records", ],
	chemistry			: [ 1,	'boolean',	'Chemistry',			"Show teams'  records", ],
	teamleagues			: [ 1,	'boolean',	'TeamLeagues',		"Show conference/league that players' teams belong to", ],
	// compare_teams.pl
	spread				: [ 1,	'boolean',	'NextGameSpread',	"Show Next Game scouting spread (for players, not yet teams) - requires an extra page load", ],
	// boost_player.pl
	boost				: [ 1,	'boolean',	'Boost',				"Show players' available boosts and overall boost cost (extra page hit per player)", ],
	// player.pl
	attributes			: [ 1,	'boolean',	'Attributes',		"Show players' primary and secondary attributes", ],
	bonus				: [ 1,	'boolean',	'BonusTokens',		"Show number of bonus tokens", ],
	cash				: [ 1,	'boolean',	'Cash',				"Show players' current cash", ],
	contract			: [ 1,	'boolean',	'Contract',			"Show players' contract info", ],
	fame				: [ 1,	'boolean',	'Fame',				"Show players' fame", ],
	morale				: [ 1,	'boolean',	'Morale',			"Show players' morale bars", ],
	overall				: [ 1,	'boolean',	'Overall',			"Show players' scouting overall bars", ],
	scout_bars			: [ 1,	'boolean',	'ScoutBars',			"Show players' position-specific scouting bars", ],
	shop				: [ 1,	'boolean',	'ShoppingTokens',	"Show number of shopping tokens", ],
};

// Configuration setup {{{2
var isMine = true;
(function() {
	var tmp = document.getElementById('message_buttons');
	if (tmp == undefined) isMine = false;
})();

var show = {};
for (var sd in show_defaults) {
	var saved = parseInt(GM_getValue('option_' + sd, show_defaults[sd][0]));
	show[sd] = saved;
}

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
		if (t == 'compare_teams') {
			if (show.spread) {
				dataLoad(t, id, fetchCompareTeamsPage, foundCachedData, d);
			}
		} else if (t == 'player') {
			if (show.attributes
				|| show.contract
				|| show.fame
				|| show.shop
				|| (d.isMine && (show.bonus
					|| show.cash
					|| show.morale
					|| show.overall
					|| show.scout_bars
				))
			) {
				dataLoad(t, id, fetchPlayerPage, foundCachedData, d);
			}
		} else if (t == 'boost_player') {
			if (show.boost && d.isMine) {
				dataLoad(t, id, fetchBoostPlayerPage, foundCachedData, d);
			}
		} else if (t == 'team') {
			if (show.teamleagues || show.record || show.chemistry) {
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
	if (isMine == false && (show.notmine == 0 || numPlayers > show.max_players)) {
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
			if (show.countdown == 0) {
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
					if (a++ != 0) newData.attributes += ' ';
					newData.attributes += '<span style="color:#00a000">' + s + ':</span>' + (av[s].boost ? as : '') + av[s].value + (av[s].boost ? '</span>' : '');
				}
				if (a == 0) newData.attributes = '<span style="font-weight:bold; font-size:10px;">'; else newData.attributes += '<br />';
				for each (s in attributes[p.pos].sec) {
					if (a++ != 0) newData.attributes += ' ';
					newData.attributes += s + ':' + (av[s].boost ? as : '<span style="font-weight:bold;">') + av[s].value + '</span>';
				}
				newData.attributes += '</span>';
			}
			// contract
			if (s = doc.match(/>Daily Salary:<.+?(\$\d+)/)) {
				newData.contract = s[1] + '/day';
			}
			if (s = doc.match(/Contract Offers \((\d+)\)/)) {
				newData.contractOffers = parseInt(s[1]);
			}
			if (s = doc.match(/yr - exp\. season\s*(\d+).+?day\s*(\d+)(.+?)\/td>/i)) {
				if (newData.contract) {
					newData.contract += ' (exp ' + s[1] + ':' + s[2] + ')';
				} else {
					newData.contract = 'Expires ' + s[1] + ':' + s[2];
				}
				if (/No Trade/.test(s[3])) {
					newData.contract += ' (NT)';
				}
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
	if (show_defaults[opt][1] == 'int') {
		show[opt] = parseInt(tgt.value);
	} else if (show_defaults[opt][1] == 'boolean') {
		show[opt] = tgt.checked ? 1 : 0;
	}
	GM_setValue('option_' + opt, show[opt]);
	redrawAllTeams();
	installLoadPlayersLink();
	installSortOptions();
	redrawAllPlayers();
	updateBoostCost();
}

function installOptionsBoxen() { // {{{2
	// figure out table width
	var numRows = 3;
	var i = 0;
	var tabWidth = 0;
	var fields = [];
	for (i in show_defaults) {
		fields.push(i);
		tabWidth++;
	}
	tabWidth = Math.ceil(tabWidth / numRows);
	var tabExtra = (tabWidth * numRows) - fields.length;
	var cellWidth = Math.ceil(100 / tabWidth);
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
	for (i = 0; i < fields.length; i++) {
		if (!(i % tabWidth)) {
			if (i > 0) table.appendChild(row);
			row = document.createElement('tr');
			row.setAttribute('class', 'alternating_color' + rowNum);
			if (++rowNum > 2) rowNum = 1;
		}
		var f = fields[i];
		cell = document.createElement('td');
		cell.style.width = cellWidth + '%';
		cell.style.fontSize = '10px';
		var span = document.createElement('span');
		span.setAttribute('onmouseover', "set_tip('" + show_defaults[f][3].replace(/'/g,"\\'") + "', 0, 1, 1, 1)");
		span.setAttribute('onmouseout', "unset_tip()");
		var tmp = document.createElement('input');
		if (show_defaults[f][1] == 'int') {
			tmp.type = 'text';
			tmp.size = 4;
			tmp.value = show[f];
		} else if (show_defaults[f][1] == 'boolean') {
			tmp.type = 'checkbox';
			tmp.checked = show[f] ? 1 : 0;
		} else {
			GM_log('unknown show_defaults type for ' + f + ': ' + show_defaults[f][1]);
			continue;
		}
		tmp.setAttribute('name', f);
		tmp.id = 'GLBHP_option_' + f;
		var label = document.createElement('label');
		label.setAttribute('for', tmp.id);
		label.setAttribute('htmlFor', tmp.id);
		tmp.data = label.innerHTML = show_defaults[f][2];
		tmp.addEventListener('change', changeOption, true);
		span.appendChild(tmp);
		span.appendChild(label);
		cell.appendChild(span);
		row.appendChild(cell);
	}
	if (tabExtra) {
		cell = document.createElement('td');
		cell.setAttribute('colspan', tabExtra);
		row.appendChild(cell);
	}
	table.appendChild(row);
	div.appendChild(table);
	optBox.appendChild(div);
	// insert the node tree
	var container = document.getElementById('players_teams');
	var after = document.getElementById('teams');
	container.insertBefore(optBox, after);
}

function installLoadPlayersLink() { // {{{2
	var tmp = document.getElementById('GLBHP_load_players');
	if (isMine || (show.notmine == 1 && numPlayers <= show.max_players)) {
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
	var container = getElementsByClassName(/^medium_head$/, 'div', document)[3];
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
		'Fame':				'fame',
		'Level':			'level',
		'Next Game':		'nextGameTimer',
		'Overall':			'overall',
		'Position':			'pos',
		'Shopping Tokens':	'st',
		'Skill Points':		'sp',
		'Team':				'teamName',
		'Training Points':	'tp',
		'VXP':				'vxp',
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

function installSortOptions() { // {{{2
	var tmp = document.getElementById('GLBHP_player_sort');
	if (show.sort == 0) {
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
			'Date Created',
			'Fame',
			'Level',
			'Next Game',
			'Overall',
			'Position',
			'Shopping Tokens',
			'Skill Points',
			'Team',
			'Training Points',
			'VXP',
			'XP'
		];
	} else {
		pfx = 'OtherAgent';
		sortTypes = [
			'Alphabetical',
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
	var span = document.createElement('span');
	span.id = 'GLBHP_player_sort';
	span.appendChild(document.createElement('br'));
	span.appendChild(document.createTextNode('Sort by '));
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
	span.appendChild(s);
	// sortDir options -- primary
	s = mksel('plSortDir1');
	s.innerHTML = '<option value="Descending">Descending</option><option value="Ascending">Ascending</option>';
	if (savedSortDir != '0') {
		s.options[(savedSortDir == 'Ascending') ? 1 : 0].selected = true;
	}
	span.appendChild(s);
	span.appendChild(document.createTextNode(' then by '));
	// sortType options -- secondary
	s = mksel('plSortType2');
	tmp = '';
	for(var i = 0; i < sortTypes.length; i++) {
		var sel = (sortTypes[i] == savedSecondarySortType) ? ' selected="selected">' : '>';
		tmp += '<option value="' + sortTypes[i] + '"' + sel + sortTypes[i] + '</option>';
	}
	s.innerHTML = tmp;
	span.appendChild(s);
	// sortDir options -- secondary
	s = mksel('plSortDir2');
	s.innerHTML = '<option value="Descending">Descending</option><option value="Ascending">Ascending</option>';
	if (savedSortDir != '0') {
		s.options[(savedSecondarySortDir == 'Ascending') ? 1 : 0].selected = true;
	}
	span.appendChild(s);
	var container = getElementsByClassName(/^medium_head$/, 'div', document)[3];
	container.appendChild(document.createTextNode(' '));
	container.appendChild(span);
}

// *** UTILITY ********************************************************* {{{1
function getRatingBar(nam, fill, val, width) { // {{{2
	var containerWidth = {
		small: 65,
		medium: 100,
		large: 100,
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
	if (show.countdown != 1 && show.orig_ng_text) {
		out += ng.origText;
	} else {
		var t = ng.timer.getTime() - new Date().getTime();
		if (t < 0) {
			out += '<span style="font-size:10px">(game over; <a href="javascript:window.location.reload();">refresh</a>)</span>';
		} else {
			out += 'in ';
			t = Math.floor(t / 1000);
			ng.secsTil = t;
			if (t > 86400) {
				var days = Math.floor(t / 86400);
				t -= Math.floor(t / 86400) * 86400;
				out += days + '+';
			}
			out += Math.floor(t / 3600) + ':';
			t -= Math.floor(t / 3600) * 3600;
			out += (((t / 60) < 10) ? '0' : '') + Math.floor(t / 60) + ':';
			t -= Math.floor(t / 60) * 60;
			out += ((t < 10) ? '0' : '') + t;
		}
		out += ' ' + ng.where + ' <a href="' + ng.link + '">' + ng.oppTeam + '</a>';
	}
	if (show.spread) {
		if (ng.spread == undefined) {
			fetchCached('compare_teams', teamId, ng);
		} else {
			out += ' (' + ng.spread + ')';
		}
	}
	ng.html = out;
}

function redrawNextGame(obj) { // {{{2
	var cell = document.getElementById(mkid(obj, 'next_game'));
	if (cell == undefined) return;
	if (obj.teamId == undefined || matchups[obj.teamId] == undefined || matchups[obj.teamId].html == undefined) {
		// cell.innerHTML = 'None';
		cell.parentNode.style.display = 'none';
		cell.parentNode.style.visibility = 'hidden';
		return;
	}
	if (cell.parentNode.nodeName == 'TR') {
		cell.parentNode.style.display = 'table-row';
	} else {
		cell.parentNode.style.display = 'inline';
	}
	cell.parentNode.style.visibility = 'visible';
	obj.nextGameTimer = matchups[obj.teamId].secsTil;
	cell.innerHTML = matchups[obj.teamId].html;
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
	if (show.countdown == 1) {
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
		if (!show.boost) return;
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
	if (!show.boost) {
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
	var team_view_selected = team_view_select.selectedIndex;
	var team_view_value = team_view_select.options[team_view_selected].value;
	if (team_view_value == "card") {
	var teams = getElementsByClassName(/^team_name_container$/, 'div', document);
	var team_data = getElementsByClassName(/^team_data$/, 'div', document);
	} else {
	var teams = getElementsByClassName(/^large_title_bar teamhead$/, 'div', document);
	var team_data = getElementsByClassName(/^team_data_simple$/, 'div', document);
}
	if (!teams) return;
	if (!team_data) return;
	for (var i = 0; i < teams.length; i++) {
		var teamId = parseInt(teams[i].innerHTML.substring(teams[i].innerHTML.indexOf('team_id=') + 8, teams[i].innerHTML.indexOf('">')));
		// record & chemistry
		var tmp = document.getElementById(mkid({id:teamId}, 'record_chem'));
		if (tmp) tmp.parentNode.removeChild(tmp);
		if (show.record || show.chemistry) {
			var t = loadTeam(teamId, true);
			var rec = 0;
			var chem = 0;
			if (show.record && t != undefined && t.record != undefined) {
				rec = document.createElement('span');
				rec.id = mkid({id:teamId}, 'record');
				rec.innerHTML = '<b>Record:</b> ' + t.record;
			}
			if (show.chemistry && t != undefined && t.chemOverall != undefined) {
				chem = document.createElement('span');
				chem.id = mkid({id:teamId}, 'chemistry');
				chem.innerHTML = '<b>Chemistry:</b> Ovr ' + t.chemOverall + ' / Off ' + t.chemOffense + ' / Def ' + t.chemDefense;
			}
			if (rec || chem) {
				tmp = document.createElement('div');
				tmp.id = mkid({id:teamId}, 'record_chem');
				if (rec) tmp.appendChild(rec);
				if (rec && chem) tmp.appendChild(document.createTextNode(' '));
				if (chem) tmp.appendChild(chem);
				var after = getElementsByClassName(/^team_cash$/, 'div', team_data[i])[0];
				after.parentNode.insertBefore(tmp, after);
			}
		}
		// teamlinks
		var tmp = document.getElementById(mkid({id:teamId}, 'links'));
		var leagueForumLink = document.getElementById(mkid({id:teamId}, 'forum_link'));
		if (show.teamlinks) {
			if (tmp) {
				tmp.style.display = 'inline';
				tmp.style.visibility = 'visible';
			} else {
				team_data[i].innerHTML = '<span id="' + mkid({id:teamId}, 'links') + '" style="font-weight:bold; font-size:10px;">'
					+ '<a href="/game/roster.pl?team_id=' + teamId + '">Roster</a>'
					+ ' | <a href="/game/depth_chart.pl?team_id=' + teamId + '">Depth</a>'
					+ ' | <a href="/game/team_player_stats.pl?team_id=' + teamId + '">Leaders</a>'
					+ ' | <a href="/game/stadium.pl?team_id=' + teamId + '">Stadium</a>'
					+ ' | <a href="/game/team_item_fund.pl?team_id=' + teamId + '">EQ</a>'
					+ ' | <a href="/game/team_gm.pl?team_id=' + teamId + '">GMs</a>'
					+ ' | <a href="/game/team_loan.pl?team_id=' + teamId + '">Loan</a>'
					+ ' | <a href="/game/team_offers.pl?team_id=' + teamId + '">Offers</a>'
					+ ' | <a href="/game/team_tactics.pl?team_id=' + teamId + '">Tactics</a>'
					+ '<br /></span>' + team_data[i].innerHTML;
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
	var team_view_selected = team_view_select.selectedIndex;
	var team_view_value = team_view_select.options[team_view_selected].value;
	if (team_view_value == "card") {
	var teams = getElementsByClassName(/^team_content$/, 'div', document);
	} else {
	var teams = getElementsByClassName(/^content_container team_simple$/, 'div', document);
}
	numTeams = teams.length;
	for each (var team in teams) {
		team.style.height = 'auto';
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
	if (show.cash && p.isMine == true && p.cash != undefined) {
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
		[ '/game/equipment.pl?player_id=' + p.id, 'EQ' ],
		[ '/game/player_tactics.pl?player_id=' + p.id, 'Tactics' ],
	];
	if (p.teamId) {
		playerMgmtLinks.push(['/game/forum_thread_list.pl?team_id=' + p.teamId, 'Forum']);
		playerMgmtLinks.push(['/game/depth_chart.pl?team_id=' + p.teamId, 'Depth']);
		playerMgmtLinks.push(['/game/team_player_stats.pl?team_id=' + p.teamId, 'Leaders']);
	}
	if (p.isMine == true) {
		var boostShow = (!show.boost || p.boostAvail == undefined || p.boostAvail == 0) ? '' :
			' <span style="color:#0000ff;">(' + p.boostAvail + ')</span>';
		var tpShow =
			(p.tp >= 5) ? (' <span style="color:#0000ff;">(' + p.tp + ')</span>') :
			(p.tp >= 2) ? (' <span style="color:#007f00;">(' + p.tp + ')</span>') :
			(' (' + p.tp + ')');
		var btShow = (!show.bonus || p.bt == undefined) ? '' :
			(p.bt >= 8) ? (' <span style="color:#0000ff;">(' + p.bt + ')</span>') :
			(p.bt >= 4) ? (' <span style="color:#007f00;">(' + p.bt + ')</span>') :
			(' (' + p.bt + ')');
		var stShow = (!show.shop || p.st == undefined) ? '' :
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
		if (show.record && t != undefined && t.record != undefined) {
			cell.appendChild(document.createTextNode(' ' + t.record));
		}
		if (show.teamleagues && t != undefined && t.leagueId != undefined) {
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
	if (show.energy && p.energy != undefined && show.morale && p.morale != undefined) {
		row.appendChild(getRatingBar('Energy', p.energyClass, p.energy, 'medium'));
		row.appendChild(getRatingBar('Morale', p.moraleClass, p.morale, 'medium'));
	} else if (show.energy && p.energy != undefined) {
		row.appendChild(getRatingBar('Energy', p.energyClass, p.energy, 'large'));
	} else if (show.morale && p.morale != undefined) {
		row.appendChild(getRatingBar('Morale', p.moraleClass, p.morale, 'large'));
	}
	if (row.hasChildNodes()) {
		pv.appendChild(row);
		pv.appendChild(document.createTextNode("\n"));
	}
	// overall & scout bars
	var nBars = 0;
	if (show.overall && p.overall != undefined) nBars++;
	if (show.scout_bars && p.stat1Name != undefined) nBars += (p.stat2Name != undefined) ? 2 : 1;
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
	} else if (show.overall && p.overall != undefined) { // overall
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
	if (show.contract && p.contract != undefined && show.fame && p.fame != undefined) {
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
	} else if (show.contract && p.contract != undefined) {
		cell = bigBoldCell('Contract:');
		row.appendChild(cell);
		cell = document.createElement('td');
		cell.setAttribute('colspan', 11);
		cell.appendChild(document.createTextNode(p.contract));
		if (p.contractOffers != undefined) cell.appendChild(contractOffersLink(p.contractOffers));
		row.appendChild(cell);
	} else if (show.fame && p.fame != undefined) {
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
	if (show.attributes && p.attributes != undefined) {
		row = document.createElement('tr');
		cell = document.createElement('td');
		cell.setAttribute('colspan', 12);
		cell.innerHTML = p.attributes;
		row.appendChild(cell);
		pv.appendChild(row);
	}
	if (p.sp > 0 && show.blue_levelup_box == 1) {
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
	var players = getElementsByClassName(/^content_container(?:_sp)? player_box_vet$/, 'div', document);
	// Loop through each player
	for (var i = 0; i < numPlayers; i++) {
		var p = extractPlayerStatsFromHomePage(players[i]);
		// is this my page or someone else's?
		if (p == undefined) continue;
		var s;
		// adjustments for this-is-not-MY-homepage -- only do this once!
		p.isMine = isMine;
		p.origIndex = i;
		pData.push(p)
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
	GM_deleteValue('sortType');
	GM_deleteValue('sortDir');
	GM_deleteValue('SortType_2');
	GM_deleteValue('SortDir_2');
	GM_deleteValue('priorSortType');
	GM_deleteValue('priorSortDir');
	GM_deleteValue('GLBHP_option_contract');
	GM_deleteValue('GLBHP_option_sort');
	GM_deleteValue('GLBHP_option_shop');
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
window.setTimeout(setupReloadPlayer, 1000); // doesn't work otherwise

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
}
)();

// vim: foldmethod=marker
