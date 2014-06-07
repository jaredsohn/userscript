// ==UserScript==
// @name           GLB Training Value
// @namespace      Bogleg
// @description    Displays the potential value of training given attributes
// @version        1.0.1
// @include        http://goallineblitz.com/game/training.pl?player_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var tcells = {};
var vals = {};
var pcts = {};
var boosted = {};
var needSkillPage = false;

function updateTCell(a) {
	var skip = true;
	var eff = '';
	if (vals[a] != undefined) {
		var cost = parseInt(Math.exp(0.0003 * Math.pow(vals[a], 2)));
		if (cost != 1) skip = false;
		eff = '' + (pcts[a] * cost);
	}
	if (boosted[a] != undefined) {
		var cost = parseInt(Math.exp(0.0003 * Math.pow(boosted[a], 2)));
		if (cost != 1) {
			skip = false;
			needSkillPage = true;
		}
		if (eff.length > 0) eff += '/';
		eff += '<span style="color:#0000ff;">' + (pcts[a] * cost) + '</span>';
	}
	if (!skip) $(tcells[a]).html('+' + pcts[a] + '<span style="font-weight:bold;">(' + eff + ')</span>%');
}

function initPage() {
	var curAttr;
	$('#attributes').find('table.player_stats_table div').each(function() {
		if ($(this).hasClass('stat_head_tall')) {
			curAttr = $(this).text().replace(':','').toLowerCase();
		} else if ($(this).hasClass('stat_value_tall_boosted')) {
			boosted[curAttr] = parseFloat($(this).text());
		} else if ($(this).hasClass('stat_value_tall')) {
			vals[curAttr] = parseFloat($(this).text());
		}
	}).end().find('table:eq(1) td').each(function() {
		var s;
		if (s = $(this).text().match(/^(.+?):/)) {
			curAttr = s[1].toLowerCase();
		} else if (s = $(this).text().match(/\+(\d+)%/)) {
			pcts[curAttr] = parseInt(s[1]);
			tcells[curAttr] = this;
			updateTCell(curAttr);
		}
	});
}

function loadSkillPage() {
	var playerId = window.location.href.match(/player_id=(\d+)/)[1];
	$.get('/game/skill_points.pl?player_id=' + playerId, function(data) {
		var selector = [];
		$.each(boosted, function(i) { selector.push(i); });
		$('#' + selector.join(',#'), data).each(function() {
			vals[this.id] = parseFloat($(this).text());
			updateTCell(this.id);
		});
	});
}

initPage();
if (needSkillPage) {
	loadSkillPage();
}
