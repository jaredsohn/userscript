// ==UserScript==
// @name          youjizz - white, clean and no ads
// @namespace     http://userstyles.org
// @description	  youjizz.com user style which cleans up the layout, widens the page and player.
// @author        adultvideohelper
// @homepage      http://userstyles.org/styles/23819
// @include       http://youjizz.com/*
// @include       https://youjizz.com/*
// @include       http://*.youjizz.com/*
// @include       https://*.youjizz.com/*
// @include       http://youjizz.com/videos/*
// @include       http://www.youjizz.com/videos/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "";
if (false || (document.domain == "youjizz.com" || document.domain.substring(document.domain.indexOf(".youjizz.com") + 1) == "youjizz.com"))
	css += "*:not(.frame) {\ncolor: black !important;\nbackground: white !important;\nborder: none !important;\nfont-size: 12px !important;\n}\n\nhtml, body {\nmargin: 0 0 0 0 !important;\npadding: 0 0 0 0 !important;\nfont-size: 1em !important;\n}\n\n.input {\nbackground-image: none !important;\nheight: auto !important;\nwidth: auto !important;\npadding: 3px !important;\nmargin: auto !important;\n}\n\ninput[type=\"image\"] {\nfloat: none !important;\ndisplay: none !important;\n}\n\na, a:link, a:active, a:visited, a:hover {\ntext-decoration: none !important;\ncolor: red !important;\nfont-weight: normal !important;\n}\n\n#menu a span {\ntext-decoration: none !important;\ncolor: red !important;\nfont-weight: normal !important;\n}\n\n\niframe {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n#top, #fotter, #fotter2, #chatWindow, #closeChatArea, #closeArea, #taskbar {\ndisplay: none !important;\n}\n\n\n#FFN_Banner_Holder {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\ntd[width=\"250\"][valign=\"top\"][style=\"padding-right: 20px;\"] {\ndisplay: none !important;\n}\ntd[valign=\"top\"][style=\"padding-left: 20px;\"] {\nwidth: 100% !important;\npadding: 0 !important;\n}\n\n.row, td[width=\"250\"][valign=\"top\"], .right {\ndisplay: none !important;\n}\n\ntd[valign=\"top\"][style=\"padding-left: 0px; text-align: left;\"], div[style=\"text-align: center;\"] {\nwidth: 100% !important;\nmargin: 0 !important;\npadding: 0 !important;\n}\n\n#miniatura {\nmargin: 0 !important;\npadding: 0 !important;\n}\n\n\n#vid, #player, #xmoov-flv-player_va, #xmoov-flv-player {\nwidth: 1000px !important;\npadding: 0 0 0 0 !important;\nmargin:  0 0 0 0 !important;\n}";
if (false || (document.location.href.indexOf("http://youjizz.com/videos/") == 0) || (document.location.href.indexOf("http://www.youjizz.com/videos/") == 0))
	css += "#fotter {\ndisplay: block !important;\n}";
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