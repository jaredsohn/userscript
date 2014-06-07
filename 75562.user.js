// ==UserScript==
// @name           Pręgierz
// @description    Dodaje pręgierz pomiędzy support a szukaj
// @version	   1.00
// @author         By Vess - http://userscripts.org/scripts/show/61874
// @include        http://*.ogame.*/game/index.php?page=*
// @exclude        http://uni*
// ==/UserScript==

(function ()
{
	var div = document.getElementById ("bar");
	if ((div == null) || (div.length < 5))
		return;
	var li4 = div.getElementsByTagName ("li") [4];
	var li = document.createElement ("li");
	var a = document.createElement ("a");
	a.setAttribute ("href", "pranger.php");
	a.setAttribute ("target", "_blank");
	a.appendChild (document.createTextNode ("Pręgierz"));
	li.appendChild (a);
	li4.parentNode.insertBefore (li, li4);
}) ();
