// ==UserScript==
// @name          Global Wowhead Integration
// @namespace     wowhead-for-all
// @description   Add Wowhead integration to ALL websites! From now on, all links that link to a Wowhead URL (item, spell, etc.) will have a Wowhead-like tooltip!
// @include       *
// @exclude       http://*wowhead.com*
// @exclude       http://*wowwiki.com*
// ==/UserScript==
var head, wowhead;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
wowhead = document.createElement('script');
wowhead.src = 'http://www.wowhead.com/widgets/power.js';
head.appendChild(wowhead);