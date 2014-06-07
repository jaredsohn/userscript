// ==UserScript==
// @name           Last.fm autologin
// @namespace      http://www.stuartbell.co.uk/
// @description    Logs into last.fm automatically if your username and password are saved in autocomplete.
// @include        http*://*last.fm/*
// ==/UserScript==
// This is an edited version of Henrik Nyh's excellent My eBay autologin script <http://www.userscripts.com/scripts/show/1766>

// Milliseconds to wait for form to autofill (necessary in Fx 1.5 - slower computers may need longer wait)
var timer = 1000;


var timo, maySubmit = true;  // Not currently typing (so we can submit it)

// Locate form elements
var form = document.forms.namedItem('DashboardLogin');
var uid = form.elements.namedItem('uname');
var pw = form.elements.namedItem('password');

// Don't submit form as we are typing into it
pw.addEventListener('keydown', function(e) {
	maySubmit = false;
	
	clearTimeout(timo);
	
	timo = setTimeout(function() {
		maySubmit = true;
		doSignIn();
	}, 2000);
	
}, true);

function doSignIn() {
	if(uid.value.length && pw.value.length && maySubmit) {  // Form must be non-empty and not being typed into
		form.submit();
	} else {  // Bide our time...
		window.setTimeout(doSignIn, timer);
	}
}

// Attempt to sign in
doSignIn();


