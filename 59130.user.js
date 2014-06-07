// ==UserScript==
// @name Dorfnummern aus igms auslesen
// @namespace none
// @include http://de*.die-staemme.de/game.php?village=*&screen=mail&mode=view&view=*
// @include http://nl*.tribalwars.nl/game.php?village=*&screen=mail&mode=view&view=*
// @author joh
// ==/UserScript==

var str = '';
var lastLink;
for (var linkNum = 30; linkNum < document.links.length; linkNum++) {
var findTxt = /&screen=info_village&id=/;
var link = document.links[linkNum];
if (link.href.search(findTxt) != -1) {
if (str != '')
str = str + ',';
str = str + link.href.substr(link.href.search(findTxt) + 24);
lastLink = link;
}
}
if (str != '')
prompt("Dorfnummern für Massenangriffsplaner", str);