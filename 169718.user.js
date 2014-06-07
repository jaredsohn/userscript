// ==UserScript==
// @name        1st torrent boritó nézet
// @namespace   http://the1st.be/browse.php*
// @description 1st torrent boritó nézet
// @include     http://the1st.be/browse.php*
// @version     1
// ==/UserScript==


var elemek = document.getElementsByClassName("ajax_info");
var text=""; //text egy string típusú változó



for (var i=0, max=elemek.length; i < max; i++) {

	
	//megtalálható benne az "image" szó
   	if (String(elemek[i].title).search("image")!=-1)
	{
    
	//kiolvasás
	text=String(elemek[i].title);

	//a kép URL-je kiszedve
	text=String(text.substring(text.indexOf("http")));

	//URL dekódolás
	text=String(decodeURIComponent(String(text)));
	
	//simán hozzáadva a kép
	elemek[i].innerHTML=elemek[i].innerHTML+"<br><img src="+text+" border=0 >";

	};
}