// ==UserScript==
// @name        Ztracker borító megjelenítő
// @namespace   http://ztracker.org/browse*
// @description megjelenik a borítókép
// @include     http://ztracker.org/browse*
// @version     1
// ==/UserScript==


var elemek, elem;

//tömbbe beteszem az összes linket
elemek = document.getElementsByTagName('a');
var text=""; //text egy string típusú változó

//ciklus a "linktömb" végéig
for (var i = 0; i < elemek.length; i++)
{

	//elem tárolja az aktuális (i-edik) linket
	elem = elemek[i];
	text=String(elem.onmouseover);  //text értékül kapja a onmouseover-jét, Stringgé konvertálva
	
	if(elem.onmouseover) //azokat mutatja ahol nem null az érték
	{
		
	//alert(text.indexOf("img src"));
	//alert(text.lastIndexOf("border="));
	
	//a kép URL-je
	text=String(text.substring(text.indexOf("img src")+9,text.lastIndexOf("border=")-2));
	
	//simán hozzáadva a kép, 300pixel magas, természetesen átírható
	elemek[i].innerHTML=elemek[i].innerHTML+"<br><img src="+text+" border=0 height=300>";
	
	}

}