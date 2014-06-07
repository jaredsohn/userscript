// ==UserScript==
// @name            RIT myCourses Auto-Login
// @namespace       http://www.last.fm/user/unnes
// @description     Auto-login to RIT's myCourses online classroom website, assuming Firefox is set to remember your password. Updated: 2006-4-28
// @include         https://mycourses.rit.edu/*
// @include         http://mycourses.rit.edu/*
// ==/UserScript==
// This is an edited version of Henrik Nyh's excellent My eBay autologin script <http://www.userscripts.com/scripts/show/1766>

// Milliseconds to wait for form to autofill (necessary in Firefox 1.5 - slower computers may need to wait longer)
var timer = 1000;


var timo, maySubmit = true;  // Not currently typing (so we can submit it)

// Locate form elements
var form = document.forms.namedItem('processLogonForm');
var uid = form.elements.namedItem('userName');
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