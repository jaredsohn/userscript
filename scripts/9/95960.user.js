// ==UserScript==
// @name          Xiami Radio simple
// @version      1.0
// @namespace     http://userstyles.org
// @description	  simplify Xiami Radio for fluid
// @author        Xi Chen
// @include       http://www.xiami.com/radio/play/type/10/oid*
// @include       http://www.xiami.com/radio/play/id/143576
// @include       http://www.xiami.com/radio/play/id/146176
// @include       http://www.xiami.com/radio/play/id/2
// ==/UserScript==

(function() {
var css = ".radioID_action.wscreen {display:none !important;} #footer {display:none !important;} \.radioID_grid.bo120.wscreen {display:none !important;}";
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
