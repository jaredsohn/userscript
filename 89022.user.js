// ==UserScript==
// @author			Kitsuneymg
// @name			Dilbert Cleanup
// @namespace		http://google.com/kitsuneymg/dilbertcleanup
// @description		Cleanup Dilbert.com and makes it bearable
// @include			http://dilbert.com/*
// ==/UserScript==

(function(){
var css="\
body,\
.STR_Header\
{\
	background-image: none !important;\
}\
\
div.FTR_FooterTop,\
div.FTR_Footer,\
div.Header,\
div.STR_Search,\
.STR_Zoom,\
div.STR_Footer,\
div.Col_A > H1,\
div.Col_B,\
div.STR_StripComments,\
div.STR_AdBlock,\
div.HPG_Promo,\
div.HPG_Promo_Template\
{\
	display: none !important;\
}\
";
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