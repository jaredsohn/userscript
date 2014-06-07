// ==UserScript==
// @name           twitters link http to https
// @namespace      http://www.hatena.ne.jp/so_blue/
// @description    twitterアカウントへのリンクurlをhttpsに変換します
// @include        http://*
// ==/UserScript==
(function(){

	xpath = '//a[contains(@href, "http://twitter.com/")]|//area[contains(@href, "http://twitter.com/")]';
	
	function changeProtocol(page) {
		var anchors = document.evaluate(xpath, page, null, 7, null);
		if (anchors) {
			for (var i = 0, len = anchors.snapshotLength; i < len; i++) {
				var url = anchors.snapshotItem(i).href.toLowerCase();
				anchors.snapshotItem(i).href = url.replace('http', 'https');
			}
		}
	}

	//AutoPagerize対応
	document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(evt) {
		var doc = evt.target;
		changeProtocol(doc);
	}, false);

	changeProtocol(document.body);

})();