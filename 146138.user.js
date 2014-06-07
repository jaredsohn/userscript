// ==UserScript==
// @name        Diablotorrent borító nézet
// @namespace   http://diablotorrent.net/browse.php*
// @include     http://diablotorrent.net/browse.php*
// @version     1
// ==/UserScript==


var elemek = document.getElementsByTagName("a");
var text=""; //text egy string típusú változó

for (var i=0, max=elemek.length; i < max; i++) {
    
	if (String(elemek[i].innerHTML)=="[Borító]")
	{

	//onmouseover kiolvasása
	text=String(elemek[i].onmouseover);
	
	//a kép URL-je kiszedve
	text=String(text.substring(text.indexOf("http"),text.lastIndexOf(")")-1));
	
	//simán hozzáadva a kép, 300pixel magas, természetesen átírható
	elemek[i].innerHTML=elemek[i].innerHTML+"<br><img src="+text+" border=0 height=300>";

	};
}