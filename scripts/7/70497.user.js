// ==UserScript==
// @name           Move mingle comments
// @namespace      http://userscripts.org/users/135958
// @description    Moves comments in mingle from the sidebar to a more prominant place
// @include        *mingle*
// ==/UserScript==

var cah = document.getElementById('comments-and-history');
cah.parentNode.removeChild(cah);
var cc = document.getElementById('card-contents');
cc.appendChild(cah);