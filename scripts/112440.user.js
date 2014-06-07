// ==UserScript==
// @name          Google+ fix
// @namespace     http://userstyles.org
// @description	  Left menu / pictures profile / font size and more
// @author        Amir Story
// @homepage      http://userstyles.org/styles/53365
// @include       http://plus.google.com/*
// @include       https://plus.google.com/*
// @include       http://*.plus.google.com/*
// @include       https://*.plus.google.com/*
// @include       http://talkgadget.google.com/*
// @include       https://talkgadget.google.com/*
// @include       http://*.talkgadget.google.com/*
// @include       https://*.talkgadget.google.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "* {\nfont-family: \"roboto \", tahoma, arial, sans-serif !important;\nfont-size: 9pt !important;}\n.BIa {\ndisplay: block;\nheight: 43px;\npadding: 0 0 0 30px;\ntext-decoration: none;\n}\n.xVd {\nborder-bottom: 1px solid #e5e5e5;\nmargin-bottom: 0px;\n}\n.yVd {\nborder-bottom: 1px solid #e5e5e5;\nmargin-bottom: 0px;\nmargin-top: 0px;\n}\n.INc {\nheight: 40px;\n\n}\n.fpSidebarButtonIcon {\nmargin-left: -5px;\n  margin-bottom: 4px;\n}\n\n.Hyc {\ncolor: #737373;\ndisplay: inline-block;\nfont-size: 14px;\nmargin-left: 7px;\nmargin-bottom: 1px;\nmax-width: 142px;\noverflow: hidden;\npadding-top: 12px;\ntext-overflow: ellipsis;\nvertical-align: bottom;\nwhite-space: nowrap;\n}\n.uVd {\nbackground-color: #fff;\n\nmargin-left: -5px;\n}\n\n  .fpStream {margin-top: 44px !important;\n}\n.SOb {\n-webkit-user-select: none;\nbackground-color: rgba(255, 255, 255, 0) !important;\nborder: 1px solid rgba(217, 217, 217, 0) !important;\nborder-radius: 3px;\nbox-shadow: 0 0px 0 rgba(0,0,0,.05) !important;\nmargin: 6px 0 7px 15px !important;\npadding: 5px 6px 5px 9px !important;\n}  \n  \n.Zi {\n\nmargin-top: 4px !important;\n}\n  \n.Uk {\n-webkit-border-radius: 5% !important;\nborder-radius: 5% !important;\n}\n.UVa {display: none !important;}\n\n.Lde {\n\ndisplay: none !important;\n\n}\n\n.Ide {\n\nwidth: 170px !important;\n\n}\n\n.Cld {\n-webkit-box-shadow: 0 0 10px rgba(0,0,0,.1) !important;\nbox-shadow: 0 0 10px rgba(0,0,0,.2) !important;\nmargin-left: 0px !important;\n}\n\n .V9b {\n-webkit-transition: right 0.3s;\ntransition: right 0.3s;\npadding-right: 15px;\nright: 120px;\ntext-align: right;\nmargin-top: -3px;\n} \n  \n .HNc {\n-webkit-transition: left 0.3s;\ntransition: left 0.3s;\nleft: 115px;\nright: 0;\ntext-align: left;\nmargin-top: -3px;\n} \n  \n  \n  \n  \n  \n  \n  \n  \n.d-r {-webkit-box-shadow: 0 0 10px rgba(0,0,0,.1) !important;\nbox-shadow: 0 0 10px rgba(0,0,0,.2) !important;\n}\n\n\n\n\n\n/* @end */";
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
