// ==UserScript==
// @name	          Expert-Exchange Expert mode
// @version	1.0
// @namespace     http://greasemonkey.org/download/
// @description	Redirect to questions only page
// @include	http://www.expert-exchange.com/*
// ==/UserScript==

var rows = document.evaluate(
    "//a[@href='viewOpenZoneQuestions*']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
if (rows.snapshotLength>0) {
    window.location.href = rows.snapshotItem(0).href;
}
