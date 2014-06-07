// ==UserScript==
// @name           Couchsurfing: Auto-fit groupe message
// @namespace      http://multani.info/projects/greasemonkey
// @description    Auto-fit in the current width messages from Couchsrufing groups
// @include        http://www.couchsurfing.org/group_read.html*
// ==/UserScript==


var table = document.getElementById('bodycontent-centered').children[0];
table.removeAttribute('width');
