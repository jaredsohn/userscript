// ==UserScript==
// @name           Spendenzeiger 
// @namespace      11235813[Bande:Kuestenpenner]
// @description    Zeigt aktuelle Spendenanzahl im Status.
// @include        http://*pennergame.de/*
// @exclude 	   http://newboard.pennergame.de/*
// @exclude 	   *berlin.pennergame*
// ==/UserScript==
var id1 = document.body.innerHTML.split('http://inodes.pennergame.de/de_DE/avatare/')[1];
var id2 = id1.split('_')[0];

GM_xmlhttpRequest({
  	method: 'GET',
   	url: 'http://www.pennergame.de/overview/',
    onload: function(responseDetails) {
		var content = responseDetails.responseText;
		var text1 = content.split('Du hast heute')[1];
		var text2 = text1.split(' Spenden')[0];
		var table = document.getElementById('topmenu');
		var li = document.createElement('li');
		if (text2<50) {
			li.style.color = "#009900"
		} else {
			li.style.color = "#c10000"
		}
		table.getElementsByTagName('ul')[0].appendChild(li);
		li.innerHTML = '<div align="middle"><b>Spenden:<br />'+text2+' / 50</b></div>';		
	}
});