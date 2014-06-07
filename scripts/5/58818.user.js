// ==UserScript==
// @name geld Promille script pennergame 4.0 
// @namespace http://pennerhack.foren-city.de by basti1012-pennerhack
// @description zeigt auf den profileen der gegener den promille wert der gegner an 
// @include *pennergame.de/profil*
// ==/UserScript==
var url = document.location.href;
var urlname2 = url.split('/profil/id:')[1];
var urlname3 = urlname2.split('/')[0];
var id = urlname3;
var signatur = 'http://inodes.pennergame.de/de_DE/signaturen/';
promillee = '<div align="center" style="overflow: hidden; width: 40px; height: 14px;"><img style="position: relative; top: -42px; left: -120px;" src='+signatur+''+id+'.jpg></div>';
GM_xmlhttpRequest({
 	method: 'GET',
   	url: 'http://www.pennergame.de/dev/api/user.'+id+'.xml',
	onload: function(responseDetails) {
        	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		var id = dom.getElementsByTagName('id')[0].textContent;
 		var geld = dom.getElementsByTagName('cash')[0].textContent/100;
	var table = document.getElementById('profil_index');
	var tbody = table.getElementsByTagName('tbody')[0];
	var tr = table.getElementsByTagName('tr');
	newtr = document.createElement('tr');
	newtr.style.backgroundColor = "#2E2E2E";
	newtr.style.verticalAlign = "middle";
	newtr.style.fontFamily = "Verdana,Helvetica,Arial,sans-serif"
	tbody.insertBefore(newtr, tbody.getElementsByTagName('tr')[8]);
	tr[8].innerHTML = '<td><strong>Promille </strong></td><td>'+ promillee +'</td>'
         +'<td><strong>Geld : '+geld+' &euro;</strong></td><td></td>'
}});
