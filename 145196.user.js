// ==UserScript==
// @name        True Blood home button tumblr
// @namespace     http://userstyles.org
// @description	  True blood 
// @author      Trubieholic
// @homepage      http://userstyles.org/styles/72528
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "";
css += "@namespace url(http://www.w3.org/1999/xhtml);";
if (false || (document.location.href.indexOf("http://www.tumblr.com/") == 0))
	css += "#home_button {\n\n    padding-right: 17px !important;\n}\n\n#home_button a {\n    height: 0 !important;\n    width: 0 !important;\n    top: -7px !important;\n    padding-left: 40px !important;\n    padding-top: 46px !important;   \n    background: url('http://25.media.tumblr.com/tumblr_ma1nwwdeE11qiv5sqo1_r1_100.png') !important;}";
css += "#home_button .tab_notice {\n    left: 56px !important;\n    right: auto !important;\n}";
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