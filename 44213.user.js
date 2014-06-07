// ==UserScript==
// @name           Facebook New Sidebar Hider
// @namespace      facebook
// @include        http://*.facebook.com/*
// @include        http://facebook.com/*
// @include        http://*.facebook.com/home.php#/*

// ==/UserScript==


//  Copyright (c) 2009 Lucio Riccardi
function hidediv(id) {
	//safe function to hide an element with a specified id
	if (document.getElementById) { // DOM3 = IE5, NS6
		document.getElementById(id).style.display = 'none';
	}
	else {
		if (document.layers) { // Netscape 4
			document.id.display = 'none';
		}
		else { // IE 4
			document.all.id.style.display = 'none';
		}
	}
}
hidediv("home_sidebar");
