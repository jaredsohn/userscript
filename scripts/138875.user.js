// ==UserScript==
// @name Low Quality Habitarium
// @namespace userscripts.org
// @description Loads Habi in low quality
// @include http://*neopets.com/habitarium/*
// ==/UserScript==

for (var objs = document.embeds, i = objs.length - 1; i >= 0; i--) {
	objs[i].setAttribute('quality', 'low');
	objs[i].src+="#r";
}

for (objs = document.getElementsByTagName('object'), i = objs.length - 1; i >= 0; i--) {
for (var c = objs[i].childNodes, j = c.length - 1, set = false; j >= 0; j--) {
if ((c[j].tagName == 'PARAM') && (c[j].getAttribute('name') == 'quality')) { c[j].setAttribute('value', 'low'); set = true; break; }
}
if (!set) with (objs[i].appendChild(document.createElement('param'))) setAttribute('name', 'quality'), setAttribute('value', 'low');

with (objs[i].parentNode) appendChild(removeChild(objs[i]));
}