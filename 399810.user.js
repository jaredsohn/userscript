// ==UserScript==
// @name           GLB Depth Chart Enhancements
// @namespace      Bogleg
// @description    GLB Depth Chart Enhancements
// @version        2.1.0
// @include        http://glb.warriorgeneral.com/game/player.pl?player_id=*
// @include        http://goallineblitz.com/game/depth_chart.pl?team_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var bigLayout = { // {{{1
	offense_positions: [
		[' ... ', 'lg', 'c', 'rg'],
		['.    .', 'lot', 'rot'],
		['   . .', 'qb', 'te'],
		['  ..  ', 'hb', 'fb'],
		['....', 'wr', 'wr1', 'wr2', 'wr3'],
		['  ..  ', 'wr4', 'wr5'],
	],
	defense_positions: [
		['....', 'lde', 'nt', 'dt', 'rde'],
		[' ... ', 'lilb', 'mlb', 'rilb'],
		['.    .', 'lolb', 'rolb'],
		['....', 'cb', 'cb1', 'cb2', 'cb3'],
		['  ..  ', 'cb4', 'cb5'],
		[' .  . ', 'ss', 'fs'],
	],
	special_teams_positions: [
		['...  ', 'k', 'kos', 'krs'],
	],
	kickoff_team: [
		['  . .  ', 'in1', 'in4'],
		[' .  . ', 'ou3', 'ou4'],
		['....', 'ou1', 'in2', 'in3', 'ou6'],
		[' .   . ', 'ou2', 'ou5'],
	],
	kickoff_return_team: [
		[' ... ', 'krou2', 'krfw2', 'krou3'],
		['....', 'krou1', 'krfw1', 'krfw3', 'krou4'],
		['   .   ', 'krbw2'],
		['  ..  ', 'krbw1', 'krbw3'],
		['   .   ', 'kr'],
	],
	punt_team: [
		['   .   ', 'ls'],
		['  ..  ', 'plg', 'prg'],
		[' .  . ', 'plt', 'prt'],
		['.    .', 'psb1', 'psb2'],
		['.  ..', 'pse1', 'ppp', 'pse2'],
		['   .   ', 'p'],
	],
	punt_return_team: [
		['....', 'prer1', 'prdl2', 'prdl3', 'prer2'],
		[' .  . ', 'prdl1', 'prdl4'],
		['. . .', 'prse1', 'prpp1', 'prse2'],
		['    .  ', 'prpp2'],
		['   .   ', 'pr'],
	],
	field_goal_team: [
		[' ... ', 'fglt', 'ls', 'fgrt'],
		['....', 'fgte1', 'fglg', 'fgrg', 'fgte2'],
		['.    .', 'fgub1', 'fgub2'],
		['   .   ', 'ph'],
	],
	field_goal_block_team: [
		[' ... ', 'fgde1', 'fgnt', 'fgde2'],
		['....', 'fgfl1', 'fgdt1', 'fgdt2', 'fgfl2'],
		[' ... ', 'fglb1', 'fglb2', 'fglb3'],
		['  .    ', 'fgfs'],
	],
	custom_o_slots: [
		['....', 'qb1', 'hb1', 'fb1', 'te1'],
		['....', 'qb2', 'hb2', 'fb2', 'te2'],
	],
	custom_d_slots: [
		['  .    ', 'nt1'],
		[' ... ', 'lilb1', 'mlb1', 'rilb1'],
		['.    .', 'lolb1', 'rolb1'],
	],
};

var layoutSpecs = { // {{{1
	'....': {
		widths: [239, 239, 239, 239],
		margins: [0, 0, 0, 0],
	},
	'. . .': {
		widths: [239, 239, 239],
		margins: [0, 119, 119],
	},
	'...  ': {
		widths: [239, 239, 239],
		margins: [0, 0, 0],
	},
	'.  ..': {
		widths: [239, 239, 239],
		margins: [0, 239, 0],
	},
	' .. .': {
		widths: [239, 239, 239],
		margins: [119, 0, 120],
	},
	' ... ': {
		widths: [239, 239, 239],
		margins: [119, 0, 0],
	},
	'  ...': {
		widths: [239, 239, 239],
		margins: [239, 0, 0],
	},
	'   . .': {
		widths: [239, 239],
		margins: [358, 119],
	},
	'  . .  ': {
		widths: [239, 239],
		margins: [179, 120],
	},
	' .  . ': {
		widths: [239, 239],
		margins: [119, 240],
	},
	' .   . ': {
		widths: [239, 239],
		margins: [60, 358],
	},
	'.    .': {
		widths: [239, 239],
		margins: [0, 478],
	},
	'  ..  ': {
		widths: [239, 239],
		margins: [239, 0],
	},
	'  .    ': {
		widths: [239],
		margins: [239],
	},
	'    .  ': {
		widths: [239],
		margins: [478],
	},
	'   .   ': {
		widths: [239],
		margins: [358],
	},
};

