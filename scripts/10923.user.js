// ==UserScript==
// @name           Quickflix Auto Login
// @namespace      http://blog.ozdw.com
// @description    Automatically submits the Quickflix login form (and checks the "Keep me signed in" box) if your username and password were automatically filled in (typically by the Firefox password manager). This script only logs in when necessary. Based on the Ebay Auto-login form. http://userscripts.org/scripts/show/1766
// @include        http://www.quickflix.com.au/Members/*
// ==/UserScript==

// Milliseconds to wait for form to autofill (necessary in Fx 1.5 - slower computers may need longer wait)
var timer = 1000;

var timo, maySubmit = true;  // Not currently typing (so we can submit it)

// Locate form elements
var form = document.forms.namedItem('mainform');
var uid = form.elements.namedItem('txtUsername');
var pw = form.elements.namedItem('txtPassword');

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
        form.elements.namedItem('chkRememberLogin').checked = true;
        document.getElementById('btnLogin').click(); 
    } else {  // Bide our time...
        window.setTimeout(doSignIn, timer);
    }
}

// Attempt to sign in
doSignIn();