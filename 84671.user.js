// ==UserScript==
// @name           Pennergame Nachrichtenvorschau Mouseover
// @author         basti1012 gefixt by bengy
// @namespace      Pennerhack ( visit: http://pennerhack.de.tc/ )
// @description    Zeigt rechts die Nachricht an ueber die man gerade mit der Maus faehrt
// @include	*pennergame.de/*
// @include	*clodogame.fr/*
// @include	*mendigogame.es/*
// @include	*menelgame.pl/*
// @include	*dossergame.co.uk/*
// @include	*serserionline.com/*
// @include	*bumrise.com/*
// @include	*faveladogame.com.br/*
// ==/UserScript==


var link = 'http://'+document.URL.split('/')[2];
var table = document.getElementById('messageslist');
table.width = '400px'


var tr = table.getElementsByTagName('tr');


var head = document.createElement('td');

head.innerHTML = '<strong>Anzeigen</strong>'
head.style.backgroundColor='#272727';

head.style.verticalAlign = 'middle';
tr[0].insertBefore(head,tr[0].
getElementsByTagName('td')[3]);
for (a=1;a<tr.length-1;a++) {
	
   
var trrow = tr[a];
   trrow.addEventListener('mouseover',gettext,true);
   
var td = trrow.getElementsByTagName('td')[1].innerHTML;
   
var msg1 = td.split('/messages/read/')[1].split('/')[0];
   
   
var over = document.createElement('td');

   
   over.style.verticalAlign='middle';

   over.style.borderBottom='1px solid #272727'
   over.addEventListener('mouseover',gettext,true);

   over.innerHTML = '<img src="http://media.pennergame.de/img/read.gif?='+msg1

   
   trrow.insertBefore(over,trrow.getElementsByTagName('td')[3]);

   
   

     
	

	
}
var divtext = document.createElement('div');

divtext.innerHTML ='<div id="Nachrichtenfeld" style="position:absolute; width:540px; height:550px; z-index:1; right:10px;top: 450px; overflow: hidden; visibility: visible;border: 1px solid #272727;">--&Uuml;ber Nachricht fahren,um Inhalt anzuzeigen--</div>'

divtext.style.color='#FFFFFF';
document.getElementsByTagName('html')[0].appendChild(divtext);
document.getElementById('Nachrichtenfeld').style.backgroundColor = '#313131';
document.getElementById('Nachrichtenfeld').style.fontFamily ='Verdana';
document.getElementById('Nachrichtenfeld').style.fontSize = '11px';

function gettext()
 {
	var id = this.innerHTML.split('?=')[1].split('"')[0];

	GM_xmlhttpRequest({
    method:
 'GET',
   	url: link+'/messages/read/'+id+'/',  
 
        onload: function(responseDetails) {
        	
        	var content = responseDetails.responseText;

			var p = content.split('<div class="listshop">')[1].split('</table>')[0];
			var p1 = content.split('<table width="540" cellpadding="0" cellspacing="1" style="margin-top:20px;">')[1].split('</table>')[0];

			document.getElementById('Nachrichtenfeld').innerHTML=p+'<br>'+p1;

			
		}
					  });
}
	




