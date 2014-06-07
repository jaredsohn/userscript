// ==UserScript==
// @name           Netflix change queue to instant queue
// @namespace      NFQ
// @description    Changes the link on the Netflix page to point to the instant queue rather than the DVD queue
// @include        http://*.netflix.com/*
// ==/UserScript==

// Find the link to the disc queue
var links = document.getElementsByTagName("a"); //array
for (var i=0,imax=links.length; i<imax; i++) {
   if (links[i].href == "http://dvd.netflix.com/Queue?lnkctr=mhbque&qtype=DD")
	{
        // Change it to a link to the instant queue
	links[i].href="http://dvd.netflix.com/Queue?qtype=ED";
	links[i].innerHTML = "Instant Queue";
	}
}