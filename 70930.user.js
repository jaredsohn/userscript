// ==UserScript==
// @name           Ordini militari Esercito eItaliano
// @namespace      www.erepublik.com
// @description    Visualizza gli ordini per i soldati
// @version        0.01
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/it
// ==/UserScript==

// basato sulla versione polacca dello stesso script by carbon

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://eitalyforum.altervista.org/phpbb/ordini.txt?1=1',

	onload:function(responseDetails){

			var responseText = responseDetails.responseText;
			var tags = responseText.split('|');
			var ordini = tags[0];
			var link = tags[1]
			var data = tags[2]

			latest=document.getElementById('latestnews')

			elemento_el = document.createElement("h3")
			elemento_el.textContent=ordini

			titolo_el=document.createElement("div")
			titolo_el.setAttribute('class', 'title, box');
			titolo_el.setAttribute('style', 'float: left;');
			titolo_el.innerHTML='<h1 class=\"sIFR-replaced\"><embed class=\"sIFR-flash\" height=\"28\" width=\"250\" src=\"/flash/delicious.swf\" quality=\"best\" flashvars=\"txt=Ordini EI:&&textcolor=#737373&hovercolor=null&linkcolor=null&w=250&h=28\" wmode=\"transparent\" bgcolor=\"transparent\" sifr=\"true\" type=\"application/x-shockwave-flash\" style=\"width: 250px; height: 28px;\"/></h1></div>'

			link_el=document.createElement("div")
			link_el.setAttribute('class', 'latest_events, box');
			link_el.setAttribute('style', 'float: left;');
			link_el.innerHTML='<div class=\"item elem\"><div class=\"iconholder\"><img class=\"test\" src=\"/images/parts/icon_military_93.gif\" alt=\"Region under attack\"/></div><div class=\"holder\"><p><a href=\"'+link+'\">'+ordini+'</a></p><p>'+data+'</p></div></div>'

			data_el=document.createElement("h3")
			data_el.textContent ='Data: ' + data

			latest.parentNode.insertBefore(titolo_el, latest)
			latest.parentNode.insertBefore(link_el, latest)
			}
		}
	);
