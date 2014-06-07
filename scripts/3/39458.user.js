// ==UserScript==
// @name          WowHead Tooltips
// @namespace     TooltipsFTW by Blowinkush of KJ horde
// @description   Adds Wowhead tooltips like you would see on the official site to any link you see on any site that is a wowhead link.
// @include       *
// @exclude       http://*wowwiki.com*
// @exclude       http://*wowhead.com*
// ==/UserScript==

var head, wowhead;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
wowhead = document.createElement('script');
wowhead.src = 'http://www.wowhead.com/widgets/power.js';
head.appendChild(wowhead);
