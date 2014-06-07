// ==UserScript==
// @name		EVE Search stats  
// @description EVE Search integration for EVE forums
// @include       http://www.eveonline.com/ingameboard.asp?*
// ==/UserScript==

var charnames, charname;
charnames = document.evaluate(
             '//td/b/span',
             document,
             null,
             XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
             null);

for (var i = 0; i < charnames.snapshotLength; i++) {
    charname = charnames.snapshotItem(i);
	charname.innerHTML="<a href=\"http://eve-search.com/stats/"+charname.innerHTML+"\">"+charname.innerHTML+"</a>";
}


