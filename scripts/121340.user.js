// ==UserScript==
// @name           Facebook remove banner
// @namespace      Simon Péter http://www.facebook.com/simon.peti.8
// @description    kikapcsolja a reklámokat a Facebook adatlapokon
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==
// Version 2012.02.06.




function replaceStyleSheet(oldCSS, newCSS) {
    document.evaluate('//link[@rel="stylesheet" and @href="'+oldCSS+'"]', document, null, 
		      XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href = newCSS;
}

/*replaceStyleSheet("http://static.ak.fbcdn.net/rsrc.php/v1/y2/r/QH5MT2JJOuA.css", "http://greeneyes.hu/facebook/remove_banner_01.css");

replaceStyleSheet("http://static.ak.fbcdn.net/rsrc.php/v1/yK/r/6iNhlW7M9lb.css", "http://greeneyes.hu/facebook/chat_01.css");*/

replaceStyleSheet("http://static.ak.fbcdn.net/rsrc.php/v1/yp/r/RFFDs1W2UrV.css", "http://greeneyes.hu/facebook/remove_banner_01.css");

replaceStyleSheet("http://static.ak.fbcdn.net/rsrc.php/v1/y3/r/aa_YElDpka8.css", "http://greeneyes.hu/facebook/chat_01.css");