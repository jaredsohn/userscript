// Temiz Sozluk
// version 1.0
// 27.08.2009
// Copyleft Maxim Mladenov
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ChangeLog
// 1.0		27.08.2009
// --------------------------------------------------------------------
// ==UserScript==
// @name	    Temiz Sozluk
// @description	    Sozlukteki reklamlari kaldirir.
// @author	    Maxim Mladenov
// @namespace	    eusozluk.com
// @version	    1.0
// @include	    http://www.eusozluk.com/*
// @include	    http://eusozluk.com/*

// ==/UserScript==

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;

function bul(xpath, xpres){
	var ret = document.evaluate(xpath, document, null, xpres, null);
	return xpres == XPFirst ? ret.singleNodeValue : ret;
}
function temizSozluk() {
	var saklanacak = bul("//*[@id='daskapital']", XPFirst);
	//alert(saklanacak);
	if (saklanacak) {
		saklanacak.style.display = 'none';
	}
}

document.addEventListener('DOMNodeInserted', temizSozluk ,false);
window.addEventListener('load', temizSozluk ,false);