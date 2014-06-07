// ==UserScript==
// @name           PMOG "Like a Pirate" Edition
// @namespace      http://userscripts.org/scripts/show/31139
// @include        http://pmog.com/*
// ==/UserScript==

// define translations
var dictionary = {
	'Passive' : 'Piratical',
	'Crate' : 'Chest',
	'Mine' : 'Cannonball',
	'Portal' : 'Whirlpool',
	'Lightpost' : 'Lighthouse',
	'Armor' : 'Armour',
	'Mission' : 'Adventure',
	'Shoat' : 'Lubber',
	'burdenday' : 'the Krakken',
	'DeeP' : 'Black Spot',
	'Datapoint' : 'Gold Dubloon',
	'DP' : 'GD',
};
function translate(target) {
	copy = target.innerHTML;
	for (key in dictionary) {
		var reg = new RegExp('(>[^<]*)' + key, 'igm');
		copy = copy.replace(reg, '$1' + dictionary[key]);
	}
	target.innerHTML = copy;
}
function get_rest () {
	translate(document.body);
}

// from http://diveintogreasemonkey.org/patterns/onload.html
window.addEventListener(
    'load', 
    function() {
    	translate(document.body);
    	setTimeout(get_rest, 1000);
    	//alert('all done');
    	},
    true);