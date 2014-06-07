// ==UserScript==
// @name           addLink_bitlyInfo
// @namespace      http://d.hatena.ne.jp/so_blue/
// @author         so_blue
// @version        1.0
// @description    bit.ly,j.mpのトラッキングページへのリンクをプラスします。
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
(function() {

	function addLink(doc) {

		var xpath = './/span[@class="entry-content"]/a[contains(@href, "bit.ly") and not(contains(@class, "bitlyInfo"))] | ' +
					'.//span[@class="entry-content"]/a[contains(@href, "j.mp") and not(contains(@class, "bitlyInfo"))]';
		var bits = document.evaluate(xpath, doc, null, 7, null);
		if (bits) {
			var a = document.createElement('a')
			a.target = '_blank';
			a.className = 'bitlyInfo';
			var btn = document.createElement('img');
			btn.src = 'data:image/png;base64,' +
						'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ' +
						'bWFnZVJlYWR5ccllPAAAAN9JREFUeNpiPDPTmAEKdIE4DYhBAu+A+CwQ9wHxR5AkC1RRPhB3ATEb' +
						'AwJ4A3EyEAcB8SkmIGEPxL0wRZpBixmUXDpgiqWBeAUQ84AUtgMxMwNuoAjEOYxAN/7hEtFkBpmE' +
						'DVxY6MTw9+enTSA3Mv/8/JThxYWFYAlBJReGv78+MXx6cgrMByoCUcwghZeBHN2npyaDJfhkzBh+' +
						'fnrKAOPDDAa5sRtZ5P29PQyfnp5CFnoNCiaQiYuhYQcKIrgToAAUhtGgcGWCChQAsScQ74CacAeI' +
						'FwCxNhDvBikACDAA2axC0YDnGLwAAAAASUVORK5CYII=';
			btn.alt = 'bitlyInfo button';
			a.appendChild(btn);
			for (var i = 0, len = bits.snapshotLength; i < len; i++) {
				var url = bits.snapshotItem(i).href;
				if (url.slice(-1) != '+') {
					var elm = a.cloneNode(true);
					elm.href = url + '+';
					bits.snapshotItem(i).parentNode.insertBefore(elm, bits.snapshotItem(i).nextSibling);
				}
			}
			//後始末?
			a = btn =  null;
		}
	}

	document.body.addEventListener('DOMNodeInserted', function(evt) {
		var doc = evt.target;
		addLink(doc);
	}, false);

	addLink(document.body);

})();