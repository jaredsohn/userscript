// ==UserScript==
// @name          iCloud Hiragino Font
// @description	  Use a Hiragino font in Windows iCloud.
// @include       http://www.icloud.com/*
// @include       http://icloud.com/*
// @include       https://www.icloud.com/*
// @include       https://icloud.com/*
// ==/UserScript==

(function () {
	var styles = "html,body,input{font-family:'ヒラギノ角ゴ Pro W3','Hiragino Kaku Gothic Pro' !important;}.message-list.col-view .message .sender, .unread .message-list.col-view .message .sender{font-family:'ヒラギノ角ゴ Pro W6','Hiragino Kaku Gothic Pro' !important;font-weight:600 !important;}";
	var heads  = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(styles));
		heads[0].appendChild(node); 
	}
}) ();