// ==UserScript==
// @name           feedly_cleanup
// @namespace      http://userscripts.org/scripts/show/87810
// @description    a basic feedly cleanup
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


GM_addStyle(css);
