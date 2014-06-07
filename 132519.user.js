// ==UserScript==
	// @name                Facebook Green Navbar
	// @description	        Makes the Menu Bar (at Login) on Facebook Green
	// @include		http://*.facebook.com/*
	// @exclude		https://*.facebook.com/
	// @exclude		http://facebook.com
	// @exclude		http://www.facebook.com
	// @exclude		https://facebook.com
	// @exclude		https://www.facebook.com
	// ==/UserScript==

	var elmModify = document.getElementById("fb_menubar");
	elmModify.style.backgroundColor = 'green';