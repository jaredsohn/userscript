// ==UserScript==
// @id             01netFixLinks
// @name           01netFixLinks
// @version        1.0
// @namespace      
// @author         Mr6686
// @description    Corrige les liens des classements logiciels
// @include        http://www.01net.com/telecharger/*
// @run-at         document-end
// ==/UserScript==

var links,thisLink;
links = document.evaluate("//a[@href]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i=0;i<links.snapshotLength;i++) {
	var thisLink = links.snapshotItem(i);
	thisLink.href = thisLink.href.replace('gra_new','new_gra');
	thisLink.href = thisLink.href.replace('ll_new','new_ll');
	thisLink.href = thisLink.href.replace('sha_new','new_sha');
	thisLink.href = thisLink.href.replace('dem_new','new_dem');
	thisLink.href = thisLink.href.replace('pay_new','new_pay');
	}