// ==UserScript==
// @name           Personagraph
// @description    Select No
// @include        https://*amazonaws.com/*
// ==/UserScript==

var i, radios = document.evaluate("//input[@type='radio' and @value='No']", document, null, 6, null);
for(i=0; i<radios.snapshotLength; i++) {
radios.snapshotItem(i).checked = true;
}
