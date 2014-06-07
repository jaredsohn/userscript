// ==UserScript==
// @name           currencyconversion
// @namespace      ODFO
// @description    because sarah bee would rather we all ODFO'd instead, this script will change all US Dollar values into GBP, the vat will also be deducted at 15% 
// @include        http://www.theregister.co.uk/*
// ==/UserScript==

re = new RegExp(/\$[0-9]+(\.)?([0-9]+)?/gim); 

//1 U.S. dollar = 0.690703136 GBP ...i got this from google, it would be not too big a deal to get it in real time i suppose. but for now i'm happy with this...

var rate="0.690703136"; 

matches = document.body.innerHTML.match(re); 
for(i=0;i<matches.length;i++){
	m=matches[i]; 
	dollars='';
	for(x=1;x<m.length;x++){
		dollars+=m[x]; 	
	}
	//now change that into GBP... 
	GBP = dollars*rate ; 
	//deduct 15% to account for VAT... 
	GBP=(GBP/100)*85; 
	//round it off to 2dp...
	GBP = Math.round(GBP*Math.pow(10,2))/Math.pow(10,2);
	document.body.innerHTML = 
document.body.innerHTML.replace(m, "&pound;"+GBP+ " ("+m+")");  
}



