// ==UserScript==
// @name          GoogleReader Hiragino Font
// @description	  Use a Hiragino font in GoogleReader.
// @include       http://google.co.jp/reader/*
// @include       http://www.google.co.jp/reader/*
// @include       http://google.com/reader/*
// @include       http://www.google.com/reader/*
// @include       https://google.co.jp/reader/*
// @include       https://www.google.co.jp/reader/*
// @include       https://google.com/reader/*
// @include       https://www.google.com/reader/*
// ==/UserScript==

(function () {
	var styles = "html, body, input { font-family:'ヒラギノ角ゴ Pro W3','Hiragino Kaku Gothic Pro' !important;}";
	var heads  = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(styles));
		heads[0].appendChild(node); 
	}
}) ();