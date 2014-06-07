// ==UserScript==
// @name           AutoPagerize Filter for Yahoo! Auction Japan
// @namespace      http://d.hatena.ne.jp/kurumigi/
// @description    Yahoo!オークションに、AutoPagerizeが適用されるようにします。(AutoPagerize Filter for Yahoo! Auction Japan.)
// @include        http://auctions.search.yahoo.co.jp/search?*
// @version        0.2
// ==/UserScript==

// このスクリプトはAutoPagerizeより先に実行される必要があります。
// インストール後、Greasemonkeyの「ユーザースクリプトの管理」メニューで
// このスクリプトがAutoPagerizeより上になるように 必 ず 並べ替えてください。

(function() {
	// rewrite link to next page.
	function rewriteNextLink(doc) {
		var a = doc.evaluate('id("Sp1")/p/strong/following-sibling::a[1]', doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		if (a.singleNodeValue) {
			a.singleNodeValue.href = decodeURIComponent(a.singleNodeValue.href.replace(/^http:\/\/.*\/\*-/,''));
		}
	}
	
	// push filters.
	function addFilterHandler() {
		if (window.AutoPagerize.addDocumentFilter) {
			window.AutoPagerize.addDocumentFilter(rewriteNextLink)
		}
	}
	
	// execute rewriting.
	rewriteNextLink(document);
	
	// for AutoPagerize.
	if (window.AutoPagerize) {
		addFilterHandler();
	} else {
		window.addEventListener('GM_AutoPagerizeLoaded', addFilterHandler, false);
	}

})();