// Layout setup // {{{1
var depthExpanded = {};
var layoutDivs = {};
var posDivs = {};
var origDepthContent = {};
var depthTriggersInstalled = false;
var depthTitles = {};

function installDepthShrinkLink(section) { // {{{2
	$('#html_to_expand_' + section).hide();
	$('#html_to_shrink_' + section).show();
	$('#link_to_shrink_' + section).click(function() {
		depthShrinkSection(this.id.replace(/^link_to_shrink_/, ''))
	});
}

function installDepthExpandLink(section, div) { // {{{2
	if ($('#html_to_expand_' + section).length == 0) {
		// collapse
		$(div).prepend('<span id="html_to_shrink_' + section + '"><a id="link_to_shrink_' + section + '" href="javascript:;" style="text-decoration: none;">(-)</a> </span>');
		$('#link_to_shrink_' + section).click(function() {
			depthShrinkSection(this.id.replace(/^link_to_shrink_/, ''))
		});
		// expand
		$(div).prepend('<span id="html_to_expand_' + section + '"><a id="link_to_expand_' + section + '" href="javascript:;" style="text-decoration: none;">(+)</a> </span>');
	}
	$('#html_to_expand_' + section).show();
	$('#html_to_shrink_' + section).hide();
	$('#link_to_expand_' + section).click(function() {
		depthExpandSection(this.id.replace(/^link_to_expand_/, ''))
	});
}

function installDepthTriggers() { // {{{2
	if (depthTriggersInstalled == true) return;
	var posTabs = document.getElementById('position_tabs');
	// expand all / collapse all
	$('body').append('<div id="expand_collapse_all"><a id="expand_all" href="javascript:;">Expand all</a> | <a id="collapse_all" href="javascript:;">Collapse all</a></div>');
	$('#position_tabs').before($('#expand_collapse_all'));
	$('#expand_all').click(function() {
		for (var section in depthExpanded) {
			depthExpandSection(section);
		}
	});
	$('#collapse_all').click(function() {
		for (var section in depthExpanded) {
			depthShrinkSection(section);
		}
	});
	var numKids = 0;
	var curDiv, hasHeader;
	function startNewSection() {
		var out = document.createElement('div');
		if (curDiv == undefined) {
			$(out).prependTo('#position_tabs');
		} else {
			$(curDiv).after(out);
		}
		numKids++;
		hasHeader = false;
		return out;
	}
	$('#position_tabs div').each(function() {
		if ($(this).hasClass('position_tab_header') && $(this).text().length > 1) {
			curDiv = startNewSection();
			var s = $(this).text().match(/^[^:]+/);
			if (s) {
				s = s[0].replace(/ /g, '_').toLowerCase();
				if (bigLayout[s] == undefined) {
					console.log('unknown section: ' + s);
				} else {
					curDiv.id = s;
					depthExpanded[s] = false;
					installDepthExpandLink(s, this);
					layoutDivs[s] = curDiv;
					depthTitles[s] = $(this).html();
//					console.log('found section: ' + s);
					hasHeader = true;
				}
			} else {
				console.log('unknown section header: ' + $(this).text());
			}
		} else if ($(this).hasClass('position')) {
			var s = $(this).html().match(/changeTab\('([^']+)'\)/);
			if (s) {
				posDivs[s[1]] = this;
			}
		}
		$(curDiv).append($(this));
	});
	depthTriggersInstalled = true;
}

