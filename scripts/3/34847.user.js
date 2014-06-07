// ==UserScript==
// @name           Don't invite the world onFlixster
// @namespace      flix
// @description    Uncheck all contacts when importing from an external contact list
// @include        http://www.flixster.com/invite/address-book/send*
// ==/UserScript==

function uncheckall() {
	i = 0;
	while (1) {
		cb = document.getElementById("inviteEmail" + i);
		if (cb == null){
			break;
		}
		cb.checked = false;
		i++;
	}
}
uncheckall();
