// ==UserScript==
// @name          贴吧页码浮动
// @namespace     
// @description  本样式改自 贴吧/Tieba：页码浮动  http://userstyles.org/styles/81271
// @version 1.0
// @homepage      http://userstyles.org/styles/86264
// @include       http://tieba.baidu.com/f?kw=*
// @include       http://tieba.baidu.com/f?ie=gbk&kw=*
// @include       http://tieba.baidu.com/f?ie=utf-8&kw=*
// @include       http://tieba.baidu.com/f/vote?kw=*
// @include       http://tieba.baidu.com/f/good?kw=*
// @include       http://tieba.baidu.com/f?tp*
// @include       http://tieba.baidu.com/p*
// @include       http://tieba.baidu.com/f?ct=*
// @include       http://tieba.baidu.com/f?z=*
// @include       http://tieba.baidu.com/f?kz=*
// @include       http://tieba.baidu.com/disk/index?kw=*
// @include       http://tieba.baidu.com/f/search*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "";
if (false || (document.location.href.indexOf("http://tieba.baidu.com/f?kw=") == 0) || (document.location.href.indexOf("http://tieba.baidu.com/f?ie=gbk&kw=") == 0) || (document.location.href.indexOf("http://tieba.baidu.com/f?ie=utf-8&kw=") == 0) || (document.location.href.indexOf("http://tieba.baidu.com/f/vote?kw=") == 0) || (document.location.href.indexOf("http://tieba.baidu.com/f/good?kw=") == 0) || (document.location.href.indexOf("http://tieba.baidu.com/f?tp") == 0))
	css += "#frs_list_pager {\npadding:2px 0px 3px 2px!important;\nborder:none !Important;\nbackground:rgba(0,0,0,.65) !Important;\nposition:fixed;\nbottom:0px;left:20%;\nz-index:999999;\ntransition:bottom 0.2s linear;\n-webkit-transition:bottom 5s linear;}\n\n#frs_list_pager:hover {\nbottom:0px;}\n\n#frs_list_pager .cur,#frs_list_pager a {\nborder:none !Important;\nbackground:rgba(62,109,181,.1) !Important;\ncolor:#FFF !Important;}\n\n#frs_list_pager a {\nbackground:rgba(62,109,181,99) !Important;}";
if (false || (document.location.href.indexOf("http://tieba.baidu.com/p") == 0) || (document.location.href.indexOf("http://tieba.baidu.com/f?ct=") == 0) || (document.location.href.indexOf("http://tieba.baidu.com/f?z=") == 0) || (document.location.href.indexOf("http://tieba.baidu.com/f?kz=") == 0))
	css += ".l_posts_num {\npadding:5px 5px 3px 2px!important;\nbackground:rgba(0,0,0,.65);\nposition:fixed;\nbottom:0px;left:13%;\nz-index:999999;\ntransition:bottom 0.2s linear;\n-webkit-transition:bottom 5s linear;}\n\n.l_posts_num:hover {\nbottom:0px;}\n\n#thread_theme_3 .l_reply_num {\ncolor:rgba(255,255,255,80) !important;\nmargin-left:10px !important;}\n\n#pager_go2 {\n-moz-appearance:none !important;\nbackground:rgba(62,109,181,99) !important;\nborder:none !Important;\nheight:18px !Important;}\n\n#jumpPage2 {\n-moz-appearance:none !important;\nborder:none !Important;\nbackground:rgba(200,200,200,.40) !important;}\n\n\n.l_pager.pager_theme_2 .tP,.l_pager.pager_theme_2 a {\ncolor:#FFF !important;\npadding:2px 8px !important;\n}\n\n.l_pager.pager_theme_2 a {\nbackground:rgba(62,109,181,65) !Important;}\n\n.j_pager.l_pager.pager_theme_2 .tP {\ncolor:rgba(62,109,181,65) !important;}\n\n#thread_theme_4 {DISPLAY:NONE !iMPORTANT}";
if (false || (document.location.href.indexOf("http://tieba.baidu.com/disk/index?kw=") == 0))
	css += ".pagination {\npadding:7px 4px 4px!important;\nborder:none !Important;\nbackground:rgba(0,0,0,.65);\nposition:fixed;\nbottom:-40px;left:20%;\nz-index:999999;\ntransition:bottom 0.2s linear;\n-webkit-transition:bottom 5s linear;}\n\n.pagination:hover {\nbottom:-15px;}\n\n.pagination .current,.pagination a {\nborder:none !Important;\ncolor:#FFF !Important;}\n\n.pagination a {\nborder-radius:0px !Important;\nbackground:rgba(62,109,181,99) !Important;}\n\n.current {background:none !Important;}";
if (false || (document.location.href.indexOf("http://tieba.baidu.com/f/search") == 0))
	css += ".pager.pager-search {\npadding:4px 5px 3px 2px!important;\nborder:none !Important;\nbackground:rgba(0,0,0,.65);\nposition:fixed;\nbottom:0px;left:1%;\nz-index:999999;\ntransition:bottom 0.2s linear;\n-webkit-transition:bottom 5s linear;}\n\n.pager.pager-search:hover {\nbottom:0px;}\n\n.pager.pager-search .cur,.pager.pager-search a {\nborder:none !Important;\ncolor:#FFF !Important;}\n\n.pager.pager-search a {\nbackground:rgba(62,109,181,99) !Important;}\n\n.pager span.hasPage {\nmargin-left:10px !Important;\nline-height: 20px !Important;\ncolor:#FFF !important;}";
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