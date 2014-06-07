// ==UserScript==
// @name           Edit link
// @namespace      http://userscripts.org/
// @include        http*://*what.cd*
// ==/UserScript==

(function() {
	var target = document.getElementById('userinfo_minor').getElementsByTagName('li'); /* User menu */

	/* Insert link to edit link */
	target[6].innerHTML += ' &nbsp;<a href="forums.php?action=viewthread&threadid=12006">Edit</a>';

})();
