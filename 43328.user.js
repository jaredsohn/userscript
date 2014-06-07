// ==UserScript==
// @name            ED Fishing
// @namespace       http://userscripts.org/users/82241
// @description     Helps you fish faster
// @include         http://www.eternalduel.com/fish.php?action=fish&dest=*
// ==/UserScript==

//JS
var options = document.getElementsByTagName('input');
options[0].checked=true;
options[11].checked=true;