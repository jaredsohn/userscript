// ==UserScript==
// @name           Side-by-side Leaderboard
// @namespace      KoLCtH
// @include        http://*kingdomofloathing.com/museum.php*
// @include        http://127.0.0.1:*/museum.php*
// ==/UserScript==

var table = document.querySelector('[width="400"]')
if (table)
{
	table.style.display = 'inline'
	table.nextSibling.style.display = 'inline'
	table.parentNode.insertBefore(document.createTextNode(' '), table.nextSibling)
}