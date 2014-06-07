// ==UserScript==
// @name           Twitter notification auto-click
// @namespace      http://d.hatena.ne.jp/kurumigi/
// @description    Open "new tweets" automatically.
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @version        0.2.1
// ==/UserScript==

(function () {
	document.getElementById('page-container').addEventListener('DOMNodeInserted',function(evt) {
		if (evt.target.id == 'new-tweets-bar') {
			// dispatch 'click' event
			setTimeout(function(){
				var ev1 = document.createEvent('MouseEvent');
				ev1.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				evt.target.dispatchEvent(ev1);
			}, 0);
		} else if (/\b(?:stream-item|component)\b/.test(evt.target.className)) {
			// dispatch 'AutoPagerize_DOMNodeInserted' event
			setTimeout(function(){
				var ev2 = document.createEvent('MutationEvent');
				ev2.initMutationEvent('AutoPagerize_DOMNodeInserted', true, false, evt.relatedNode, null, '', null, null);
				evt.target.dispatchEvent(ev2);
			}, 0);
		}
	}, false);
})();
