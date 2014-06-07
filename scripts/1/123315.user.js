// ==UserScript==
// @name          TorHead Tooltips
// @description   Adds Torhead tooltips like it has been done for wowhead in http://userscripts.org/scripts/show/39458.
// @include       *
// @exclude       http://*.torhead.com*
// @exclude       http://*.askajedi.com*
// @exclude       http://*.torwars.com*
// @exclude       http://*.guildportal.com*
// @exclude       http://*.torsyndicate.com*
// @exclude       http://*.enjin.com*
// ==/UserScript==

var head, wowhead;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
torhead = document.createElement('script');
torhead.src = 'http://tor.zamimg.com/tooltips.js';
head.appendChild(torhead);