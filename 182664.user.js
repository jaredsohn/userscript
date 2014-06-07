// ==UserScript==
// @name          xmedia360.hu - Watch Dogs Theme
// @namespace     http://userscripts.org
// @description	  Watch Dogs Theme for xmedia360.hu
// @author        rossifumi
// @homepage      http://userscripts.org/scripts/show/182664
// @include       http://xmedia360.hu/*
// @include       https://xmedia360.hu/*
// @include       http://*.xmedia360.hu/*
// @include       https://*.xmedia360.hu/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "body {\nbackground-color: #000000 !important;\nbackground: url(\"http://kepfeltoltes.hu/131109/178625105xmedia-wd2_www.kepfeltoltes.hu_.jpg\") center top no-repeat, url(\"http://kepfeltoltes.hu/131106/blackpoint_www.kepfeltoltes.hu_.png\") !important; \nmin-height: 1076px important;\nheight:100% important;\nmargin:0px important;\npadding:0 important;\ncolor:#000000 !important;\n}\n\n.header_left {height: 190px !important; background-image: none !important;}\n.header_right {height: 190px !important; background-image: none !important;}\n.content_center {background-color: #000000 !important;}\n.content_right img {display: none !important;}\n.content_right {background-image: none !important;}\n.content_left img{display: none !important;}\n.content_left {background-image: none !important;}\n.headcenter_right {height: 190px !important; background: none !important;}\n.headcenter_left {height: 190px !important; background: none !important;}\n.header_center {height: 190px !important; background: none !important;}\n.alientable {width: 1032px !important;}\n.right_menu a {font-family: Arial !important; color: #0F7D0D !important;}\n.left_menu {border: none !important; min-width: 190px !important; max-width: 190px !important;}\n\n#navigation {color: #ffffff !important; font-size: 18px !important;font-family: Arial !important; left: 0px !important; top: 169px !important; }\n#navigation a {color: #ffffff !important; opacity:0.5 !important; background-image: none !important; background-color: #010101 !important;}\n#navigation a:hover{color: #ffffff !important; background-color: #0F7D0D !important; opacity:0.9 !important;}\n\n.loginc_div {position: absolute !important; top: 5px !important;}\n.mediumtext a{color: #0F7D0D !important;}\n.header_center .mediumtext {position: relative !important; top: 5px !important; left: 0px !important;}\n.fborder .forumheader3 {font-family: Tahoma !important; font-size: 11px !important; color: #909090 !important; background-image: none !important; border-bottom: 1px solid #111111 !important;}\n.forumheader2 {font-family: Tahoma !important; font-size: 11px !important; color: #CC6600 !important; background-image: none !important; border-bottom: 1px solid #111111 !important;}\n.forumheader3 {font-family: Tahoma !important; font-size: 11px !important; color: #CC6600 !important; background-image: none !important; border-bottom: 1px solid #111111 !important;}\n.forumheader2 a {color: #ffffff !important;}    \n.forumheader2 a:hover {text-decoration: none !important; color: #0F7D0D !important;}\n.forumheader3 a {color: #ffffff !important;}    \n.forumheader3 a:hover {text-decoration: none !important; color: #0F7D0D !important;}\n.content_center h3 {padding-left: 40px !important;}\n.left_menu h3 {padding-left: 60px !important;}\n\nh3 {display: none important; font-size: 10px !important;\nheight: 18px !important;\nbackground-image: url(\"http://kepfeltoltes.hu/131109/banner_www.kepfeltoltes.hu_.jpg\") !important;\npadding-left: 30px !important;\npadding-top: 8px !important;\ncolor: #000000 !important;\nfont-size: 11px !important;\nfont-weight: 700 !important;\nfont-family: Tahoma !important;\n}\n\n.indentchat .smalltext {color: #e2e2e2 !important;}\n.indentchat {background: none !important; border: 1px solid #0f0f0f !important;}\n.indentchat a {color: #0F7D0D !important;}\n.small {background-color: #000000 !important; border: 1px solid #000000 !important; color: #909090 !important;}\n.smalltext {font-size: 9px !important; color: #909090 !important;}\n.news_icon img {display: none !important;}\n\n.forumheader {\nbackground-color: #111111 !important;\nbackground-image: none !important;\nfont-size: 9px !important;\ncolor: #919191 !important;\nborder: 3px solid #090909 !important;\npadding-top: 4px !important;\nheight: 18px !important;\nmargin-bottom: 40px !important;\n}\n\nimg[src*=\"e107_plugins/forum/images/dark/new_small.png\"]{\nheight: 0 !important;\nwidth: 0 !important;\n\npadding-left: 22px !important;\npadding-top: 22px !important;\nbackground: url(http://kepfeltoltes.hu/131109/xoneicon_www.kepfeltoltes.hu_.png) no-repeat !important;\n}\n\nimg[src=\"e107_themes/GFX07/images/bullet.gif\"] {\nheight: 0 !important;\nwidth: 0 !important;\n\npadding-left: 16px !important;\npadding-top: 16px !important;\nbackground: url(http://kepfeltoltes.hu/131109/chaticon-green_www.kepfeltoltes.hu_.jpg) no-repeat !important;\n}\n\n.footer_left {background: none !important;}\n.footer_center {background: none !important;}\n.footer_right {background: none !important;}\n.fc_left {background: none !important;}\n.fc_center {background: none !important;}\n.fc_right {background: none !important;}\n.smallblacktext {color: #909090 !important;}\n.tbox {background-color: #050505 !important;}\na[href=\"http://xmedia360.hu/page.php?35\"] {display: none !important;}\na[href=\"http://xmedia360.hu/page.php?7\"] {display: none !important;}\ntd.left_menu div.bodytable {margin-bottom: -10px !important;} ";
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