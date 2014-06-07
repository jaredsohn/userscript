// ==UserScript==
// @name           My AOL Screenname autologin
// @namespace      http://www.jameswigley.com
// @description    Automatically submits the My AOL login form when using browser autocomplete feature.
// Set your bookmark to http://my.screenname.aol.com with a sitedomain of the referring AOL page you want to redirect to.
// Eg. For Pixnay: https://my.screenname.aol.com/_cqr/login/login.psp?mcState=initialized&sitedomain=pixnay.com
// @include        https://my.screenname.aol.com/_cqr/login/login.psp?*
// ==/UserScript==
// This is an modified version of the My eBay autologin script (http://www.userscripts.com/scripts/show/1766) created by Henrik Nyh


// Milliseconds to wait for form to autofill (necessary in Fx 1.5 - slower computers may need longer wait)
var timer = 1000;

var timo, maySubmit = true;  // Not currently typing (so we can submit it)

// Locate form elements
var form = document.forms.namedItem('AOLLoginForm');
var uid = form.elements.namedItem('loginId');
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