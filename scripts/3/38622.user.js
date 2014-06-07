// ==UserScript==
// @name           Hanamasa Daisuki
// @namespace      http://ikenie.com/
// @include        *
// @require        http://gist.github.com/raw/3242/1a7950e033a207efcfc233ae8d9939b676bdbf46
// ==/UserScript==

(function() {
	function HanamasaDaisuki(doc) {
		$X("//img", doc).forEach(function(item) {
			item.src = "http://w.ikenie.com/hanamasa/hanamasa.png";
		});
		$X("//div", doc).forEach(function(item) {
			item.style.backgroundImage = "url(http://w.ikenie.com/hanamasa/hanamasa.png)";
		});
		document.body.style.backgroundImage = "url(http://w.ikenie.com/hanamasa/hanamasa.png)";
	}
	
	HanamasaDaisuki(document);

	setTimeout(function() {
		if (window.AutoPagerize && window.AutoPagerize.addDocumentFilter) {
			window.AutoPagerize.addDocumentFilter(HanamasaDaisuki);
		}
	}, 0);
})();
