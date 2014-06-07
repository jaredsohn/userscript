// ==UserScript==
// @name           LDR - National Geographic News - Enlarge Photo
// @namespace      http://userscripts.org/users/7010
// @include        http://reader.livedoor.com/reader/
// ==/UserScript==

var RE_THMB = new RegExp('(<img[^>]+http://news.nationalgeographic.com/news/images/thumbs/(.*?)_60x40.jpg.+?>)');

with(unsafeWindow){
	register_hook('BEFORE_PRINTFEED', function(feed) {
		if(!feed.channel.link.match('http://news.nationalgeographic.com'))
			return;
		
		foreach(feed.items, function(item){
			item.body = item.body.replace(RE_THMB, '<p><img src="http://news.nationalgeographic.com/news/bigphotos/images/$2_big.jpg" ></p>$1');
		})
	});
}