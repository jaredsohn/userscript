// ==UserScript==
// @name            Google Reader Optimized for chrome
// @namespace      http://userstyles.org
//@author           C.Huo
// @include        http://www.google.com/reader*
// @include        https://www.google.com/reader*

// ==/UserScript==

var style = 
".card-bottom { margin-left: 0px; margin-right: -9px; }"+
".entry .star { height: 12px; margin-right: -3px; }"+
".read .card { border: #cbcbcb solid 2px; background: transparent; }"+
".card { margin-left: 10px; padding-right: 8px; -webkit-border-radius: 6px; -moz-border-radius: 6px; border-radius: 6px; -webkit-box-shadow: 3px 3px 3px #ccc; -moz-box-shadow: 3px 3px 3px #ccc; box-shadow: 3px 3px 3px #ccc; }"+
".entry .entry-body, .entry .entry-title { max-width:100% !important; }"+
"#scrollable-sections-holder { border-right: #EBEBEB solid 1px; }"+
"::-webkit-scrollbar { width: 22px; }"+
".read a.entry-title-link { color: #2F477A !important; }"+
"a.entry-title-link { color: blue !important; }"+
".entry-body a { color: #3b5998 !important; }"+
".unread-count { font-size: 100%; font-weight: bold; color: #000 !important; }"+
"#entries { padding-right: 15px; }"+
"#logo-section{ display: none; }"+
"#gb{height:80px;}"+
"#gbx1{height:45px;}"+
"#gbqlw{height:45px;}"+
"#gbu{height:45px;padding-bottom:5px;padding-top: 5px;}"+
"#gbq2{padding-top: 10px;}"+
".cards .entry { padding: 8px 0; }"+
"a.tree-link-selected .name { color: red !important; font-weight: bold; } "+
".tree-link-selected { border-left: 3px solid red !important; background-color: #eee !important; } "+
"#scrollable-sections { overflow: auto !important; } "+
"#top-bar { height:40px !important; }"+
"#search { padding:6px 0px !important; }"+
"#viewer-header {left:300px;width:750px;height:40px !important;}"+
"#viewer-header-container{height:40px;}"+
"#viewer-top-controls{position:absolute;top:0px;z-index:2}"+
"#title-and-status-holder {position:fixed;height:30px;}"+
"#chrome-title {color:red;position:relative;top:-40px;font-size: 18px;width:280px;height:30px;text-overflow:ellipsis;}"+
"#chrome-title a {color:red;}"+
"#chrome-title .chevron {color:red;}"+
"#lhn-add-subscription-section { top:15px;height:40px !important; }"+
"#lhn-add-subscription{ top:0px !important; }"+
"#home-section{display:none;}"+
"#viewer-top-controls-container { margin-top:-15px !important; }"+
"#entries { padding:0px !important; }"+
".collapsed { line-height:1.2em !important; padding:2px 0 !important; }"+
".entry-icons { top:16px !important }"+
".entry-original { margin-top:3px !important;}"+
".entry-source-title { top:2px !important }"+
".entry-secondary { top:2px !important }"+
".entry-main .entry-original { top:4px !important }"+
".section-minimize { left:0px !important }"+
"#overview-selector, #lhn-selectors .selector, .folder .name.name-d-0, #sub-tree-header { padding-left:15px !important; }"+
".folder .folder .folder-toggle { margin-left:12px !important }"+
".folder .sub-icon, .folder .folder>a>.icon { margin-left:27px !important }"+
".folder .folder>ul .icon { margin-left:34px !important }"+
".folder .folder .name-text { max-width:160px; !important }"+
"#reading-list-selector .label { display:inline !important }"+
(".selectors-footer { margin-bottom:0px !important; padding-bottom:0px !important; }"+
".lhn-section-footer { margin-bottom:0px !important; padding-bottom:0px !important; }"+
"#overview-selector { display:none !important; }"+
"#lhn-recommendations { display:none !important; }"+
"#nav, #nav * { max-width:240px !important; }"+
"#nav { width:240px !important; }"+
"#chrome { margin-left:240px !important; }");
GM_addStyle(style);