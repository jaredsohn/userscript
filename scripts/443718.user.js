// ==UserScript==
// @name       big-facebook-chat-box
// @namespace  Krzysztof Szumny
// @version    0.0.1
// @description  big-facebook-chat-box
// @include        http://*facebook.com/*
// @include        https://*facebook.com/*
// @run-at     document-start
// ==/UserScript==
// Initiate custom CSS function
function GM_addStyle(css) {
	var parent = document.getElementsByTagName("head")[0];
	if (!parent) {
		parent = document.documentElement;
	}
	var style = document.createElement("style");
	style.type = "text/css";
	var textNode = document.createTextNode(css);
	style.appendChild(textNode);
	parent.appendChild(style);
}
GM_addStyle("._50mz.opened {width: 460px;}div._50mz .fbDockChatTabFlyout{height: 485px;}.fbDockChatTabFlyout .fbNubFlyoutBody {height: 430px !important;}");
