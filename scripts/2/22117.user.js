// ==UserScript==
// @name          Userstyles.org Smoother View
// @namespace     http://lajevardi.persiangig.ir/code/gm/
// @description	  Userstyles.org in an smoother view.
// @author        Sepehr Lajevardi
// @include       http://userstyles.org/*
// @include       https://userstyles.org/*
// @include       http://*.userstyles.org/*
// @include       https://*.userstyles.org/*
// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); ul{list-style:none !important;} #style-show{width:60% !important; margin-left:20px !important;} #header-bar{height:44px !important;} #logo{font-size:18pt !important;} .simple-link-ads{display:none !important;} body,div,p,ul,li{ font-family:verdana!important; font-size:8pt !important;}";
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