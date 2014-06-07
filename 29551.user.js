// ==UserScript==
// @name           iGoogle Tweak
// @namespace      http://userscripts.org/users/58245
// @description    Thins up the header and completely removes the footer on your iGoogle Homepage.
// @include        http*://www.google.com/ig*
// ==/UserScript==

var header = document.getElementById("gsea");
header.style.paddingTop="0px";
header.style.paddingBottom="0px";

var header2 = document.getElementById("new_user_demo");
header2.style.paddingBottom="0px";

var footer = document.getElementById("footerwrap");
footer.style.display="none";