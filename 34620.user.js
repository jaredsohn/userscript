// ==UserScript==
// @name           HatebuCount on LDR
// @namespace      http://d.hatena.ne.jp/ABCbo/
// @include        http://reader.livedoor.com/reader/
// ==/UserScript==

(function() {
	var w = unsafeWindow;
	with(w) {
		register_hook('before_printfeed', function(feed) {
			var items = feed.items;
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				var link = item.link.replace(/#/g,'%23');
				if (!item.body.match(/hatebu_count/)) {
					item.body
						= '<div class="hatebu_count"><a href="http://b.hatena.ne.jp/entry/' + link + '">'
						+ '<img style="border:none;" src="http://b.hatena.ne.jp/entry/image/' + link + '"></a></div>'
						+ item.body;
				}
			}
		});
	}//with(w)
})();