// ==UserScript==
// @name           TJTST Tweaks
// @namespace      http://lomaji.com/poj/tools/
// @description    Make the TJTST pre-select "Unicode" as default.
// @include        http://taigi.fhl.net/dict/
// @include        http://taigi.fhl.net/dict/index.html
// ==/UserScript==

var a = document.evaluate(
	"//input[@name='graph']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
//if (!a) return;
for (var i=0; i<a.snapshotLength; i++) {
	var thisElem=a.snapshotItem(i);
	switch (thisElem.value) {
		case '1':
			 thisElem.checked=false;
			break;
		case '2':
			 thisElem.checked=true;
			break;
	}
}
