// ==UserScript==
// @name           wiadomosci.onet.pl cleanup
// @namespace      http://mywebsite.com/myscripts
// @description    wiadomosci.onet.pl clean up
// @include        http://wiadomosci.onet.pl/*
// ==/UserScript==

//remove top 
function onetCleanUp(){
var top = document.evaluate(
    "/html/body/center/table[1]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

top = top.snapshotItem(0);
if (top.childNodes[0].childNodes.length == 3) {
	while (top.childNodes[0]) {
	    top.removeChild(top.childNodes[0]);
	}
}

var children = document.evaluate(
    "/html/body/center/table[last()]/tbody/tr[last() - 1]/TD",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

children.snapshotItem(0).setAttribute("width", "95%");
children.snapshotItem(2).parentNode.removeChild(children.snapshotItem(2));

while (yyy = document.getElementById("belka_flash")) {
	yyy.parentNode.removeChild(yyy);
}

}

onetCleanUp()