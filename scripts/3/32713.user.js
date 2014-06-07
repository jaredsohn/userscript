// ==UserScript==
// @name           Syrnia - Botcheck Alert
// @namespace      http://userscripts.org/users/63546
// @description    Lets you know when a botcheck comes up on Syrnia.
// @include        http://www.syrnia.com/game.php*
// ==/UserScript==

function check() {
	if (document.getElementById('botImage')) {
		alert('Botcheck alert!');
	}
	window.setTimeout(check,10000);
}

window.setTimeout(check,10000);
