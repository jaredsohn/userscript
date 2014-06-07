// ==UserScript==
// @name        KD
// @namespace   Happy
// @include     *cp.rpg-city.de/index.php
// @include     *cp.rpg-city.de/
// @version     1
// ==/UserScript==
var content = document.getElementsByClassName("infobox")[0].innerHTML;
content = content.replace(/<[^>]+>/g, "");
content.search(/Morde: (\d+)/);
var kills = parseInt(RegExp.$1);
content.search(/Gestorben: (\d+)/);
var deaths = parseInt(RegExp.$1);
document.getElementsByClassName("infobox")[0].innerHTML += "<b>KD-Rate</b>: "+(Math.round(kills*100/deaths)/100)+" &Oslash;";