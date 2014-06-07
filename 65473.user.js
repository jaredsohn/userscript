// ==UserScript==
// @name          tube8 - white, clean and no ads
// @namespace     http://userstyles.org
// @description	  Tube8.com user style which cleans up the layout, widens the page and player.
// @author        adultvideohelper
// @homepage      http://userstyles.org/styles/23804
// @include       http://tube8.com/*
// @include       https://tube8.com/*
// @include       http://*.tube8.com/*
// @include       https://*.tube8.com/*
// @include       http://www.tube8.com/categories.html
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "";
if (false || (document.domain == "tube8.com" || document.domain.substring(document.domain.indexOf(".tube8.com") + 1) == "tube8.com"))
	css += "* {\nbackground: white !important;\ncolor: black !important;\nfont-size: 12px !important;\n}\n\na, a:link, a:hover, a:active, a:visited {\ncolor: red !important;\ntext-decoration: none !important;\n}\n\n.search-form-submit.main-sprite-img:before {\ncontent: \"Search\";\n}\n\n\na, a:hover, a:visited, a:active {\ntext-decoration:none !important;\n}\n\n\n.top-menu-01.main-sprite-img,\n.top-menu-02.main-sprite-img,\n.top-menu-03.main-sprite-img,\n.top-menu-04.main-sprite-img,\n.top-menu-05.main-sprite-img {\nbackground-color: white !important;\nbackground-image: none !important;\nheight: auto !important;\n}\n\n\n\n.top-menu.absolute > li > a > span {\ncolor: red !important;\nmargin-top: 35px !important;\ndisplay: block !important;\nheight: auto !important;\n}\n\n.filter-btn {\nborder: none !important;\n}\n\n\n.absolute > object {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\n#logo {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\nh1.logo-heading.absolute:after {\n\n}\n\n\nbody, .content-wrapper {\nbackground-color: white !important;\nbackground-image: none !important;\n}\n\n\n.box-right-cont {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\n.cont-col-02.float-right, .ad-col-02.main-sprite-img, .ad-wrapper {\ndisplay: none !important;\nvisibility: hidden !important;\nwidth: 0px !important;\nheight: 0px !important;\n}\n\n.submenu-video.float-left {\nwidth: 100% !important;\n}\n\n\n.video-col-01, #flvplayer {\nwidth: 100% !important;\n\n}\n\n\n.box.box-cont-960, .margin-comments,\n.box.box-bottom-960 {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\n.main-title {\nbackground: none white !important;\nbackground-position:0 -666px;\ncolor:black !important;\nfont-size:20px !important;\nfont-weight: bold !important;\nheight:25px !important;\nmargin:0 !important;\npadding:0px 0 !important;\ntext-indent:0px !important;\n}\n\n\n.video-list-row-4 {\nwidth: 100% !important;\n}\n\n\niframe {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\n.cont-col-01 {\nwidth: 955px !important;\n}\n\n\n.color-white {\ncolor: gray !important;\n}\n\n\n.main-sprite-img.float-left, .main-sprite-img.float-right {\nbackground: none !important;\n}\n\n\n.search-form-input {\nborder: 1px solid gray !important;\n}\n\n\n.next-video.main-sprite-img.display-block.absolute {\nbackground: none !important;\n}\n\n\na.next-video.main-sprite-img.display-block.absolute > span.display-none {\ndisplay: block !important;\n}\n\n\n.prev-video.main-sprite-img.display-block.absolute {\nbackground: none !important;\n}\n\na.prev-video.main-sprite-img.display-block.absolute > span.display-none {\ndisplay: block !important;\n}\n\n\n.banner-container {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\ndiv.title-wrapper > h1.main-title.main-sprite-img {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\ndiv.title-wrapper.relative > h1.main-title.main-sprite-img {\ndisplay: block !important;\nvisibility: visible !important;\ntext-transform: uppercase;\n}\n\n.footer-pagination ul li a {\nfont-size: 22px !important;\n}\n\n\n.footer-wrapper {\ndisplay: none !important;\nvisibility: hidden !important;\n}";
if (false || (location.href.replace(location.hash,'') == "http://www.tube8.com/categories.html"))
	css += ".box.box-cont-960 {\ndisplay: block !important;\nvisibility: visible !important;\nbackground: none !important;\n}";
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