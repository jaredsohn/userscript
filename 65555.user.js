// ==UserScript==
// @name          jizzhut - white, clean and no ads
// @namespace     http://userstyles.org
// @description	  jizzhut.com user style which cleans up the layout, widens the page and player.
// @author        adultvideohelper
// @homepage      http://userstyles.org/styles/23824
// @include       http://jizzhut.com/*
// @include       https://jizzhut.com/*
// @include       http://*.jizzhut.com/*
// @include       https://*.jizzhut.com/*
// @include       http://www.jizzhut.com/help.php
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "";
if (false || (document.domain == "jizzhut.com" || document.domain.substring(document.domain.indexOf(".jizzhut.com") + 1) == "jizzhut.com"))
	css += "* {\ncolor: black !important;\nfont-size: 12px !important;\n}\n\nhtml, body {\nmargin: 0 0 0 0 !important;\npadding: 0 0 0 0 !important;\nfont-size: 12px !important;\n}\n\na, a:link, a:active, a:visited, a:hover {\ntext-decoration: none !important;\ncolor: red !important;\nfont-weight: normal !important;\n}\n\n#pagination a, #pagination span {\nfont-size: 22px !important;\n}\n\n\nbody {\nbackground: none !important;\ncolor: white !important;\n}\n\n\niframe {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\nh1, h2, h3 {\ncolor: gray !important;\n}\n\n#taskbar, #chatWindow, #closeCchatArea, #closeArea {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\n#comments > p {\ncolor: gray !important;\n}\n\ndiv[style=\"font-family: Arial,Helvetica,sans-serif; font-size: 11px;\"] {\ncolor: gray !important;\n}\n\n\n#kontener {\ntext-align: center !important;\n}\n\n\ntable[width=\"100%\"][cellspacing=\"0\"][cellpadding=\"0\"][border=\"0\"][align=\"center\"] {\nwidth: 450px !important;\ncolor: gray !important;\ntext-align: left !important;\nmargin-top: 20px !important;\n}\n\n\ntd {\nwidth: auto  !important;\n}\n\n\n#kontener > p {\ncolor: gray !important;\n}\n\n\n#header {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\n#subnav, #aroundheader {\nbackground: none !important;\n}\n\n\n#pagetitle {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\n#FFN_Banner_Holder {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\ndiv[style=\"clear: both; padding-top: 20px;\"] {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\ndiv[style=\"clear: both; padding-top:20px;\"] {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\n\ndiv[style=\"margin-right: 250px; float: left;\"], div[style=\"width: 100%; float: left;\"] {\nwidth: 100% !important;\npadding: 0 0 0 0 !important;\nmargin:  0 0 0 0 !important;\ncolor: gray !important;\n}\n\n\ndiv[style=\"width: 250px; height: 7000px; float: left; margin-left: -250px;\"] {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\n.rel_off:hover, .rel_on:hover {\ncursor: pointer !important;\n}\n\n\ndiv[style=\"margin: 0pt auto; width: 1000px;\"] {\nmargin:  0 auto 0 auto !important;\npadding: 0 0 0 0 !important;\n}\n\n\n#vid, #vid_lewa, #player, #xmoov-flv-player_va, #xmoov-flv-player {\nwidth: 1000px !important;\npadding: 0 0 0 0 !important;\nmargin:  0 0 0 0 !important;\n}\n\n\n#download-bar {\ndisplay: none !important;\nvisibility: hidden !important;\n}";
if (false || (location.href.replace(location.hash,'') == "http://www.jizzhut.com/help.php"))
	css += "div[style=\"margin-right: 250px; float: left;\"] > center {\nwidth: 500px !important;\npadding: 0 0 0 0 !important;\nmargin:  0 auto 0 auto !important;\ncolor: gray !important;\ntext-align: left !important;\n}\n\n\ndiv[style=\"margin-right: 250px; float: left;\"] > center > p {\ndisplay: list-item !important;\nlist-style: none  !important;\n}";
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