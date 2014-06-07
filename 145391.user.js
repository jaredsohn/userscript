// ==UserScript==
// @name          mags tumblr
// @description	  mags
// @author        scottysamplenacelles
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#home_button {\n\n    padding-right: 20px !important;\n}\n\n\n#home_button a {\n\n    height: 0 !important;\n    width: 0 !important;\n    top: -7px !important;\n    padding-left: 60px !important;\n    padding-top: 60px !important;\n    background: url('http://i45.tinypic.com/xkrd6o.png') !important;\n}\n\n#home_button .tab_notice {\n    left: 15px !important;\n    right: auto !important;\n}";
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