// Reddit Parent and Permalink Comment Fix
// version 0.1
// 2007-11-14
// Released into public domain.
// Do whatever you want with it.
//-----------------------------------------
//
// ==UserScript==
// @name Reddit Parent and Permalink Comment Fix
// @description Fix comment parent and permalink links.
// @include http://reddit.com/info/*/comments*
// @include http://*.reddit.com/info/*/comments*

var links, a;
links = document.evaluate(
    "//a[starts-with(@href, 'bylink')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < links.snapshotLength; i++) {
    a = links.snapshotItem(i);	
	if(a.innerHTML=='parent') {
		a.href=a.href.replace("#c","#cc");
	} else if(a.innerHTML == 'permalink') {
		a.href=a.href.replace("/comments/c","/comments/cc");
	}
}
