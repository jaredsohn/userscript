// ==UserScript==
// @name           MAP eRomania
// @namespace      www.erepublik.com
// @description    Comenzi MAP eRomania
// @version        1.02 beta
// @include        http://www*.erepublik.com/en
// @include        http://www*.erepublik.com/en/wars/1
// @include        http://www*.erepublik.com/ro
// @include        http://www*.erepublik.com/ro/wars/1
// ==/UserScript==

// script de pe erepstats.com modificat: user eRep: Longfellow 



GM_xmlhttpRequest({
	method: 'GET',


// citit url ziar MAP
	url: 'http://www.erepublik.com/en/newspaper/ministerul-apararii-185153/1',


	onload:function(responseDetails){
/*
			var responseText = responseDetails.responseText;
			var tags = responseText.split('|');
			var comanda = tags[0];
			var regiune = tags[1];
			var link = tags[2]
			var ido = tags[3]   
*/
			

var responseText = responseDetails.responseText;
var pos1=responseText.search("ziua ");
var responseText2 = responseText.substr(responseText.search("Luptam impotriva"),300);
var pos2=responseText2.search("Luptam impotriva");
var pos3=responseText2.search(" <strong>");
var pos4=responseText2.search("<a href=");
var pos5=responseText2.search(" target=");
var lung1=pos3-pos2-2;
var lung2=pos5-pos4-10;
var comanda='Se lupta in';

ido = responseText.substr(pos1+5,3);
regiune=responseText2.substr(pos2,lung1);
link=responseText2.substr(pos4+9,lung2);

	
			
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
	url: 'http://www.erepublik.com/en/newspaper/ministerul-apararii-185153/1',

	onload:function(responseDetails){

			var responseText = responseDetails.responseText;
var pos1=responseText.search("ziua ");
var responseText2 = responseText.substr(responseText.search("Luptam impotriva"),300);
var pos2=responseText2.search("Luptam impotriva");
var pos3=responseText2.search(" <strong>");
var pos4=responseText2.search("<a href=");
var pos5=responseText2.search(" target=");
var lung1=pos3-pos2-2;
var lung2=pos5-pos4-10;
var comanda='Se lupta in';

ido = responseText.substr(pos1+5,3);
regiune=responseText2.substr(pos2,5);
link=responseText2.substr(pos4+9,lung2);

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