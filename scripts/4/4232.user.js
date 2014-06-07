// ==UserScript==
// @name           8a.nu autologin
// @namespace      Utomjording
// @description    Automatically submits the 8a.nu login form if your username and password were automatically filled in (typically by the Firefox password manager). Thanks to Henrik Nyh for code.
// @include        http://*.8a.nu/*Left.aspx*
// ==/UserScript==

// Milliseconds to wait for form to autofill (necessary in Fx 1.5 - slower computers may need longer wait)
var timer = 1000;


var timo, maySubmit = true;  // Not currently typing (so we can submit it)

// Locate the sign-in form by name

//var form = document.evaluate("//FORM[@name='shopper_lookup']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
var form = document.getElementById('Form1');
var username = form.elements.namedItem('_ctl1_TextBoxId');
var password = form.elements.namedItem('_ctl1_TextBoxPassword');
var submitter = document.getElementById('_ctl1_ButtonLogin');

// Don't submit form as we are typing into it (times out after 2 seconds idling)
// Ugly to duplicate, but didn't work to extricate the function

username.addEventListener('keydown', function (e) {

	maySubmit = false;
	clearTimeout(timo);
	timo = setTimeout(function() {
		maySubmit = true;
		doSignIn();
	}, 2000);
	
}, true);

password.addEventListener('keydown', function (e) {

	maySubmit = false;
	clearTimeout(timo);
	timo = setTimeout(function() {
		maySubmit = true;
		doSignIn();
	}, 2000);
	
}, true);

function doSignIn() {
	if(username.value.length && password.value.length && maySubmit) {  // Form must be non-empty and not being typed into
		submitter.click();
	} else {  // Bide our time...
		window.setTimeout(doSignIn, timer);
	}
}

// Attempt to sign in
doSignIn();

