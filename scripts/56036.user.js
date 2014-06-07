// ==UserScript==
// @name           donationinfo_PL (spolszczenie Chani - http://menelgame.org)
// @namespace      http://ego-shooters.foren-city.de/
// @description    Pokazuje aktualną liczbę datków pod avatarem.
// @include        http://*menelgame.pl/*
// @exclude 	   http://board.menelgame.pl/*
// ==/UserScript==
var id1 = document.body.innerHTML.split('http://img.menelgame.pl/cache/pl_PL/avatare/')[1];
var id2 = id1.split('_')[0];

GM_xmlhttpRequest({
  	method: 'GET',
   	url: 'http://www.menelgame.pl/overview/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('otrzymałeś ')[1];
			var text2 = text1.split(' datków')[0];
			var table = document.getElementsByTagName('form')[0];
			var li = table.getElementsByTagName('li')[0];
			if (text2<50) {
				li.style.color = "#009900"
			} else {
				li.style.color = "#c10000"
			}
			li.innerHTML = '<img class="avatar" alt="Avatar" title="1" src="http://img.menelgame.pl/cache/pl_PL/avatare/'+id2+'_small.jpg" ><br /><br /><br /><br /><br /><div align="middle"><b>Datki:<br />'+text2+' / 50</b></div>'
			
			
			

			
		}
					  });