// ==UserScript==
// @name           Passwort anzeigen
// @description    Zeigt das Passwort an, die sich unter den Sternen verbergen, einfach auf das Feld mit der Maus klicken und das Passwort steht da
// @include        http://*
// @include        https://*
// @include        file:*
// @copyright      by Dunlop
// ==/UserScript==

var show_only_on_click = true; //  Zeigt das Passwort an, sobald das Feld mit der Maus geklickt wurde

function text() {
this.type = "text";
}

function password() {
this.type = "password";
}

function addHandlers() {
var dp = document.evaluate("//input[@type='password']",document,null,6,null),
	DP, i = dp.snapshotLength;
while(DP=dp.snapshotItem(--i)) {
if(!show_only_on_click) {
DP.addEventListener("mouseover", text, false);
DP.addEventListener("mouseout", password, false);
}
DP.addEventListener("focus", text, false);
DP.addEventListener("blur", password, false);
}
}

window.addEventListener('click', addHandlers, false);
// copiright  by Dunlop