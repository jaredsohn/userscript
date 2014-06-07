// ==UserScript==
// @name           OGame Redesign: Ticketlink im Header
// @description    Puts a link to the Ticket System in the header of a Ogame Redesign Universe
// @version	   1.00
// @include        http://*.ogame.*/game/index.php?page=*
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
	a.setAttribute ("href", "http://support.ogame.de/index.php?page=home&m=0");
	a.setAttribute ("target", "_blank");
	a.appendChild (document.createTextNode ("Ticket"));
	li.appendChild (a);
	li4.parentNode.insertBefore (li, li4);
}) ();