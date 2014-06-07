// ==UserScript==
// @name           removeFacebookTheater
// @namespace      tag:matthieu@yiptong.ca,2011-02-05:ergosteur
// @description    Removes the new facebook photo viewer. Mod of changeElements by a_hal89@hotmail.com,2008-05-22:Ahal
// @include        http://*.facebook.com/*
// ==/UserScript==


    
/* Do not modify this unless you know what you're doing */

	var img=document.evaluate("//a[@ajaxify][@rel][@class][@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var toReplace = /(\/|\.|\*|\+|\?|\||\(|\)|\[|\]|\{|\}|\\|\^|\$)/g;
document.addEventListener('DOMNodeInserted', removeTheater, true);
//removeTheater();


function removeTheater() {
	for(i = 0; i < img.snapshotLength; i++) {
		tmp = img.snapshotItem(i);
		//alert(tmp.rel);	
		if(tmp.rel == "theater"){
			tmp.rel = "NOTHING";
		}
	}
}
 