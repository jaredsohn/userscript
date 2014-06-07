// ==UserScript==
// @name           Rozkazy Ministra Obrony Narodowej
// @namespace      www.erepublik.com
// @description    Aktualne rozkazy dotyczace walk Polakow
// @version        0.36
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/pl
// ==/UserScript==

// script de pe erepstats.com modificat: user eRep: Longfellow
// modified by carbon ;)


GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://ereptools.net:8080/orders.txt',

	onload:function(responseDetails){

			var responseText = responseDetails.responseText;
			var tags = responseText.split('|');
			var comanda = tags[0];
			var link = tags[1]
			var ido = tags[2]

			latest=document.getElementById('latestnews')

			parancs_el = document.createElement("h3")
			parancs_el.textContent=comanda

			titlu_el=document.createElement("div")
			titlu_el.setAttribute('class', 'title, box');
			titlu_el.setAttribute('style', 'float: left;');
			titlu_el.innerHTML='<h1 class=\"sIFR-replaced\"><embed class=\"sIFR-flash\" height=\"28\" width=\"250\" src=\"/flash/delicious.swf\" quality=\"best\" flashvars=\"txt=Oficjalne rozkazy:&&textcolor=#737373&hovercolor=null&linkcolor=null&w=250&h=28\" wmode=\"transparent\" bgcolor=\"transparent\" sifr=\"true\" type=\"application/x-shockwave-flash\" style=\"width: 250px; height: 28px;\"/></h1></div>'



			link_el=document.createElement("div")
			link_el.setAttribute('class', 'latest_events, box');
			link_el.setAttribute('style', 'float: left;');
			link_el.innerHTML='<div class=\"item elem\"><div class=\"iconholder\"><img class=\"test\" src=\"/images/parts/icon_military_93.gif\" alt=\"Region under attack\"/></div><div class=\"holder\"><p><a href=\"'+link+'\">'+comanda+'</a></p><p>'+ ido +'</p></div></div>'

			ido_el=document.createElement("h3")
			ido_el.textContent ='Data publikacji: ' + ido

			latest.parentNode.insertBefore(titlu_el, latest)
			latest.parentNode.insertBefore(link_el, latest)
			//latest.parentNode.insertBefore(ido_el, latest)

			}
		}
	);