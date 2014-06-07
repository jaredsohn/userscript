// ==UserScript==
// @name           Waehle TOP bei allen COSMiQ Antworten aus
// @namespace      http://userscripts.org/users/23652
// @description    Waehle 'top' bei der Antwortenbewertung bei COSMiQ aus
// @include        http://www.cosmiq.de*
// @include        https://www.cosmiq.de*
// @copyright      webanhalter, based upon a scipt by JoeSimmons  
// ==/UserScript==

function setToNo() {
var i, radios = document.evaluate("//input[@type='radio' and @value='3']", document, null, 6, null);
for(i=0; i<radios.snapshotLength; i++) {
radios.snapshotItem(i).checked = true;
}
}

GM_registerMenuCommand("Alle Antworten als TOP markieren", setToNo);
