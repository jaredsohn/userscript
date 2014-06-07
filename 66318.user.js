// ==UserScript==
// @name           Better.php Main Menu Mod
// @namespace      http://userscripts.org/users/126716
// @description    Adds better.php to the main menu
// @include        https://ssl.what.cd/*

// @include        http://what.cd/*
// ==/UserScript==

(function() {
	var target = document.getElementById('menu').getElementsByTagName('ul')[0]; /* Main menu */
	/*var target = document.getElementById('userinfo_minor');*/ /* User menu */

	/* Insert better link */

	var better_item = document.createElement('li');

	better_item.id = 'nav_better';

	better_item.innerHTML = '<a href="better.php">Better</a>';

	target.appendChild(better_item);
})();