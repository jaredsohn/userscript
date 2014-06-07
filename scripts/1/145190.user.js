// ==UserScript==
// @name          Heartland Tower Dash Icon
// @namespace     http://userstyles.org
// @description	  New tumblr dash icon is just a house and that's kinda boring, so here's Yu-Gi-Oh! ZeXal's Heartland Tower to make the dash a little bit better ^_^ Credit to tumblr user kaito-sama for the graphic
// @author        Andycat
// @homepage      http://userstyles.org/styles/72573
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "";
css += "@namespace url(http://www.w3.org/1999/xhtml);";
if (false || (document.location.href.indexOf("http://www.tumblr.com/") == 0))
	css += "#home_button {\n\n    padding-right: 17px !important;\n}\n\n\n#home_button a {\n\n    height: 0 !important;\n    width: 0 !important;\n    top: -7px !important;\n    padding-left: 41px !important;\n    padding-top: 36px !important;\n    background: url('http://i47.tinypic.com/xbhb9t.png') !important;}";
css += "#home_button .tab_notice {\n    left: 49px !important;\n    right: auto !important;\n}";
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
