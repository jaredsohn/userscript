// ==UserScript==
// @name	Search from Fujisawa City Library
// @namespace	http://www.unfindable.net/
// @include	http://www.amazon.co.jp/*
// ==/UserScript==

function getISBN(){
	var href=document.location.href;
	var index=href.indexOf('ASIN');
	var asin=href.substring(index+5,index+15);
	if(index<0){
		index=href.indexOf('product');
		asin=href.substring(index+8,index+18);
	}
	if(index<0){
		index=href.indexOf('dp');
		asin=href.substring(index+3,index+13);
	}
	//if(asin.match(/^[0-9]{10,13}$/))
		return asin;
	return undefined;
}


function checkLibrary(isbn){
	var url='http://www.lib.city.fujisawa.kanagawa.jp/clis/search?ISBN='+isbn
	// setagaya; var url='http://libweb.city.setagaya.tokyo.jp/clis/search?ISBN='+isbn
	GM_xmlhttpRequest({
		method:"GET",
		url:url,
		onload:function(response){
			if(response.responseText.match(/PART/)){
				var header=document.evaluate("//div[@id='priceBlock']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if(!header)	header=document.evaluate("//div[@id='primaryUsedAndNew']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if(!header)	header=document.evaluate("//div[@id='olpDivId']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if(header){
					var spl_link=document.createElement('a');
					spl_link.setAttribute('href',url);
					spl_link.innerHTML='</br>&#x85e4;&#x6ca2;&#x5e02;&#x56F3;&#x66F8;&#x9928;&#x306B;&#x3042;&#x308B;&#x3088;';
// setagaya; 					spl_link.innerHTML='</br>&#x4E16;&#x7530;&#x8C37;&#x533A;&#x7ACB;&#x56F3;&#x66F8;&#x9928;&#x306B;&#x3042;&#x308B;&#x3088;';

					header.parentNode.insertBefore(spl_link,header.nextSibling);
				}
			}
		}
	});
}

isbn=getISBN();
if(isbn) checkLibrary(isbn);