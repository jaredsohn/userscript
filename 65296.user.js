// ==UserScript==
// @name          расширение поля армии
// @homepage      http://userscripts.org/
// @description   HWM расширение поля армии
// @include       http://www.heroeswm.ru/army.php*
// @include       http://heroeswm.ru/army.php*
// ==/UserScript==

var map = document.getElementById('recruitarmy');
//alert("recruitarmy = "+recruitarmy);

var map_embed = map.childNodes[9];

map_embed.setAttribute('width', 700);
