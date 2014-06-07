// ==UserScript==
// @name          keezmovies - white, clean and no ads
// @namespace     http://userstyles.org
// @description	  KeezMovies.com user style which cleans up the layout, widens the page and player.
// @author        adultvideohelper
// @homepage      http://userstyles.org/styles/24140
// @include       http://keezmovies.com/*
// @include       https://keezmovies.com/*
// @include       http://*.keezmovies.com/*
// @include       https://*.keezmovies.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = ".blockad {\nwidth: 100% !important;\n}\n\n.col-right .row.alt .block {\nwidth: 150px !important;\nfloat: none !important;\n}\n\n.col-right .row.alt {\nwidth: 100px !important;\n}\n\n#adWrapper, .adright.block {\ndisplay: none !important;\n}\n\n#outer {\nwidth: 1000px !important;\n}\n\ndiv[style=\"float: left; padding-left: 7px;\"] {\ndisplay: none !important;\n}\n\n#footer {\ndisplay: none !important;\n}\n.metadata {\nmargin: 50px auto 50px auto !important;\n}\n.block {\nborder: none !important;\n}\n\n.show, .row.alt {\nwidth: 1000px !important;\n}\n\n#porn {\nwidth: 1000px !important;\ntext-align: center !important;\nmargin:0 auto 0 auto !important;\npadding:0 !important;\n}\n\n#KMPlayer {\nwidth: 730px !important;\nheight: 576px !important;\nmargin: 5px auto 5px auto !important;\n}";
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