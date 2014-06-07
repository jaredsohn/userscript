// ==UserScript==
// @name          Splinder.com Ad Bar Remover
// @namespace     http://www.namu.it/userscripts/
// @description	  Removes the ad bar at the top of splinder.com pages
// @include       http://*splinder.com/*
// @exclude       
// ==/UserScript==
	
(function() {
	// The ad bar on Splinder blog is a <DIV> with the ID 'top_frame'
	document.getElementById('top-frame').style.display="none";
})();