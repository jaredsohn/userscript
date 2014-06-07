// ==UserScript==
// @name           Default to End on day 40
// @namespace      GLB
// @include        http://goallineblitz.com/game/make_offer.pl?player_id=*
// ==/UserScript==

function find40(test) {
    if (test.innerHTML.indexOf('End on Day 40', 0)>=0) return 1;
  return 0;
}

function findFull(test) {
    if (test.innerHTML.indexOf('Full Season (40 days)', 0)>=0) return 1;
  return 0;
}


var option = document.getElementsByTagName('option')
for(var i=0,j=option.length; i<j; i++) {
	if (find40(option[i])){
	var endon40 = option[i]
	}
	if (findFull(option[i])){
	var full = option[i]
	}
}

endon40.innerHTML = 'Full Season (40 days)'
full.innerHTML = 'End on Day 40'
endon40.setAttribute('value', '40_day')
full.setAttribute('value', 'season')