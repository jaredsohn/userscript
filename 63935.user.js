// ==UserScript==
// @name           NicovideoOpenMylists
// @namespace      http://kataho.net/
// @description    Replaces links to mylist comments with links to open mylists
// @include        http://www.nicovideo.jp/*
// ==/UserScript==

(function() {
	var replaceLinks = function(root) {
		var as = root.getElementsByTagName('a');
		for (var i = 0; i < as.length; ++i) {
			var a = as[i];
			if (a.href.indexOf('http://www.nicovideo.jp/mylistcomment/video') == 0) {
				a.href = a.href.replace('mylistcomment/video', 'openlist');
			}
		}
	};

	var replaceLinksOnNodeInsertion = function(event) {
		replaceLinks(event.target);
	};

	replaceLinks(document);
	document.addEventListener('DOMNodeInserted', replaceLinksOnNodeInsertion, false);
})();
