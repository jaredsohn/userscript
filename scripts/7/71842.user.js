// ==UserScript==
// @name           Random PlaatsPicker
// @namespace      Random PlaatsPicker
// @include        http://nl.wikipedia.org/wiki/Lijst_van_Nederlandse_plaatsen
// ==/UserScript==

document.addEventListener('keypress', function(event) {
if(event.keyCode == 13) {
var n = Math.floor((Math.random()*3379)+35)
var x = document.getElementById('Aa').parentNode.parentNode.getElementsByTagName('a')
if(x[n].innerHTML != 'bewerken') {alert(x[n].innerHTML)}
}
}, false);