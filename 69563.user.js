// ==UserScript==
// @name          xvideos - white, clean and no ads
// @namespace     http://userstyles.org
// @description	  xvideos.com user style which cleans up the layout, widens the page and player.
// @author        adultvideohelper
// @homepage      http://userstyles.org/styles/25511
// @include       http://xvideos.com/*
// @include       https://xvideos.com/*
// @include       http://*.xvideos.com/*
// @include       https://*.xvideos.com/*
// @include       http://www.xvideos.com/
// @include       http://xvideos.com/
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "";
if (false || (document.domain == "xvideos.com" || document.domain.substring(document.domain.indexOf(".xvideos.com") + 1) == "xvideos.com"))
	css += "body {\nmargin: 5px !important;\n}\n\n* {\ncolor: black !important;\nbackground: white !important;\nborder: none !important;\n}\n\nu, a u, a b u, a strong, span[onclick=\"commentsDisplay()\"][style=\"cursor: pointer; text-decoration: underline;\"] b {\ntext-decoration: none !important;\ncolor: red !important;\n}\n\na, a:link, a:hover, a:active, a:visited {\ntext-decoration: none !important;\ncolor: red !important;\n}\n\na span[style=\"text-decoration: underline;\"] {\ntext-decoration: none !important;\ncolor: red !important;\n}\n\na.liens_visible font {\ntext-decoration: none !important;\ncolor: red !important;\n}\n\nfont[color=\"#ffffff\"][style=\"text-decoration: underline;\"] {\ntext-decoration: none !important;\ncolor: red !important;\nfont-weight: normal !important;\n}\n\ntd[width=\"150\"] div[align=\"left\"] a img {\ndisplay: none !important;\n}\n\n#siteNav {\nwidth: 100% !important;\n}\n\ntable[width=\"925\"][cellspacing=\"0\"][cellpadding=\"2\"][border=\"0\"][style=\"border: 0px solid rgb(0, 0, 0); overflow: visible;\"] {\nwidth: 100% !important;\n}\n\ntd[width=\"180\"][valign=\"top\"] {\ndisplay: none !important;\n}\n\ntd[width=\"730\"][valign=\"top\"] {\nwidth: 100% !important;\n}\n\ntable[cellspacing=\"0\"][cellpadding=\"0\"][border=\"0\"] {\nwidth: 100% !important;\n}\n\ntable[width=\"900\"][cellspacing=\"5\"][cellpadding=\"0\"][bgcolor=\"#eeedf1\"][style=\"border-top: 1px solid rgb(170, 170, 170);\"],\ntable[width=\"930\"][height=\"244\"][cellspacing=\"1\"][cellpadding=\"0\"][border=\"0\"][bgcolor=\"#000000\"],\ntable[width=\"925\"][cellpadding=\"3\"][border=\"0\"][bgcolor=\"#dadada\"],\n#_atssh {\ndisplay: none !important;\n}\n\ntable[width=\"340\"][height=\"480\"][cellspacing=\"0\"][cellpadding=\"1\"][border=\"0\"],\ntable[width=\"340\"][cellspacing=\"0\"][cellpadding=\"0\"][border=\"0\"][bgcolor=\"#e8e7eb\"][style=\"border-bottom: 1px solid rgb(187, 187, 187);\"] {\ndisplay: none !important;\n}\n\nembed:first-child {\nwidth: 100% !important;\nheight: 550px !important;\n}\n\ntable[width=\"450\"][cellspacing=\"1\"][cellpadding=\"0\"][border=\"0\"][bgcolor=\"#000000\"] {\nwidth: 100% !important;\n}";
if (false || (location.href.replace(location.hash,'') == "http://www.xvideos.com/") || (location.href.replace(location.hash,'') == "http://xvideos.com/"))
	css += "div[align=\"center\"] table[cellspacing=\"0\"][cellpadding=\"0\"][border=\"0\"] {\nwidth: auto !important;\n}";
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