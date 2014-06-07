// ==UserScript==
// @name           Odpowiedz w wynikach - NOWA
// @namespace      Nowa wersja (19.01.2011)
// @description    Poprawione odnosniki obok tematow. Dzialow sie nie na zrobic - dziekujcie q, za ten bajzel :)
// @include        *darkwarez.pl/forum/search*
// @licence        Beerware
// @version        19/01/2011
// ==/UserScript==

var links = document.getElementsByTagName("a");
var len = links.length;

for (i = 0; i < len; i++) 
{
	if(links[i].className == "topictitle") 
	{
		var ima = document.createElement("img");
		var link = links[i].getAttribute("href").replace('seriale-tv-rip', 'cokolwiek');
		var after_anime = link.replace('anime-bajki', 'cokolwiek');
		var usun = after_anime.match(/(?!\/)([0-9]*)(?=-)/);
		ima.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAOCAIAAACkU3uaAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAHlJREFUOE9jFBISYqAQAI2gEDAQ1P9nEwsuBNGLxQiF2i3I5sL1o3kXKI7TCMXG3UAENwWrE4DGoRsB0QZHQIfATQEqhWhARtiNAGpDQxBTSDCCUlcghx9mWGB6BOIpEmIEMy4IGIGWUshJFwQTG5oCwqmToIlUMAIAXMe2ELqWXgAAAAAASUVORK5CYII%3D";
		ima.setAttribute('onClick', "window.location.href='posting.php?mode=reply&t="+usun[1]+"'");
		ima.style.cursor = "pointer";
		
		var parent = links[i].parentNode;
		parent.insertBefore(ima, links[i].nextSibling);
		links[i].innerHTML += ' ';
	}
}