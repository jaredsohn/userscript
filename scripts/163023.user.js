// ==UserScript==
// @name          It's not funny anymore, guys
// @namespace     http://www.userscripts.org/scripts/source/163023
// @description   A Greasemonkey script that targets the <h5> tag to remove the floating pixel on /r/AdviceAnimals. Really just a minor update of the one from http://userstyles.org/styles/75702/we-really-need-to-catch-that-red-dot-reddit-fix
// @include       *.reddit.com/r/AdviceAnimals/*
// @include       *.reddit.com/r/adviceanimals/*
// @grant         none
// @author        aarghIforget (via voltaek on userstyles.org)
// ==/UserScript==
(function() {
var css = ".titlebox .usertext-body .md h5 {\n    background-color: transparent !important;\n}";
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