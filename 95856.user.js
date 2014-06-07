// ==UserScript==
// @name           Disable Flash Hardware Acceleration v2
// @origin         based on http://userscripts.org/scripts/review/38994
// @namespace      http://userscripts.org/users/75739
// @include *
// ==/UserScript==


for (var objs = document.embeds, i = objs.length - 1; i >= 0; i--) {
	objs[i].setAttribute('wmode', 'window');
	with (objs[i].parentNode) appendChild(removeChild(objs[i]));
}

for (objs = document.getElementsByTagName('object'), i = objs.length - 1; i >= 0; i--) {
	for (var c = objs[i].childNodes, j = c.length - 1, set = false; j >= 0; j--) {
		if ((c[j].tagName == 'PARAM') && (c[j].getAttribute('name') == 'wmode')) { c[j].setAttribute('value', 'window'); set = true; break; }
	}
	if (!set) with (objs[i].appendChild(document.createElement('param'))) setAttribute('name', 'wmode'), setAttribute('value', 'window');
	
	with (objs[i].parentNode) appendChild(removeChild(objs[i]));
}