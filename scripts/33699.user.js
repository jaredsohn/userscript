// ==UserScript==
// @name           larger font in Wordpress.com editor
// @author         Reder <reder.tseng@gmail.com> 
// @namespace      http://blog.reder.ws/snippets
// @include        http://*.wordpress.com/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); #tinymce, textarea#content {font-size:16px !important;  line-height: 140% !important;}";
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
})();
