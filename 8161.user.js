// ==UserScript==
// @name           Userscripts Search Button
// @namespace      http://codr.us/category/Greasemonkey/Userscripts-Search-Button
// @description    Adds a search button to the search bar on userscripts.org
// @include        http://userscripts.org*
// ==/UserScript==

var btn = document.createElement('input');
btn = btn.cloneNode(true);
btn.setAttribute('type', 'submit');
btn.setAttribute('value', 'Search');
document.getElementById('q').parentNode.appendChild(btn);