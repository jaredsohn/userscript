// ==UserScript==
// @name           iGoogle Footer Remover
// @namespace      http://userscripts.org/users/29102
// @description    Removes everything below your gadgets.
// @include        http*://www.google.com/ig
// ==/UserScript==

var e = document.getElementById("footer_promos");
e.style.display="none";