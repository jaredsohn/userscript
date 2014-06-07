// ==UserScript==
// @name           feedly_cleanup2
// @namespace      http://userscripts.org/scripts/show/87810
// @description    Modification of http://userscripts.org/scripts/show/87810 to use full width frame to display content.
// @include        http://www.feedly.com/*
// ==/UserScript==

var css = ''; // declare variable

/* On default the width of the actual content on feedly is dynamically resized... this tends to waste a lot of space I've noticed so I'd like it just to use all the space.. well most of it please */
css += "#feedlyFrame { width: 98% !important; }";

//Useless stuff on the right sidebar... comment then out if you'd like them back.
//NOTE: this is the only thing on the right I've ever used.. its your call if you want it or not, I'd suggest keeping it as its handy:
//Sources (top right)
//css += "#otherSourcesModule { display: none !important; }";

//remove all these other things from the right hand sidebar..
//NB: I use an adblocker so if I've missed any please tell me
css += "#flickrModule_part, #youtubeModule_part, #tweetsModule_part, #sponsorsModule_part, #otherSponsorsModule_part, #fusionModule_part { display: none !important; }";

//"Explore" in the sidebar on the right, I've certainly never used it.
css += "#trendsModule_part { display: none !important; }";

//remove Twitter sign-in crud on home#my page, hate twitter, always have always will
css += "#timelineModule_part { display: none !important; }";

//remove The new (02 Nov 2010) Friends on Feedly crud
css += "#causesModule_part { display: none !important; }";

//make table for each entry have full width.
css += ".condensed .inlineFrame{padding-left: 5% !important; padding-right: 5% !important;}";
css += ".entryBody table { max-width: 100% !important; overflow: hidden; clear: both;}";

//make content have full width
css += ".content{ center:first-child {table: width=100%;}}";

GM_addStyle(css);
