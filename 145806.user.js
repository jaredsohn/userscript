// ==UserScript==
// @name          Tumblr - arkadaşlar logo + button
// @namespace     http://asanusta.tumblr.com
// @description	  FRIENDS logo replaces the tumblr logo, and a couch icon replaces the dashboard icon!
// @author        pamelabeesly
// @homepage      http://userstyles.org/styles/asanusta
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#home_button a { \n            background: url('http://i1052.photobucket.com/albums/s443/pamelabeesly/e1115298.png') !important;\n        }\n\n#logo {\n  width: 0px !important;\n  height: 0px !important;\n  background:url(\"http://i1052.photobucket.com/albums/s443/pamelabeesly/f1906ea9.png\") !important;\n  width: 255px !important;\n  height: 37px !important;\n}";
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