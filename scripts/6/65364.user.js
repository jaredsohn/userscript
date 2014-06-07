// ==UserScript==
// @name           What.CD :: Sentbox Link
// @namespace      http://userscripts.org/scripts/show/65364
// @description    Insert link for sentbox into main menu
// @include        http*://*what.cd*
// ==/UserScript==

(function() {
	var target = document.getElementById('userinfo_minor').getElementsByTagName('li'); /* User menu */

	/* Insert link to sent mail */
	target[0].innerHTML += ' / <a href=\"/inbox.php?action=sentbox\">Sentbox</a>';
})();