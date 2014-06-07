// ==UserScript==
// @name        ZeigeOben
// @namespace   Happy
// @include     *rpg-city.de/index.php?page=Index
// @include     *rpg-city.de/index.php
// @include     *rpg-city.de/
// @include     *rpg-city.de
// @version     1
// ==/UserScript==

for(var i=0;i<document.getElementsByTagName("a").length;i++)
{
  if(document.getElementsByTagName("a")[i].href.search(/BoardMarkAllAsRead/) != -1)
  {
    var url = document.getElementsByTagName("a")[i].href;
    var li = document.createElement("li");
	li.innerHTML = "<a href=\""+url+"\"><img src=\"icon/boardMarkAsReadS.png\"> <span>Alle Foren als gelesen markieren</span></a>";
    document.getElementById("userMenu").getElementsByTagName("ul")[0].appendChild(li);
	var a = document.createElement("a");
	a.innerHTML = "<a href=\""+url+"\" style=\"float:right\"><img src=\"icon/boardMarkAsReadS.png\">&nbsp;<span style=\"text-decoration:underline;\">Alle Foren als gelesen markieren</span></a>";
	document.getElementsByClassName("mainHeadline")[0].insertBefore(a, document.getElementsByClassName("mainHeadline")[0].firstChild);
	break;
  }
}