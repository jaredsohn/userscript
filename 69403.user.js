// ==UserScript==
// @name           COOKPAD - Show Report Count
// @namespace      http://iwamot.com/
// @include        http://cookpad.com/*
// @version        1.0.3
// origin          http://d.hatena.ne.jp/samurai20000/20090715/1247668133
// ==/UserScript==

(function(){
	if (isOpera()) {
		document.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);
	} else {
		onDOMContentLoaded();
	}

	function onDOMContentLoaded() {
		showReportCount(document.body);

		document.body.addEventListener(
			'AutoPagerize_DOMNodeInserted',
			function(event){showReportCount(event.target);},
			false
		);
	}

	function showReportCount(node) {
		var anchors = collectAnchors(node);
		if (isOpera()) {
			anchors.forEach(function(a){
				var request = new XMLHttpRequest();
				request.onreadystatechange = function(){
					if (this.readyState != 4) return;
					insertReportCount(this.responseText, a);
				};
				request.open('GET', a.href, true);
				request.send();
			});
		} else {
			anchors.forEach(function(a){
				GM_xmlhttpRequest({
					method: 'GET',
					url: a.href,
					onload: function(response){
						if (isChrome()) {
							insertReportCount(response.responseText, a);
						} else {
							insertReportCount(response.responseText, a.wrappedJSObject);
						}
					}
				});
			});
		}
	}

	function collectAnchors(node) {
		var anchors = [];
		var anchorNodeList = node.querySelectorAll('a');
		for (var i = 0, j = anchorNodeList.length; i < j; i++) {
			var a = anchorNodeList[i];
			if (!a.href.match(/^http:\/\/cookpad\.com\/recipe\/\d+$/) || a.querySelector('img')) continue;
			anchors.push(a);
		}
		return anchors;
	}

	function insertReportCount(responseText, anchor) {
		var matches = responseText.match(/<span class='tsukurepo_count'>([0-9,]+)<\/span>/);
		var reportCount = (matches) ? matches[1] : 0;
		var text = document.createTextNode('(' + reportCount + '件)');
		anchor.appendChild(text);
	}

	function isOpera() {
		return (!!window.opera);
	}

	function isChrome() {
		return (!!window.chrome);
	}
})();
