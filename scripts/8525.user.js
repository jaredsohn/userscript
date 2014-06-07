// ==UserScript==
// @name	          More Live Mail
// @version	1.3
// @namespace     http://greasemonkey.org/download/
// @description	Remove Hotmail top Ad banner bar
// @include	http://*.mail.live.com/*
// ==/UserScript==

var adBar = document.getElementById('RadAd_Banner');
if (adBar) {
    adBar.parentNode.removeChild(adBar);
}

var rows = document.evaluate(
    "//div[@class='cToolsCustomerCommunication']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
if (rows.snapshotLength>0) {
    adBar = rows.snapshotItem(0);
    adBar.parentNode.removeChild(adBar);
}

// Quick and dirty fix to the annoying bug in reading pane:
// filling message with blue lines on scrolling down. 
var readPane = document.getElementById('ReadMessagePane');
if (readPane) {
    readPane.style.height = '99%';
}
