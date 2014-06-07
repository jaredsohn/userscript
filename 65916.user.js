// ==UserScript==

// @name           ggg

// @namespace      http://google.se

// @include        *cake*me*

// @version        0.2

// ==/UserScript==



(function() {
	var target = document.getElementById('menu').getElementsByTagName('ul')[0]; /* Main menu */
	/*var target = document.getElementById('userinfo_minor');*/ /* User menu */


	/* Insert logchecker link */

	var lc_item = document.createElement('li');

	lc_item.id = 'nav_testing';

	lc_item.innerHTML = '<a href="user.php?id=15">Testing</a>';

	target.appendChild(lc_item);


})();
