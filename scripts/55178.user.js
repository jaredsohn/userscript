// ==UserScript==
// @name           AutoPagerize Switcher
// @namespace      http://www.ohaco.jp/
// @description    AutoPagerize をキーボードで on/off 切り替え可能にする Greasemonkey スクリプト。
// @include        http://*
// @include        https://*
// @version        1.0.1
// ==/UserScript==

(function() {
	function init() {
		var key = 65; // a

		function toggle(event) {
			if(event.keyCode == key) {
				var e = document.createEvent('MouseEvents');
				e.initEvent('click', true, false);

				var autopagerizeLink = document.evaluate('id("autopagerize_help")/div/a[@class="autopagerize_link"]', document, null, 9, null);
				autopagerizeLink.singleNodeValue.dispatchEvent(e);
			}
		}

		function addSwitch() {
			document.addEventListener('keydown', toggle, true);
		}

		function removeSwitch() {
			document.removeEventListener('keydown', toggle, true);
		}

		var allInputText = document.evaluate('//input|//textarea', document.body, null, 5, null);

		while(inputText = allInputText.iterateNext()) {
			inputText.addEventListener('focus', removeSwitch, true);
			inputText.addEventListener('blur', addSwitch, true);
		}

		addSwitch();
	}

	if(window.AutoPagerize) {
		init();
	} else {
		document.addEventListener('GM_AutoPagerizeLoaded', init(), false);
	}
})();
