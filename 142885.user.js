// ==UserScript==
// @name           asanusta Tumblr Fix Add/Remove Link
// @namespace      http://rhyley.org/gm/
// @description    Çizgi üzerinde 'eklemek / kaldırmak' bağlantısını yönlendirir-Makes the 'add/remove' link on the dash actually go to the correct place. 
// @include        http://www.tumblr.com/*
// @date           02.09.2012
// ==/UserScript==

(function(d){
var addremove = document.evaluate("//a[@class='add_and_remove']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(addremove.snapshotLength){
	addremove = addremove.snapshotItem(0);
	addremove.href = '/following';
	}
}(document));