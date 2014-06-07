// ==UserScript==
// @name          meWetDB tooltips
// @namespace     wowhead para mewet
// @description   Agrega los tooltips de wowhead al foro de mewet
// @include       http://www.mewet.es/forums.php*
// ==/UserScript==
var head, wowhead;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
wowhead = document.createElement('script');
wowhead.src = 'http://www.mewetdb.in/power.js';
head.appendChild(wowhead);