// ==UserScript==

// @name           What.CD Extended Main Menu logchecker

// @namespace      What.CD

// @description    Insert logchecker in main menu

// @include        http://what.cd/*

// @include        https://ssl.what.cd/*

// @version        0.2

// @date           2011-11-02

// ==/UserScript==



(function() {
	var target = document.getElementById('menu').getElementsByTagName('ul')[0]; /* Main menu */
	/*var target = document.getElementById('userinfo_minor');*/ /* User menu */


	/* Insert logchecker link */

	var lc_item = document.createElement('li');

	lc_item.id = 'nav_logchecker';

	lc_item.innerHTML = '<a href="logchecker.php">Logchecker</a>';

	target.appendChild(lc_item);
})();