// ==UserScript==
// @name   Cena chleba (V2)
// @namespace  http://www.erepublik.com/en/citizen/profile/2467247
// @description Skrypt wyswietla na glownej stronie ceny chleba, dzieki czemu nie trzeba ich po kolei sprawdzac. Wersja beta
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/pl
// ==/UserScript==

function zaok(a){
a = a*100; 
a = Math.round(a);
a = a/100;
return a;
} 

var vat = 1.14 ; // dla 14%

function licz(ile,jaki){
	
  GM_xmlhttpRequest({
  	method:"GET",
  	url:'http://api.erepublik.com/v2/feeds/market/1/35/'+ ile + '',
  	headers:{
    "User-Agent":"monkeyagent",
    "Accept":"text/monkey,text/xml",
    },
  	onload:function(response) {

		var dane = response.responseText;
		var c1 = dane.split("<price>");
		var c2 = c1[1].split("</price>")
		var cena = '<b>'+ jaki +' : </b>' + zaok(c2[0] * vat) + ' zł';
		var chleb1 = document.createElement("p");
		chleb1.innerHTML = "<center><a title='Przejdz do sklepu' href=http://economy.erepublik.com/en/market/35/1/"+ ile +"/citizen/0/price_asc/1>" + cena + "</a></center>";
		p2.parentNode.insertBefore(chleb1, p2);		
  		}
  });
}
function Main(){
	
	var koniec = document.createElement("p");
	koniec.innerHTML = "<center><img src=http://dl.dropbox.com/u/3789873/chleb.png width=55 height=55 title='copyright by sw1ft'></center>";
	p2 = document.getElementById('accountdisplay');
		licz(1,1);
		licz(2,2);
		licz(3,3);
		licz(4,4)
	p2.parentNode.insertBefore(koniec, p2);
}

window.addEventListener('load', Main, false);

