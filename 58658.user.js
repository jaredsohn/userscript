// ==UserScript==
// @name           Character Pane Refresh Button
// @namespace      kol
// @description    Adds a button to refresh KoL's character pane.
// @include        http://www*.kingdomofloathing.com/charpane.php*
// @include        http://127.0.0.1:*/charpane.php*
// @include        http://localhost:*/charpane.php*
// ==/UserScript==

var b = document.getElementsByTagName('body')[0];
var r = document.createElement('input');
r.setAttribute('type', 'button');
r.setAttribute('value', 'Refresh');
r.addEventListener('click', function() {window.location.reload();}, true);
b.insertBefore(r, b.firstChild);
