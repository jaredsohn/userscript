// ==UserScript==
// @name            Ad Skipper dooce.com
// @namespace      http://userscripts.org/scripts/
// @description     2005-11-06: Disables the ads column on dooce.com.  
// @include         http://*.dooce.com*
// ==/UserScript==

(function() {
	// The ad bars on dooce is a <DIV> with the ID 'left' and 'right'
	document.getElementById('left').style.display="none";
	document.getElementById('right').style.display="none";
})();



