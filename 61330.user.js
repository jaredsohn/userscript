// ==UserScript==
// @name           Torncity autologin
// @namespace      http://www.torncity.com/
// @description    
// @include        http://www.torncity.com/
// ==/UserScript==
// Includes modifications by John Plsek <http: />.

// Milliseconds to wait for form to autofill (necessary in Fx 1.5 - slower computers may need longer wait)
var initial_timer = 100;
var timer = 100;


var timo, dsi, maySubmit = true;  // Not currently typing (so we can submit it)

// Locate form elements
var submit = document.evaluate("//input[@name='btnLogin' and contains(@src,'login')]",document,null,9,null).singleNodeValue;
var uid = document.evaluate("//input[@name='player']",document,null,9,null).singleNodeValue;
var pw = document.evaluate("//input[@name='password']",document,null,9,null).singleNodeValue;

if(!submit || !uid || !pw) return;

function allow() {
maySubmit = true;
doSignIn();
}

// Don't submit form as we are typing into it
pw.addEventListener('keydown', function(e) {
	clearTimeout(dsi);
	clearTimeout(timo);
	maySubmit = false;
	//timo = setTimeout(allow, 2500);
	
}, true);

function doSignIn() {
	if(maySubmit===true && uid.value.length>0 && pw.value.length>0) {  // Form must be non-empty and not being typed into
		submit.click();
	} else {  // Bide our time...
		dsi = setTimeout(doSignIn, timer);
	}
}

// Attempt to sign in
dsi = setTimeout(doSignIn, initial_timer);