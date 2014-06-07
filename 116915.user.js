// ==UserScript==
// @name       GR+Fix
// @namespace  http:///
// @version    0.1
// @description  Google Reader +
// @include    http*://www.google.*/reader/view/*
// @copyright  2011+, JinVan
// ==/UserScript==

GM_addStyle("#top-bar                                                                       { height:50px !important; }");
GM_addStyle("#viewer-header                                                           { height:46px !important; }" );
GM_addStyle("#entries.list .entry .collapsed                                       { padding:0px 0px 0px 0px !important;}");
GM_addStyle("#entries.list .collapsed .entry-secondary                             { top:0px !important;}");
GM_addStyle("#entries.list .collapsed .entry-main .entry-source-title              { top:0px !important;}");
GM_addStyle("#entries.list .collapsed .entry-main .entry-source-title              { top:0px !important;}");
GM_addStyle("#entries.list .collapsed .entry-main .entry-original                  { top:3px !important;}");
GM_addStyle(".search-result .entry-original, #entries .collapsed .entry-original   { top:0px !important;}");
GM_addStyle("#entries.list .collapsed .entry-icons                                 { top:0px !important;}");
GM_addStyle("#entries.list .entry .collapsed                                       { line-height:3ex !important;}");
GM_addStyle(".entry .entry-icons .star                                             { margin-top:1px !important;}");
GM_addStyle(".entry .entry-icons .star                                             { margin-bottom:1px !important;}");
GM_addStyle("#entries.list .read .collapsed                                   {background:#f4f4fc !important;}");
GM_addStyle("#chrome.search-stream #entries.search .entry, #sections-header, #home, body, #viewer-header , #sub-tree-header, #viewer-container , #entries .entry, #entries.list .entry-container, .card-common, .lhn-section, .scroll-tree .lhn-section-primary, .scroll-tree li, #overview-selector, #lhn-selectors .selector, .lhn-section-secondary li a , #entries.list .entry .collapsed, .lhn-section-secondary li.folder.tree-selected a.tree-link-selected, #viewer-header-container, #lhn-add-subscription-section, #entries , .card, #current-entry .card, #entries.list .read .collapsed, #entries.list .entry, .entry-main, .entry-container, #entries.list .entry .entry-container, #entries.list .entry .collapsed  {background:#ECECEC !important;color:#F8F8F8 !important;border-color:#CECECE}");