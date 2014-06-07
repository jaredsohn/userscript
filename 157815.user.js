// ==UserScript==
// @name          字体体链接美化
// @description	  Font body link beautification
// @auther		http://896221565.qzone.qq.com
// @version	 2013.1.30
// @Modified from  http://userscripts.org/users/sunbaokang
// @include        *
// ==/UserScript==

(function() {
var css = "@charset \"utf-8\";\n\n\n*{\n    font-family: \"msyh\", \"Microsoft YaHei\",\"微软雅黑\"!important ;\n    font-weight: 600!important;\n    letter-spacing : -1px!important;\n}\n\nselect,textarea,#result_box,#in,.SG_connBody,.mo,.d_post_content_main,.results{\n    color: black !important;    \n    background: #C7EDCC !important;\n}\na:hover {color: #CCE8CF!important;}\na:visited { color:#F70707!important ;}\n@media print {\n    *{\n        color: black !important;    \n        background: green !important;\n    }\n}\n\ninput[type=\"text\"],input[type=\"password\"],input[type=\"url\"],input[type=\"search\"],input[type=\"email\"],.box-search_input,.s_ipt_wr,.s_ipt,.search-box-bg,.word,.input_span1,.i,.input-box,.queryborder,.lst-d,.q,.sw_b,.bi,.play-panel,.gn_search,#search-input,.hdsearch,.zu-top-search-form,.hdi{\n    color: black !important;\n    background:#CCE8CF ;\n    background-image: url(http://rrrrr.googlecode.com/files/huolilv_zps0acfafc3.png) !important;\n    background-repeat: repeat!important; \n    background-position: center center!important;    \n}";
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