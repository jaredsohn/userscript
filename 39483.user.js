// ==UserScript==
// @name           Bahamut Image Relinker
// @namespace      http://dodob.shackspace.com/greasemonkey/
// @description    Make Bahamut article screenshots middle-clickable in Firefox
// @include        http://gnn.gamer.com.tw/*
// @include        http://gamer.com.tw/*
// ==/UserScript==

(function() {
    function getTime() { benchmarkTimer = new Date(); return benchmarkTimer.getTime(); }
    var benchmarkTimer = null;
    var scriptStartTime = getTime();

	imgs = document.evaluate(
		'//a[contains(@href, "javascript:showpic")]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	for (var i=0, img=null; img = imgs.snapshotItem(i); i++) {
		var params = img.href.match(/showpic\((\d*,\d*),'(.*)'\)/i);
		//GM_log(img.href + '..' + params[1]+'..'+params[2]);
		img.setAttribute('class', params[1]);
		img.href = unescape(params[2]);
		img.addEventListener('click', function(e) {
			//GM_log(this.className);
			var snt = this.className.split(',');
			//GM_log(params);
			unsafeWindow.showpic(snt[0], snt[1], this.href);
			//e.stopPropagation();
			e.preventDefault();
			}, true);
	}

    GM_log((getTime() - scriptStartTime) + 'ms');

})();

