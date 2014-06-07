// ==UserScript==
// @name           IU CAS Auto Login
// @namespace      http://userscripts.org/users/212419
// @description    Automatically submit login form on Indiana University Central Authentication Service pages
// @include        https://cas.iu.edu/cas/login*
// ==/UserScript==
// Source from My eBay autologin
// Includes modifications by John Plsek <http://www.userscripts.org/people/67>.

// Milliseconds to wait for form to autofill (necessary in Fx 1.5 - slower computers may need longer wait)
//var timer = 1000;
var timer = 0;


var timo, maySubmit = true;  // Not currently typing (so we can submit it)

// Locate form elements
var form = document.forms.namedItem('UserForm');
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
		//form.elements.namedItem('keepMeSignInOption').checked = true;
		form.submit();
	} else {  // Bide our time...
		window.setTimeout(doSignIn, timer);
	}
}

// Attempt to sign in
doSignIn();
