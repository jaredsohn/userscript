// ==UserScript==
// @name           GLB Homepage
// @namespace      Bogleg
// @description    Rewrite homepage with much more info and useful quicklinks
// @version        1.4.1
// @include        http://goallineblitz.com/game/home.pl
// @include        http://goallineblitz.com/game/home.pl?*
// ==/UserScript==

// *** GLOBALS ********************************************************* {{{1

// var : [ default_value, require_player_page, label, description ], ...
var show_defaults = {
	teamlinks			: [ 1, 0, 'TeamLinks',		"Show quick links to team mgmt/info pages", ],
	blue_levelup_box	: [ 1, 0, 'BlueLevelupBox',	"Turn players box blue when skill points are still available", ],
	countdown			: [ 1, 0, 'Countdown',		"Next-game clocks countdown in real time", ],
	sort				: [ 1, 0, 'ShowSort',		"Show 'Sort Players' selection list", ],
	spread				: [ 1, 0, 'NextGameSpread',	"Show Next Game scouting spread (for players, not yet teams) - requires an extra page load", ],
	energy				: [ 1, 0, 'Energy',			"Show players' energy bars", ],
	boost				: [ 1, 1, 'Boost',			"Show players' available boosts (extra page hit per player)", ],
	cash				: [ 1, 1, 'Cash',			"Show players' current cash", ],
	bonus				: [ 1, 1, 'BonusTokens',	"Show number of bonus tokens", ],
	shop				: [ 1, 1, 'ShoppingTokens',	"Show number of shopping tokens", ],
	contract			: [ 1, 1, 'Contract',		"Show players' contract info", ],
	fame				: [ 1, 1, 'Fame',			"Show players' fame", ],
	morale				: [ 1, 1, 'Morale',			"Show players' morale bars", ],
	overall				: [ 1, 1, 'Overall',		"Show players' scouting overall bars", ],
	scout_bars			: [ 1, 1, 'ScoutBars',		"Show players' position-specific scouting bars", ],
	attributes			: [ 1, 1, 'Attributes',		"Show players' primary and secondary attributes", ],
};

// Globals
var show = {};
var fetchPlayers = 0;
for (var sd in show_defaults) {
	var saved = parseInt(GM_getValue('option_' + sd, show_defaults[sd][0]));
	show[sd] = saved;
	if (show[sd] && show_defaults[sd][1]) fetchPlayers = 1;
}

var matchups = {}; // {{{2
/* matchups = {
	teamId: {
		pendingMatchupLoad => 1/undefined,
		teamId => teamId,
		timer => Date()_of_game,
		where => <at|vs>,
		link => link_to_matchup,
		oppTeam => opp_team_name,
		spread => +/-INT (string),
	},
} */

var tData = []; // {{{2
/* tData = [ {
	teamId => int,
	id => 't' + teamId (string),
}, ...  ] */

var pData = []; // {{{2
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

