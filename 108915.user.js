// ==UserScript==
// @name          Grooveshark - Garry's Theme Manager
// @namespace     http://userstyles.org
// @description	  Content section is semi-transparent with your own themed background.
// @author        Garry
// @homepage      http://userscripts.org/
// @include       http://grooveshark.com/*
// @include       http://listen.grooveshark.com/*
// @include       http://www.grooveshark.com/*
// @backgrounds   http://i.imgur.com/bRSWh.jpg
// ==/UserScript==
(function() {
var css = "#content {background:url(http://i.imgur.com/bRSWh.jpg) center center !important; -webkit-background-size: cover;\n   -moz-background-size: cover;\n   -o-background-size: cover;\n   background-size: cover;\n   width:100% !important;\n}\n#theme_home div {display:none !important;}\n#theme_home a {display:none !important;}\n#application{margin-right:0px !important;}\n#capital, #capitalPane, #capital_header {display: none !important;}\n#page_wrapper {position: static!important;}\n #header {\n   opacity: 0.6 !important;\n   -moz-opacity: 0.6 !important;\n   filter:alpha(opacity=60) !important;\n} #sidebar {\n   opacity: 0.6 !important;\n   -moz-opacity: 0.6 !important;\n   filter:alpha(opacity=60) !important;\n}#page_wrapper {\n   opacity: 0.6 !important;\n   -moz-opacity: 0.6 !important;\n filter:alpha(opacity=60) !important;\n background-color:#fff !important;}";

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