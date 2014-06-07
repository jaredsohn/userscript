// ==UserScript==
// @name           Zimbrii
// @namespace      www.erepublik.com
// @description    Script pentru comenzi al armatei zimbrilor
// @version        0.1
// @include        http://www*.erepublik.com/en
// @include        http://www*.erepublik.com/ro
// @include        http://www*.erepublik.com/ru
// ==/UserScript==

// made by sigusro : http://www.erepublik.com/en/citizen/profile/807521



GM_xmlhttpRequest({
	method: 'GET',


// citit url blogspot Zimbrii
	url: 'http://zimbrii-tmd.blogspot.com/',


	onload:function(responseDetails){

var responseText = responseDetails.responseText;
var pos1=responseText.search("Ordine ");
var responseText2 = responseText.substr(responseText.search("Indepliniti"),300);
var pos2=responseText2.search("Indepliniti");
var pos3=responseText2.search(" </a>");
var lung1=pos3-pos2-2;

var responseText3 = responseText.substr(responseText.search("Prezenta"),300);
var pos4=responseText3.search("Prezenta");
var pos5=responseText3.search(" </a>");
var lung2=pos5-pos4;

ziua = responseText.substr(pos1,15);
regiune=responseText2.substr(pos2,lung1);
prezenta=responseText3.substr(pos4,lung2);

	
			
			latest=document.getElementById('latestnews')
      
			parancs_el = document.createElement("h3")
			parancs_el.textContent=regiune
			
			titlu_el=document.createElement("div")
			titlu_el.setAttribute('class', 'title, box');
			titlu_el.setAttribute('style', 'float: left;');
			titlu_el.innerHTML='<h1 class=\"sIFR-replaced\"><embed class=\"sIFR-flash\" height=\"28\" width=\"250\" src=\"/flash/delicious.swf\" quality=\"best\" flashvars=\"txt=Ordine Zimbrii MD:&&textcolor=#737373&hovercolor=null&linkcolor=null&w=250&h=28\" wmode=\"transparent\" bgcolor=\"transparent\" sifr=\"true\" type=\"application/x-shockwave-flash\" style=\"width: 250px; height: 28px;\"/></h1></div>'
			
					
			link_el=document.createElement("div");
			link_el.setAttribute('class', 'latest_events, box');
			link_el.setAttribute('style', 'float: left;');
			link_el.innerHTML='<div class=\"item elem\"><div class=\"iconholder\"><img class=\"test\" src=\"/images/parts/icon_military_93.gif\" alt=\"Region under attack\"/></div><div class=\"holder\"><p>'+ziua+'</p><p>'+prezenta+'</p><p>'+ regiune +'</p></div></div>'

			latest.parentNode.insertBefore(titlu_el, latest)
			latest.parentNode.insertBefore(link_el, latest);
			}	
		}
	);