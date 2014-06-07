// ==UserScript==
// @name          Digg.com Ad Remover
// @namespace     http://www.backstab.net/grease/
// @description	  Removes the ad on all digg.com pages
// @include       http://*digg.com/*
// @exclude       
// ==/UserScript==
	
(function() {
	// The ad on digg.com is a <DIV> with the ID 'div#topads'
	document.getElementById('div#topads').style.display="none";
})();
