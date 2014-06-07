// ==UserScript==
// @name           twChangeDoingToKisama
// @namespace      http://d.hatena.ne.jp/keimar/
// @description    発言ボックスの上にある問いかけを「貴様、今何を考えている？」に変更します。
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @version        2.0
// ==/UserScript==

(function(){
	
	var msg = "貴様、今何を考えている？";
	
	var msgLabel = document.getElementsByClassName('doing')[0];
	
	// Add jQuery if not loaded
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_JQ = document.createElement('script');
		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js';
		GM_JQ.type = 'text/javascript';
		document.getElementsByTagName('body')[0].appendChild(GM_JQ);
	}
	
	// Check if jQuery's loaded
	function GM_wait() {
		if (typeof unsafeWindow.jQuery == 'undefined') {
			window.setTimeout(GM_wait,100);
		} else {
			jQuery = unsafeWindow.jQuery;
			letsJQuery();
		}
	}
	GM_wait();

	// All your GM code must be inside this function
	function letsJQuery() {
		msgLabel.innerHTML = msg;
		jQuery("#home").click(function(){msgLabel.innerHTML = msg;});
	}
})();
