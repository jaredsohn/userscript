// ==UserScript==
// @name          Masuda Genkyu Date
// @namespace     http://www.petitnoir.net/
// @description   
// @include       http://anond.hatelabo.jp/*
// ==/UserScript==


(function timestamp(){
	var　refererlist = document.evaluate('//ul/li',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (i=0; i < refererlist.snapshotLength; i++) {
		var list = refererlist.snapshotItem(i);
		var p = list.innerHTML;
		var re = p.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{2}:[0-9]{2}/);
		if(re){
			var date =document.createElement('span');
			date.textContent =re;
			list.insertBefore(date, list.firstChild);
		}
	}
})();