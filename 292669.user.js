// ==UserScript==
// @name           GLB Skill Points Page Enhancements Warrior General
// @namespace      Bogleg
// @version        2.0.0
// @include        http://goallineblitz.com/game/skill_points.pl?*
// @include        http://glb.warriorgeneral.com/game/skill_points.pl?*
// @require        http://userscripts.org/scripts/source/74204.user.js
// ==/UserScript==
// modified by briansimoneau 01/24/2014

function figureNextCaps(curVal) {
	var out = '';
	var cur = curVal;
	var origCost = 0;
	var caps = 4;
	var needed = 0;
	while (caps > 0) {
		cost = parseInt(Math.exp(0.0003 * Math.pow(cur, 2)));
		if (cost > origCost) {
			if (origCost > 0) {
				if (out.length) out += '<br />';
				out += '<b>' + cur + '</b>&nbsp;(' + origCost + '-cap)&nbsp;cost:&nbsp;' + needed + '&nbsp;Skill&nbsp;Point' + ((needed == 1) ? '' : 's');
				--caps;
			}
			origCost = cost;
		}
		needed += cost;
		cur = Math.round((cur + 1) * 100) / 100;
	}
	return out;
}

function installCapTips() {
	$('#attribute_list div.attribute_value').each(function() {
		$(this).mouseover(function() {
			unsafeWindow.set_tip(figureNextCaps(parseFloat(this.innerHTML)), 0, 1, 1, 1);
		}).mouseout(function() {
			unsafeWindow.unset_tip();
		});
	});
}

installCapTips();
