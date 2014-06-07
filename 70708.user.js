// ==UserScript==
// @name           OGame Redesign: Link za ticket u gornjem meniju
// @description    Stavi link za ticket sistem u gornji meni
// @version	   1.00
// @include        http://*.ogame.rs/game/index.php?page=*
// @exclude        http://uni*
// ==/UserScript==

(function ()
{
	var div = document.getElementById ("bar");
	if ((div == null) || (div.length < 3))
		return;
	var li4 = div.getElementsByTagName ("li") [4];
	var li = document.createElement ("li");
	var a = document.createElement ("a");
	a.setAttribute ("href", "http://support.ogame.rs/");
	a.setAttribute ("target", "_blank");
	a.appendChild (document.createTextNode ("Тикет"));
	li.appendChild (a);
	li4.parentNode.insertBefore (li, li4);
}) ();