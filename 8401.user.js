// ==UserScript==
// @name          fix (unliquify) wordpress org homepage
// @namespace     http://userstyles.org
// @description	  i have a 20 inch wide screen (dell 2007wfp :) which exposed to the that ridiculous liquid layout on wordpress.org which creates a huge empty white gap in the middle of the screen and kills readability
// @author        oron
// @homepage      http://userstyles.org/style/show/2204

// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); #rap { width: 800px !important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = css;
		heads[0].appendChild(node); 
	}
}
