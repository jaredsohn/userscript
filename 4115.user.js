// ==UserScript==
// @name          SAP Forum Ad Remover
// @namespace     http://www.otsegolectric.com/greasemonkey/
// @description	  Fixes the formatting on the SAP forums
// @include       http://www.sapfans.com/forums/*
// ==/UserScript==

var allTDs = document.evaluate("//td[@align='left'] [@valign='top']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < allTDs.snapshotLength; i++){
		var e = allTDs.snapshotItem(i);
		if(e.innerHTML.indexOf('google_ad_client') != -1)
			e.parentNode.removeChild(e);
	}