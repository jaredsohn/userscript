// ==UserScript==
// @name           Oron.com Captcha Revealer
// @namespace      oronhelper
// @include        http://oron.com/*
// @match          http://oron.com/*
// ==/UserScript==

var captcha;
captcha = document.getElementById('captcha1');
if (captcha) {
	captcha.setAttribute('style', 'display:block;');
}

var inputs;
var counter, length;
var form;

inputs = document.getElementsByTagName('input');
for (counter = 0, length = inputs.length; counter < length; counter += 1) {
	if (inputs[counter].name === "method_free") {
		inputs[counter].click();
		break;
	}
}
