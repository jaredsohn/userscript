// ==UserScript==
// @name          Google Search Focuser
// @description	  Pressing 'Alt+s' in a google result page will bring the focus to search text input field
// @namespace     http://www.openjs.com/
// @include       http://google.co*/*q=*
// @include       http://www.google.co*/*q=*

//by Binny V A (http://www.openjs.com/)
// ==/UserScript==

(function() {
	var search = document.getElementsByName("q")[0];
	document.addEventListener('keydown', function(e) {
		if (e.keyCode) code = e.keyCode;
		else if (e.which) code = e.which;
		if(e.altKey && code == 83) { //83 = s
			search.focus();
			e.stopPropagation();
		e.preventDefault();
		}
	}, false);
})();