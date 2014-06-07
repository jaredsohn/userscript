// ==UserScript==
// @name          Trendio Max Buy
// @namespace     http://public.caranta.com/trendio/trendio-Max-Buy.user.js
// @description	  Buy Maximum amount of any shares From Trendio French Site
// @include       http://fr.trendio.com/word.php*
// ==/UserScript==

(function()
{
	var formTag = document.getElementsByTagName('form')[0] ;
	var BuyInput = formTag.getElementsByTagName('input')[1];
	var boldTag = formTag.getElementsByTagName('b')[0];
//	GM_log('Price : ' + boldTag.childNodes[0].nodeValue) ;
	var price = boldTag.childNodes[0].nodeValue ;
	price = price.substr(1, price.length-1) ;
	var numberTot = Math.floor(20000 / price) ;

	formTag.childNodes[2].nodeValue = formTag.childNodes[2].nodeValue + '... ou plutot '+numberTot+' actions pour 20000$ maximum au prix actuel ;)' ;

	if (price == '0')
	{
		BuyInput.value = "XXXX";
	} else {
//		GM_log('Price : '+price+' Nombre : '+ numberTot) ;
		BuyInput.value = numberTot ;
	}


}) ();