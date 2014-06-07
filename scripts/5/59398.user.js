// ==UserScript==
// @name           Plunder anzeige in der leiste fuer pennergame 4.0 by basti1012 b
// @author         basti1012 http://pennerhack.foren-city.de
// @namespace      basti1012 
// @description    es wird oben in der leiste ein plunderbild angezeigt immer das was gerade angelgt wurde und mit maus sdrauf wird der plunder name angezeigt 
// @include *pennergame.de*
// @exclude *berlin*
// ==/UserScript==
GM_xmlhttpRequest({
  	method: 'GET',
   	url: "http://www.pennergame.de/stock/plunder/",
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
var link ='<a href="http://www.pennergame.de/stock/plunder/"><img src="'+table4+'"  title="'+was2+'"  width="37" height="37"</a>';table.getElementsByTagName('ul')[0].appendChild(li);
li.innerHTML = '<div align="middle">'+link+'</div>';		
}});

