// ==UserScript==
// @name           MLIA
// @include        http://mylifeisaverage.com/*
// @include        http://www.mylifeisaverage.com/*
// ==/UserScript==
	
var s = document.evaluate('//a[text()="meh"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0,meh;(meh=s.snapshotItem(i)); i++) {
	meh.parentNode.removeChild(meh)
 }
  
var s = document.evaluate('//span[@class="v_neg"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0,meh;(meh=s.snapshotItem(i)); i++) {
	meh.parentNode.removeChild(meh)
 }