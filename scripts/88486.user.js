// ==UserScript==
// @name           Yahoo Fantasy Football Swap WR/RB
// @namespace      www.yahoo.com
// @include        http://football.fantasysports.yahoo.com/*
// @description    Moves the RB position players above the WR players on your team page
// @author         bbates
// $LastChangedDate: 10/20/2010
// ==/UserScript==

var WR = document.evaluate('//table[@id="statTable0"]/tbody/tr[td[text()="WR"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if ( WR.snapshotLength != 0 ){
	var wrRows = WR.snapshotItem(0);
	var RB = document.evaluate('//table[@id="statTable0"]/tbody/tr[td[text()="RB"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if ( RB.snapshotLength != 0 ){
		for (i = 0; i < RB.snapshotLength; i++) {
			var rbRows = RB.snapshotItem(i);
			rbRows.parentNode.removeChild(rbRows)
			wrRows.parentNode.insertBefore(rbRows, wrRows);
			}
	}
}