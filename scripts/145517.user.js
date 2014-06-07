// ==UserScript==
// @name          Who's the peasant now?! (Tumblr)
// @namespace     http://userstyles.org
// @description	  This userstyle adds a lordly castle to the top of your dashboard, so you can sneer at all the lowly peasants who are forced to live in tiny huts.
// @author        Yurt
// @homepage      http://userstyles.org/styles/72365
// @include       http://www.tumblr.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#home_button.tab.iconic > a {\n  width: 9px !important;\n  height: 37px !important;\n  background-image: url(\"http://25.media.tumblr.com/tumblr_ma1reyTFJb1qefa3ho1_100.png\") !important;\n  background-size: 44px 37px !important;\n  margin-left: 7px !important;\n  margin-top: -9px !important;\n  padding-left: 44px !important;\n  padding-top: 9px !important;\n  opacity: .65 !important;\n}\n#home_button.tab.iconic > a:hover {\n  opacity: .75 !important;\n}\n#home_button.tab.iconic.selected > a,\n#home_button.tab.iconic.selected > a:hover  {\n  opacity: 1 !important;\n}\n\n\n#home_button .tab_notice {\n    left: 63px !important;\n    right: auto !important;\n}";
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