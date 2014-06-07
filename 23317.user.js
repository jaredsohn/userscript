// ==UserScript==
// @name           Disable HatenaB Keybind
// @namespace      http://white.s151.xrea.com/
// @include        http://b.hatena.ne.jp/*
// ==/UserScript==

(function () {
	unsafeWindow.Bookmark.removeKeybind('j');
	unsafeWindow.Bookmark.removeKeybind('k');
	unsafeWindow.Bookmark.removeKeybind('x');
	unsafeWindow.Bookmark.removeKeybind('X');
	unsafeWindow.Bookmark.removeKeybind('o');
	unsafeWindow.Bookmark.removeKeybind('O');
	unsafeWindow.Bookmark.removeKeybind('b');
	unsafeWindow.Bookmark.removeKeybind('B');
})();
