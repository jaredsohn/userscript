// ==UserScript==
// @name           Plunder anzeige ueberall pennergame 4.0 hh & b by basti1012 edit by kingfr3sh (version 3 )
// @author         basti1012 @ Pennerhack ( visit: http://pennerhack.foren-city.de/ )
// @namespace      basti1012 @ Pennerhack ( visit: http://pennerhack.foren-city.de/ )
// @description    es wird oben in der leiste ein plunderbild angezeigt immer das was gerade angelegt wurde und mit maus drauf wird der plunder name angezeigt 
// @include        http://*pennergame.de*
// @exclude        http://*board*
// @exclude        http://*redirect*
// @license	   Creative Commons by-nc-sa
// ==/UserScript==

//Linkadressen definieren
var url = document.location.href;
//Linkadressen fuer Hamburg
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
var sig = 'http://inodes.pennergame.de/de_DE/signaturen/';
}
//Linkadressen fuer Berlin
if (url.indexOf("berlin")>=0) {
var link = "http://berlin.pennergame.de"
var sig = 'http://inodes.pennergame.de/bl_DE/signaturen/';
}
//Linkadressen fuer Muenchen
if (url.indexOf("http://muenchen.pennergame")>=0) {
var link = "http://muenchen.pennergame.de"
var sig = 'http://inodes.pennergame.de/mu_DE/signaturen/';
}


GM_xmlhttpRequest({
  	method: 'GET',
   	url: link+'/stock/plunder/',
        onload: function(responseDetails) {
        	var acontent = responseDetails.responseText;
			var table = acontent.split('<h3>Angelegt</h3>')[1];			
			var table2 = table.split('class="submenu">')[0];								
			var table3 = table2.split('src="')[1];					
			var table4 = table3.split('"')[0];
			var was1 = table2.split('>')[2];					
			var was2 = was1.split('<')[0];

var table = document.getElementById('topmenu');
var li = document.createElement('li');
var glink ='<a href='+link+'/stock/plunder/><img src="'+table4+'"  title="'+was2+'"  width="37" height="37"</a>';table.getElementsByTagName('ul')[0].appendChild(li);
li.innerHTML = '<div align="middle">'+glink+'</div>';		
}});
