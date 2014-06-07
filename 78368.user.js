// ==UserScript==
// @name           Rozkazy Darkwood
// @namespace      www.erepublik.com
// @description    Aktualne rozkazy dotyczace walk w DW
// @version        0.01
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/pl
// ==/UserScript==

// script de pe erepstats.com modificat: user eRep: Longfellow
// modified by pemo22 for Darkwood


GM_xmlhttpRequest({
	method: 'GET',
	url: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',

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
			titlu_el.innerHTML='<h1 class=\"sIFR-replaced\"><embed class=\"sIFR-flash\" height=\"25\" width=\"200\" src=\"/flash/delicious.swf\" quality=\"best\" flashvars=\"txt=Rozkazy Darkwood:&&textcolor=#737373&hovercolor=null&linkcolor=null&w=200&h=25\" wmode=\"transparent\" bgcolor=\"transparent\" sifr=\"true\" type=\"application/x-shockwave-flash\" style=\"width: 200px; height: 25px;\"/></h1></div>'



			link_el=document.createElement("div")
			link_el.setAttribute('class', 'latest_events, box');
			link_el.setAttribute('style', 'float: left;');
			link_el.innerHTML='<div class=\"item elem\"><div class=\"iconholder\"><img class=\"test\" src=\"http://i48.tinypic.com/ejd183.jpg\" alt=\"Region under attack\"/></div><div class=\"holder\"><p><a href=\"'+link+'\">'+comanda+'</a></p><p>'+ ido +'</p></div></div>'
                        

			ido_el=document.createElement("h3")
			ido_el.textContent ='Data publikacji: ' + ido

			latest.parentNode.insertBefore(titlu_el, latest)
			latest.parentNode.insertBefore(link_el, latest)
			//latest.parentNode.insertBefore(ido_el, latest)

			}
		}
	);


GM_xmlhttpRequest({
	method: 'GET',
	url: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',

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
			titlu_el.innerHTML='<h1 class=\"sIFR-replaced\"><embed class=\"sIFR-flash\" height=\"25\" width=\"200\" src=\"/flash/delicious.swf\" quality=\"best\" flashvars=\"txt=Wiadomosci Darkwood:&&textcolor=#737373&hovercolor=null&linkcolor=null&w=200&h=25\" wmode=\"transparent\" bgcolor=\"transparent\" sifr=\"true\" type=\"application/x-shockwave-flash\" style=\"width: 200px; height: 25px;\"/></h1></div>'



			link_el=document.createElement("div")
			link_el.setAttribute('class', 'latest_events, box');
			link_el.setAttribute('style', 'float: left;');
			link_el.innerHTML='<div class=\"item elem\"><div class=\"iconholder\"><img class=\"test\" src=\"http://i48.tinypic.com/ejd183.jpg\" alt=\"Region under attack\"/></div><div class=\"holder\"><p><a href=\"'+link+'\">'+comanda+'</a></p><p>'+ ido +'</p></div></div>'
                        

			ido_el=document.createElement("h3")
			ido_el.textContent ='Data publikacji: ' + ido

			latest.parentNode.insertBefore(titlu_el, latest)
			latest.parentNode.insertBefore(link_el, latest)
			//latest.parentNode.insertBefore(ido_el, latest)

			}
		}
	);