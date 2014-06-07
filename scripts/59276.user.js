// ==UserScript==
// @name           zum Schloss fehlt fuer penergame by basti1012
// @namespace      http://pennerhack.foren-city.de/
// @description    Das Script zeigt im ?bersichtbereich die Anzahl der Flaschen an und wieviel Flaschen bzw Geld noch bis zum Schloss (590000) fehlen.
// @include        *pennergame.de/overview/
// @exclude        *berlin.pennergame.de/overview/
// ==/UserScript==


//var text1 = document.getElementsByClassName('icon money')[0];
//var text11 = text1.innerHTML.split(unescape("%u20AC"))[1];
//var cash = text11.split("</a>")[0];

//cash = cash.replace(/\./g, "");
//cash = cash.replace(/,/, ".");
//var cash = cash;


GM_xmlhttpRequest({
  	method: 'GET',
   	url: 'http://www.pennergame.de/stock/bottle/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('name="chkval" value="')[1];
			var kurs = text1.split('"')[0];


var text11 = content.split('item_list')[1];
var text22 = text11.split('</span>')[0];
var text1 = text22.split('<span>')[1];
var text2 = text1.split('Pfandflaschen')[0];


var restflaschen= Math.round(59000000 - text2);
var flaschenergebniss= Math.round(text2*kurs)/100;
var rest_geld = Math.round(590000 - flaschenergebniss);

	var table = document.getElementsByClassName('status')[0];
	var li = table.getElementsByTagName('li');
	
	newli = document.createElement('li');
	table.appendChild(newli);
	newli_2 = document.createElement('li');
	table.appendChild(newli_2);
table.innerHTML+='<li><span class="k">Flaschen:</span><span class="v">Du hast '+text2+' Flaschen('+flaschenergebniss+'&euro;)</span></ul></li>';
table.innerHTML+='<li><span class="k">Rest Geld:</span><span class="v">'+rest_geld+'&euro; Bis zum schloss</span></ul></li>';
table.innerHTML+='<li><span class="k">Restflaschen:</span><span class="v"> '+restflaschen+' Bis zum schloss</span></ul></li>';



}});

