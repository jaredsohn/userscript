// ==UserScript==
// @name           AutoPagerize filter for mixi diary Emoji
// @namespace      http://iwamot.com/
// @include        http://mixi.jp/view_diary.pl?*
// @version        1.1.1
// ==/UserScript==

(function(unsafeWindow){
	if (isOpera()) {
		document.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);
	} else {
		onDOMContentLoaded();
	}

	function onDOMContentLoaded() {
		replaceEmojiPaletteHandler(document.body);

		document.body.addEventListener(
			'AutoPagerize_DOMNodeInserted',
			function(event){replaceEmojiPaletteHandler(event.target);},
			false
		);
	}

	function replaceEmojiPaletteHandler(node) {
		var anchor = node.querySelector('form[name="comment_form"] a');
		if (!anchor) return;

		var anchorObject = (isOpera()) ? anchor : anchor.wrappedJSObject;
		anchorObject.onclick = function(event){
			unsafeWindow.openEmojiPalette(
				this.parentNode.getElementsByTagName('textarea')[0],
				event
			);
			return false;
		};
	}

	function isOpera() {
		return (!!window.opera);
	}
})(this.unsafeWindow || window);