// make a HTML DOM ID based on player ID and contents
function mkid(p, name) { // {{{2
	return 'GLBHP_' + p.id + '_' + name;
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

// *** OPTIONS ********************************************************* {{{1

function toggleShowOptions() { // {{{2
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

function changeOption(e, elName) { // {{{2
	var evt = e || window.event;
	var tgt = evt.target || evt.srcElement;
	var opt = tgt.getAttribute('name');
	show[opt] = tgt.checked ? 1 : 0;
	GM_setValue('option_' + opt, show[opt]);
	installTeamLinks();
	installSortOptions();
	redrawAllPlayers();
}

function installOptionsBoxen() { // {{{2
	// figure out table width
	var numRows = 2;
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
	optBox.id = 'GLBHP_options_container';
	var div = document.createElement('div');
	div.setAttribute('class', 'medium_head');
	div.appendChild(document.createTextNode('Homepage Options'));
	div.appendChild(document.createTextNode(' '));
	var href = document.createElement('a');
	href.id = 'GLBHP_options_toggleShow';
	href.setAttribute('href', 'javascript:;');
	href.addEventListener('click', toggleShowOptions, true);
	href.appendChild(document.createTextNode('(show)'));
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
		tmp.type = 'checkbox';
		tmp.setAttribute('name', f);
		tmp.checked = show[f] ? 1 : 0;
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

// *** SORTING PLAYERS ************************************************* {{{1

// onChange for the 'Sort By' selection
function sortPlayerList() { // {{{2
	var sortType2Key = {
		'Alphabetical':		'name',
		'Bonus Tokens':		'bt',
		'Cash':				'cash',
		'Fame':				'fame',
		'Level':			'level',
		'Next Game':		'nextGameTimer',
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
	GM_setValue('sortType', sortType);
	GM_setValue('sortDir', sortDir);
	GM_setValue('SortType_2', secondarySortType);
	GM_setValue('SortDir_2', secondarySortDir);
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
				holder = pData[y+1].div.innerHTML;
				pData[y+1].div.innerHTML = pData[y].div.innerHTML;
				pData[y].div.innerHTML = holder;
				holder = pData[y+1].div;
				pData[y+1].div = pData[y].div;
				pData[y].div = holder;
				holder = pData[y+1];
				pData[y+1] = pData[y];
				pData[y] = holder;
				swapped = true;
			}
		}
		if (sortDebug) console.log(note);
	} while (swapped == true);
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
	var savedSortType = GM_getValue('sortType', 'Alphabetical');
	var savedSortDir = GM_getValue('sortDir', 'Ascending');
	var savedSecondarySortType = GM_getValue('SortType_2', 'Alphabetical');
	var savedSecondarySortDir = GM_getValue('SortDir_2', 'Ascending');
	var sortTypes = new Array(
		'Alphabetical',
		'Bonus Tokens',
		'Cash',
		'Date Created',
		'Fame',
		'Level',
		'Next Game',
		'Position',
		'Shopping Tokens',
		'Skill Points',
		'Team',
		'Training Points',
		'VXP',
		'XP'
	);
	var span = document.createElement('span');
	span.id = 'GLBHP_player_sort';
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
	var container = getElementsByClassName(/^medium_head subhead_head$/, 'div', document)[0];
	container.appendChild(document.createTextNode(' '));
	container.appendChild(span);
}

// *** UTILITY ********************************************************* {{{1

function getRatingBar(nam, fill, val, width) { // {{{2
	var w2 = width + 4;
	var w3 = Math.round(val * (width-5) / 100);
	var cs = (width == 50) ? 3 : (width == 105) ? 5 : 11;
	var bar = document.createDocumentFragment();
	var cell = document.createElement('td');
	cell.style.fontSize = '12px';
	cell.style.fontWeight = 'bold';
	cell.appendChild(document.createTextNode(nam + ':'));
	bar.appendChild(cell);
	cell = document.createElement('td');
	cell.setAttribute('colspan', cs);
	var outerDiv = document.createElement('div');
	outerDiv.id = 'glb_hp_rating_bar';
	outerDiv.style.position = 'relative';
	outerDiv.style.height = '100%';
	var middleDiv = document.createElement('div');
	middleDiv.setAttribute('class', 'rating_bar');
	middleDiv.style.width = width + 'px';
	middleDiv.style.height = '12px';
	middleDiv.style.position = 'absolute';
	middleDiv.style.top = '50%';
	middleDiv.style.marginTop = '0px';
	var innerDiv = document.createElement('div');
	innerDiv.setAttribute('class', 'rating_bar_fill ' + fill);
	innerDiv.style.height = '10px';
	innerDiv.style.lineHeight = '10px';
	innerDiv.style.width = w3 + 'px';
	innerDiv.innerHTML = '&nbsp;';
	middleDiv.appendChild(innerDiv);
	outerDiv.appendChild(middleDiv);
	var span = document.createElement('span');
	span.style.fontSize = '10px';
	span.style.cssFloat = 'left';
	span.style.paddingLeft = w2 + 'px';
	span.appendChild(document.createTextNode(val));
	outerDiv.appendChild(span);
	cell.appendChild(outerDiv);
	bar.appendChild(cell);
	return bar;
}

function loadGameMatchup(ng) { // {{{2
	if (ng.link == undefined) {
		return;
	}
	if (ng.pendingMatchupLoad != undefined) {
		return;
	}
	ng.pendingMatchupLoad = 1;
	if (ng.spread != undefined) { // cached
		return;
	}
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://goallineblitz.com' + ng.link,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(matchupPage) {
			if (ng.spread != undefined) { // already done!
				return;
			}
			// Add next game spread to homepage
			var m = matchupPage.responseText.replace(/\n/g, '').replace(/\s+/g, ' ').match(/Overall.+?(\d+)<\/div><\/div>/g);
			var opp = m[0].match(/Overall.+?(\d+)<\/div><\/div>/);
			var me = m[1].match(/Overall.+?(\d+)<\/div><\/div>/);
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
			ng.pendingMatchupLoad = undefined;
		}
	});
}

