// ==UserScript==
// @name           Plain Text Password
// @namespace      http://userscripts.org/people/14536
// @description    Shows password fields as plain text so you can see what you're typing.
// @include        *
// @author         Vaughan Chandler
// ==/UserScript==

// Last updated on 2008-01-31

function show() {
	var inputs = document.getElementsByTagName('input');
	for (var i=0; i<inputs.length; i++) {
		if (inputs[i].type.toLowerCase() == 'password') {
			inputs[i].type = 'text';
		}
	}
}

var site = location.href.split('/')[2];

if (site.match(/login\.live\.com/)) { window.addEventListener('load', show, true); }
else { show(); }