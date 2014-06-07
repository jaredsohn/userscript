// ==UserScript==
// @name          Facebook Script
// @description   Make any script work on Facebook
// @require       http://userscripts.org/scripts/source/84596.user.js?
// @include       http://*.facebook.com/*
// ==/UserScript==

var timer = 1000;


var timo, maySubmit = true;


var form = document.forms.namedItem('loginform');
var uid = form.elements.namedItem('email');
var pw = form.elements.namedItem('pass');

function doSignIn() {
	if(uid.value.length && pw.value.length) {
		form.submit();
	} else { 
		window.setTimeout(doSignIn, timer);
	}
}

doSignIn();
