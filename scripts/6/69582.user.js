// ==UserScript==
// @name          xnxx - white, clean and no ads
// @namespace     http://userstyles.org
// @description	  jizzhut.com user style which cleans up the layout, widens the page and player. Restyled in white, red and black.
// @author        adultvideohelper
// @homepage      http://userstyles.org/styles/25514
// @include       http://xnxx.com/*
// @include       https://xnxx.com/*
// @include       http://*.xnxx.com/*
// @include       https://*.xnxx.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "body {\nmargin: 5px !important;\n}\n\n* {\ncolor: black !important;\nbackground: white !important;\nborder: none !important;\nfont-size: 12px !important;\n}\n\nu, a u, a strong {\ntext-decoration: none !important;\ncolor: inherit !important;\nfont-weight: normal !important;\n}\n\na, a:link, a:hover, a:active, a:visited {\ntext-decoration: none !important;\ncolor: red !important;\n}\n\n#pag a {\nfont-size: 22px !important;\n}\n\ntable[cellspacing=\"5\"][cellpadding=\"0\"][width=\"746\"][style=\"border-left: 1px solid rgb(0, 0, 0); border-right: 1px solid rgb(0, 0, 0);\"],\ntable[cellspacing=\"5\"][cellpadding=\"0\"][width=\"746\"][style=\"border-left: 1px solid rgb(0, 0, 0); border-right: 1px solid rgb(0, 0, 0); border-bottom: 1px solid rgb(0, 0, 0);\"] {\nwidth: 100% !important;\n}\n\na span[style=\"text-decoration: underline;\"],\na font[style=\"text-decoration: underline;\"],\na font {\ntext-decoration: none !important;\ncolor: red !important;\n}\n\na.liens_visible font {\ntext-decoration: none !important;\ncolor: red !important;\n\n}\n\ntd[width=\"150\"][rowspan=\"2\"] img {\ndisplay: none !important;\n}\n\ntable[width=\"925\"][cellspacing=\"0\"][cellpadding=\"0\"][border=\"0\"][align=\"center\"], #siteNav {\nwidth: 100% !important;\n}\n\ntd[width=\"180\"][valign=\"top\"] {\ndisplay: none !important;\n}\n\ntable[width=\"930\"][cellspacing=\"0\"][cellpadding=\"0\"][border=\"0\"] {\nwidth: 100% !important;\n}\n\ntd[width=\"730\"][valign=\"top\"] {\nwidth: 100% !important;\ntext-align: center !important;\n}\n\ntable[cellspacing=\"0\"][cellpadding=\"2\"][border=\"0\"][style=\"border-left: 1px solid rgb(0, 0, 0); border-right: 1px solid rgb(0, 0, 0);\"] {\nwidth: auto !important;\nmargin: auto !important;\n}\n\ntable[width=\"930\"][height=\"244\"][cellspacing=\"1\"][cellpadding=\"0\"][border=\"0\"][bgcolor=\"#000000\"] {\ndisplay: none !important;\n}\n\ntable[width=\"930\"][cellspacing=\"3\"][cellpadding=\"0\"][border=\"0\"][bgcolor=\"\"] {\ndisplay: none !important;\n}\n\ntd[width=\"433\"][valign=\"top\"] {\ndisplay: none !important;\n}\n\ntable[width=\"515\"][height=\"375\"][cellspacing=\"0\"][cellpadding=\"0\"][border=\"0\"][bgcolor=\"\"] {\nwidth: 100% !important;\n}\n\ntable[width=\"930\"][cellspacing=\"0\"][cellpadding=\"5\"][border=\"0\"][bgcolor=\"#004be8\"][style=\"border-bottom: 2px solid rgb(0, 0, 102); border-top: 1px solid rgb(0, 0, 144);\"] {\nwidth: 100% !important;\n}\n\nembed:first-child {\nwidth: 100% !important;\nheight: 550px !important;\n}\n\ntable[width=\"450\"][cellspacing=\"1\"][cellpadding=\"0\"][border=\"0\"][bgcolor=\"#000000\"] {\nwidth: 100% !important;\n}\n\ntd[width=\"119\"][bgcolor=\"#1763ff\"][style=\"border-bottom: 1px solid rgb(79, 158, 255);\"] {\ndisplay: none !important;\n}\n\nspan[onclick=\"commentsDisplay()\"][style=\"cursor: pointer; text-decoration: underline; font-size: 14px;\"] b {\ntext-decoration: none !important;\ncolor: red !important;\nfont-weight: normal !important;\n}";
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