// ==UserScript==
// @name         Amazon.de, oesterreichische Mehrwertsteuer
// @namespace    http://alphabeter.zuerner.at/greasemonkey/
// @description  Aendert den Preis auf amazon.de auf die oesterreichische Mehrwertsteuer
// @include      http://*.amazon.de/*
// @include      http://amazon.de/*
// ==/UserScript==



window.setTimeout( function() {	

//elements, that get searched for prices:
var amazonPriceElements = new Array("td", "font", "b", "span");	

//VAT in percent
var mwst_de = 19;
var mwst_at = 20;
var mwst_buch_de = 7;
var mwst_buch_at = 10;


//------------------------------------------------------

mwst_de = 1 + mwst_de/100.0;
mwst_at = 1 + mwst_at/100.0;
mwst_buch_de = 1 + mwst_buch_de/100.0;
mwst_buch_at = 1 + mwst_buch_at/100.0;
for (j = 0; j < amazonPriceElements.length; j++) 
{
	var possiblePriceElements = document.getElementsByTagName(amazonPriceElements[j]);
	for (i = 0; i < possiblePriceElements.length; i++) 
	{		
		var thisElement = possiblePriceElements[i];
		var thisHTML = thisElement.innerHTML;
		if (thisHTML.length < 50 && thisHTML.indexOf('EUR')!= -1) 
		{
			thisHTML=thisHTML.replace("\n"," ").replace("\r"," ");
			var priceRegEx = /(.*)EUR\s*([0-9,.]+)(.*)/;
  			priceRegEx.exec(thisHTML);
  			//debug: if (confirm(thisHTML + " = " + RegExp.$1 + ".." +RegExp.$2 + ".." +RegExp.$3)==false) return;
  			
  			preHTML  = RegExp.$1;
  			postHTML = RegExp.$3;  			
  			oldPrice=RegExp.$2;
  			
  			//replace decimal point and 1000-sign
  			//convert to number  			
			oldPrice=parseFloat(oldPrice.replace(".","").replace(",","."));			
			
			if (isNaN(oldPrice)) continue;
				    
			newPrice1 = oldPrice / mwst_de * mwst_at;			
			newPrice1 = newPrice1.toFixed(2).replace(".",",");			
			newPrice2 = oldPrice / mwst_buch_de * mwst_buch_at;
			newPrice2 = newPrice2.toFixed(2).replace(".",",");
						
			thisElement.innerHTML=preHTML + "<span>&euro;"+newPrice1 + '</span><span style="color:#611;"> [Buch &euro;'+newPrice2 + "]</span>" +postHTML;
  		}
	}
}
}, 1234);
