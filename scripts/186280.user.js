// ==UserScript==
// @name        Siemens Forum Remove UsersOnline&Help
// @namespace   https://www.automation.siemens.com/WW/forum
// @include     https://www.automation.siemens.com/WW/forum/*
// @version     1.0
// ==/UserScript==

var allDivs = document.evaluate("//div[@class='actionBoxHead']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for ( var i = 0; i < allDivs.snapshotLength; i++ ) {
    allDivs.snapshotItem(i).remove();
}

allDivs = document.evaluate("//div[@class='actionBox']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for ( var i = 0; i < allDivs.snapshotLength; i++ ) {
    allDivs.snapshotItem(i).remove();
}

allDivs = document.evaluate("//span[@id='_ctl0_UserOnlineList']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for ( var i = 0; i < allDivs.snapshotLength; i++ ) {
    allDivs.snapshotItem(i).remove();
}

allDivs = document.evaluate("//div[@id='right']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for ( var i = 0; i < allDivs.snapshotLength; i++ ) {
    allDivs.snapshotItem(i).style="position:relative; left:200px;";
}
