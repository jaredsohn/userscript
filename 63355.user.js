// ==UserScript==
// @name           Pennergame Spendenzeiger fuer 4.0 hamburg und berlin 
// @namespace      basti1012 fuer die gefixte hh und berlin version
// @description    Zeigt aktuelle Spendenanzahl im Status.
// @include        http://*pennergame.de/*
// @exclude 	   http://newboard.pennergame.de/*
// @exclude 	   http://board.pennergame.de/
// ==/UserScript==



if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
var pgnormal = 'http://berlin.pennergame.de/'
var menge ='10';
}


if(document.location.href.indexOf('www.pennergame.de/')>=0) {
var pgnormal = 'http://www.pennergame.de/';
var menge ='50';
}



GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+pgnormal+'overview/',
    onload: function(responseDetails) {
		var content = responseDetails.responseText;
		var text1 = content.split('Du hast heute')[1];
		var text2 = text1.split(' Spenden')[0];
		var table = document.getElementById('topmenu');
		var li = document.createElement('li');
		if (text2<10) {
			li.style.color = "#FF0000"
		} else {
			li.style.color = "#008000"
		}
		table.getElementsByTagName('ul')[0].appendChild(li);
		li.innerHTML = '<div align="middle"><b>Spenden:<br />'+text2+' / '+menge+'</b></div>';		
	}
});