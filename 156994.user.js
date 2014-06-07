// ==UserScript==
// @name           HV - Show Gems
// @version        1.0.1
// @namespace      HVSG
// @match          http://hentaiverse.org/*
// ==/UserScript==

if (gem = document.getElementById('ikey_p')) {

	var icon;
	switch (gem.getAttribute('onmouseover').match(/'([^\s]+) Gem/)[1]) {
		case 'Mystic': icon = 'e/channeling.png'; break;
		case 'Health': icon = 'a/hp.png'; break;
		case 'Mana': icon = 'a/mp.png'; break;
		case 'Spirit': icon = 'a/sp.png'; break;
	};
			
	var img = document.querySelector('.btp').appendChild(document.createElement('img'));
	img.src = 'http://ehgt.org/v/' + icon;
	img.style.cssText = 'border: 1px solid black; position: absolute; float: right; right: 6px; top: 8px;';

}