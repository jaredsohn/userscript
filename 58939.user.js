// ==UserScript==
// @name          	Liberation.fr Comments Blocker
// @namespace     	http://liberation.fr/
// @description	Hides all of the idiots yammering away in the comments section on the Liberation.fr website
// @author        	Zen le Renard shamelessy copying Atomic Taco's http://userscripts.org/scripts/source/54634.user.js
// @include    	http://*.liberation.fr/*
// @include    	http://*.libe.fr/*
// ==/UserScript==


var thisDiv, comDivs, ggDivs, bDivs, bcDivs ;

comDivs = document.evaluate(
   "//div[@class='reactionsCom reactionsNiv1 first' or " +
      "@class='googleBanner' or " +
      "@class='blocE1B-16b' or " +
      "@class='blocE1B-16b clear']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
for (var i = 0; i < comDivs.snapshotLength; i++) {
    thisDiv = comDivs.snapshotItem(i);
    thisDiv.parentNode.removeChild(thisDiv)
}
    
