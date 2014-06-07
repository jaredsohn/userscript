// ==UserScript==
// @name           Mouse over password
// @namespace      Created by sahil
// @description    Shows password fields as plain text when you pass the mouse over them.
// @include        *
// @author         Sahil
// ==/UserScript==

// Last updated on 2008-01-31

function show() {
	var inputs = document.getElementsByTagName('input');
	for (var i=0; i<inputs.length; i++) {
		if (inputs[i].type.toLowerCase() == 'password') {
			inputs[i].addEventListener('mouseover', function() { this.type='text'; }, true);
			inputs[i].addEventListener('mouseout', function() { this.type='password'; }, true);
		}
	}
}

var site = location.href.split('/')[2];

if (site.match(/login\.live\.com/)) { window.addEventListener('load', show, true); }
else { show(); }