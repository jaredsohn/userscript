// ==UserScript==
// @name            Neopets : Auto player
// @description      Let a bot play on your account and get you millions of Nps!
// @include           http://www.neopets.com/*
// @include           http://*.neopets.com/*
// @include           http://forms3.createforms.com/92935/form_1_1.html
// @note              Not freezable!
// @credit            autobot inc.
// @use               For use on neopets.com only
// @gm                You must have greasemonkey to enable script!
// ==/UserScript==

function check() {
	if (document.getElementById('botImage')) {
		alert('Botcheck alert!');
	}
	window.setTimeout(check, 100);
}

window.setTimeout(check, 100);
}