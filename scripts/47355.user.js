// ==UserScript==

// @name           What.CD Extended Main Menu

// @namespace      http://jonls.dk/

// @description    Insert logchecker and better link in main menu

// @include        http://what.cd/*

// @include        https://ssl.what.cd/*

// @version        0.2

// @date           2009-04-27

// ==/UserScript==



(function() {
	var target = document.getElementById('menu').getElementsByTagName('ul')[0]; /* Main menu */
	/*var target = document.getElementById('userinfo_minor');*/ /* User menu */


	/* Insert logchecker link */

	var lc_item = document.createElement('li');

	lc_item.id = 'nav_logchecker';

	lc_item.innerHTML = '<a href="logchecker.php">Logchecker</a>';

	target.appendChild(lc_item);


	/* Insert better link */

	var better_item = document.createElement('li');

	better_item.id = 'nav_better';

	better_item.innerHTML = '<a href="better.php">Better</a>';

	target.appendChild(better_item);
})();

