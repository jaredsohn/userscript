// ==UserScript==
// @name           ogladanie_playtube
// @namespace      playtube
// @description    omija czekanie w kolejce na playtube. Skraca czas czekania do minimum :D
// @include        http://playtube.pl/player/promo.php
// ==/UserScript==

var lang = [
	'Omijanie limitow',
	'Wyzerowanie licznika',
	'Kliknij, by zaladowac film',
	'*(gdy pojawila sie informacja, ze serwer jest zajety)',
	'Liczba prob:'
];

var pojemnik = document.body.getElementsByTagName('center')[4];
var przycisk = document.createElement('div');

przycisk.innerHTML = '\
<fieldset id="omijanie_field"><legend>'+lang[0]+'</legend><table><tr><td>\
<input type="button" value="'+lang[1]+'" onclick="countdown = 1;"></input><br>\
<input type="button" value="'+lang[2]+'" onclick="\
	podmien();var proby = document.getElementById(\'proby_id\'); proby.value = parseInt(proby.value) + 1;\
" style="cursor:pointer; font-size:20px;"> </input>\
<br>'+lang[3]+'</td><td>'+lang[4]+' \
<input type="text" disabled="disabled" id="proby_id" name="proby" value="0" size="4"></td></tr></table></fieldset>';

pojemnik.appendChild(przycisk);