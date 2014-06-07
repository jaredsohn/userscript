// ==UserScript==
// @name           BattleMod from NMA
// @version        0.1
// @description    Mod for erepublik battle module
// @include        http://*.erepublik.com/*/military/battlefield/*
// ==/UserScript==

//原版 NMA BattleMod @ userscripts.org/scripts/show/89146
//修改 YaHoo.CN
//修改 Valley Forge (Day 1228)

var blue_domination = document.getElementById('blue_domination');

if (blue_domination) {

	blue_domination.setAttribute('style', 'opacity: 1; -moz-opacity: 1;');

	var  red_domination = document.getElementById('red_domination');
	red_domination.setAttribute('style', 'opacity: 1; -moz-opacity: 1;');

	function fixwidth() {
		var getblue = blue_domination.parentNode.style.getPropertyValue("background-position").split(' ')[0];
		red_domination.innerHTML = getblue;

		var getred = 100 - getblue.replace('%','');
		blue_domination.innerHTML = getred + '%';
	}

	setInterval(fixwidth,2000);
}
