// ==UserScript==
// @name           AutoPagerize Filter for SPACE ALC
// @namespace      http://d.hatena.ne.jp/kurumigi/
// @description    Apply "AutoPagerize" to SPACE ALC.
// @include        http://eow.alc.co.jp/*/*/*
// @version        0.4
// ==/UserScript==

// concept of this script based on "misc.AutoPagerize"(http://d.hatena.ne.jp/os0x/20090109/1231489489).
// thanks to id:os0x!

(function() {
	// rewrite link to next page.
	function alc(doc){
		var a = doc.evaluate('id("paging")/a[last()]', doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (a.snapshotLength) {
			a.snapshotItem(0).id = 'AutoPagerizeNextLink';
			a.snapshotItem(0).href = a.snapshotItem(0).href.replace(/javascript:goPage\("(\d+)"\)/,'./?pg=$1');
		}
	}
	
	// push filters.
	function addFilterHandler() {
		if (window.AutoPagerize.addDocumentFilter) {
			window.AutoPagerize.addDocumentFilter(alc)
		}
		if (window.AutoPagerize.launchAutoPager) {
			var siteinfo = [{
				url:          'http://eow\\.alc\\.co\\.jp/.*?/.*?/',
				nextLink:     'id("AutoPagerizeNextLink")',
				pageElement:  'id("resultsList")/ul',
				exampleUrl:   'http://eow.alc.co.jp/are/UTF-8/',
			}]
			window.AutoPagerize.launchAutoPager(siteinfo);
		}
	}
	
	// execute rewriting.
	alc(document);
	
	// for AutoPagerize.
	if (window.AutoPagerize) {
		addFilterHandler();
	} else {
		window.addEventListener('GM_AutoPagerizeLoaded', addFilterHandler, false);
	}
})();