function newMatchup(teamId, where, link, oppTeam, when) { // {{{2
	var ng = matchups[teamId];
	if (ng != undefined) return;
	ng = matchups[teamId] = {};
	ng.where = where;
	ng.link = link.replace(/&amp;/g, '&');
	ng.oppTeam = oppTeam;
	ng.teamId = teamId;
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
	window.setTimeout(loadGameMatchup, 100, ng);
}

function setNextGame(teamId) { // {{{2
	var ng = matchups[teamId];
	if (ng == undefined) return;
	var t = ng.timer.getTime() - new Date().getTime();
	var out = '';
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
	if (show.spread && ng.spread != undefined) {
		out += ' (' + ng.spread + ')';
	}
	ng.html = out;
}

function redrawNextGame(obj) { // {{{2
	var cell = document.getElementById(mkid(obj, 'next_game'));
	if (cell == undefined) return;
	if (obj.teamId == undefined || matchups[obj.teamId] == undefined || matchups[obj.teamId].html == undefined) {
		cell.innerHTML = 'None';
		return;
	}
	obj.nextGameTimer = matchups[obj.teamId].secsTil;
	cell.innerHTML = matchups[obj.teamId].html;
}

function updateClocks(t) { // {{{2
	if (t != undefined && t > 0) {
		setNextGame(t);
		for each (var p in pData) {
			if (p.teamId == t) redrawNextGame(p);
		}
		for each (var t in tData) {
			if (t.teamId == t) redrawNextGame(t);
		}
		return;
	}
	if (show.countdown == 1) {
		for (var teamId in matchups) {
			setNextGame(teamId);
		}
		for each (var p in pData) {
			redrawNextGame(p);
		}
		for each (var t in tData) {
			redrawNextGame(t);
		}
	}
	window.setTimeout(updateClocks, 1400, 0);
}

// *** TEAM ************************************************************ {{{1

// Add links for owned/GMed teams
function installTeamLinks() { // {{{2
	var teams = getElementsByClassName(/^large_title_bar teamhead$/, 'div', document);
	if (!teams) return;
	var team_data = getElementsByClassName(/^team_data$/, 'div', document);
	if (!team_data) return;
	if (show.teamlinks) {
		for (var i = 0; i < teams.length; i++) {
			var teamId = teams[i].innerHTML.substring(teams[i].innerHTML.indexOf('team_id='), teams[i].innerHTML.indexOf('">'));
			var tmp = document.getElementById(mkid({id:teamId}, 'links'));
			if (tmp) {
				tmp.style.display = 'inline';
				tmp.style.visibility = 'visible';
			} else {
				team_data[i].innerHTML = '<span id="' + mkid({id:teamId}, 'links') + '" style="font-weight:bold; font-size:10px;">'
					+ '<a href="/game/forum_thread_list.pl?' + teamId + '">Forum</a>'
					+ ' | <a href="/game/roster.pl?' + teamId + '">Roster</a>'
					+ ' | <a href="/game/depth_chart.pl?' + teamId + '">Depth</a>'
					+ ' | <a href="/game/team_player_stats.pl?' + teamId + '">Leaders</a>'
					+ ' | <a href="/game/stadium.pl?' + teamId + '">Stadium</a>'
					+ ' | <a href="/game/team_item_fund.pl?' + teamId + '">EQ</a>'
					+ ' | <a href="/game/team_gm.pl?' + teamId + '">GMs</a>'
					+ ' | <a href="/game/team_loan.pl?' + teamId + '">Loan</a>'
					+ ' | <a href="/game/team_offers.pl?' + teamId + '">Offers</a>'
					+ ' | <a href="/game/team_tactics.pl?' + teamId + '">Tactics</a>'
					+ '<br /></span>' + team_data[i].innerHTML;
			}
		}
	} else {
		for (var i = 0; i < teams.length; i++) {
			var teamId = teams[i].innerHTML.substring(teams[i].innerHTML.indexOf('team_id='), teams[i].innerHTML.indexOf('">'));
			var tmp = document.getElementById(mkid({id:teamId}, 'links'));
			if (tmp) {
				tmp.style.display = 'none';
				tmp.style.visibility = 'hidden';
			}
		}
	}
}

