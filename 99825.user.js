// ==UserScript==
// @name           hidenavbar
// @namespace      http://kishibe.dyndns.tv/
// @include        http://www.topcoder.com/stat?c=problem_statement*
// ==/UserScript==

(function() {
	var element = document.getElementsByTagName('table')[4];
	while (document.body.firstChild)
		document.body.removeChild(document.body.firstChild);
	document.body.appendChild(element);
	element.style.background = 'black';
})();
