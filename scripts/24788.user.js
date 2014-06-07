// ==UserScript==
// @name           bilddagboken - spara bilder
// @description    Gör så att du kan spara bilder på bilddagboken genom att högerklicka på dem.
// @include        http://*.bilddagboken.se/*
// ==/UserScript==

document.addEventListener('DOMAttrModified', documentChanged, false);

function documentChanged(event) {
var spacer = document.getElementById('showContentImageBlocker');
if (spacer) {
 spacer.parentNode.removeChild(spacer);
}
}