// ==UserScript==
// @name          twilog Hiragino Font
// @description	  Use a Hiragino font in twilog.
// @include       http://twilog.org/*
// @include       http://www.twilog.org/*
// @include       https://twilog.org/*
// @include       https://www.twilog.org/*
// ==/UserScript==

(function () {
	var styles = "html,body,input { font-family:'ヒラギノ角ゴ Pro W3','Hiragino Kaku Gothic Pro' !important;}";
	var heads  = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(styles));
		heads[0].appendChild(node); 
	}
}) ();