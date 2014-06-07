// ==UserScript==
// @name           last.fm reply quote button
// @namespace      lunrfarsde@blogspot.com
// @include        http://www.lastfm.com.tr/inbox/pm/*&reply=true*
// ==/UserScript==

txtArea = document.getElementById("body");

function f() {
	txtArea.value = txtArea.value.substring(0, txtArea.selectionStart - 1) 
		+ "[quote]" + txtArea.value.substring(txtArea.selectionStart, txtArea.selectionEnd)
		+ "[/quote]" + txtArea.value.substring(txtArea.selectionEnd + 1);
}

divButtons = document.getElementById("msgButtons");

btnQuote = document.createElement("input");
btnQuote.type = "Button";
btnQuote.value = "Quote";
btnQuote.addEventListener("click", f, true);

divButtons.appendChild(btnQuote);
