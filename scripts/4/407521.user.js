// ==UserScript==
// @name        HideStickedThreads
// @namespace   angelforest
// @include     http://dobrochan.com/*/*.xhtml*
// @description Fix bug with cloning sticked thread with your reply in it
// @grant       unsafeWindow
// ==/UserScript==

$ = unsafeWindow.jQuery

threads = $('div.thread');
for(var i = 1; i < threads.length; i++) {
	if($(threads[i]).find('div.oppost img[src*="/images/sticky.png"]').length > 0) {
		$(threads[i]).hide(0);
	}
}