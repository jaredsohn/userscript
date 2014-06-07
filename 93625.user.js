// ==UserScript==
// @name		Megaupload timer bypass
// @author		Henry Heikkinen
// @include		http://www.megaupload.com/?d=*
// ==/UserScript==

(function() {
	// Never thought it could be this simple.
	document.location = document.getElementById('downloadlink').firstChild.href;
})();
