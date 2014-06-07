// ==UserScript==
// @name           [W]Menelprofil V2.666 dla MenelGame 4.0 by Pruski
// @description    Pokazuje pieniądze, promile, i informacje o bandzie
// @include        *menelgame.pl/profil/id:*
// ==/UserScript==

var url = document.location.href;
var urlname2 = url.split('/profil/id:')[1];
var urlname3 = urlname2.split('/')[0];
var id = urlname3;


var tr = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[7];
var td = tr.getElementsByTagName('td');
td[0].style.fontWeight= "bold";
td[0].innerHTML='&nbsp;Punkty:<br />&nbsp;Kasa:<br />&nbsp;Promile:';

var siglink = 'http://inodes.pennergame.de/pl_PL/signaturen/';

var tr1 = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[7];
var td1 = tr1.getElementsByTagName('td');


td1[2].style.fontWeight= "bold";
td1[2].innerHTML='Punkty bandy:<br />Średnia punktów:<br />Miejsce bandy:<br />Członków bandy:';
td1[3].style.fontStyle= "italic";
td1[3].innerHTML= '&nbsp;&nbsp;&nbsp;&nbsp;Ładowanie...';

var highlightit0 = 5000;
var highlightit1 = 10000;
var highlightit2 = 20000;
var highlightit3 = 50000;
var highlightit4 = 75000;
var highlightit5 = 125000;

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.inodes.menelgame.pl/dev/api/user.' + id + '.xml',

    onload: function(responseDetails) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		var id = dom.getElementsByTagName('id')[0].textContent;
		var bandenid = dom.getElementsByTagName('id')[1].textContent;
		var points = dom.getElementsByTagName('points')[0].textContent;
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.inodes.menelgame.pl/dev/api/gang.'+bandenid+'.xml',
			onload: function(responseDetails) {
				var parser = new DOMParser();
				var dombande = parser.parseFromString(responseDetails.responseText, "application/xml");
				var points1 = dombande.getElementsByTagName('points')[0].textContent;
				var position = dombande.getElementsByTagName('position')[0].textContent;

				var member =dombande.getElementsByTagName('member_count')[0].textContent;
				var av2 = points1/member;
				var av = Math.round(av2);
				td1[3].innerHTML = '&nbsp;&nbsp;&nbsp;'+points1+'<br />&nbsp;&nbsp;&nbsp;'+av+'<br />&nbsp;&nbsp;&nbsp;'+position+'.'+'<br />&nbsp;&nbsp;&nbsp;'+member;
			}
						  })
		
		
		try {

			var cash = dom.getElementsByTagName('cash')[0].textContent/100;
			var cash1 = ''+cash+'&nbsp;z&#322;'
		} catch(err) {
			var cash1 = '-';
			
		}

		var pskript = '<div style="overflow: hidden; width: 40px; height: 12px;"><img style="position: relative; top: -44px; left: -120px;" src="' 	+ siglink + id + '.jpg"></div>';	
		
	
			if (cash >= highlightit0){
			  var cash1 = '<font color="#25ab22"><b>'+cash+'&nbsp;z&#322;</b></font>'
			}
			if (cash >= highlightit1){
				 var cash1 = '<font color="#84C618"><b>'+cash+'&nbsp;z&#322;</b></font>'
			}
			if (cash >= highlightit2){
				 var cash1 = '<font color="#dfde18"><b>'+cash+'&nbsp;z&#322;</b></font>'
			}
			if (cash >= highlightit3){
				 var cash1 = '<font color="#DE5A18"><b>'+cash+'&nbsp;z&#322;</b></font>'
			}
			if (cash >= highlightit4){
				 var cash1 = '<font color="#df3918"><b>'+cash+'&nbsp;z&#322;</b></font>'
			}
			if (cash >= highlightit5){
				 var cash1 = '<font color="#df1818"><b>'+cash+'&nbsp;z&#322;</b></font>'
			}

			td[1].innerHTML = points+'<br />'+cash1+'<br />'+pskript;
	
    }
});