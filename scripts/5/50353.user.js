// ==UserScript==
// @name           Highscore-Geld-Tool
// @namespace      Pennertools.com
// @include        http://*pennergame.de/highscore/*
// ==/UserScript==

var td, newdiv, sig;
var zeilen_ges = (document.getElementsByTagName("table")[0].childNodes[1].childNodes.length);
var sig_link = "http://img.pennergame.de/cache/de_DE/signaturen/";

var ganz = document.getElementsByTagName("table")[0].innerHTML.split('<tr class="zeileB">');


for( var x = 1; x<=zeilen_ges; x++){
	td = document.getElementsByTagName("table")[0].childNodes[1].childNodes[x].childNodes[3];
	
	if (td){
	uid_1 = ganz[x-1].split('/"');
	uid_2 = uid_1[0].split('profil/id:');
	uid=uid_2[1];
	set_td (sig, ('<div style="overflow: hidden; width: 70px; height: 35px;"><img style="position: relative; top: -22px; left: -120px;" src='+ sig_link + uid +'.jpg></div>'));
	}
}	


function set_td (name, html){
	name = document.createElement('td');
	name.innerHTML =  html;
	td.parentNode.insertBefore(name, td.nextSibling);
}