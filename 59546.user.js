// ==UserScript==
// @author         hisasann
// @name           NicoSearchMostPlayback
// @namespace      http://hisasann.com/
// @description    ニコニコ動画検索画面の順プルダウンを「再生が多い順」で開くGM
// @include        http*://www.nicovideo.jp/search/*
// ==/UserScript==
// VERSION 01

(function() {
	
	var selects = xpath("/html/body/div[2]/div/div[2]/table/tbody/tr/td/form/select", document);
	if(!selects.snapshotLength) { return; }

	var select = selects.snapshotItem(0);
	// 投稿が多い順の場合
	if (!/.+(sort=|order=)\S/i.test(location.href)) {
		select.selectedIndex = 2;		// 再生が多い順にする
		fireChangeEvent(select);
	}

	function fireChangeEvent(elem) {
		var event = document.createEvent("HTMLEvents");
		event.initEvent('change', true, false);
		elem.dispatchEvent(event);
	}
	
	function xpath(query, context) {
		return document.evaluate(query, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}

})();
