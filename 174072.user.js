// ==UserScript==
// @name         Open links in background window
// @author       Lex1
// @version      1.4
// @description  Sets links in a page to open in new background window.
// @include      *:*
// @exclude      http://mail.google.com/*
// @exclude      https://mail.google.com/*
// ==/UserScript==

function click_ujsenabled(e) {
	var a = e.srcElement;
	while (a.nodeName != 'A' && a.nodeName != 'HTML') {
		a = a.parentNode;
	}
	if (a.href && a.protocol != 'javascript:'
			&& a.getAttribute('href')[0] != '#') {
		window.open(a.href, '_blank').blur();
		e.stopPropagation();
		e.preventDefault();
	}
};

document.addEventListener('click', click_ujsenabled, false);
