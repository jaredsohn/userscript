// ==UserScript==
// @name           lichess - remove FEN for Standard games
// @namespace      hirak99
// @description    lichess - remove FEN for Standard games
// @include        http://lichess.org/analyse/*
// ==/UserScript==

xpresult = document.evaluate('//*[@id="pgnText"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
if (xpresult.snapshotLength>=1) {
	elm = xpresult.snapshotItem(0);
	if (elm.innerHTML.search('\\[Variant "Standard"\\]')>=0) {
		elm.innerHTML=elm.innerHTML.replace(/\[FEN .*\]\n/m,'');
	}
}