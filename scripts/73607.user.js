// ==UserScript==
// @name           Ordine GPS
// @namespace      www.erepublik.com
// @description    Script pentru comenzi al GPS
// @version        0.1
// @include        http://www*.erepublik.com/en
// @include        http://www*.erepublik.com/ro
// ==/UserScript==

// made by Contele Draqula: http://www.erepublik.com/en/citizen/profile/2296449



GM_xmlhttpRequest({
	method: 'GET',


// citit url forum GPS
	url: 'http://gryphons.wikiforum.ro/ordinul-zilei-f4/ordinul-zilei-t128.htm',


	onload:function(responseDetails){

var responseText = responseDetails.responseText;
var pos1=responseText.search("Ordine ");
var responseText2 = responseText.substr(responseText.search("Luptam"),300);
var pos2=responseText2.search("Luptam");
var pos3=responseText2.search("!");
var lung1=pos3-pos2;

var responseText3 = responseText.substr(responseText.search("Adunare"),300);
var pos4=responseText3.search("Adunare");
var pos5=responseText3.search("!");
var lung2=pos5-pos4;

var responseText4 = responseText.substr(responseText.search("Verificati"),300);
var pos6=responseText4.search("Verificati");
var pos7=responseText4.search("!");
var lung3=pos7-pos6;

ziua = responseText.substr(pos1,15);
regiune=responseText2.substr(pos2,lung1);
Adunare=responseText3.substr(pos4,lung2);
Hold=responseText4.substr(pos6,lung3);

	
			
			latest=document.getElementById('latestnews')
      
			parancs_el = document.createElement("h3")
			parancs_el.textContent=regiune
			
			titlu_el=document.createElement("div")
			titlu_el.setAttribute('class', 'title, box');
			titlu_el.setAttribute('style', 'float: left;');
			titlu_el.innerHTML='<h1 class=\"sIFR-replaced\"><embed class=\"sIFR-flash\" height=\"28\" width=\"250\" src=\"/flash/delicious.swf\" quality=\"best\" flashvars=\"txt=Ordine GPS:&&textcolor=#737373&hovercolor=null&linkcolor=null&w=250&h=28\" wmode=\"transparent\" bgcolor=\"transparent\" sifr=\"true\" type=\"application/x-shockwave-flash\" style=\"width: 250px; height: 28px;\"/></h1></div>'
			
					
			link_el=document.createElement("div");
			link_el.setAttribute('class', 'latest_events, box');
			link_el.setAttribute('style', 'float: left;');
			link_el.innerHTML='<div class=\"item elem\"><div class=\"iconholder\"><img class=\"test\" src="http://i48.tinypic.com/2cfdvv7.jpg" width="55" height="55" alt=\"Gryphons Power Soldiers\"/></div><div class=\"holder\"><p>'+ziua+'</p><p>'+Adunare+'</p><p>'+ regiune +'</p><p>'+Hold+'</p></div></div>'

			latest.parentNode.insertBefore(titlu_el, latest)
			latest.parentNode.insertBefore(link_el, latest);
			}	
		}
	);