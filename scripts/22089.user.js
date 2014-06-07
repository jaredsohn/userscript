// ==UserScript==
// @name          fileFactory
// @namespace     http://jbz.wikidot.com
// @description   automatiza algunas cositas de fileFacory
// @include       http://www.filefactory.com/*
// ==/UserScript==

var initP = document.evaluate('//img[@src="/images/free_download.gif"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
var downPage = document.evaluate('//img[@src="/images/begin_download.gif"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
var deleteElements = [document.getElementById('left_menu'), document.getElementsByTagName('script')[0]]

if (initP) {
    window.location = initP.parentNode.href;
}

for (i in deleteElements) {
    if (deleteElements[i]) {
	deleteElements[i].parentNode.removeChild(deleteElements[i]);
    }
}

if (downPage) {
    window.location = downPage.parentNode.href;
}