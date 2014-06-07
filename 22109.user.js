// ==UserScript==
// @name          Gigapedia.org Smoother View
// @namespace     http://lajevardi.persiangig.ir/code/gm/
// @description	  Will remove the ugly banner at gigapedia.org
// @author        Sepehr Lajevardi
// @include       http*://*gigapedia.org/*
// @include       http*://*gigapedia.info/*
// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); #footer img,#footer iframe,#footer object, #middle_bar td iframe,#middle_bar td img,#middle_bar td object, #main td iframe,#main td object, .konaBox,.konaBottomBox,.top_curve,object{display:none !important;} *{font-family:verdana !important; font-size:8pt !important;} #loading_marker img{margin-top:5px !important;} #loading_marker{ -moz-border-radius:0 0 5px 5px !important; -moz-opacity:0.8 !important; margin-right:5px !important; padding:0 5px 5px 0 !important;}";
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
