// ==UserScript==
// @name           rlslog.net - remove the dodgy code
// @namespace      blurg
// @description    removes the dodgy code from the nextpage/previouspage links
// @include        http://www.rlslog.net/
// @include        http://www.rlslog.net/*
// ==/UserScript==

var mems = document.evaluate( '//a[contains(@href, "energy-serv.ro")]' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

for (var l = 0; l < mems.snapshotLength; l++){
    var h = mems.snapshotItem(l).href.split('?')[0];
	mems.snapshotItem(l).href=h;
}
