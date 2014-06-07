// ==UserScript==
// @name Highscore liste fuer pennergame 4.0 
// @namespace geandert fuer polen von basti1012
// @description zeigt ion der highscore liste geld und promille an fuer pennergame beta 4.0 by basti1012
// @include http://www.pennergame.de/highscore/user/*

// ==/UserScript==

var table = document.getElementsByTagName('table')[0];
var tr = table.getElementsByTagName('tr')[0];
var th = document.createElement('th');
var th1 = document.createElement('th');
th.innerHTML = 'Geld';
th1.innerHTML = 'Promille';

tr.insertBefore(th,tr.getElementsByTagName('th')[5]);
tr.insertBefore(th1,tr.getElementsByTagName('th')[6]);
var trs = table.getElementsByTagName('tr').length;

for(i=1;i<trs;i++) {
	var tr = table.getElementsByTagName('tr')[i];
	var id = tr.innerHTML.split('/profil/id:')[1].split('/')[0];
	info(id,i);
}
					  
function info(id,i) {					  
	
var signatur = 'http://inodes.pennergame.de/de_DE/signaturen/';
promillee = '<div align="center" style="overflow: hidden; width: 40px; height: 14px;"><img style="position: relative; top: -42px; left: -120px;" src='+signatur+''+id+'.jpg></div>';
				  
GM_xmlhttpRequest({
    method: 'GET',
   	url: 'http://www.pennergame.de/dev/api/user.' + id + '.xml',

        onload: function(responseDetails) {
        	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			var td = document.createElement('td');
			var td1 = document.createElement('td');
			var table = document.getElementsByTagName('table')[0];
			var tr = table.getElementsByTagName('tr');
			try {
				var cash = dom.getElementsByTagName('cash')[0].textContent/100;

													   
				
				td.innerHTML = cash;
				
				td1.innerHTML = promillee;
				
			} catch(err) {
				td.innerHTML = '-';
				td1.innerHTML = '-';
				
			}
			tr[i].insertBefore(td,tr[i].getElementsByTagName('td')[5]);
			tr[i].insertBefore(td1,tr[i].getElementsByTagName('td')[6]);
		}
		});
}
