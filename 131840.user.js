// ==UserScript==
// @id             DubsBack
// @name           4chan Dubs Back
// @version        1.1.1
// @namespace      
// @author         Patrick Bateman
// @description    Brings back dubs, trips, etc to boards that have them disabled, they will look like cons to people without the script.
// @include        http*://boards.4chan.org/v/*
// @include        http*://boards.4chan.org/b/*
// @run-at         document-end
// ==/UserScript==

var tip = 6543210;
var allSpans, thisSpan;
allSpans = document.getElementsByTagName('span');
for (var i = 0; i < allSpans.length; i++) {
    thisSpan = allSpans[i];
    if (thisSpan.id.length > 5)
    {
	  if (thisSpan.id.substr(0,8)=="nothread")
	    {
		thisSpan.childNodes[1].innerHTML = thisSpan.id.substr(8) -(-tip);
	    }

    	  if (thisSpan.id.substr(0,5)=="norep")
	    {
		thisSpan.childNodes[1].innerHTML = thisSpan.id.substr(5) -(-tip);
	    }
	}
}