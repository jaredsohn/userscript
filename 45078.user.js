// ==UserScript==
// @name                    uludağ sözlük reklam kapat
// @description             sağ taraftaki reklamı kaldırır
// @author		    aristo
// @version		    1.0
// @include		    http://www.uludagsozluk.com/*
// @include		    http://ulusozluk.com/*
// @include		    ulusozluk.com/*
// @include		    uludagsozluk.com/*
// @include		    http://uludagsozluk.com/*
// ==/UserScript==

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;

function find(xpath, xpres){
	var ret = document.evaluate(xpath, document, null, xpres, null);
	return xpres == XPFirst ? ret.singleNodeValue : ret;
}
function reklamKapat() {
	
	var elemToHide = find("//*[@id='reklamlar']", XPFirst);
	//alert(elemToHide);
	if (elemToHide) {
		elemToHide.style.display = 'none';
	}
	
}

document.addEventListener('DOMNodeInserted', reklamKapat ,false);
window.addEventListener('load', reklamKapat ,false);

//hadi hayrını görün.