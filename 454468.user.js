// ==UserScript==
// @name          护眼片
// @namespace     http://userscripts.org
// @description	设置网页太白的部分为另一个颜色
// @author        独立观察员DLGCY
// @copyright     2014 独立观察员
// @version       1.0
// @homepage      http://userscripts.org/scripts/show/454468
// @updateURL     http://userscripts.org/scripts/source/454468.meta.js
// @downloadURL   http://userscripts.org/scripts/source/454468.user.js
// @include       http://*
// @exclude       http://www.doc163.com/*
// @exclude       http://www.icoc.cc/
// @exclude       http://www.gamersky.com/*
// @exclude       http://dlgcy.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "@charset \"utf-8\";\n@namespace url(http://www.w3.org/1999/xhtml);\nselect,textarea,#result_box,#in,.SG_connBody,.mo,.d_post_content_main,.results,.med,#maincontent,.postbody,.line,#wgt-ask,.wgt-best.mb-10,#article,.chapter_content,#detail_list,.wrapper_main,#screenleft,.zm-topic-list-container,.zu-main-content-inner,.main-body,.search-result,#results,.threadlist,.j_thread_list.threadlist_li_gray,.mod-text-content.mod-post-content.mod-cs-contentblock,.vt,.floot_left,.floot_right,.formBox,.yx1,.bm_c,.bgF8F8F8,#content,.postText,#article_content{\n    color: black !important;    \n    background: #D9D9D9 !important;\n}
\n@media print {\n*{\ncolor: black !important;\nbackground: white !important;\n}\n}\n ";
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