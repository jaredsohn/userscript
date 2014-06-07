// ==UserScript==
	// @name                Facebook Green Navbar
	// @description	        Makes the Menu Bar (at Login) on Facebook Green
	// @include		http://*.facebook.com/*
	// @exclude		
	// @exclude		
	// ==/UserScript==

	var elmModify = document.getElementById("fb_menubar");
	elmModify.style.backgroundColor = 'green';