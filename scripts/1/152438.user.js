// ==UserScript==
// @name          Hikiculture CSS Resource
// @description	  CSS Resources for HC Script
// @author        LokiCode, ThomasPink
// @homepage      http://userstyles.org/styles/44492
// @include       http://www.hikiculture.net/*
// @include       https://hikiculture.net/*
// @include       http://*hikiculture
// @run-at        document-start
// ==/UserScript==

(function() {
var css = "body {\nbackground-image: url('http://i.imgur.com/xdjI1.jpg') !important;\nbackground-attachment:fixed !important;\nmargin-top: 22px !important;\n}\n      \nimg {\n-webkit-filter: grayscale(1); \nmax-width:300px;\n}\n\nimg:hover {\n-webkit-filter: grayscale(0); \nfilter: none;\nmax-width: 300px !important;\n}\n\n\ntd {\nborder-bottom: none !important;\nborder-top: none !important;\nbackground-color: transparent !important;\n\n}\n\n.spacer {\nmargin-top: 30px !important;\nbackground: none !important;\nborder: none !important;\nheight: 40px !important;\nbackground-color: transparent !important;\n}\n\n.cap-right {\ndisplay: none !important;\n}\n\n.row {\nmax-width: 640px;\n}\n\n.breadcrumbs   {\ndisplay: none !important;\n}\n\n.postbody signature {\nmax-width: 640px;\n}\n\n#postbottom {\nbackground: none !important;\nbackground-color: transparent !important;\n}\n\n\n#content {\nwidth: 640px !important;\nmargin:0 20% 0 20% !important;\n}\n\n.navrow {\nposition: fixed !important;\nwidth: 100% !important;\nz-index:100;\nopacity: 0.8;\ntop: 0px !important;\n}\n\n.navrow:hover {\nopacity: 1.0;\n}\n\n\ntable {\nmargin-left: auto !important;\nmargin-right: auto !important;\nborder: none !important;\n}\n\n.contentrow {\nborder: none;\n}\n\n#breadcrumb #row1 {\n-moz-box-shadow: none !important;\n-webkit-box-shadow: none !important;\nbox-shadow: none !important;\ndisplay: none;\n}";
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