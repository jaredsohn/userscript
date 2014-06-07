// ==UserScript==
// @name           Search from Toyosu Library
// @namespace      matobaa.ocharake.org
// @include        http://www.amazon.co.jp/*
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
	GM_xmlhttpRequest({
		// Phase 1: retrieve UID and WNO
		method:"GET",
		url:'http://www.library.city.koto.tokyo.jp/csp/kotw/cal950.csp',
		onload:function(response){
			uid = /NAME="Uid" VALUE="([0-9]+)">/.exec(response.responseText);
			wno = /NAME="Wno" VALUE="([0-9]+)">/.exec(response.responseText);
			if(!uid) return;
			if(!wno) return;
			GM_xmlhttpRequest({
				// Phase 2: query item
				method:"GET",
				url:'http://www.library.city.koto.tokyo.jp/csp/kotw/cal950.csp?Phase=210&Uid='+uid[1]+'&Wno='+wno[1]+'&FN=0&Job=ALL&Qual1=IB&Keyw1='+isbn,
				onload:function(response){
					result = /<A HREF="(\/csp\/kotw\/cal950.csp\?.*Phase=230.*)".*<\/A>/.exec(response.responseText);
					if(!result) return;
					// if found, insert them in original page
					var header=document.evaluate("//div[@id='priceBlock']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
					if(!header)	header=document.evaluate("//div[@id='primaryUsedAndNew']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
					if(!header)	header=document.evaluate("//div[@id='olpDivId']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
					if(!header) return;
					var spl_link=document.createElement('a');
					spl_link.setAttribute('href','http://www.library.city.koto.tokyo.jp' + result[1]);
					spl_link.innerHTML='</br>&#x6C5F;&#x6771;&#x533A;&#x56F3;&#x66F8;&#x9928;&#x306B;&#x3042;&#x308B;&#x3088;';
					header.parentNode.insertBefore(spl_link,header.nextSibling);
				}
			});
		}
	});
}

isbn=getISBN();
if(isbn) checkLibrary(isbn);
