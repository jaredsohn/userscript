// ==UserScript==
// @name        LDR Instapaper
// @namespace   http://codefairy.org/ns/userscripts
// @include     http://reader.livedoor.com/reader/
// @include     http://fastladder.com/reader/
// ==/UserScript==
// @author      yksk <http://twitter.com/yksk>
// @license     MIT License
// @version     0.1.1

new function() {
	var shortcut = 'l';
	var key = 'bPud1m56WvvF';

	var gm = (typeof unsafeWindow != 'undefined');
	var w = gm ? unsafeWindow : window;

	var load = function() {
		w.Keybind.add(shortcut, function() {
			var i = w.get_active_item(true);
			instapaper(i.title, i.link);
		});
	};

	var instapaper = function(title, link) {
		var url = 'http://www.instapaper.com/b?'+[
			'v=4',
			'k='+key,
			'u='+encodeURIComponent(link),
			't='+encodeURIComponent(title)
		].join('&');
		w.open(url, 't', 'toolbar=0,resizable=0,status=1,width=250,height=150');
	};

	gm ? w.addEventListener('load', load, false) : load();
};
