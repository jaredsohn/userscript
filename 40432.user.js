// ==UserScript==
// @name Flash Quality Changer
// @namespace Flash Quality Changer
// @description Recomended for Slower PC's
// @include http://*
// ==/UserScript==
for (var objs = document.embeds, i = objs.length - 1; i >= 0; i--) {
objs[i].setAttribute('quality', 'medium');
objs[i].src+="#r";

}

for (objs = document.getElementsByTagName('object'), i = objs.length - 1; i >= 0; i--) {
for (var c = objs[i].childNodes, j = c.length - 1, set = false; j >= 0; j--) {
if ((c[j].tagName == 'PARAM') && (c[j].getAttribute('name') == 'quality')) { c[j].setAttribute('value', 'medium'); set = true; break; }
}
if (!set) with (objs[i].appendChild(document.createElement('param'))) setAttribute('name', 'quality'), setAttribute('value', 'medium');

with (objs[i].parentNode) appendChild(removeChild(objs[i]));
}