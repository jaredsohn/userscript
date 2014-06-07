// ==UserScript==
// @name           Spendenzeiger 
// @namespace      11235813[Bande:Kuestenpenner]
// @description    Zeigt aktuelle Spendenanzahl im Status.
// @include        http://*pennergame.de/*
// @exclude 	   http://newboard.pennergame.de/*
// ==/UserScript==
var id1 = document.body.innerHTML.split('http://img.pennergame.de/cache/avatare/')[1];
var id2 = id1.split('_')[0];

GM_xmlhttpRequest({
  	method: 'GET',
   	url: 'http://www.pennergame.de/overview/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('Du hast heute')[1];
			var text2 = text1.split(' Spenden')[0];
			var table = document.getElementsByTagName('table')[0];
			var td = table.getElementsByTagName('td')[0];
			if (text2<50) {
				td.style.color = "#399C18"
			} else {
				td.style.color = "#DF3918"
			}
			td.innerHTML = '<img class="avatar" alt="Avatar" title="1" src="http://img.pennergame.de/cache/avatare/'+id2+'_small.jpg" ><br /><div align="middle"><b>Spenden:<br />'+text2+' / 50</b></div>'
			
			
			

			
		}
					  });