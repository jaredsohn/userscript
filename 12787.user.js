// ==UserScript==
// @author              Sandy Armstrong
// @name                Google Reader Without "Mark All As Read"
// @namespace          http://google.com/reader/userscript
// @description           Hides "Mark All As Read" button from Google Reader interface.  If you've ever accidentally hit it while meaning to hit "Refresh", and lost 500 unread items with no way to retrieve them, you'll know what this is for.  Based on code in Scott Cowan's "Google Reader Minimalistic" script.
// @include             http://google.com/reader/*
// @include             http://*.google.com/reader/*
// @include             https://google.com/reader/*
// @include             https://*.google.com/reader/*
// ==/UserScript==
// Google Reader "Mark All As Read"
// Sandy Armstrong http://userscripts.org/users/35142
// Derived from:
// Google Reader Minimalistic
// Scott Cowan http://userscripts.org/users/32932

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

hidediv("mark-all-as-read");