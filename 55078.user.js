// ==UserScript==

// @name           What.CD VA

// @description    Insert VA

// @include        http://what.cd/*

// @include        https://ssl.what.cd/*

// ==/UserScript==



(function() {
	var target = document.getElementById('menu').getElementsByTagName('ul')[0]; /* Main menu */
	/*var target = document.getElementById('userinfo_minor');*/ /* User menu */


	var lc_item = document.createElement('li');

	lc_item.id = 'nav_VA';

	lc_item.innerHTML = '<a href="http://what.cd/better.php?method=va">VA</a>';

	target.appendChild(lc_item);


})();

