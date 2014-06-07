// ==UserScript==
// @name           Pennerprofil V 2.3.4 gefixt fuer pennergame 4.0 by basti1012
// @namespace      11235813[Kuestenpenner]
// @description    Zeigt Geld und Promille im Profil an, Erkennt falsche/vorgetaeuschte IDs, ist absolut taeuschungssicher, zeigt mehr Infos
// @include        http://www.pennergame.de/profil/*
// ==/UserScript==

var url = document.location.href;
var urlname2 = url.split('/profil/id:')[1];
var urlname3 = urlname2.split('/')[0];
var id = urlname3;


var tr = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[3];
var td = tr.getElementsByTagName('td');
td[2].style.fontWeight= "bold";
td[2].innerHTML='Geld:<br />Promille:';

var siglink = 'http://inodes.pennergame.de/de_DE/signaturen/';

var tr1 = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[4];
var td1 = tr1.getElementsByTagName('td');


td1[2].style.fontWeight= "bold";
td1[2].innerHTML='Bandenpunkte:<br />Punkteschnitt:<br />Bandenplatz:<br />Mitglieder:';
td1[3].style.fontStyle= "italic";
td1[3].innerHTML= 'Lade Infos...';

var highlightit0 = 5000;
var highlightit1 = 10000;
var highlightit2 = 20000;
var highlightit3 = 50000;
var highlightit4 = 75000;
var highlightit5 = 125000;

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.pennergame.de/dev/api/user.' + id + '.xml',

    onload: function(responseDetails) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		var id = dom.getElementsByTagName('id')[0].textContent;
		var bandenid = dom.getElementsByTagName('id')[1].textContent;
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.pennergame.de/dev/api/gang.'+bandenid+'.xml',
			onload: function(responseDetails) {
				var parser = new DOMParser();
				var dombande = parser.parseFromString(responseDetails.responseText, "application/xml");
				var points = dombande.getElementsByTagName('points')[0].textContent;
				var position = dombande.getElementsByTagName('position')[0].textContent;

				var member =dombande.getElementsByTagName('member_count')[0].textContent;
				var av2 = points/member;
				var av = Math.round(av2);
				td1[3].innerHTML = points+'<br />'+av+'<br />'+position+'.'+'<br />'+member;
			}
						  });
		
		
		try {
			var cash = dom.getElementsByTagName('cash')[0].textContent/100;
		} catch(err) {
			var cash = '-';
			
		}
		var pskript = '<br /> <div style="overflow: hidden; width: 40px; height: 15px;"><img style="position: relative; top: -40px; left: -120px;" src="' 	+ siglink + id + '.jpg"></div>';	
		
	
			if (cash >= highlightit0){
			  td[3].style.color = "#25ab22";
				td[3].style.fontWeight = "bold";
			}
			if (cash >= highlightit1){
  	    td[3].style.color = "#84C618";
				td[3].style.fontWeight = "bold";
			}
			if (cash >= highlightit2){
  	    td[3].style.color = "#dfde18";
				td[3].style.fontWeight = "bold";
			}
			if (cash >= highlightit3){
  	    td[3].style.color = "#DE5A18";
				td[3].style.fontWeight = "bold";
			}
			if (cash >= highlightit4){
  	    td[3].style.color = "#df3918";
				td[3].style.fontWeight = "bold";
			}
			if (cash >= highlightit5){
  	    td[3].style.color = "#df1818";
				td[3].style.fontWeight = "bold";
			}
			td[3].innerHTML = ''+cash+'&euro; '+pskript+'';
	
    }
});



//Fixed
	
