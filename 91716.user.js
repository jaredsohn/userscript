// ==UserScript==
// @name           golem.de centered
// @namespace      www.goodsoul.de
// @description    centers the main table on golem.de
// @include        http://*.golem.de/*
// ==/UserScript==

// get first table:
var table = document.getElementsByTagName('table')[0];
// or get the 'all'-table if possible:
var els = document.getElementsByTagName('table');
for (i = 0; i < els.length; i++) {
	if (els[i].class == 'all') {
		table = els[i];
		break;
	}
}

table.style.marginLeft = 'auto';
table.style.marginRight = 'auto';

// enlarge videos:
var embeds = document.getElementsByTagName('embed')
for (i = 0; i < embeds.length; i++) {
	if (embeds[i].id.substr(0,9) == 'NVBPlayer') {
		embeds[i].setAttribute('width',640);
		embeds[i].setAttribute('height',400);
	}
}