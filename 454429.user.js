// ==UserScript==
// @name          网页楷体
// @namespace     http://userscripts.org
// @description	将网页字体设为楷体
// @author        独立观察员DLGCY
// @copyright     2014 独立观察员
// @version       1.01
// @homepage      http://userscripts.org/scripts/show/454429
// @updateURL     http://userscripts.org/scripts/source/454429.meta.js
// @downloadURL   http://userscripts.org/scripts/source/454429.user.js
// @include       http://*
// @exclude       http://wordpress.org.cn/*
// @exclude       http://dlgcy.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "@charset \"utf-8\";\n@namespace url(http://www.w3.org/1999/xhtml);\n\n\n*:not(i):not(span){\n    font-family: \"楷体\", \"华文楷体\",\"微软雅黑\"!important ;\n    font-weight: 600!important;\n    letter-spacing : -1px!important;\n}\n";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();