// ==UserScript==
// @name           AutoPagerize Filter for Danbooru
// @namespace      http://d.hatena.ne.jp/kurumigi/
// @description    Apply "AutoPagerize" to Danbooru.
// @include        http://danbooru.donmai.us/post*
// @include        http://safebooru.donmai.us/post*
// @include        http://danbooru.donmai.us/note*
// @include        http://safebooru.donmai.us/note*
// @include        http://danbooru.donmai.us/pool*
// @include        http://safebooru.donmai.us/pool*
// @version        0.4
// ==/UserScript==

(function() {

	// strip "blacklisted" class.
	function stripClass(doc) {
		var items = document.evaluate('.//span[contains(concat(" ", @class, " "), " blacklisted ")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for (var i = 0;i < items.snapshotLength; i++) {
			items.snapshotItem(i).className = items.snapshotItem(i).className.replace("blacklisted","");
		}
	}
	
	// push filters.
	function addFilterHandler() {
		if (window.AutoPagerize.launchAutoPager) {
			var siteinfo = [{
				url:          '^http://(?:dan|safe)booru\.donmai\.us/(?:post|note)',
				nextLink:     'id("paginator")/div[@class="pagination"]/a[text()=">>"]',
				pageElement:  'id("paginator")/preceding-sibling::div[1]',
				exampleUrl:   'http://danbooru.donmai.us/post',
			},{
				url:          '^http://(?:dan|safe)booru\.donmai\.us/pool/show/',
				nextLink:     'id("paginator")/div[@class="pagination"]/a[text()=">>"]',
				pageElement:  'id("paginator")/preceding-sibling::div[1]/div[last()]',
				exampleUrl:   'http://danbooru.donmai.us/post',
			}]
			window.AutoPagerize.launchAutoPager(siteinfo);
		}
	}

	// for AutoPagerize.
	if (window.AutoPagerize) {
		addFilterHandler();
	} else {
		window.addEventListener('GM_AutoPagerizeLoaded', addFilterHandler, false);
	}
	document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(evt) {
		stripClass(evt.target);
	}, false);

})();
