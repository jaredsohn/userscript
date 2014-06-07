// ==UserScript==
// @name        SOGO password remember
// @description Ugly hack, but does the trick for now
// @namespace   hugoideler.com
// @include     http*://*.*/SOGo/*
// @version     1
// ==/UserScript==

var btn_submit = document.createElement('input');
btn_submit.setAttribute('type', 'submit');
btn_submit.setAttribute('value', 'Fill in password, then click me once to let browser remember password (disable script after that)');

for (var i = document.forms.length - 1; i >= 0; i--) {
	var elmForm = document.forms[i];
	elmForm.appendChild(btn_submit);
}

