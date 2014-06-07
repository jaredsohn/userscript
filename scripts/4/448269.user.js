	Example: Hello World

	// ==UserScript==
	// @name                Hello Sudinfo
	// @namespace	        Sudinfo
	// @description	        Hidding this ugly login box
	// @include				http://plus.sudinfo.be*
	// ==/UserScript==

	var login = document.getElementById('loginbox');
	login.visibility = 'hidden';
