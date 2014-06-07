// ==UserScript==
// @name           My eBay autologin
// @namespace      http://henrik.nyh.se
// @description    Automatically submits the My eBay login form (and checks the "Keep me signed in" box) if your username and password were automatically filled in (typically by the Firefox password manager). This script only logs in when necessary; direct your bookmark to http://my.ebay.com/ and the script should take care of the rest, as long as Firefox is set to remember (and autofill) your log-in details. Also recommended: http://www.userscripts.org/scripts/show/2389. 
// @include        https://signin.ebay.tld/ws/eBayISAPI.dll?SignIn*
// ==/UserScript==
// Includes modifications by John Plsek <http://www.userscripts.org/people/67>.

// Milliseconds to wait for form to autofill (necessary in Fx 1.5 - slower computers may need longer wait)
var timer = 1000;


var timo, maySubmit = true;  // Not currently typing (so we can submit it)

// Locate form elements
var form = document.forms.namedItem('SignInForm');
var uid = form.elements.namedItem('userid');
var pw = form.elements.namedItem('pass');

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
		form.elements.namedItem('keepMeSignInOption').checked = true;
		form.submit();
	} else {  // Bide our time...
		window.setTimeout(doSignIn, timer);
	}
}

// Attempt to sign in
doSignIn();
