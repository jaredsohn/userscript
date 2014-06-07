// ==UserScript==
// @name           RebuyPriceInMomox
// @namespace      http://lifesuche.de/
// @description    shows rebuy price on momox site
// @include        http://www.momox.de/buecher-schnell-verkaufen/ankauf-von-gebrauchten-buechern.html
// @version        1.00
// ==/UserScript==


try{
	var Elem = document.getElementById('ean_0');
	var EAN=Elem.getAttribute('value');
//	alert(EAN);
	var x = document.createElement('iframe');
	x.setAttribute('id','rebuycontent');
	x.setAttribute('src','http://www.rebuy.de/verkaufen/suche?query='+EAN);
	x.setAttribute('width','600');
	x.setAttribute('height','700');
	x.innerHTML='';
	try{
		document.getElementById('otherInputForm').appendChild(x);
	}
	catch(err){
	}
}
catch(err){
}
