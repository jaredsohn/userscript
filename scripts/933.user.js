// ==UserScript==
// @name          deviantART Ad Bar Remover
// @namespace     http://www.falsehope.com/userscripts/
// @description	  Removes the ad bar at the top of deviantART pages
// @include       http://*deviantart.com/*
// @exclude       
// ==/UserScript==
	
(function() {
	// The ad bar on deviantART is a <DIV> with the ID 'sponsors'
	document.getElementById('sponsors').style.display="none";
})();
