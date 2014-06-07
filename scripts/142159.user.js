// ==UserScript==
// @name        Fake Admin
// @namespace   RPG City
// @include     rpg-city.de/index.php?page=Index
// @version     1
// @grand		none
// ==/UserScript==


var a = document.getElementsByTagName("a");
var ul = document.getElementsByTagName("ul")[0];
var li = document.createElement("li");
var ul2 = document.getElementsByTagName("ul2")[0];
var li2 = document.createElement("li2");
li.innerHTML = "<img src=http://rpg-city.de/icon/moderatorS.png </img><u><a href='http://cp.rpg-city.de/index.php?funktion=_dealership&ticket='>Moderation</a></u>";
li2.innerHTML = "<img src=http://rpg-city.de/wcf/icon/acpS.png </img><u><a href='http://cp.rpg-city.de/index.php?funktion=_dealership&ticket='>Administration</a></u>";
ul.insertBefore(li, ul.getElementsByTagName("li")[ul.getElementsByTagName("li").length-0]);
ul.insertBefore(li2, ul.getElementsByTagName("li2")[ul.getElementsByTagName("li2").length-0]);