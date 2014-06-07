// ==UserScript==
// @name           Selects PHS
// @description    Selects PHS
// @include        http://*
// @include        https://*
// @copyright      ECL
// ==/UserScript==

var autostart = (GM_getValue('no_radio_autostart', 'no')=='yes') ? true : false;

function setToPHS() {
var i, radios = document.evaluate("//input[@type='radio' and @value='48']", document, null, 6, null);
for(i=0; i<radios.snapshotLength; i++) {
radios.snapshotItem(i).checked = true;
}
}

function options() {
	if(confirm('Autostart script on page load?')) GM_setValue('no_radio_autostart', 'yes');
	else GM_setValue('no_radio_autostart', 'no');
}

if(autostart) setToPHS();

GM_registerMenuCommand("Selects PHS", options);
GM_registerMenuCommand("Set radio button to PHS", setToPHS);