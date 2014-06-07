// Clean TurkTicaret.Net
// version 0.0.1
// 24.11.2009
// Copyleft Tanaydın Şirin
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// ==UserScript==
// @name			    Clean TurkTicaret.Net
// @description	    	Removes ads from TurkTicaret.Net
// @author		    	tanaydin_sirin
// @version		    	0.0.1
// @include		    	http://www.turkticaret.net/*
// @include		    	https://www.turkticaret.net/*

// ==/UserScript==

var i =0;
var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;

function find(xpath, xpres){
	var ret = document.evaluate(xpath, document, null, xpres, null);
	return xpres == XPFirst ? ret.singleNodeValue : ret;
}
function clean_page() {
	var banners = find("//*[contains(@id, 'rpCont')]", XPList);
	for(i=0; i <= banners.snapshotLength-1 ; i++) {
		$(banners.snapshotItem(i)).parent().hide();
	}
	var banners3 = find("//*[contains(@id, 'banner')]", XPList);
    
	for(i=0; i <= banners3.snapshotLength-1 ; i++) {
		$(banners3.snapshotItem(i)).parent().hide();
	}
	var banners2 = find("//*[contains(@id, 'adhoodBannerDiv')]", XPList);
    
	for(i=0; i <= banners2.snapshotLength-1 ; i++) {
		$(banners2.snapshotItem(i)).parent().hide();
	}

}

document.addEventListener('DOMNodeInserted', clean_page ,false);
window.addEventListener('load', clean_page ,false);