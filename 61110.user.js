// ==UserScript==
// @name           AutoPagerize Filter for moe.imouto.org
// @namespace      http://d.hatena.ne.jp/kurumigi/
// @description    Apply "AutoPagerize" to moe.imouto.org and Konachan.com.
// @include        http://moe.imouto.org/post*
// @include        http://konachan.com/post*
// @version        0.2
// ==/UserScript==

(function() {

	// strip "javascript-hidden" class.
	function stripClass(evt) {
		var posts = evt.target.getElementsByTagName('li');
		Array.forEach(posts, function(post) {
			post.className = post.className.replace("javascript-hide","");
		});
	}
	
	// push filters.
	function addFilterHandler() {
		if (window.AutoPagerize.launchAutoPager) {
			var siteinfo = [{
				url:          '^http://(?:moe\.imouto\.org|konachan\.com)/post',
				nextLink:     'id("paginator")/div[@class="pagination"]/a[text()=">>"]',
				pageElement:  'id("paginator")/preceding-sibling::div[1]',
				exampleUrl:   'http://konachan.com/post',
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
	document.body.addEventListener('AutoPagerize_DOMNodeInserted', stripClass, false);

})();
