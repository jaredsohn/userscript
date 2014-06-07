// ==UserScript==
// @name           GLB Player Page Enhancements
// @namespace      Bogleg
// @version        3.1.1
// @include        http://glb.warriorgeneral.com/game/player.pl?player_id=*
// @require        http://userscripts.org/scripts/source/74204.user.js
// ==/UserScript==

/* modified ever so slightly by mandyross 22 Sep 2011
 * rewritten by Bogleg from Highlight Attributes Archetype Fix:
 * written by forestmb @userscripts.org
 * modified by peteb @userscripts.org
 * modified by raiderdav @userscripts.org
 * modified by pabst 12/23/08+
 * modified by Tical2k
 * modified by txrulz
 * modified by numone
 * modified by Bogleg 10.06.04 and passed back to numone
 * modified by Bogleg 10.06.08
 */

var bonus = {
	'Strength':		0,
	'Speed':		0,
	'Agility':		0,
	'Jumping':		0,
	'Stamina':		0,
	'Vision':		0,
	'Confidence':	0,
	'Blocking':		0,
	'Tackling':		0,
	'Throwing':		0,
	'Catching':		0,
	'Carrying':		0,
	'Kicking':		0,
	'Punting':		0
};
var colorMajor = '#a03c19';
var colorMinor = '#a000a0';
var colorOther = '#606060';
var attColor = [
	// attr name, attr val, attr val boosted (w/eq)
	[colorOther, colorOther, '#6060ff'],
	[colorMinor, colorMinor, '#2020ff'],
	[colorMajor, colorMajor, 0],
];
var allBuilds = {};
var position;
var buildTypes;
var archetype;

function createLegend() {
	// insert the color key
	$('.player_stats_table').eq(0).css('margin-bottom', '4px').after(
		'<div id="colorKeyDiv" style="font-weight: bold; text-align: center; margin-bottom: 4px;">Next Auto Level Gain'
		+ ' = <span id="keyMajor" style="color: ' + attColor[2][0] + '">Major</span>'
		+ ' / <span id="keyMinor" style="color: ' + attColor[1][0] + '">Minor</span>'
		+ ' / <span id="keyOther" style="color: ' + attColor[0][0] + '">Zero</span>'
		+ '<div id="colorKeyDiv_72" style="font-weight: bold; text-align: center; margin-bottom: 4px;">ALGs to Lv79'
		+ ' = <span id="keyMajor_72" style="color: ' + attColor[2][0] + '">Major</span>'
		+ ' / <span id="keyMinor_72" style="color: ' + attColor[1][0] + '">Minor</span>'
	);
}

function createDropDown(buildTypes, archetype) {
	var selectBuild = '<select id="selectBuild" style="float: right; font-weight: normal; font-size: 9px;">';
	$.each(buildTypes, function() {
		selectBuild += '<option value="' + this[0] + '"';
		if (archetype == this[0]) {
			selectBuild += ' style="font-weight: bold; color: #a03c19;" selected="selected"';
		}
		selectBuild += '>' + this[0] + '</option>';
	});
	selectBuild += '</select>';
	$('#player_stats div.medium_head').eq(0).prepend(selectBuild).change(function(e) {
		e.preventDefault();
		highlightAttributes(buildTypes, $(this).find(':selected').val());
	});
}

