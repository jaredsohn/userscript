// ==UserScript==
// @name           Google Reader Compact Template
// @namespace      GRCT
// @description    Fix Google Reader's recent layout changes : Less wasted spaces, blue title and buttons colors, Nicer borders for each box and more..
// @version 1.0.4
// @date 	2013-01-28
// @creator 	mistapnt@gmail.com
// @include        http://www.google.*/reader/view/*
// @include        https://www.google.*/reader/view/*
// ==/UserScript==

GM_addStyle(" \
#main {top: 18px;!important} \
#gbql{background-position: -62px 0 !important; height: 37px!important; width: 95px;!important} \
#gb, #gb.gbes, #gb.gbesi, #gbqlw {height: 41px !important;} \
#gbx3 {height:24px!important} \
#gbzw,#gbx1, #gb #gbx1, #gbq, #gbu, #gb #gbq, #gb #gbu{height:38px!important} \
#gbx1, #gb #gbx1, #gbq, #gbu, #gb #gbq, #gb #gbu {    top: 23px!important;} \
#gb.gbesi #gbzw .gbt, #gbzw.gbes .gbt,#gbzw .gbt {    line-height: 20px!important;} \
.unread-count { font-size: 100%; font-weight: bold; color: #000 !important; } \
a.tree-link-selected .name { color: red !important; font-weight: bold; } \
.tree-link-selected { border-left: 3px solid red !important; background-color: #eee !important; } \
#scrollable-sections { overflow: auto !important; } \
::-webkit-scrollbar { width: 24px; } \
.card { margin-left: 10px; padding-right: 8px; } \
#viewer-header, #lhn-add-subscription-section { height: 42px;!important } \
.lhn-section-primary { line-height: 15px; } \
#reading-list-unread-count { margin-top: 1px; line-height: 15px; } \
.section-minimize { top: 0; } \
#scrollable-sections-holder { border-right: #EBEBEB solid 1px; } \
#search { padding: 10px 0; } \
#top-bar { height: 45px; } \
.entry .star { height: 12px; margin-right: -3px; } \
.card, .search .search-result { border: 1px solid #4D90F0; } \
.entry-body a { color: #4D90F0 !important; } \
#sub-tree-container li{margin : 1px 0px 0px 1px;} \
.card, .search-result { margin-left: 5px; padding-right: 8px; border-radius: 6px; box-shadow: 3px 3px 3px #ccc; } \
.read .card { border: #ddd solid 1px; background: transparent; } \
.card { border-size: 1px;} \
#current-entry .card{border-color:red} \
.goog-flat-menu-button { height: 27px !important; } \
.folder .name-text, #reading-list-selector .label { max-width: 160px !important; } \
.folder .folder .name-text { max-width: 152px !important; } \
.folder .folder .name-text.folder-name-text { max-width: 170px !important; } \
.folder .folder > ul .icon { padding-right: 5px; margin-left: 35px !important; width: 17px !important; height: 17px !important; } \
.folder .folder > a > .icon { margin-left: 18px !important; margin-top: 4px !important; } \
.folder .folder .folder-toggle { margin-left: 5px !important; margin-top: 4px !important; } \
#recommendations-tree .lhn-section-primary { height: auto !important; } \
#recommendations-tree .sub-name, #recommendations-tree .lhn-section-secondary .folder-name-text { padding: 0 !important; } \
.expanded .folder-icon { width: 17px !important; height: 17px !important; } \
.collapsed .folder-icon {width: 17px !important; height: 17px !important;  } \
#recommendations-tree .lhn-section-primary { height: auto !important; } \
#recommendations-tree .sub-name, #recommendations-tree .lhn-section-secondary .folder-name-text { padding: 0 !important; } \
#home-section{display:none} \
#quick-add-bubble-holder{width:auto} \
.jfk-button-primary, .jfk-button-action,#gbqfb { background: #3b5998; border-color: #3b5998; } \
.scroll-tree .folder-icon {    background-position: -44px -120px;} \
#scrollable-sections-top-shadow{opacity : 100} \
#viewer-header-container, #sections-header{ border-bottom : 1px solid rgba(0, 0, 0, 0.4);} \
#scrollable-sections-top-shadow{opacity : 100!important} \
#scrollable-sections-bottom-shadow,#logo-section {display:none!important} \
body{padding-bottom:0px!important} \
#logo-section + #lhn-add-subscription-section {height:42px}\
#logo-section + #lhn-add-subscription-section #lhn-add-subscription{top:22px} \
#gbu {height: auto!important;    margin: 0px!important;    padding-top: 4px!important;    right: 0;} \
#gbq2{padding-top: 5px!important;}\
#gbx1.gbes, #gbx2.gbes, #gbqlw.gbes, #gb.gbesi #gbx1, #gb.gbesi #gbx2, #gb.gbesi #gbqlw,#gbq, #gbv, #gbn, #gbx1, #gbx2,#gbx1.gbem, #gbx2.gbem, #gbqlw.gbem, #gb.gbemi #gbx1, #gb.gbemi #gbx2, #gb.gbemi #gbqlw,#gb.gbem, #gb.gbemi {height: 38px!important;}\
#gb,#gb.gbes, #gb.gbesi,#gbqlw {height: 42px;}\
#gbmail.gbes,#gbmail.gbem, #gbmail {   top: 18px!important;}\
#gbq1.gbes, #gbq1,#gbq1.gbem {    margin-left: 16px!important;}\
.goog-option,.goog-menuitem,.goog-menuitem-heighlight{padding:0px 0px 0px 26px;border-top : 1px solid #F2F2F2} \
body, html {overflow: visible;} \
");