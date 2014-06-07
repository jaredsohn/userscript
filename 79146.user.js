// ==UserScript==
// @name           dm
// @namespace      test
// @include        http://heroesgame.cz/questy.php
// ==/UserScript==



mozu=document.getElementsByTagName('td')[2].innerHTML;
p=mozu.split("<strong>Energie:")[1];
p=p.substring(12,0);
p=p.substring(10);
if(p>24){
	location.replace('http://heroesgame.cz/deathmatch.php');}
