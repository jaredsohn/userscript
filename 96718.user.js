// ==UserScript==
// @name          Refresh Charpane
// @namespace     http://userscripts.org/scripts/show/96718
// @description   Adds a link to refresh the character pane.
// @include       *kingdomofloathing.com/charpane.php*
// ==/UserScript==

var refreshLink = '<div style="margin: 1px;text-align: center;"><a href="charpane.php">[refresh]</a></div>';
document.body.innerHTML += refreshLink;