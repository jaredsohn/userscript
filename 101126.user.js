// ==UserScript==
// @name          Simple Google Reader Style
// @namespace     http://www.zhcexo.com/user-js-for-google-reader/
// @description	  Remove Google Reader's unimportant elements and extend the reading region. Change fonts and line height in paragraph.
// @author        ZH CEXO
// @homepage      http://www.zhcexo.com/
// @include       http://www.google.com/reader/view/*
// @include       https://www.google.com/reader/view/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml);*:focus{outline:none !important}\nhtml,body{font-family:\"Times new Roman\",\"微软雅黑\" !important;\ncolor:#333 !important;\n}\n#gbar,#guser,.gbh,a#logo-container{display:none !important}\n#main{top:0 !important;\nfont-size:110% !important;\n}\n#search{top:3px !important;\nleft:auto !important;\nright:3px !important;\n}\n#search-input{-moz-border-radius:5px}\n#chrome-view-links{right:410px !important}\n.item-body{line-height:200%}\n.lhn-section,.scroll-tree li,.goog-button-base-inner-box,#lhn-add-subscription-section,#viewer-header,#viewer-footer,#chrome-lhn-toggle{background:#E1E1E1 !important}\n#show-new{cursor:pointer;}\n#search-restrict-button .goog-menu-vertical{left:auto !important;right:0 !important;}\n.item-body p{font-size:16px !important;}";
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
