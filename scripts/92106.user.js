// ==UserScript==
// @namespace		http://www.wolfiesden.com/greasemonkey/
// @name			WikiSponsor
// @description		Turns off sponsored ad blocks on many wiki based sites
// @include			http://*
// ==/UserScript==

GM_addStyle(".SponsoredLinksModule { display:none; }");
GM_addStyle(".sponsormsg { display:none; }");
function urchinTracker(slashtime){
}