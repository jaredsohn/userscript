// ==UserScript==
// @name           Hatena Haiku notify auto opener
// @namespace      http://d.hatena.ne.jp/kurumigi/
// @description    はてなハイク1.1の新着通知を自動で開きます。
// @include        http://h.hatena.ne.jp/*
// @include        http://h.hatena.com/*
// @include        http://h1beta.hatena.ne.jp/*
// @include        http://h1beta.hatena.com/*
// @version        1.2
// ==/UserScript==

location.href = 'javascript:(' + function(){
(function(unsafeWindow){
	document.getElementById('main').addEventListener('DOMNodeInserted',function(evt) {
		if ((evt.relatedNode.id == 'notifier') && (evt.target.textContent != unsafeWindow.Hatena.Locale.text('haiku.2010.using_beta'))) {
			location.href = 'javascript:(' + function(){
				var ev1 = document.createEvent('MouseEvents');
				ev1.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				document.getElementById('notifier').dispatchEvent(ev1);
			}.toString() + ')()';
		}
	}, false);
})(this.unsafeWindow||window);
}.toString() + ')()';