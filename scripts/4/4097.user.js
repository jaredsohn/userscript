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
// @name          No auto-refresh
// @description   Stop all pages from auto refreshing
// @description   Originally by Pirateshark <http://userscripts.org/scripts/show/3587>
// @description   Ugly modification by n0nick to add case insensetivity
// @include       *
// ==/UserScript==


// looking for three common cases: refresh, Refresh, REFRESH
// if anyone knows how to do a case-insensitive query, that would be cool.. email sagiem at gmail dot com
var refresh1 = document.evaluate("//meta[@http-equiv='Refresh']|//meta[@http-equiv='refresh']|//meta[@http-equiv='REFRESH']",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);

//GM_log("Refresh: "+refresh1.snapshotItem(0));


if(refresh1.snapshotItem(0) != null){
	var content = refresh1.snapshotItem(0).getAttribute("content");
	var yesh = 1;
}

if (yesh == 1){
	var stopTimer = window.setTimeout("window.stop();",
		(content-1)*1000); // in case load hasn't finished when the refresh fires
	window.addEventListener("load", function(){
	   try { window.clearTimeout(stopTimer); } catch(ex) {}
	   window.stop();
	   }, true);
	//GM_log("stopped meta-refresh");
} else {
	//GM_log("no meta-refresh found");
}
