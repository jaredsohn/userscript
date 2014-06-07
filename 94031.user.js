// ==UserScript==
// @name           AutoPagerize Filter for NAVER matome
// @namespace      http://d.hatena.ne.jp/kurumigi/
// @description    NAVERまとめに、AutoPagerizeが適用されるようにします。(Apply "AutoPagerize" to NAVER matome.)
// @include        http://matome.naver.jp/odai/*
// @version        0.1
// ==/UserScript==

// Idea of this script based on "misc.AutoPagerize"(http://d.hatena.ne.jp/os0x/20090109/1231489489).
// Thanks to id:os0x!

(function() {
	// calculate next page URL.
	function getNextPageURL(URL) {
		if (/\?page=\d+/.exec(URL)) {
			return URL.replace(/(\?page=)(\d+)/, function(d0, d1, d2) {
				// ?page=2 -> ?page=3
				return d1 + (Number(d2) + 1);
			});
		} else {
			return URL += '?page=2';
		}
	};

	// rewrite link to next page.
	function naver(doc, URL){
		var a = doc.evaluate('id("_pageNavigation")//a[contains(concat(" ", @class, " "), " mdPagination01Next ")]', doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		GM_log(URL + " / " + a.snapshotLength);
		if (a.snapshotLength) {
			a.snapshotItem(0).id = 'AutoPagerizeNextLink';
			a.snapshotItem(0).href = getNextPageURL(URL);
		}
	}

	// push filters.
	function addFilterHandler() {
		if (window.AutoPagerize.addDocumentFilter) {
			window.AutoPagerize.addDocumentFilter(naver)
		}
		if (window.AutoPagerize.launchAutoPager) {
			var siteinfo = [{
				url:          '^http://matome\\.naver\\.jp/odai/\\d+',
				nextLink:     'id("AutoPagerizeNextLink")',
				pageElement:  '//div[contains(concat(" ", @class, " "), " blMain00Body ")]',
				exampleUrl:   'http://matome.naver.jp/odai/2124502758694580359',
			}]
			window.AutoPagerize.launchAutoPager(siteinfo);
		}
	}

	// don't run in comment pages.
	if (/^http:\/\/matome\.naver\.jp\/odai\/\d+[^\/]*$/.exec(location.href)) {
		// execute rewriting.
		naver(document, location.href);

		// for AutoPagerize.
		if (window.AutoPagerize) {
			addFilterHandler();
		} else {
			window.addEventListener('GM_AutoPagerizeLoaded', addFilterHandler, false);
		}
	}
})();
