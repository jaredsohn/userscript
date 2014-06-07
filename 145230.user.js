// ==UserScript==
// @name          moulin rouge - tumblr dashboard icon
// @namespace     http://userstyles.org
// @description	  how wonderful life is, now you're in the world
// @author        rachelberry
// @homepage      http://userstyles.org/styles/72837
// @include       http://www.tumblr.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
    var css = "#home_button {\n\n    padding-right: 17px !important;\n}\n\n\n#home_button a {\n\n    height: 0 !important;\n    width: 0 !important;\n    top: -7px !important;\n    padding-left: 37px !important;\n    padding-top: 37px !important;\n    background: url('http://i50.tinypic.com/10okyvd.png') !important;\n}\n\n#home_button .tab_notice {\n    left: 56px !important;\n    right: auto !important;\n}";
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
