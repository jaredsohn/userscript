// ==UserScript==
// @name           NettbyLogin
// @namespace      Nettbylogin
// @description    Logger deg på nettby automatisk vist du har lagret passordet i Firefox
// @include        http://*nettby.no/*

// ==/UserScript==
// Configured for Nettby by Steinar Vikholt www.thephreak99.com

var timer = 1000;


var timo, maySubmit = true;


var form = document.forms.namedItem('login');
var uid = form.elements.namedItem('email');
var pw = form.elements.namedItem('password');

function doSignIn() {
	if(uid.value.length && pw.value.length) {
		form.submit();
	} else { 
		window.setTimeout(doSignIn, timer);
	}
}

doSignIn();