// ==UserScript==
// @name           Comenzi eRomania
// @namespace      www.erepublik.com
// @description    Comenzi eRomania
// @version        0.35
// @include        http://www.erepublik.com/*
// @include        http://www.erepublik.com/*/wars/1
// ==/UserScript==

// script de pe erepstats.com modificat: user eRep: Longfellow 



GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://forum.ehelvetia.ch/redeagles.txt',

	onload:function(responseDetails){

			var responseText = responseDetails.responseText;
			var tags = responseText.split('|');
			var comanda = tags[0];
			var regiune = tags[1];
			var link = tags[2]
			var ido = tags[3]

			latest=document.getElementById('latestnews')
      
			parancs_el = document.createElement("h3")
			parancs_el.textContent=comanda + '   (' + regiune + ')'
			
			titlu_el=document.createElement("div")
			titlu_el.setAttribute('class', 'title, box');
			titlu_el.setAttribute('style', 'float: left;');
			titlu_el.innerHTML='<h1 class=\"sIFR-replaced\"><embed class=\"sIFR-flash\" height=\"28\" width=\"250\" src=\"/flash/delicious.swf\" quality=\"best\" flashvars=\"txt=Ordine oficiale:&&textcolor=#737373&hovercolor=null&linkcolor=null&w=250&h=28\" wmode=\"transparent\" bgcolor=\"transparent\" sifr=\"true\" type=\"application/x-shockwave-flash\" style=\"width: 250px; height: 28px;\"/></h1></div>'
			
			
			
			link_el=document.createElement("div")
			link_el.setAttribute('class', 'latest_events, box');
			link_el.setAttribute('style', 'float: left;');
			link_el.innerHTML='<div class=\"item elem\"><div class=\"iconholder\"><img class=\"test\" src=\"/images/parts/icon_military_93.gif\" alt=\"Region under attack\"/></div><div class=\"holder\"><p><a href=\"'+link+'\">'+comanda+'('+regiune+')'+'</a></p><p>'+ ido +'</p></div></div>'

			ido_el=document.createElement("h3")
			ido_el.textContent ='Comanda data in: ' + ido

			latest.parentNode.insertBefore(titlu_el, latest)
			latest.parentNode.insertBefore(link_el, latest)
			//latest.parentNode.insertBefore(ido_el, latest)
			
			
	
			}	
		}
	);
	
	GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://www.voce.ro/erepublik/comenzi.php',

	onload:function(responseDetails){

			var responseText = responseDetails.responseText;
			var tags = responseText.split('|');
			var comanda = tags[0];
			var regiune = tags[1];
			var link = tags[2]
			var ido = tags[3]

      wars=document.getElementById('filters')
      
      parancs_el = document.createElement("h3")
			parancs_el.textContent='Se lupta in regiunea:'

			battle_el=document.createElement("div")
			battle_el.setAttribute('class', 'warholder');
			battle_el.innerHTML='<div class=\"defender\"><div class=\"flagholder\"><a href=\"/en/country/Romania\"><img src=\"/images/flags/XL/Romania.gif\" alt=\"Romania\" title=\"Romania\"/></a></div><div class=\"nameholder\"><a href=\"/en/country/Romania\">Romania</a></div><p>no allies</p></div><div class=\"attacker\"><div class=\"nameholder\"><a href=\"'+link +'">'+ regiune + '</a></div></div><div class=\"middle\"><a class=\"details\" href=' + link + '>details</a></div>'
			
			wars.parentNode.insertBefore(parancs_el, wars)
      wars.parentNode.insertBefore(battle_el, wars)
			
			}	
		}
	);
