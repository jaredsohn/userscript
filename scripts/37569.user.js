// ==UserScript==
// @name           b.hatena ldrizer
// @namespace      http://ss-o.net/
// @include        http://b.hatena.ne.jp/*
// ==/UserScript==

setTimeout(function(unsafeWindow) {
	if (unsafeWindow.Hatena && unsafeWindow.Hatena.Bookmark && unsafeWindow.Hatena.Bookmark.AutoPagerize && unsafeWindow.Hatena.Bookmark.AutoPagerize.instance && window.LDRize && window.Minibuffer) {
		var autopager = unsafeWindow.Hatena.Bookmark.AutoPagerize.instance;
		autopager.oldAddEventListener('complete',function(){
			setTimeout(function(){
				window.Minibuffer.execute('LDRize::paragraph-re-collect');
			},10);
		});
		unsafeWindow.Hatena.Bookmark.Navigator.instance.keyboard.keypressObserver.stop();
	}
},10, this.unsafeWindow || this);
