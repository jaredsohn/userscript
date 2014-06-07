// ==UserScript==
// @name           directLinkRefererAll
// @namespace      http://d.hatena.ne.jp/so_blue/
// @include        http://d.hatena.ne.jp/*/archive?mode=edit
// ==/UserScript==
(function(){
	xpath = 'id("main")/form/div/table[@class="table-list"]/tbody/tr/td[4]/a';
	var as = document.evaluate(xpath, document.body, null, 7, null);
	for (var i = 0, len = as.snapshotLength; i < len; i++) {
		as.snapshotItem(i).href += '&referer=all';
	}
})();