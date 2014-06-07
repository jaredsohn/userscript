// ==UserScript==
// @name           XING AutoLogin
// @namespace      www.xing.com
// @description    XING AutoLogin
// @include        http://www.xing.com/app/*
// ==/UserScript==

// Milliseconds to wait for form to autofill (necessary in Fx 1.5 - slower computers may need longer wait)
var timer = 1000;


var timo, maySubmit = true;  // Not currently typing (so we can submit it)

// Locate form elements
var form = document.forms.namedItem('login-form');
var uid = form.elements.namedItem('username');
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
        // Form must be non-empty and not being typed into
	if(uid.value.length && pw.value.length && maySubmit) {  
		//form.elements.namedItem('remember-login').checked = true;
		form.submit();
	} else {  // Bide our time...
		window.setTimeout(doSignIn, timer);
	}
}

// Attempt to sign in
doSignIn();
