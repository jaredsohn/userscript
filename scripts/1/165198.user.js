// ==UserScript==
// @name		ADVFN Forum Clean Interface
// @namespace	http://srinvestidor.com.br/gm_scripts
// @description	Clean Interface for br.advfn.com forum. It removes all the banners and side widgets. Only forum topics are shown.
// @include		http://br.advfn.com/*
// @grant		none
// @run-at		document-end
// ==/UserScript==// 

widgets = document.evaluate("//td[@class='bb_widgets']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(i = 0; i < widgets.snapshotLength; i++) {
	tablerow = widgets.snapshotItem(i).parentNode
	tablerow.removeChild(widgets.snapshotItem(i))
}

var IDsToRemove=new Array("fade", "popupBlock", "header-container","mkta-2", "oasissec1387", "broker-btns", "toolbar_container", 
							"RecentHistoryTbl", "oasissec1269", "footerTextTbl");

for(i=0; i < IDsToRemove.length; i++){
	var elmDeleted = document.getElementById(IDsToRemove[i]);
	if(elmDeleted != null)
		elmDeleted.parentNode.removeChild(elmDeleted);
}