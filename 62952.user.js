// ==UserScript==
// @name           Syrnia - Botcheck Alert
// @namespace      http://userscripts.org/users/63546
// @description    Lets you know when a botcheck comes up on Syrnia.
// @include        http://www.syrnia.com/game.php*
// ==/UserScript==

function check() {
	if (document.getElementById('botImage')) {
		document.querySelector('input.button[value="Continue"][class="button"][type="submit"]').setAttribute('id','confirmoz');
		var stuffz = prompt('Botcheck Code:');
	}
	window.setTimeout(check,3000);
	document.getElementById("botInputField").value=(""+stuffz);
	document.getElementById("confirmoz").click();
}

window.setTimeout(check,3000);