function makeBigDepthChart(section) { // {{{1
	var layout = bigLayout[section];
	if (layout == undefined) return;
	var roster = eval(unsafeWindow.roster.toSource());
	var rosterById = eval(unsafeWindow.rosterById.toSource());
	var positionIds = eval(unsafeWindow.positionIds.toSource());
	var chart = document.createElement('div');
	var header = document.createElement('div');
	header.className = 'nonalternating_color';
	$(header).html(depthTitles[section]);
	$(chart).append(header);
	var rowNum = 0;
	// big width = 960px
	for each (var rowPos in layout) {
		++rowNum;
		row = document.createElement('div');
		row.className = 'alternating_color2';
		$(row).css({
			'padding': '0px',
			'width': '100%',
		});
		var fmt = undefined;
		var widths, margins;
		for (var i in rowPos) {
			var pos = rowPos[i];
			if (fmt == undefined) { // first element
				fmt = pos;
				if (layoutSpecs[fmt] == undefined) {
					console.log('unknown bigLayout fmt: "' + fmt + '"');
					break;
				}
				continue;
			}
			if (posDivs[pos] == undefined) {
				console.log('posDivs[' + pos + '] is undefined!');
			}
			cell = document.createElement('div');
			$(cell).css({
				'float': 'left',
				'width': layoutSpecs[fmt].widths[i - 1] + 'px',
				'margin-left': layoutSpecs[fmt].margins[i - 1] + 'px',
			}).append($(posDivs[pos]).css('float', 'left').clone());
			var div = document.createElement('div');
			$(div).css({
				'font-size': '10px',
				'float': 'left',
			});
			if (positionIds[pos] == undefined) {
				$(div).html('none');
			} else {
				var players = [];
				for (var n in positionIds[pos]) {
					var playerId = positionIds[pos][n];
					var p = rosterById[playerId];
					if (p != undefined) players.push(p.level + ' ' + p.position + ' <a href="/game/player.pl?player_id=' + p.id + '">' + p.name + '</a>');
				}
				$(div).html(' ' + players.join('<br />'));
			}
			$(cell).append(div);
			$(row).append(cell);
		}
		$(chart).append($(row).css('display', 'table-row'));
	}
	$(chart).css('border', '1px solid #c0c0c0');
	return chart;
}

function depthShrinkSection(section) { // {{{1
	if (depthExpanded[section] == false) return;
	$(layoutDivs[section]).html(origDepthContent[section]);
	installDepthExpandLink(section);
	depthExpanded[section] = false;
}

function depthExpandSection(section) { // {{{1
	if (depthExpanded[section] == false) {
		origDepthContent[section] = $(layoutDivs[section]).html();
	}
	$(layoutDivs[section]).html('').append(makeBigDepthChart(section));
	installDepthShrinkLink(section);
	depthExpanded[section] = true;
}

function depthRefreshExpanded() { // {{{1
	for (var section in depthExpanded) {
		if (depthExpanded[section] == false) continue;
		$(layoutDivs[section]).html('').append(makeBigDepthChart(section));
		installDepthShrinkLink(section);
	}
	return true;
}

function BuildDepthArray(teamId, playerId) { // {{{1
	$.get('/game/depth_chart.pl?team_id=' + teamId, function(response) {
		//split for position information
		var depth=response.split('positionIds[');
		for(var dep=1;dep<depth.length;dep++) {
			posdepth[dep - 1] = new Array ();
			if (dep == (depth.length - 1)) {
				depth[dep] = depth[dep].substring(0,depth[dep].indexOf("changeTab"));
			}
			posdepth[dep - 1][0] = depth[dep].substring(1,depth[dep].indexOf("']"))
			depth[dep] = depth[dep].substring(depth[dep].indexOf("']") + 6)
			var assigned=depth[dep].split(',');
			for(var loophold=0;loophold<assigned.length;loophold++) {
				assigned[loophold] = assigned[loophold].replace(/'/g,'');
				posdepth[dep - 1][loophold + 1] = parseInt(assigned[loophold].replace(/]/g,''));
			}
		}
		//bubble sort based on position
		var holder = new Array();
		for(x = 0; x < posdepth.length; x++) {
			for(y = 0; y < (posdepth.length-1); y++) {
				if(posdepth[y][0] > posdepth[y+1][0]) {
					holder = posdepth[y+1];
					posdepth[y+1] = posdepth[y];
					posdepth[y] = holder;
				}
			}
		}
		var depthassignments = ''
		for(var posdeploop = 0;posdeploop<posdepth.length;posdeploop++) {
			for(var linedepth = 1;linedepth<posdepth[posdeploop].length; linedepth++) {
				if (posdepth[posdeploop][linedepth]==parseInt(playerId)){
					if (depthassignments) depthassignments += ' ';
					depthassignments += posdepth[posdeploop][0] + '(' + linedepth + ')';
				}
			}
		}
		$('div.content_container:eq(0)').css('height', '150px');
		$('table#player_vitals tbody').append('<tr><td class="vital_head">Depth:</td><td class="vital_data" colspan="5">' + depthassignments + '</td></tr>');
	});
}

// main // {{{1

//variable to hold array based on each player
var posdepth = new Array()

	var url = window.location.href;
	if (url.indexOf('player.pl') > 0) {
		var teamId = parseInt($('td.vital_data a[href*=/team.pl?team_id=]').attr('href').match(/team_id=(\d+)/)[1]);
		BuildDepthArray(teamId, url.substring(url.indexOf('=') + 1));
	} else {
		$('#position_players').css('height', 'auto');
		installDepthTriggers();
		$(document).click(depthRefreshExpanded);
	}

// vim: foldmethod=marker