function highlightAttributes(buildTypes, selectedName) {
	if(!selectedName) selectedName = $('#selectBuild').find(':selected').val();
	if(!selectedName) return;
	var b = allBuilds[selectedName];
	if (!b) {
		$.each(buildTypes, function() {
			if (this[0] == selectedName) {
				allBuilds[selectedName] = b = new build(this);
				return false;
			}
		});
	}
	// SAs
	$('#player_skill_trees .skill_button').each(function() {
		var sa;
		try {
			sa = this.style.backgroundImage.match(/\/skills\/(.+?)\.(?:bonus\.|penalty\.)?gif\b/)[1];
		} catch(e) {
			console.error('this = ', this);
			console.error('this.style.backgroundImage = ', this.style.backgroundImage);
			return true;
		}
		if (sa in b.affectedSAs) {
			$(this).css('background-image', $(this).css('background-image').replace(/(?:\.bonus|\.penalty)?\.gif\b/, '.' + b.affectedSAs[sa] + '.gif'));
		} else {
			$(this).css('background-image', $(this).css('background-image').replace(/(?:\.bonus|\.penalty)?\.gif\b/, '.gif'));
		}
	});
	// atts
	$('div.stat_head_tall').each(function(i, attName) {
		var a = $(attName).text().slice(0, 3);
		var majmin = b.affectedAtts[a] || 0;
		$(attName).css('color', attColor[majmin][0]).next('div').each(function(j, attVal) {
			if ($(attVal).hasClass('stat_value_tall_boosted')) {
				if (attColor[majmin][2]) $(attVal).css('color', attColor[majmin][2]);
			} else {
				if (attColor[majmin][1]) $(attVal).css('color', attColor[majmin][1]);
			}
		});
	});
	// Update key
	var level = parseInt($('#player_current_stats_table .current_stats_value').eq(0).text().split('/')[0]);
	function ALG(l, mm, tgtLv) {
		if (!parseInt(tgtLv) || tgtLv <= l) tgtLv = l + 1;
		var out = 0;
		while (l < tgtLv) {
			var gain = mm * ((l <= 20) ? 1 : (l <= 28) ? 0.75 : (l <= 36) ? 0.5625 : 0.421875) / b.affectedAtts[mm];
			out += gain;
			out = Math.floor(out * 1000) / 1000;
			++l;
		}
		return out;
	}
	$('#keyMajor').html(ALG(level, 2));
	$('#keyMajor_72').html(ALG(level, 2, 79));
	$('#keyMinor').html(ALG(level, 1));
	$('#keyMinor_72').html(ALG(level, 1, 79));
}

