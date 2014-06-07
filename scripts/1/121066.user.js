// ==UserScript==
// @name           De-Clutter Facebook
// @namespace      fb
// @description    takes away some parts of Facebook
// @include        http*://www.facebook.com/
// ==/UserScript==

test= document.getElementById("contentCol").innerHTML;
document.getElementById("globalContainer").innerHTML = test;
document.getElementById("rightCol").style.display="none";

return;