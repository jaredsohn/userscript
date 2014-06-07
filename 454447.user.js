// ==UserScript==
// @name          绿色链接
// @namespace     http://userscripts.org
// @description	个性化链接
// @author        独立观察员DLGCY
// @copyright     2014 独立观察员
// @version       1.0
// @homepage      http://userscripts.org/scripts/show/454447
// @updateURL     http://userscripts.org/scripts/source/454447.meta.js
// @downloadURL   http://userscripts.org/scripts/source/454447.user.js
// @include       http://*
// @exclude       http://dlgcy.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "@charset \"utf-8\";\n@namespace url(http://www.w3.org/1999/xhtml);\n\na:hover {\n    color: #009933!important;\n}\na:visited {\n color:#999999!important ;\n}\n\n";
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