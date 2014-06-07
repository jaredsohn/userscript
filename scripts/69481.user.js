// ==UserScript==
// @name           Wassr - Replace Nick to UserID
// @namespace      http://iwamot.com/
// @include        http://wassr.jp/*
// @version        1.0.0
// ==/UserScript==

(function () {
	if (isOpera()) {
		document.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);
	} else {
		onDOMContentLoaded();
	}

	function onDOMContentLoaded() {
		replaceNickToUserID(document.body);

		document.body.addEventListener(
			'AutoPagerize_DOMNodeInserted',
			function(event){replaceNickToUserID(event.target);},
			false
		);
	}

	function replaceNickToUserID(node) {
		var anchors = node.querySelectorAll('a.MsgUserName');
		for (var i = 0, j = anchors.length; i < j; i++) {
			var a = anchors[i];
			var nick = a.textContent;
			var userID = a.href.match(/[^/]*$/)[0];

			if (a.title != nick) a.title = nick;
			if (nick != userID) a.textContent = userID;
		}
	}

	function isOpera() {
		return (!!window.opera);
	}
})();
