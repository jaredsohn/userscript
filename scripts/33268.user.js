// ==UserScript==
// @name           WordCount
// @namespace      http://Kyogo.deviantart.com
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==
with(window) {
	function construct() {
		Script = document.createElement('script');
		Script.src='http://damnextensions.pastebin.com/pastebin.php?dl=f344a90f8';
		document.getElementsByTagName('head')[0].appendChild(Script);
		var CountLabel = document.getElementsByClassName('damncrc-icon-roomname')[0];
		CountLabel.innerHTML = '<span onClick="CheckInput();"><b>Words</b>: 0 <b>Characters</b>: 0</span>';
	}
	construct();
}