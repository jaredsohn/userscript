// ==UserScript==
// @name           GLB AI View All
// @namespace      Bogleg
// @description    One-click "Hide/Show Options" for all Inputs and Outputs at once
// @version        1.0.0
// @include        http://goallineblitz.com/game/team_defense_ai.pl?team_id=*
// @include        http://goallineblitz.com/game/team_offense_ai.pl?team_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$('div.quarter:eq(0)').before('<div style="font-size: 14px; font-weight: bold;">(<a id="ai_hide_show_all" href="javascript:;">Show All Options</a> | <a id="ai_hide_show_inputs" href="javascript:;">Show All Input Options</a> | <a id="ai_hide_show_outputs" href="javascript:;">Show All Output Options</a>)</div><br />');

var re = /^Show|Hide/;
function changeText(obj, to) {
	$(obj).text($(obj).text().replace(re, to));
}

function toggleAll(link, type) {
	var hideOrShow = $(link).text().match(/^(Hide|Show)/)[1];
	var newAction = hideOrShow == 'Show' ? 'Hide' : 'Show';
	var visibility = (hideOrShow == 'Show') ? 'hidden' : 'visible';
	$('div[id*=' + type + 'put_options_]:' + visibility).each(function() {
		var s = this.id.match(/((?:in|out)put)_options_(\d+)$/);
		if (s) {
			unsafeWindow.toggleCollapse(s[1], s[2]);
		}
	});
	changeText(link, newAction);
	if (type) {
		if (!$('#ai_hide_show_' + ((type == 'in') ? 'out' : 'in') + 'puts').text().match(new RegExp('^' + hideOrShow))) changeText($('#ai_hide_show_all'), newAction);
	} else {
		changeText($('#ai_hide_show_inputs'), newAction);
		changeText($('#ai_hide_show_outputs'), newAction);
	}
}

$('#ai_hide_show_all').click(function() {
	toggleAll(this, '');
});

$('#ai_hide_show_inputs').click(function() {
	toggleAll(this, 'in');
});

$('#ai_hide_show_outputs').click(function() {
	toggleAll(this, 'out');
});
