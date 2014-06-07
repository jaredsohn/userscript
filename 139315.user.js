// ==UserScript==
// @name           Grepolis Forum Link RU
// @author         Jestex
// @version        1.0
// @namespace      http://aphrodite.clan.su/
// @include        http://*.grepolis.*
// @description    Добавляет в меню игры ссылку на сайт альянса "Рыцари Афродиты" (сервер Эта)
// ==/UserScript==

document.getElementById("links").getElementsByTagName("a").innerHTML= "Сайт альянса";

var grepolink = document.createElement("a");
var grepolinkText = document.createTextNode("Сайт =РА=");
var a    = document.createElement('a');
grepolink.href = "http://aphrodite.clan.su/";
grepolink.target = "_blank"
grepolink.appendChild(grepolinkText);
document.getElementById("links").appendChild(grepolink);
grepolink.href = "http://aphrodite.clan.su/";

