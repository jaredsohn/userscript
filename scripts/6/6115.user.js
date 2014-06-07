// ==UserScript==
// @name           Web.de AutoLogin
// @namespace      www.web.de
// @description    Automatically submits the web.de login form (and checks the "Keep me signed in" box) if your username and password were automatically filled in (typically by the Firefox password manager). This script only logs in when necessary; direct your bookmark to http://my.ebay.com/ and the script should take care of the rest, as long as Firefox is set to remember (and autofill) your log-in details.
// @include        *web.de*
// ==/UserScript==

var timer = 1000;


var timo, maySubmit = true;  // Not currently typing (so we can submit it)

// Locate form elements
var form = document.forms.namedItem('formLogin');
var uid = form.elements.namedItem('inpLoginUsername');
var pw = form.elements.namedItem('inpLoginPasswd');

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
	//form.submit();
	if(uid.value.length && pw.value.length && maySubmit) {  // Form must be non-empty and not being typed into
		form.submit();
	} else {  // Bide our time...
		window.setTimeout(doSignIn, timer);
	}
}

// Attempt to sign in
doSignIn();


