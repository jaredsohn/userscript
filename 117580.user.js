// ==UserScript==
// @name           My Google Reader
// @namespace      dkmoonfruit@gmail.com
// @description    My Google Reader Style
// @include        http*://www.google.*/reader/view/*
// @version        0.3
// ==/UserScript==

//调整正文宽度
//GM_addStyle(".entry .entry-body, .entry .entry-title { max-width:100% !important; }");

//压缩搜索条高度
GM_addStyle("#top-bar { height:50px !important; }");
GM_addStyle("#search { padding:11px 0px !important; }");

//压缩工具条高度
GM_addStyle("#viewer-header { height:50px !important; }");
GM_addStyle("#viewer-top-controls-container { margin-top:-15px !important; }");
GM_addStyle("#logo-section { height:38px !important; }");
GM_addStyle("#lhn-add-subscription-section { height:40px !important; }");
GM_addStyle("#lhn-add-subscription { margin-top:-25px !important; }");

//压缩文章列表的行高(1.2em = 字体高度 * 1.2)
//GM_addStyle("#entries { padding:0px !important; }");
//GM_addStyle(".collapsed { line-height:1.5em !important; padding:2px 0 !important; }");
//GM_addStyle(".entry-icons { top:0px !important }");
//GM_addStyle(".entry-source-title { top:2px !important }");
//GM_addStyle(".entry-secondary { top:2px !important }");
//GM_addStyle(".entry-main .entry-original { top:4px !important }");

//压缩导航树的左边距
GM_addStyle(".section-minimize { left:0px !important }");
GM_addStyle("#overview-selector, #lhn-selectors .selector, .folder .name.name-d-0, #sub-tree-header { padding-left:15px !important; }");
GM_addStyle(".folder .folder .folder-toggle { margin-left:12px !important }");
GM_addStyle(".folder .sub-icon, .folder .folder>a>.icon { margin-left:27px !important }");
GM_addStyle(".folder .folder>ul .icon { margin-left:34px !important }");
GM_addStyle(".folder .folder .name-text { max-width:160px; !important }");
GM_addStyle("#reading-list-selector .label { display:inline !important }");

//压缩导航树不同部分之间的间隙
GM_addStyle(".selectors-footer { margin-bottom:0px !important; padding-bottom:0px !important; }");
GM_addStyle(".lhn-section-footer { margin-bottom:0px !important; padding-bottom:0px !important; }");

//隐藏导航树-主页
//GM_addStyle("#overview-selector { display:none !important; }");
//隐藏导航树-所有条目
//GM_addStyle("#lhn-selectors { display:none !important; }");
//隐藏导航树-探索
//GM_addStyle("#lhn-recommendations { display:none !important; }");

//调整导航树的宽度
GM_addStyle("#nav, #nav * { max-width:240px !important; }");
GM_addStyle("#nav { width:240px !important; }");
GM_addStyle("#chrome { margin-left:240px !important; }");
