// ==UserScript==
// @name           Select NO on radio buttons by userscript command
// @namespace      http://userscripts.org/users/23652
// @description    Selects the 'no' option on survey pages by userscript command
// @include        http://*
// @include        https://*
// @copyright      JoeSimmons
// ==/UserScript==

var autostart = (GM_getValue('no_radio_autostart', 'no')=='yes') ? true : false;

function setToNo() {
var i, radios = document.evaluate("//input[@type='radio' and @value='no']", document, null, 6, null);
for(i=0; i<radios.snapshotLength; i++) {
radios.snapshotItem(i).checked = true;
}
}

function options() {
	if(confirm('Autostart script on page load?')) GM_setValue('no_radio_autostart', 'yes');
	else GM_setValue('no_radio_autostart', 'no');
}

if(autostart) setToNo();

GM_registerMenuCommand("Select 'NO' on radio buttons Options", options);
GM_registerMenuCommand("Set radio fields to no", setToNo);