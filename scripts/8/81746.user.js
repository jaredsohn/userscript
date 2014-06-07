// ==UserScript==
// @name          Tianya.cn 1.2
// @namespace     http://userstyles.org
// @description	  /* v 1.2
// @author        ilinkcn
// @homepage      http://userstyles.org/styles/16859
// @include       http://tianya.cn/*
// @include       https://tianya.cn/*
// @include       http://*.tianya.cn/*
// @include       https://*.tianya.cn/*
// @include       http://bbs.city.tianya.cn/new/tianyacity/Content*
// @include       http://bbs.city.tianya.cn/new/TianyaCity/content*
// @include       http://www.tianya.cn/publicforum/Content/*
// @include       http://cache.tianya.cn/publicforum/Content/*
// @include       http://www.tianya.cn/publicforum/content*
// @include       http://cache.tianya.cn/publicforum/content*
// @include       http://www.tianya.cn/techforum/content*
// @include       http://cache.tianya.cn/techforum/content*
// @include       http://www.tianya.cn/new/Publicforum/content*
// @include       http://cache.tianya.cn/new/Publicforum/content*
// @include       http://www.tianya.cn/new/publicforum/content*
// @include       http://cache.tianya.cn/new/publicforum/content*
// @include       http://www.tianya.cn/new/techForum/content*
// @include       http://cache.tianya.cn/new/techForum/content*
// @include       http://www.tianya.cn/new/TechForum/Content*
// @include       http://cache.tianya.cn/new/TechForum/Content*
// @include       http://ebook.tianya.cn/forum/content*
// ==/UserScript==
(function() {
var css = "";
if (false || (document.domain == "tianya.cn" || document.domain.substring(document.domain.indexOf(".tianya.cn") + 1) == "tianya.cn"))
	css += "#adContentDiv,#tianyaSense1,#tianyaSense2,#tianyaSense3,#tianyaSense4,#randPanel,#responsebanner,#adsp_list_top_banner,#adsp_content_adtopic,#adsp_content_top_banner,#adsp_content_banner_1,#adsp_content_banner_2,#adsp_content_banner_3,\n.wdk_user_status_span,.topnav,\n#tianyatopguide_nav,#apublishArea,\n#bottom_nav,\ntd[width=\"137\"],td[width=\"100\"]\n{display:none !important}\n\n\n\n\n#topNav,#bottomNav{\nbackground-position:center center !important;\nbackground-repeat:repeat-x !important;\n}\n\n\n#leftNav {\nbottom:0 !important;\ntop:0 !important;;\n}\n\n#forumWrapper,\n#topNavWrapper,#bottomNavWrapper,#bottomNav,#topNav,#topNavWrapper,#bottomNavWrapper,\n#mainDiv,#forumContentDiv,#content,.pagewrap{\nwidth:100% !important;\n}\n\n.body,.body2,.wrapper,#pContentDiv,#tech_body,#conArea{\nwidth:100% !important;\n}\n\n\n#forumContentDiv table,#content table{width:90% !important;margin:2px !important;}\n\n\n\n\nfont[face=\"wingdings\"][color=\"blue\"]{display:none !important}";
if (false || (document.location.href.indexOf("http://bbs.city.tianya.cn/new/tianyacity/Content") == 0) || (document.location.href.indexOf("http://bbs.city.tianya.cn/new/TianyaCity/content") == 0) || (document.location.href.indexOf("http://www.tianya.cn/publicforum/Content/") == 0) || (document.location.href.indexOf("http://cache.tianya.cn/publicforum/Content/") == 0) || (document.location.href.indexOf("http://www.tianya.cn/publicforum/content") == 0) || (document.location.href.indexOf("http://cache.tianya.cn/publicforum/content") == 0) || (document.location.href.indexOf("http://www.tianya.cn/techforum/content") == 0) || (document.location.href.indexOf("http://cache.tianya.cn/techforum/content") == 0) || (document.location.href.indexOf("http://www.tianya.cn/new/Publicforum/content") == 0) || (document.location.href.indexOf("http://cache.tianya.cn/new/Publicforum/content") == 0) || (document.location.href.indexOf("http://www.tianya.cn/new/publicforum/content") == 0) || (document.location.href.indexOf("http://cache.tianya.cn/new/publicforum/content") == 0) || (document.location.href.indexOf("http://www.tianya.cn/new/techForum/content") == 0) || (document.location.href.indexOf("http://cache.tianya.cn/new/techForum/content") == 0) || (document.location.href.indexOf("http://www.tianya.cn/new/TechForum/Content") == 0) || (document.location.href.indexOf("http://cache.tianya.cn/new/TechForum/Content") == 0) || (document.location.href.indexOf("http://ebook.tianya.cn/forum/content") == 0))
	css += "body,.body,.body2,.body3{background: #69c !important;padding: 0px !important;margin: 0px !important;}\n.content,#content{background:#fff !important;padding: 0px !important;margin: 0px !important;}\n\n\n#pContentDiv TABLE{background: #eeefff !important;}\n#pContentDiv td .content td,.post {background:#fff !important;}\n\n#pContentDiv .content,#pContentDiv #content{line-height:22px !important;MARGIN: 0px !important;font-size: 16px !important}\n\n\n.myplace,.guide{\nBACKGROUND: #555 !important;\npadding: 0px !important;margin: 0px !important;\nwidth:80% !important}\n.myplace a,.lb12,.guide a {color: #abc !important}\n\n\n\n#pageForm,#pageDiv,#pageDiv1,#pageDivTop,#pageDivBottom,#FORM[id=pageForm],#pageDivTop td,#cttPageDiv,#cttPageDiv1\n{BACKGROUND: #69c !important;COLOR: #e7f0ec !important;padding: 0px !important;margin: 0px !important;}\n\n\n#FormResponse,#FormResponse TABLE,.respond{background: #eeefff !important;}\n.respond{width:100% !important;margin: 0px !important;}\n\n\ntd[width=\"140\"]{width:20px !important;}\n.floornum{color: #369 !important;font-size:10px !important;}\n\n\n#baibaox img,#__ty_vip_from_td img,.bbx_col3,.tools img,.tools .books,.tools .wap{display:none !important}\n#baibaox,#__ty_vip_from_td,#baibaox .bbx_col2,.tools,.treasure{\nbackground:none !important;\npadding: 0px !important;\nmargin: 0px !important;\nheight:20px !important;\nwidth:25% !important;\nposition:fixed !important;\nleft:auto !important;\nright:0px !important;\ntop: -2px !important;\n}\n#baibaox,#__ty_vip_from_td,.tools,.treasure{\nbackground:#369 !important;\ntext-align:right !important;\n-moz-border-radius: 2px ! important;\nopacity:0.9;\n}\n#baibaox .bbx_col2 a,#__ty_vip_from_td span,.tools a{\ncolor:#fff !important;\nfont-size:12px !important;\nfont-weight:bold !important;\n}\n.vip-writers-td-left,.vip-writers-td-right{color:#369 !important;}\n\n\n.mtitle,\ntable[cellspacing=\"2\"][bordercolor=\"#ffffff\"] td[bgcolor=\"#336699\"],\ntable[bgcolor=\"#f5f9fa\"],\nh1 span\n{background:#69c !important;}\n\n.mtitle,table[cellspacing=\"2\"][bordercolor=\"#ffffff\"] td[bgcolor=\"#336699\"] font[size=\"+1\"],\nh1 span{\nfont-size:26px !important;\nfont-weight: bold !important;\nline-height:42px !important;\npadding:0px !important;\nMARGIN:0px !important;\ntext-align: justify !important;\ntext-shadow:0px 0px 10px #000;\n}\n\n.mtitle,table[cellspacing=\"2\"][bordercolor=\"#ffffff\"] td[bgcolor=\"#336699\"] font[size=\"+1\"]{\nwidth:auto !important;\npadding:0px !important;\nMARGIN:0px !important;\n\n}\n\n#tech_body #adsp_content_title_banner{\nheight:40px !important;}\n\n\nbr{line-height:0px !important}\n\n\n#firstAuthor,#firstAuthor td,font[size=\"-1\"],td center,table[align=\"center\"] td[align=\"center\"]\n{background:#eeefff !important;font-size:10px !important;text-align:right !important;}\n.vcard {\nbackground:#eeefff !important;font-size:10px !important;text-align:right !important;\npadding: 0px 0 0px !important;\n}\n\n\n.content img,.content embed,.content iframe{padding: 0;margin: 0;display: block !important;margin-left: auto !important;margin-right: auto !important;max-width: 800px !important;}\n.content img:hover {max-height: none !important;max-width: none !important;height: auto !important;width: auto !important;}\n.content img{\n-moz-box-shadow: 0px 0px 25px #aaa;\n}\n\n\n.content td[align=\"right\"]{width:22px !important}\n\n\na font[size=\"2\"][color=\"blue\"] u{font-size:10px !important;color:#d3dfd1 !important;text-decoration:none !important;margin: 0px !important;padding:0px !important;}";
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
