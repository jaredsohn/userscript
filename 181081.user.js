// ==UserScript==
// @name        Popehat Amazon Affiliate info
// @description	Tampermonkey script to auto add the Popehat affiliate tag to any Amazon URL
// @match       *://*.amazon.com/*
// @run-at      document-start
// @author		Zac Morris zac@zacwolf.com
// @version		1.11
// ==/UserScript==

var oldhref  = window.location.href;

/*--- Test that popehat affiliate info is added to all amazon links */
//alert(oldhref+":"+(/tag=popehat-20\&linkCode=wsw/.test(oldhref)));
if (! /smile.amazon.com/.test(oldhref) //smile.amazon.com is where users can use a different associate tag
    && ! /\.html/.test(oldhref) //this URL throws error if tag= added
    && ! /tag=/.test(oldhref) //Only override if another associate's tag isn't already set
   ) {
    var newURL  = oldhref + (/\?/.test(oldhref) ? "&tag=popehat-20" : "?tag=popehat-20");
    /*-- replace() puts the good page in the history instead of the original link. */
    window.location.replace(newURL);
    window.location.assign(newURL);
}