function getBuilds(position) {
	switch(position) {
	case 'FB':
		return [
			['No Archetype',	'Str,Agi,Blo,Car',		'Sta,Vis,Con,Tac,Cat'],
			['Rusher',			'Agi,Car,Con,Str',		'Blo,Spe,Sta,Vis',	'power_through,cut', 'lead_block,pancake'],
			['Blocker',			'Agi,Blo,Str,Vis',		'Car,Con,Spe,Sta',	'lead_block,pancake', 'power_through,cut'],
			['Combo Back',		'Agi,Blo,Car,Str,Vis',	'Cat,Con,Jum,Spe'],
			['Scat Back',		'Agi,Cat,Spe,Vis',		'Blo,Car,Con,Jum',	'sticky_hands,cut', 'lead_block,pancake'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'QB':
		return [
			['No Archetype',	'Str,Sta,Vis,Con,Thr',	'Spe,Agi,Jum,Cat,Car'],
			['Pocket Passer',	'Con,Thr,Vis',			'Agi,Sta,Str,Car',	'pump_fake,tight_spiral', 'on_the_run,dump_pass'],
			['Deep Passer',		'Str,Thr,Vis',			'Agi,Con,Sta,Car',	'pump_fake,turn_the_shoulder', 'on_the_run,dump_pass'],
			['Scrambler',		'Agi,Thr,Vis',			'Con,Spe,Str,Car',	'on_the_run,dump_pass', 'pump_fake,tight_spiral'],
		];
		break;
	case 'HB':
		return [
			['No Archetype',	'Str,Spe,Agi,Vis,Con,Car', 'Jum,Sta,Blo,Thr,Cat'],
			['Power Back',		'Agi,Car,Con,Str',		'Jum,Spe,Sta,Vis',	'lower_the_shoulder,power_through', 'first_step,spin'],
			['Elusive Back',	'Agi,Car,Spe,Vis',		'Cat,Con,Str',		'head_fake,juke', 'lower_the_shoulder,power_through'],
			['Scat Back',		'Agi,Car,Cat,Spe',		'Con,Jum,Sta,Vis',	'cut,first_step', 'lower_the_shoulder,power_through'],
			['Combo Back',		'Car,Con,Spe,Str,Vis',	'Agi,Cat,Jum,Sta'],
			['Returner',		'Agi,Car,Spe,Sta,Vis',	'Con,Jum,Str',		'first_step,cut', 'stiff_arm,power_through'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'WR':
		return [
			['No Archetype',	'Spe,Agi,Jum,Sta,Vis',	'Con,Car'],
			['Speedster',		'Agi,Cat,Con,Spe,Vis',	'Car,Jum,Sta',		'first_step,cut', 'route_running,sticky_hands'],
			['Possession Rec',	'Agi,Car,Cat,Jum,Vis',	'Con,Spe,Sta',		'route_running,sticky_hands', 'first_step,cut'],
			['Power Rec',		'Agi,Car,Cat,Str,Vis',	'Con,Spe,Sta'],
			['Returner',		'Agi,Car,Spe,Sta,Vis',	'Con,Jum,Str',		'first_step,cut', 'route_running,sticky_hands'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'TE':
		return [
			['No Archetype',	'Str,Vis,Blo,Cat',		'Spe,Agi,Sta,Con,Tac,Car'],
			['Blocker',			'Agi,Blo,Con,Str,Vis',	'Cat,Spe,Sta',		'get_low,pancake', 'route_running,cut'],
			['Power Rec',		'Agi,Car,Con,Cat,Str',	'Blo,Spe,Sta',		'cover_up,lower_the_shoulder', 'get_low,pancake'],
			['Receiver',		'Agi,Car,Cat,Spe,Vis',	'Blo,Sta,Str',		'route_running,cut', 'get_low,pancake'],
			['Dual Threat',		'Agi,Blo,Cat,Str,Vis',	'Con,Jum,Spe'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'C':
		return [
			['No Archetype',	'Str,Blo',				'Agi,Sta,Vis,Con,Tac'],
			['Pass Blocker',	'Agi,Blo,Con,Vis',		'Spe,Sta,Str',		'pass_block,foundation', 'get_low,pancake'],
			['Run Blocker',		'Blo,Con,Str,Vis',		'Agi,Spe,Sta',		'get_low,pancake', 'pass_block,foundation'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'G':
		return [
			['No Archetype',	'Str,Con,Blo',			'Agi,Sta,Vis,Tac'],
			['Pass Blocker',	'Agi,Blo,Con,Vis',		'Spe,Sta,Str',		'pass_block,foundation', 'get_low,pancake'],
			['Run Blocker',		'Blo,Con,Str,Vis',		'Agi,Spe,Sta',		'get_low,pancake', 'pass_block,foundation'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'OT':
		return [
			['No Archetype',	'Str,Agi,Vis,Con,Blo',	'Sta,Tac'],
			['Pass Blocker',	'Agi,Blo,Con,Vis',		'Spe,Sta,Str',		'pass_block,protector', 'get_low,pancake'],
			['Run Blocker',		'Blo,Con,Str,Vis',		'Agi,Spe,Sta',		'get_low,pancake', 'pass_block,protector'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'DT':
		return [
			['No Archetype',	'Str,Agi,Tac',			'Spe,Sta,Vis,Con,Blo'],
			['Run Stuffer',		'Agi,Str,Tac,Vis',		'Con,Spe,Sta',		'wall,break_through', 'shed_block,swat_ball'],
			['Pass Rusher',		'Agi,Spe,Tac,Vis',		'Con,Sta,Str',		'shed_block,swat_ball', 'wall,break_through'],
			['Combo Tackle',	'Spe,Str,Tac,Vis',		'Agi,Con,Sta'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'DE':
		return [
			['No Archetype',	'Str,Spe,Agi,Tac',		'Jum,Sta,Vis,Con,Blo'],
			['Run Stuffer',		'Agi,Str,Tac,Vis',		'Con,Spe,Sta',		'wall,strong_base', 'first_step,tunnel_vision'],
			['Pass Rusher',		'Agi,Spe,Tac,Vis',		'Con,Sta,Str',		'first_step,tunnel_vision', 'wall,strong_base'],
			['Combo End',		'Spe,Str,Tac,Vis',		'Agi,Con,Sta'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'LB':
		return [
			['No Archetype',	'Str,Agi,Sta,Vis,Con,Tac', 'Spe,Jum,Blo,Cat'],
			['Coverage LB',		'Agi,Jum,Spe,Vis',		'Con,Sta,Str,Tac',	'diving_tackle,swat_ball', 'monster_hit,shed_block'],
			['Blitzer',			'Agi,Jum,Spe,Tac',		'Con,Sta,Str,Vis',	'shed_block,big_sack', 'aura_of_intimidation,diving_tackle'],
			['Hard Hitter',		'Agi,Str,Tac,Vis',		'Con,Jum,Spe,Sta',	'snarl,monster_hit', 'swat_ball,big_sack'],
			['Combo LB',		'Agi,Con,Spe,Tac,Vis',	'Jum,Sta,Str'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'CB':
		return [
			['No Archetype',	'Spe,Agi,Jum,Sta,Vis,Cat', 'Str,Con,Tac,Car'],
			['Man Specialist',	'Agi,Jum,Spe,Vis',		'Cat,Con,Sta,Tac',	'shutdown_coverage', 'closing_speed'],
			['Zone Specialist',	'Agi,Spe,Tac,Vis',		'Cat,Con,Jum,Sta',	'superior_vision', 'shutdown_coverage'],
			['Hard Hitter',		'Spe,Str,Tac,Vis',		'Agi,Con,Jum,Sta',	'closing_speed', 'change_direction'],
			['Combo Corner',	'Agi,Spe,Str,Tac',		'Con,Jum,Sta,Vis'],
			['Returner',		'Agi,Car,Spe,Sta,Vis',	'Con,Jum,Str',		'change_direction,return_specialist', 'superior_vision,shutdown_coverage'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'SS':
		return [
			['No Archetype',	'Str,Spe,Sta,Vis,Tac',	'Agi,Jum,Con,Blo,Cat,Car'],
			['Man Specialist',	'Agi,Jum,Spe,Vis',		'Cat,Con,Sta,Tac',	'change_direction', 'big_hit'],
			['Zone Specialist',	'Agi,Spe,Tac,Vis',		'Cat,Con,Jum,Sta',	'superior_vision', 'wrap_up_tackle'],
			['Hard Hitter',		'Spe,Str,Tac,Vis',		'Agi,Con,Jum,Sta',	'big_hit', 'change_direction'],
			['Combo Safety',	'Agi,Spe,Str,Tac',		'Con,Jum,Sta,Vis'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'FS':
		return [
			['No Archetype',	'Spe,Sta,Vis,Tac,Cat',	'Str,Agi,Jum,Con,Blo,Car'],
			['Man Specialist',	'Agi,Jum,Spe,Vis',		'Cat,Con,Sta,Tac',	'shutdown_coverage', 'big_hit'],
			['Zone Specialist',	'Agi,Spe,Tac,Vis',		'Cat,Con,Jum,Sta',	'superior_vision', 'shutdown_coverage'],
			['Hard Hitter',		'Spe,Str,Tac,Vis',		'Agi,Con,Jum,Sta',	'big_hit', 'change_direction'],
			['Combo Safety',	'Agi,Spe,Str,Tac',		'Con,Jum,Sta,Vis'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'K':
		return [
			['No Archetype',	'Con,Kic',				'Str,Spe,Agi,Jum,Vis,Thr'],
			['Boomer',			'Con,Kic,Str',			'Agi,Jum,Vis'],
			['Technician',		'Con,Kic,Vis',			'Agi,Jum,Str'],
		];
		break;
	case 'P':
		return [
			['No Archetype',	'Con,Pun',				'Str,Spe,Agi,Jum,Vis,Thr'],
			['Boomer',			'Con,Pun,Str',			'Agi,Jum,Vis'],
			['Technician',		'Con,Pun,Vis',			'Agi,Jum,Str'],
		];
		break;
	}
}

function build(args) {
	this.name = args[0];
	this.affectedAtts = {0: 14, 1: 0, 2: 0};
	var me = this;
	var att;
	if (args[1]) $.each(args[1].split(','), function() {
		me.affectedAtts[this] = 2;
		++me.affectedAtts[2];
		--me.affectedAtts[0];
	});
	if (args[2]) $.each(args[2].split(','), function() {
		me.affectedAtts[this] = 1;
		++me.affectedAtts[1];
		--me.affectedAtts[0];
	});
	this.affectedSAs = {};
	var sa;
	if (args[3]) $.each(args[3].split(','), function() {
		me.affectedSAs[this] = 'bonus';
	});
	if (args[4]) $.each(args[4].split(','), function() {
		me.affectedSAs[this] = 'penalty';
	});
}

function getArchetype() {
	var atImg = $('#player img[src^="/images/game/archetypes/"]');
	return (atImg.length == 1 ? atImg.parent().html().split("'")[1] : 'No Archetype')
		.replace('Linebacker', 'LB').replace(' Receiver', ' Rec');
}

function setupOtherViews() {
	$('#player_stats > table.player_stats_table').before('<div id="statsDivs"><div id="statsTabBar" class="subhead_link_bar" style="width: 320px; position: static;"><div id="tab_normalStats" class="tab_off"><a href="javascript:;">Normal</a></div><div id="tab_nakedStats" class="tab_off"><a href="javascript:;">Naked</a></div><div id="tab_bonusStats" class="tab_on"><a href="javascript:;">+/-</a></div><div id="tab_nakedBonusStats" class="tab_off"><a href="javascript:;">Naked &amp; +/-</a></div></div><div id="statsTables"><div id="normalStats"></div><div id="nakedStats"></div><div id="bonusStats"></div><div id="nakedBonusStats"></div></div></div>');
	$('#normalStats').hide().append($('#player_stats > table.player_stats_table'));
	$('#nakedStats').hide().append($('#normalStats table.player_stats_table').clone());
	$('#bonusStats').append($('#normalStats table.player_stats_table').clone());
	$('#nakedStats div.stat_value_tall_boosted').each(function() {
		$(this).text(eval($(this).text().replace('(', '').replace('+', '-').replace(')', '')));
	});
	$('#nakedBonusStats').hide().append($('#nakedStats table.player_stats_table').clone());
	$('#player_stats table.column_320').find('tr.alternating_color1, tr.alternating_color2').each(function() {
		if (bonus[$(this).find('td').eq(0).text()] == undefined) return;
		bonus[$(this).find('td').eq(0).text()] = parseFloat($(this).find('td').eq(1).text());
	});
	$('#bonusStats, #nakedBonusStats').find('div.stat_head_tall').each(function() {
		var a = $(this).text().replace(':', '');
		if (!bonus[a]) return;
		$(this).next().text($(this).next().text().replace(/([0-9.]+)/, function(m, base) {
			var newVal = parseFloat(base) + bonus[a];
			return Math.round(newVal * 100) / 100;
		}));
	});
	$('#player_stats table.column_320').find('tr.alternating_color1, tr.alternating_color2').each(function() {
		if (bonus[$(this).find('td').eq(0).text()] != undefined) $(this).hide();
	});
	function clickStatsTab(tab) {
		$('#statsTables > div').hide();
		$('#' + tab).show();
		$('#statsTabBar > div').addClass('tab_off').removeClass('tab_on');
		$('#tab_' + tab).addClass('tab_on').removeClass('tab_off');
		var hideBnP = 0;
		if (tab.indexOf('onus') != -1) hideBnP = 1;
		$('#player_stats table.column_320').find('tr.alternating_color1, tr.alternating_color2').each(function() {
			if (hideBnP) {
				if (bonus[$(this).find('td').eq(0).text()] != undefined) $(this).hide();
			} else {
				if (bonus[$(this).find('td').eq(0).text()] != undefined) $(this).show();
			}
		});
		GM_setValue('statsView', tab);
	}
	$('#tab_normalStats').click(function() {
		clickStatsTab('normalStats');
	});
	$('#tab_nakedStats').click(function() {
		clickStatsTab('nakedStats');
	});
	$('#tab_bonusStats').click(function() {
		clickStatsTab('bonusStats');
	});
	$('#tab_nakedBonusStats').click(function() {
		clickStatsTab('nakedBonusStats');
	});
	clickStatsTab(GM_getValue('statsView', 'bonusStats'));
}

position = $('.position').eq(0).text();
buildTypes = getBuilds(position);
archetype = getArchetype();
createLegend();
createDropDown(buildTypes, archetype);
highlightAttributes(buildTypes, archetype);
setupOtherViews();
