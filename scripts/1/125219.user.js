// ==UserScript==
// @name          My First GM script
// @namespace     http://htmlblog.net
// @description   basic Greasemonkey script
// @include       http://steamcommunity.com
// ==/UserScript==

(function() {
    var baseUrl = "steam://friends/add/";
	
	alert(baseUrl);
	
	alert(document.body.innerHTML);
})();