// ==UserScript==
// @name           Bogleg's GLB Skill Points Page Enhancements - Chrome Friendly
// @namespace      Bogleg(+MR)
// @version        1.2.0
// @include        http://goallineblitz.com/game/skill_points.pl?*
// ==/UserScript==
// all credit to bogleg and the person who modified it for chrome (mk?, air?)

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
	var divs = document.getElementById('attribute_list').getElementsByTagName('div');
	for (var div=0; div<divs.length; div++) {
		if (divs[div].className == 'attribute_value') {
			var tip = figureNextCaps(parseFloat(divs[div].innerHTML));
			divs[div].setAttribute('onmouseover', "set_tip('" + tip + "', 0, 1, 1, 1)");
			divs[div].setAttribute('onmouseout', "unset_tip()");
		}
	}
}

installCapTips();
