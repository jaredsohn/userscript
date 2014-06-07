// ==UserScript==
// @name           tiscali 404 redirect to google search
// @namespace      http://www.kbstyle.net/program/greasemonkey/index.html
// @description    This userscript redirects the tiscali error page for dns not found to google
// @include        http://redirect.tiscali.*/*
// ==/UserScript==

(function(){
	var allInputs, thisInput;
	allInputs = document.getElementsByTagName('input');
	for (var i = 0; i < allInputs.length; i++) {
		thisInput = allInputs[i];
		if (thisInput.name="q") {
			document.location.href="http://www.google.com/search?q="+thisInput.value;

		}
	}
})();