// *** PLAYER ********************************************************** {{{1

function fetchPlayerBoostPage(p) { GM_xmlhttpRequest({ // {{{2
	method: 'GET',
	url: 'http://goallineblitz.com/game/boost_player.pl?player_id=' + p.id,
	headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'application/atom+xml,application/xml,text/xml',
	},
	onload: function(playerBoostPage) {
		var doc = playerBoostPage.responseText.replace(/\n/g, '').replace(/\s\s+/g, ' ');
		var s = doc.match(/Remaining Level Ups.+?level_up_value">\s*(\d+)/);
		if (s) {
			p.boostAvail = parseInt(s[1]);
			buildPlayerContent(p);
		}
	}
}); }

function fetchPlayerPage(p) { GM_xmlhttpRequest({ // {{{2
	method: 'GET',
	url: 'http://goallineblitz.com/game/player.pl?player_id=' + p.id,
	headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'application/atom+xml,application/xml,text/xml',
	},
	onload: function(playerPage) {
		var doc = playerPage.responseText.replace(/\n/g, '').replace(/\s\s+/g, ' ');
		var s, a, as, av = {};
		// attributes
		if (s = doc.match(/="stat_head_tall">[a-z]+:.+?value_tall(?:_boosted)?">[0-9\.]+/gi)) {
			for each (a in s) {
				if (as = a.split(/="stat_head_tall">([a-z]{3})[a-z]+:.+?value_tall(_boosted)?">([0-9\.]+)/gi)) {
					av[as[1]] = { 'boost': as[2] ? 1 : 0, 'value': as[3] };
				}
			}
			as = '<span style="color:#0000ff; font-weight:bold;">';
			p.attributes = '<span style="font-weight:bold; font-size:10px;">';
			a = 0;
			for each (s in attributes[p.pos].pri) {
				if (a++ != 0) p.attributes += ' ';
				p.attributes += '<span style="color:#00a000">' + s + ':</span>' + (av[s].boost ? as : '') + av[s].value + (av[s].boost ? '</span>' : '');
			}
			if (a == 0) p.attributes = '<span style="font-weight:bold; font-size:10px;">'; else p.attributes += '<br />';
			for each (s in attributes[p.pos].sec) {
				if (a++ != 0) p.attributes += ' ';
				p.attributes += s + ':' + (av[s].boost ? as : '<span style="font-weight:bold;">') + av[s].value + '</span>';
			}
			p.attributes += '</span>';
		}
		// contract
		if (s = doc.match(/>Daily Salary:<.+?(\$\d+)/)) {
			p.contract = s[1] + '/day';
		}
		if (s = doc.match(/yr - exp\. season\s*(\d+).+?day\s*(\d+)(.+?)\/td>/i)) {
			if (p.contract) {
				p.contract += ' (exp ' + s[1] + ':' + s[2] + ')';
			} else {
				p.contract = 'Expires ' + s[1] + ':' + s[2];
			}
			if (/No Trade/.test(s[3])) {
				p.contract += ' (NT)';
			}
		}
		// fame
		if (s = doc.match(/ass="current_stats_fame".*?>(\d+(?:\s*<a href.+?<\/a>)?)</)) {
			p.fameText = s[1];
			s = p.fameText.match(/(\d+)/);
			p.fame = parseInt(s[1]);
		}
		// cash
		if (s = doc.match(/ass="player_money">.+?\$(\d+)/)) {
			p.cash = parseInt(s[1]);
		}
		// overall, morale, key stats
		if (as = doc.match(/rating_head">(.+?):?<.+?width:\s*(\d+)/g)) {
			av = 0;
			for each (a in as) {
				if (s = a.match(/rating_head">(.+?):?<.+?(rating_bar_fill_\d+).+?width:\s*(\d+)/)) {
					if (s[1] == 'Overall') {
						p.overallClass = s[2];
						p.overall = s[3];
					} else if (s[1] == 'Morale') {
						p.moraleClass = s[2];
						p.morale = s[3];
					} else if (s[1] != 'Energy') {
						var n = s[1].replace('ing', '').replace('ense', '').replace(/Rece\S+/, 'Rec').replace('Tackl', 'Tackle').replace(/\s/g, '');
						var c = s[2];
						var v = s[3];
						if (av++ == 0) {
							p.stat1Name = n;
							p.stat1Class = c;
							p.stat1Value = v;
						} else {
							p.stat2Name = n;
							p.stat2Class = c;
							p.stat2Value = v;
						}
					}
				}
			}
		}
		// bonus tokens
		if (s = doc.match(/<td>\d+<\/td><td>\d+<\/td><td>\d+<\/td><td>(\d+)<\/td><td>\d+<\/td>/)) {
			p.bt = parseInt(s[1]);
		}
		// shopping tokens
		if (s = doc.match(/<td>\d+<\/td><td>\d+<\/td><td>\d+<\/td><td>\d+<\/td><td>(\d+)<\/td>/)) {
			p.st = parseInt(s[1]);
		}
		buildPlayerContent(p);
		sortPlayerList();
	}
}) }

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
	if (teamId != 0 && ng == undefined && (s = pdoc.match(/Next Game.+?\s+(at|vs)\s+<a href="(\/game\/compare_teams\.pl\?[^"]+)">(.+?)<.+?\(in\s*(.+?)\)<\/td>/))) {
		newMatchup(teamId, s[1], s[2], s[3], s[4]);
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
	p.div.style.height = 'auto';
	p.div.style.paddingBottom = '3px';
	// cash
	var id = mkid(p, 'cash');
	var div = document.getElementById(id);
	if (show.cash && p.cash != undefined) {
		if (!div) {
			div = document.createElement('div');
			div.id = mkid(p, 'cash');
			div.setAttribute('class', 'player_xp');
		}
		var container = getElementsByClassName(/^level_container$/, 'div', p.div)[0];
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
	pv = pv.getElementsByTagName('tbody')[0] || pv;
	pv.id = mkid(p, 'vitals');
	for (var n = pv.firstChild; n; n = pv.firstChild) {
		pv.removeChild(n);
	}
	pv.appendChild(document.createTextNode("\n"));
	// player mgmt links
	// [ href, label ]
	var playerMgmtLinks = [
		[ '/game/equipment.pl?player_id=' + p.id, 'EQ' ],
		[ '/game/player_tactics.pl?player_id=' + p.id, 'Tactics' ],
		[ '/game/forum_thread_list.pl?team_id=' + p.teamId, 'Forum' ],
		[ '/game/depth_chart.pl?team_id=' + p.teamId, 'Depth' ],
		[ '/game/team_player_stats.pl?team_id=' + p.teamId, 'Leaders' ],
	];
	if (p.isMine) {
		playerMgmtLinks.push([ '/game/boost_player.pl?player_id=' + p.id, 'Boost'
			+ ((show.boost && p.boostAvail != undefined) ? (' (' + p.boostAvail + ')') : '')]);
		playerMgmtLinks.push([ '/game/training.pl?player_id=' + p.id, 'Train (' + p.tp + ')' ]);
		playerMgmtLinks.push([ '/game/bonus_tokens.pl?player_id=' + p.id, 'Bonus'
			+ ((show.bonus && p.bt != undefined) ? (' (' + p.bt + ')') : '')]);
		playerMgmtLinks.push([ '/game/adv_equipment.pl?player_id=' + p.id, 'Shop'
			+ ((show.shop && p.st != undefined) ? (' (' + p.st + ')') : '')]);
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
		a.appendChild(document.createTextNode(link[1]));
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
	} else {
		cell.appendChild(document.createTextNode('None'));
	}
	row.appendChild(cell);
	pv.appendChild(row);
	pv.appendChild(document.createTextNode("\n"));
	// last game
	row = document.createElement('tr');
	cell = bigBoldCell('Last:');
	row.appendChild(cell);
	cell = document.createElement('td');
	cell.setAttribute('colspan', 11);
	cell.innerHTML = p.lastGame;
	row.appendChild(cell);
	pv.appendChild(row);
	pv.appendChild(document.createTextNode("\n"));
	// next game
	row = document.createElement('tr');
	cell = bigBoldCell('Next:');
	row.appendChild(cell);
	cell = document.createElement('td');
	cell.setAttribute('colspan', 11);
	cell.id = mkid(p, 'next_game');
	row.appendChild(cell);
	pv.appendChild(row);
	if (p.teamId != undefined) updateClocks(p.teamId);
	pv.appendChild(document.createTextNode("\n"));
	// energy & morale
	row = document.createElement('tr');
	if (show.energy && p.energy != undefined && show.morale && p.morale != undefined) {
		row.appendChild(getRatingBar('Energy', p.energyClass, p.energy, 105));
		row.appendChild(getRatingBar('Morale', p.moraleClass, p.morale, 105));
	} else if (show.energy && p.energy != undefined) {
		row.appendChild(getRatingBar('Energy', p.energyClass, p.energy, 300));
	} else if (show.morale && p.morale != undefined) {
		row.appendChild(getRatingBar('Morale', p.moraleClass, p.morale, 300));
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
		row.appendChild(getRatingBar('Overall', p.overallClass, p.overall, 50));
		row.appendChild(getRatingBar(p.stat1Name, p.stat1Class, p.stat1Value, 50));
		row.appendChild(getRatingBar(p.stat2Name, p.stat2Class, p.stat2Value, 50));
	} else if (nBars == 2 && p.stat2Name == undefined) { // overall & stat1
		row.appendChild(getRatingBar('Overall', p.overallClass, p.overall, 105));
		row.appendChild(getRatingBar(p.stat1Name, p.stat1Class, p.stat1Value, 105));
	} else if (nBars == 2) { // stat1 & stat2
		row.appendChild(getRatingBar(p.stat1Name, p.stat1Class, p.stat1Value, 105));
		row.appendChild(getRatingBar(p.stat2Name, p.stat2Class, p.stat2Value, 105));
	} else if (show.overall && p.overall != undefined) { // overall
		row.appendChild(getRatingBar('Overall', p.overallClass, p.overall, 255));
	} else if (nBars == 1) { // stat1
		row.appendChild(getRatingBar(p.stat1Name, p.stat1Class, p.stat1Value, 255));
	}
	if (row.hasChildNodes()) {
		pv.appendChild(row);
		pv.appendChild(document.createTextNode("\n"));
	}
	// contract & fame
	row = document.createElement('tr');
	if (show.contract && p.contract != undefined && show.fame && p.fame != undefined) {
		cell = bigBoldCell('Contract:');
		row.appendChild(cell);
		cell = document.createElement('td');
		cell.setAttribute('colspan', 10);
		cell.appendChild(document.createTextNode(p.contract));
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
		p.div.setAttribute('class', 'content_container_sp player_box_vet');
	} else {
		p.div.setAttribute('class', 'content_container player_box_vet');
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
	var isMine = true;
	// Loop through each player
	for (var i = 0; i < players.length; i++) {
		var p = extractPlayerStatsFromHomePage(players[i]);
		// is this my page or someone else's?
		if (p == undefined) continue;
		var s;
		// adjustments for this-is-not-MY-homepage -- only do this once!
		if (i == 0 && p.xp == undefined) {
			isMine = false;
		}
		p.isMine = isMine;
		p.origIndex = i;
		pData.push(p)
		buildPlayerContent(p);
		if (p.isMine) window.setTimeout(fetchPlayerBoostPage, 1, p);
		if (fetchPlayers) {
			window.setTimeout(fetchPlayerPage, 1, p);
		}
	}
	if (fetchPlayers == 0) {
		sortPlayerList();
	}
}

// *** MAIN ************************************************************ {{{1

function generalLayoutFixes() { // {{{2
	/* makes it nearly disappear...
	var myBox = document.getElementById('my_account');
	myBox.style.backgroundImage = 'none';
	myBox.style.backgroundRepeat = 'repeat';
	myBox.style.height = 'auto';
	*/
	var teams = getElementsByClassName(/^content_container team$/, 'div', document);
	for each (var t in teams) {
		t.style.height = 'auto';
		for each (var n in getElementsByClassName(/^team_next_game$/, 'div', t)) {
			if (s = n.innerHTML.match(/(.+?<\/b>\s*).+?(at|vs)\s*<a href="([^"]+)">(.+?)<.+?\(in\s*(.+?)\)/)) {
				/=(\d+)$/.test(s[3]);
				var teamId = parseInt(RegExp.lastParen);
				newMatchup(teamId, s[2], s[3], s[4], s[5]);
				var t = {};
				t.teamId = teamId;
				t.id = 't' + teamId; // keep it unique from player id's
				tData.push(t);
				n.innerHTML = s[1] + '<span id="' + mkid(t, 'next_game') + '"></span>';
				updateClocks(teamId);
			}
		}
	}
}

// function main() {{{2

generalLayoutFixes();
installOptionsBoxen();
installTeamLinks();
installSortOptions();
loadAllPlayers();
window.setTimeout(updateClocks, 1000, 0);

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

