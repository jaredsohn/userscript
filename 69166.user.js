// ==UserScript==
// @name           REDESIGN: Schandpaal in Header
// @description    Plaatst een link in de header tussen "zoeken" en 
// @version	   1.00
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
	a.appendChild (document.createTextNode ("Schandpaal"));
	li.appendChild (a);
	li4.parentNode.insertBefore (li, li4);
}) ();