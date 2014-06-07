// ==UserScript==
// @name          ICA-banken auto-discard welcome messages
// @namespace     http://henrik.nyh.se
// @description   On ICA-banken, automatically checks "Don't show again" discards welcome messages (i.e. ads for services and reminders of important dates).
// @include       https://icabanken.ica.se/Misc/Welcome.aspx
// ==/UserScript==

var form = document.forms[0];
form.elements.namedItem("HideWelcomeinfo").checked = true;
document.getElementsByTagName("input").namedItem("Ok").click();
