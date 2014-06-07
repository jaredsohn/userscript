// ==UserScript==
// @name           Feedly :: Hide Adverts & Log Panel
// @namespace      http://userscripts.org/scripts/show/152988
// @description    No Adverts in Feedly
// @include        http://www.feedly.com/*
// @version	   1.0.1
// ==/UserScript==

var css = '';

css += "#flickrModule_part, #youtubeModule_part, #tweetsModule_part, #sponsorsModule_part, #otherSponsorsModule_part, #fusionModule_part { display: none !important; }";
css += "#trendsModule_part { display: none !important; }";
css += "#timelineModule_part { display: none !important; }";
css += "#causesModule_part { display: none !important; }";
css += "#giftsModule_part { display: none !important; }";
css += "#who, #greetings { display: none !important; }";

GM_addStyle(css);