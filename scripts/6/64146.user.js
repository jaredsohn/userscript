// Enhanced version of 'GReader Highlight Row'
// Original version can be found at http://userstyles.org/styles/22249
//
//
// ==UserScript==
// @name          GReader Highlight Row (Alternate Color)
// @namespace     http://diveintogreasemonkey.org/download
// @description	  Highlights rows of Google Reader's mouse hover
// @version        1.0.20091226.01
// @author        Takku, modified by @ds2kGTS
// @include       http://www.google.*/reader/*
// @include       https://www.google.*/reader/*
// ==/UserScript==
(function() {
	var css = ".collapsed:hover {\n    background-color: rgb(205,243,159) !important;\n  }\n  .read .collapsed:hover {\n    background-color: rgb(255,235,134) !important;\n  }";
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	}
	else if (typeof addStyle != "undefined") {
		addStyle(css);
	}
	else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
	}
})();
