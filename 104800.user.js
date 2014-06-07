// ==UserScript==
// @name           Swap mingle comments and card props
// @namespace      http://userscripts.org/users/135958
// @description    Swaps comments in mingle from the sidebar with the Card properties UI
// @include        *mingle*
// ==/UserScript==

var cah = document.getElementById('comments-and-history');
var sidepar = cah.parentNode;
sidepar.removeChild(cah);
var cbc = document.getElementById('card-bottom-cover');
cbc.parentNode.insertBefore(cah, cbc);
cbc.parentNode.removeChild(cbc);
sidepar.appendChild(cbc);