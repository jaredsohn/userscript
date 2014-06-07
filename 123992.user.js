// ==UserScript==
// @name        ncore borító nézet
// @namespace   http://ncore.cc/torrents.php*
// @description borítókat mutatja ncore torrent oldalon
// @include     http://ncore.cc/torrents.php*
// @version     2.0
// ==/UserScript==


var elemek, elem;

//tömbbe beteszem az összes képet
elemek = document.getElementsByTagName('img');
var text=""; //text egy string típusú változó

//ciklus a "linktömb" végéig
for (var i = 0; i < elemek.length; i++)
{
	//elem tárolja az aktuális (i-edik) linket
	elem = elemek[i];
	text=String(elem.onmouseover);  //text értékül kapja a onmouseover-jét, Stringgé konvertálva
	
	if(elem.onmouseover) //azokat mutatja ahol nem null az érték
	{
	//jelenleg még fixen megadva
	text=text.substring(41,133);
	
	//class null-ra állítása
	elemek[i].setAttribute("class", null);
	elemek[i].src=text;
	
	}
	
}

//box_nagy és  box_nagy2 divek törlése
elemek = document.getElementsByTagName('div');
for (var i = 0; i < elemek.length; i++)
{
	
	//class meghatározása
	if ((String(elemek[i].getAttribute("class"))==String("box_nagy2")) ||
		(String(elemek[i].getAttribute("class"))==String("box_nagy")))
	{
		//null-ra állítás
		elemek[i].setAttribute("class", null);
	}
}


