// ==UserScript==
// @name           Google Trends Hot Searches insert Graph
// @description    Insert a Graph into the "Google Trends Hot Searches". "Google Trends Hot Searches" にグラフを追加します。
// @version        0.1.0
// @namespace      http://www.sharkpp.net/
// @author         Shark++ / sharkpp
// @include        http://google.co.jp/trends/hottrends
// @include        http://google.co.jp/trends/hottrends?sa=X*
// @include        http://google.com/trends/hottrends
// @include        http://google.com/trends/hottrends?sa=X*
// @include        http://www.google.co.jp/trends/hottrends
// @include        http://www.google.co.jp/trends/hottrends?sa=X*
// @include        http://www.google.com/trends/hottrends
// @include        http://www.google.com/trends/hottrends?sa=X*
// ==/UserScript==

(function(){

	var items;

	items
		= document.evaluate(
			"//a[starts-with(@href, '/trends/hottrends?q=')]",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);

	for (var i = 0; i < items.snapshotLength; i++) {
		var item= items.snapshotItem(i);
		var img = item.parentNode.appendChild(document.createElement('img'));
		img.src = item.href.replace('hottrends?', 'viz?hl=&').replace('&sa=X', '&graph=hot_img&sa=X');
		img.style.cssText = "display: block; height: 95px; margin-bottom: 1em;";
	}

})();
