// ==UserScript==
// @name           TesteScript
// @author         
// @namespace      
// @description    
// @version        1.0
// @include 	   http://*.orkut.com.br/*
// ==/UserScript==

var css = "#rhs_ads{display: none;}";
css = css + "body{background-image:url(http://img390.imageshack.us/img390/1670/cruzeirofundo.jpg);}";

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
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


