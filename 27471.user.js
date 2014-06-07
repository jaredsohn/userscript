// ==UserScript==
// @name           Twitter Time Converter
// @namespace      http://www.sukechan.net/
// @description    The format of posted date is change.
// @include        http://twitter.com/*
// @version        1.0.2
// ==/UserScript==

(function() {
	var f = function() {
		var x = document.evaluate('//a[@class="entry-date"]/span | //a[@class="entry-date"]/abbr', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < x.snapshotLength; i++) {
			var item = x.snapshotItem(i);
			var ds = parseDate(item.getAttribute("title"));
			if (ds) item.parentNode.innerHTML = ds;
		}
	}
	function parseDate(s) {
		var arr = s.split(/[^0-9]/);
		if (arr.length == 8) {
			for (var j = 0; j < arr.length; j++) arr[j] = arr[j] - 0;
			var msec = Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
			if (s.indexOf("+") < 0) arr[6] *= -1;
			msec -= (arr[6] * 60 + arr[7]) * 60 * 1000;
			var dt = new Date(msec);
			return dt.getFullYear() + "/" + padZero(dt.getMonth() + 1) + "/" + padZero(dt.getDate()) + " " + padZero(dt.getHours()) + ":" + padZero(dt.getMinutes());
		} else {
			return;
		}
	}
	function padZero(s) {
		return ("0" + s).slice(-2);
	}
	f();
	addFilter(f);
	function addFilter(filter, i) {
		i = i || 4;
		if (window.AutoPagerize && window.AutoPagerize.addFilter) {
			window.AutoPagerize.addFilter(filter);
		}
		else if (i > 1) {
			setTimeout(arguments.callee, 1000, filter, i -1);
		}
	}
})();