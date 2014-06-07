// ==UserScript==
// @name           Hide Annoying Wiki Message
// @namespace      sarvagya.vaish.greasemonkey
// @description    Get rid of the annoying message that is currently present on  Wikipedia page!
// @include        *wikipedia.org*
// ==/UserScript==

console.log('Script working');
document.getElementById("siteNotice").style.display = "none";