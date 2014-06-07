// ==UserScript==
// @name           Google Reader - Style by imAdam
// @namespace      http://userscripts.org/scripts/show/121804
// @include        http*://www.google.*/reader/*
// @include        http://userscripts.org/scripts/show/121804.meta.js
// @icon           https://www.google.com/reader/ui/352024653-app-icon-32.png
// @description    Style by Adam in Google Reader.
// @updateURL      http://userscripts.org/scripts/source/121804.meta.js
// @author         imAdam
// @version        2011-02-23
// ==/UserScript==

GM_addStyle("#nav, #logo-container, #lhn-add-subscription-section, #scrollable-sections-top-shadow, #scrollable-sections-bottom-shadow { max-width: side-nav-sizepx !important; width: side-nav-sizepx !important; }");
GM_addStyle("#chrome { margin-left: side-nav-sizepx !important; }");
GM_addStyle("#search { margin-left: side-nav-sizepx !important; padding-left: 3px !important; }");
GM_addStyle(".lhn-hidden #chrome { margin-left: 0px !important; }");

// 隱藏Google Nav
GM_addStyle("#gb { height: auto !important; }");
GM_addStyle("#gbzw, #gbx3 { display: none !important; }");
GM_addStyle("#gbx1, #gbq, #gbu, #gb.gbesi #gbx1, #gb.gbesi #gbq, #gb.gbesi #gbu { top: 0 !important; }");
GM_addStyle("#gbx1 { position: static !important; }");
GM_addStyle("#logo-section { display: none !important; }");


// 搜尋欄高度
GM_addStyle("#top-bar { height: auto !important; }");
GM_addStyle("#logo { margin-top: -13px !important; }");
GM_addStyle("#logo, #lhn-add-subscription { margin-left: 19px !important; }");
GM_addStyle("#search { padding: 2px 3px !important; }");

// 工具欄高度
GM_addStyle("#lhn-add-subscription, #viewer-top-controls-container { margin-top: -15px !important; }");
GM_addStyle("#lhn-add-subscription-section, #viewer-header, #sections-header { height: 33px !important; }");
GM_addStyle("#lhn-add-subscription { top: 50% !important; }");


// 壓縮導覽不同部分的空隙
GM_addStyle("#home-section { padding-top: 0 !important; padding-bottom: 0 !important; }");
GM_addStyle(".lhn-section-primary, #recommendations-tree .lhn-section-primary { height: 25px !important; }");
GM_addStyle(".selectors-footer, .lhn-section-footer { margin-bottom: 0 !important; padding-bottom: 0 !important; }");

// 導覽列表左邊空白部分壓縮
GM_addStyle(".section-minimize { left:0px !important }");
GM_addStyle("#overview-selector, #reading-list-selector, #star-selector, #trends-selector, #directory-selector, #recs-tree-item-0-name, #sub-tree-header { padding-left: 12px !important; }");
GM_addStyle(".lhn-section-footer { margin-left: 12px !important; }");
GM_addStyle(".folder .folder .folder-toggle { margin-left:3px !important }");
GM_addStyle(".folder .sub-icon, .folder .folder>a>.icon, .folder .tag-icon { margin-left:15px !important }");
GM_addStyle(".folder .folder>ul .icon { margin-left:15px !important }");
GM_addStyle(".folder .folder .name-text { max-width:160px; !important }");
GM_addStyle("#reading-list-selector .label { display:inline !important }");
GM_addStyle("#entries-status { top: auto !important; }");
GM_addStyle(".name-text { max-width: none !important; }");


// 文章寬度
GM_addStyle(".entry .entry-body, .entry .entry-title { max-width:100% !important; }");
GM_addStyle(".entry .entry-container { padding-left: 1em !important; padding-right: 1em !important; }");

// 文章標題、下劃線
GM_addStyle(".entry .entry-title { font-size: 100% !important; }");
GM_addStyle(".entry .entry-title .entry-title-link { text-decoration: underline !important; }");

// 收緊條目間距
GM_addStyle("#entries { padding: 0 !important; }");

// 展開檢視
GM_addStyle("#entries.cards .entry { margin: 0 !important; }");
GM_addStyle("#entries.cards .card-content { padding: 5px !important; }");
// 標題檢視
GM_addStyle("#entries.list .collapsed .entry-source-title, #entries.list .collapsed .entry-title, #entries.list .collapsed .entry-date { line-height: 1.5em !important; }");
GM_addStyle("#entries.list .entry .collapsed { height: 1.5em !important; }");
GM_addStyle("#entries.list .expanded .entry-secondary-snippet {display: none !important; }");


// 菜單
GM_addStyle(".goog-menuitem, .goog-tristatemenuitem, .goog-filterobsmenuitem, .goog-menuitem-highlight, .goog-menuitem-hover { padding-top: 0px !important; padding-bottom: 0px !important; border-width: 0 !important; }");