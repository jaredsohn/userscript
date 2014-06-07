// ==UserScript==
// @name          LAMBORGHINI THEME
// @namespace     http://userstyles.org
// @description	  This is my first theme and i have designed it just for fun
// @author        Alkont Akn
// @homepage      http://userstyles.org/styles/90747
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "body.fbIndex { \nbackground: url('http://store2.up-00.com/Sep13/o2H87544.jpg')right center fixed !important; \n-webkit-background-size: cover; \n-moz-background-size: 100% !important; \nbackground-repeat: no-repeat !important;\nbackground-size: cover !important;\n}\n.loggedout_menubar_container { background: url('http://fiakka.com/images/blank_transparent.png') !important; }\n.fbIndex #globalContainer #dropmenu_container,\n.fbIndex #globalContainer #content,\n.fbIndex #globalContainer #pageFooter { display: none !important }\n.fbIndex .loggedout_menubar_container {\nposition: fixed !important;\nwidth: 420px !important;\nheight: 82px !important;\nmin-width: 0 !important;\ntop: 50% !important;\nleft: 50% !important;\nmargin-top: -17px !important;\nmargin-left: -210px !important;\nz-index: -1 !important;\n}\n.fbIndex .loggedout_menubar { width: auto !important }\n.fbIndex .loggedout_menubar_container .lfloat,\n.fbIndex .loggedout_menubar_container .rfloat { float: none !important }\n.fbIndex .loggedout_menubar_container .lfloat img,\n.fbIndex .loggedout_menubar_container .rfloat #login_form table { display: block !important; margin: 0 auto !important }\n.fbIndex .loggedout_menubar_container .lfloat img { display: block; margin: -60px auto 20px !important; }\n#SetAsHomepage_Callout {\ndisplay: none;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();