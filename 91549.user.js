// ==UserScript==
// @name Twitter - Hide Who to follow
// @description Remover coluna "Who to follow" da página do novo twitter.
// @version 0.0.2.3
// @include *://twitter.com/*
// @author wesleycota
// ==/UserScript==

var heads = document.getElementsByTagName("body");
if (heads.length > 0) {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(".user-rec-inner {display:none!important;} ul.trends li {float:left!important;width:50%!important;} .trends-inner {width:100%!important;min-height:0!important;}"));
	heads[0].appendChild(node); 
}