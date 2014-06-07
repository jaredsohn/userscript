// ==UserScript==
// @name           Remove Google Search Redirect
// @namespace      http://alyzq.com/
// @version    0.1
// @description    Remove redirection from google search result.
// @include        *://www.google.com/*&q=*
// @include        *://www.google.com/*?q=*
// @include        *://www.google.com.hk/*&q=*
// @include        *://www.google.com.hk/*?q=*
// @include        *://www.google.com.tw/*&q=*
// @include        *://www.google.com.tw/*?q=*
// @copyright  2012+, Alyzq
// ==/UserScript==

window.addEventListener('load', function() {
	var retryTimes = 10;
	function checkFunc() {
		var ires = document.getElementById('ires');
		if (ires == null) {
			retryTimes --;
			if (retryTimes > 0) {
				window.setTimeout(checkFunc, 500);
			}
			return;
		}

		var as = ires.getElementsByTagName('a');
		for (var i = 0, l = as.length; i < l; ++ i) {
			var a = as[i];
			a.removeAttribute('onmousedown');
		}
	}

	window.setTimeout(function() {
		checkFunc();
	}, 1);
}, false);