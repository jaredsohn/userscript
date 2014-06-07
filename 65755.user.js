// ==UserScript==
// @name           VA link
// @namespace      http://userscripts.org/
// @include        http*://*what.cd*
// ==/UserScript==

(function() {
	var target = document.getElementById('userinfo_minor').getElementsByTagName('li'); /* User menu */

	/* Insert link to edit link */
	target[6].innerHTML += ' &nbsp;<a href="https://ssl.what.cd/better.php?action=va">VA</a>';

})();
