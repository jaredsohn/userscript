// ==UserScript==
// @name       FacebookAlignmentPatch
// @namespace  http://allejo.sujevo.com/
// @version    0.4
// @description  A simple script that recenters Facebook if it is not aligned properly
// @include        htt*://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @copyright  2012+, Vladimir Jimenez (allejo)
// ==/UserScript==

//First patch
GM_addStyle(".leftAlign #globalContainer{margin: 0px auto;} .leftAlign #blueBar #pageHead{margin: 0px auto}");

//Second patch
GM_addStyle(".widePage #globalContainer{min-width:981px;} .widePage #blueBar #pageHead{width:981px;}");

//Third patch
GM_addStyle(".widePage .timelineLayout #rightCol{width:122px}");

//Fourth patch
GM_addStyle(".widePage #blueBar #pageHead{width:981px}");
GM_addStyle(".widePage .fbx #globalContainer{padding-right:0px}");
GM_addStyle(".widePage .timelineLayout #globalContainer{width:0px}");