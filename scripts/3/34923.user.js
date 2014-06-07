// ==UserScript==
// @name           Amazon to 7andY isbn redirector
// @namespace      http://www.hatena.ne.jp/r-west/
// @include        http://www.7andy.jp/all/search_result/*
// @description    
// ==/UserScript==
(function () {
	if(document.referrer.indexOf('amazon')>-1){
		var	zz=document.evaluate('//td/small/a[contains(@href,"detail/-/accd")]',document,document.createNSResolver(document),XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		location.href=zz.snapshotItem(0);
	}
})();
