// ==UserScript==
// @name        LDR with Twib Count Images
// @namespace   http://shokai.org/
// @include     http://reader.livedoor.com/reader/*
// @version     0.1
// ==/UserScript==

// based on http://d.hatena.ne.jp/tnx/20060716/1152998347
// based on http://tokyoenvious.xrea.jp/b/web/livedoor_reader_meets_hatebu.html
// based on http://la.ma.la/blog/diary_200703221812.htm

(function(){
	var w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
	var description = "add twib count on LDR";
	w.entry_widgets.add('twib_counter', function(feed, item){
		var link = item.link.replace(/#/g,'%23');
		return [
			'<a href="http://twib.jp/url/', link, '">',
			'<img border="0" src="http://image.twib.jp/counter/',link, '" /></a>'
		].join('');
	}, description);
})();