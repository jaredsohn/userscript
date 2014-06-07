// ==UserScript==
// @name	FFFFOUND - make prettier
// @author	  stefankunze
// @description   enhance the look and feel of FFFFOUND
// @version       0.0.1
// @homepage      http://userstyles.org/styles/5099
// @include       http://ffffound.com/*
// @include       https://ffffound.com/*
// @include       http://*.ffffound.com/*
// @include       https://*.ffffound.com/*
// ==/UserScript==
(function() {
var css = "body {\n       border-top: 5px solid black !important;\n       margin: 0 !important;\n       padding: 0 !important;\n       font-family: arial, sans-serif !important;\n   }\n         #logo, #logo img {\n       display: none !important;\n   }\n             .quote, #title {\n       display: none !important;\n   }\n         .header {\n       background: #000 !important;\n       padding: 20px !important;\n       width: 620px !important;\n       font-size: 11px !important;\n       color: #333 !important;\n   }\n         .user_activity .header, .ads .header {\n       background: #fff !important;\n       padding: 5px 0 !important;\n       color: #000 !important;\n       font-size: 14px !important;\n       font-weight: 800 !important;\n   }\n         .title {\n       overflow: hidden !important;\n   }\n         .header a:link, .header a:active, .header a:visited {\n       color: #FFF !important;\n   }\n         .header a:hover {\n       color: #555 !important;\n   }\n         .description {\n       color: #555 !important;\n   }\n     a, a:link, a:active, a:visited {\n       color: #333 !important;\n       font-weight: 800 !important;\n   }\n     a:hover {\n       color: orange !important;\n   }\n     #menu-greeting {\n       font-family: georgia !important;\n       font-size: 20px !important;\n   }\n     .paging {\n       border: 1px solid #ccc !important;\n       padding: 1px !important;\n       background: #f1f1f1 !important;\n       font-size: 11px !important;\n   }";
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