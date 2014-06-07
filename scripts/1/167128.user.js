// ==UserScript==
// @name           Neopets - Set SW&SSW to "Identical"
// @description    Sets the search option for SW & SSW to "Identical"
// @include        http://www.neopets.com/*
// @match	       http://www.neopets.com/*
// ==/UserScript==

e = document.createElement("script");
e.textContent = "$('select[name$=criteria]').val('exact');";
document.head.appendChild(e);