// ==UserScript==
// @name          Yuki`s GoogleReader Fix 1
// @namespace     http://1percent.tk
// @homepage      http://userscripts.org/scripts/show/117742
// @description	  优化2011年新版google reader显示界面，基于Yuki`s GoogleReader脚本修改；Improve the new(2011) google reader UI, base on the great script named Yuki`s GoogleReader.
// @author        sicifus
// @version       2011.11.22.1
// @origin_namespace     http://userstyles.org
// @origin_description	 主要是把界面布局弄得紧凑一点。
// @origin_author        天涯倦客
// @origin_homepage      http://userstyles.org/styles/55639
// @include       http://www.google.com/reader*
// @include       https://www.google.com/reader*
// @run-at        document-start
// @discussion    http://g.mozest.com/viewthread.php?tid=40103&page=2
// ==/UserScript==
(function() {
var css = "";
if (false || (document.location.href.indexOf("http://www.google.com/reader") == 0) || (document.location.href.indexOf("https://www.google.com/reader") == 0))
	css += "#logo-section,#logo{display:none!important;}\n#top-bar{height:0px!Important;border:none!important;}\n#title-and-status-holder{display:none!Important;}\n#item-up-down-buttons{display:none!Important;}\n#settings-button-container{display:none!Important;}\n \n \n \n/*搜索框位置*/#search{position:absolute!important;\nright:-300px!important;\ntop:-20px!Important;\nz-index:2!important;\npadding:0!important;}\n\n\n#lhn-add-subscription-section\n{height:30px!important;\nborder:none!important;}\n#lhn-add-subscription{\nmargin: -13px 0 0px 40px!important;\nbox-shadow:0 0 2px grey !important;}\n\n.goog-inline-block.goog-flat-menu-button.search-restrict{\nheight:22px!important;\nwidth:70px!important;\npadding:0px!important;\nmargin-top:1px!important;}\n.goog-inline-block.goog-flat-menu-button.search-restrict .goog-inline-block.goog-flat-menu-button-caption\n{top:-3px!Important;\nleft:-3px!Important;}\n.goog-inline-block.goog-flat-menu-button.search-restrict .goog-inline-block.goog-flat-menu-button-dropdown\n{top:10px!Important;}\n\n#search-input{\nheight:18px!important;\nwidth:80px!important;\nmargin:2px -15px 0 0!important;}\n\n#search .goog-inline-block.jfk-button.jfk-button-action\n{display:none!important;}\n\n#chrome-title{display:none!important;}\n\n.entry-actions {\npadding:0px!Important;\nfont-size:1em!important;}\n.entry-actions *{color:#1F6A08!important;}\n.entry-actions .item-star.star.link.unselectable,\n.entry-actions .item-star-active.star.link.unselectable\n{margin:0 0 -3px 3px!important;}\n\n.item-plusone\n{position:relative!important;\ntop:3px!important;}\n\n#entries .entry-body,.entry .entry-title \n{max-width: none !important; }\n\n.entry-body{padding:0 10px 0 0px!Important;}\n\n#current-entry > DIV:first-child > DIV:last-child > DIV > H2\n{color:#4B9B0D!important;font-size:11pt!important;} \n\n.snippet{font-size:10pt!important;}\n.entry-title{font-size:10.5pt!important;}\n.entry-main{font-size:11pt!important;}\n\n.highlighted0{background-color:yellow!important;}\n.highlighted1{background-color:#9BFADE!important;}\n.highlighted2{background-color:#95FF08!important;}\n\n.collapsed:hover,#nav .link:hover,#overview-selector:hover,#reading-list-selector:hover\n{ background:#BCDEFF !important;}\n\n.scroll-tree li .tree-link-selected{\nbackground-color: rgba(70,160,255,.5) !important; \nborder-top:1px red dotted!important;\nborder-bottom:1px red dotted !important;}\n\n/*紧凑List View*/\n/*压缩空白*/#entries.list .entry .collapsed{ height: 2.5ex !important;}\n/*文字*/#entries.list .collapsed .entry-source-title, #entries.list .collapsed .entry-title, #entries.list .collapsed .entry-date{ line-height: 2.4ex !important;}\n/*星号*/#entries.list .collapsed .entry-icons{ top:-2px !important;}\n/*原链接*/#entries.list .collapsed .entry-main .entry-original{ top:1px !important;}\n/*Fixes expanded entry line*/#entries.list #current-entry.expanded .collapsed{ padding-bottom:2px !important;}\n/*Unknown*/#current-entry{border-top:2px rgb(135,135,135) solid!Important;border-bottom:2px rgb(135,135,135) solid!Important;}#current-entry .entry-actions{border-bottom:none!Important;}\n/*紧凑结束*/\n\n\n.lhn-section-primary  { line-height:20px !important;}\n.scroll-tree li.folder .link, .scroll-tree li.sub{ height:18px !important;}\n#reading-list-unread-count{margin-top:0px!Important;}\n#lhn-selectors-minimize{margin-top:-2px!important;}\n#nav .selectors-footer{margin:-6px 0 0px 0 !Important;}\n#nav .lhn-section-footer{height:10px!Important;}\n#nav #overview-selector{margin:5px 0 -5px 0 !Important;}\n#nav .toggle.folder-toggle.toggle-d-1{margin-top:2px!important;}\n#nav #scrollable-sections-holder{margin-top:2px!Important;}\n\n#mark-all-as-read-split-button .goog-inline-block.jfk-button.jfk-button-standard.jfk-button-collapse-right.jfk-button\n{ background-image: -moz-linear-gradient(top, #61A7EF, #599ADD)!important;\nbox-shadow: 0 0 2px 0 rgba(0,0,0,.3) inset !important; \ncolor:white!important;\nborder:1px solid #4D85C0!Important;\n-moz-border-radius:4px 0 0 4px !Important}\n#mark-all-as-read-split-button .goog-inline-block.jfk-button.jfk-button-standard.jfk-button-collapse-right.jfk-button:hover\n{ background-image: -moz-linear-gradient(top, #6AA7ED, #4886CB)!important;}\n\n#stream-prefs-menu .goog-button-body{font-size:11px!Important;}\n\n#viewer-header-container{border-bottom:none!Important;}\n#viewer-header-container{height:32px!important;}\n#viewer-top-controls{margin-top:-8px!Important;}\n\n#chrome-view-links\n{position:fixed!Important;\nz-index:3!Important;\nright:-5px!Important;}\n\n#entries,#viewer-entries-container{padding:0 0 12px 0!important;}\n\n.entry-secondary{left:20px!important;}\n.entry-source-title{left:40px!important;}\n.entry-original{\nleft:20px!important;\nmargin-top:3px!important;}\n.item-star.star.link.unselectable.empty,.item-star-active.star.link.unselectable.empty\n{position:absolute!Important;\nleft:0px!important;\ntop:14px!Important;}\n.entry-title-link{\nmargin-left:40px!Important;}\n\n#viewer-entries-container{\nbox-shadow:0 1px 3px black  !Important;}\n\n#nav {max-width:160px!Important;}\n#chrome{left:0!Important;\nmargin-left:0px!Important;}\n#scrollable-sections-bottom-shadow,#scrollable-sections-top-shadow\n{max-width:220px!Important;}\n#lhn-add-subscription-section,#viewer-refresh,#mark-all-as-read-split-button,#stream-prefs-menu,#chrome-view-links{display:none!important;}\n/*自动隐藏顶部导航栏*/#gb{position:relative!important;top:-23px!important;}\n#gb:hover{top:0px!important;}\n#main{margin-top:-23px!important;}";
if (false || (document.domain == "google.com" || document.domain.substring(document.domain.indexOf(".google.com") + 1) == "google.com"))
	css += ".n-f-eb.f-oa-Ya{max-height:320px!Important;}\n.B-u-C{max-height:300px!Important;}";
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