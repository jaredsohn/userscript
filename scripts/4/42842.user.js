// ==UserScript==
// @name eBay Remover
// @namespace 11235813[Bande:Kuestenpenner]
// @description Ersetzt eBayLink
// @include http://*pennergame.de*
// @exclude http://newboard.pennergame.de/
// ==/UserScript==
var div = document.getElementById('navigation');
var li = div.getElementsByTagName('li')[7];
li.innerHTML = '<a style="width: 50px;" href = "http://www.pennergame.de/stock/plunder/">Plunder</a>';

var ul = document.getElementsByTagName('ul')[1];
var li2 = ul.getElementsByTagName('li')[11];
li2.innerHTML = '<a href="http://www.pennergame.de/stock/plunder/" alt="Plunder" title="3.1">Plunder</a';