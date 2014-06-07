// ==UserScript==
// @name           Srugim Ads Page Skip
// @namespace      Srugim
// @version        0.3
// @description    Skips the srugim Maavaron page
// @include        http://www.srugim.co.il/
// ==/UserScript==

var links = document.getElementsByClassName("pagesLink");

// Adds the r=1 to the links, orders the server to skip the ad
for (var i = 0; i < links.length; i++)
	links[i].href += "&di=1";
