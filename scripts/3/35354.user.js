// ==UserScript==
// @name           livedoor Reader 2 instapaper
// @namespace      http://d.hatena.ne.jp/zorio/ldr2instapaper
// @description    add instapaper from ldr
// @include        http://reader.livedoor.com/reader/*
// ==/UserScript==
(function(){
	var w = unsafeWindow;
	var shortCutKey = 'b';
	function toInstapaper(title, url)
	{
		var e = encodeURIComponent;
		var f = 'http://www.instapaper.com/b?v=4&k=P74hc7quoZK6&u=' + e(url) + '&t=' + e(title);
		setTimeout(function(){
			w.open(f,'t','toolbar=0,resizable=0,status=1,width=250,height=150');
		}, 0);
	}
	function keyEvent()
	{
		var item = w.get_active_item(true);
		var title = item.title;
		var url = item.link;
		debug(title);
		debug(url);
		toInstapaper(title, url);
	}
	function onLoad()
	{
		debug("added");
		w.Keybind.add(shortCutKey, keyEvent);
	}
	w.addEventListener('load', onLoad, false);
})();
