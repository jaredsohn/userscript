// ==UserScript==
// @name           Save.TV Autologin
// @namespace      
// @description    Autologin für Save.TV
// @include        *save.tv*
// ==/UserScript==

// Milliseconds to wait for form to autofill (necessary in Fx 1.5 - slower computers may need longer wait)
var timer = 1000;


var timo, maySubmit = true;  // Not currently typing (so we can submit it)

// Locate form elements
var form = document.forms.namedItem('loginform');
var uid = form.elements.namedItem('sUsername');
var pw = form.elements.namedItem('sPassword');
var el = document.getElementById('bAutoLoginActivate');   

//Reset the form-preset, that blocks Firefox' auto-fill-in logindata
if (uid) uid.value = '';
if (pw) pw.value = '';
if (el) document.getElementById('bAutoLoginActivate').checked=true;

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
