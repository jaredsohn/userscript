// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "No Meta Refresh", and click Uninstall.
// 
// --------------------------------------------------------------------
// Taken from the successful example at http://dunck.us/collab/DisableAutoRefresh
// --------------------------------------------------------------------
// ==UserScript==
// @name          No Meta Refresh
// @description   Stop all pages from auto refreshing
// @include       http://*
// ==/UserScript==


//Error: Component returned failure code: 0x8060000e [nsIDOMXPathEvaluator.evaluate]
//Source File: nometarefresh.user.js
//Line: 337
//Source Code:
//337

//var refresh = document.evaluate("//meta[lower-case(@http-equiv)='refresh']",
var refresh = document.evaluate("//meta[@http-equiv='Refresh']",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);

GM_log("refresh: "+refresh.snapshotItem(0));
if(refresh.snapshotItem(0) != null){
	var content = refresh.snapshotItem(0).getAttribute("content");

	var stopTimer = window.setTimeout("window.stop();",
		(content-1)*1000); // in case load hasn't finished when the refresh fires
	window.addEventListener("load", function(){
	   try { window.clearTimeout(stopTimer); } catch(ex) {}
	   window.stop();
	   }, true);
	GM_log("stopped meta-refresh");
} else {
	GM_log("no meta-refresh found");
}

//refresh.snapshotItem is of type objectHHTMLMtaElement
//alert('refresh: '+refresh.snapshotItem(0).getAttribute("content"));
//<meta  http-equiv="Refresh" content="900">
