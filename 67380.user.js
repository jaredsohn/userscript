// ==UserScript==
// @name          Redtube -  black, clean and no ads
// @namespace     http://userstyles.org
// @description	  redtube.com user style which cleans up the layout, widens the page and player.
// @author        adultvideohelper
// @homepage      http://userstyles.org/styles/24627
// @include       http://redtube.com/*
// @include       https://redtube.com/*
// @include       http://*.redtube.com/*
// @include       https://*.redtube.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "body {\nmargin: 5px !important;\npadding: 5px !important;\n}\n\n\n.topAds, .towerAds, .bottomAds, .relPremiumVideos, .ntvAds, .belowVideoAd, .header {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\n.content {\nwidth: auto !important;\nheight: auto !important;\nmargin: 0 !important;\npadding: 0 !important;\n}\n\n\n.contentHolder {\nheight: auto !important;\npadding: 0 !important;\nmargin: 0 !important;\nwidth: 100% !important;\n}\n\n\n.videoPlayer, .watch {\nwidth: 100% !important;\nheight: 515px !important;\n}\n\n\n#redtubeplayer {\nwidth: 100% !important;\nheight: 550px !important;\n}\n\n\n.relVideos {\npadding: 50px 0 0 0 !important;\n}\n\n\n.relVideos ul li.videoLast {\nmargin-bottom:24px !important;\npadding-right:39px !important;\n}\n\nli[style=\"margin: 0px;\"] {\nmargin: 0 36px 29px 0 !important;\n}\n\nul.videoThumbs li[style=\"margin: 0px;\"] {\nmargin: 0 36px 20px 0 !important;\n}\n\nul.videoThumbs li {\nmargin: 0 36px 20px 0 !important;\n}\n\niframe {\ndisplay: none !important;\n}";
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