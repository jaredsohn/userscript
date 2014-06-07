// ==UserScript==
// @name           Google Reader Demarginfier
// @namespace      http://www.aintaer.com/Projects
// @description    Reduces margins on the new Google Reader layout
// @include        http://www.google.com/reader/view/*
// @include        https://www.google.com/reader/view/*
// @include        http://www.google.*/reader/view/*
// @include        https://www.google.*/reader/view/*
// @version        1.4
// ==/UserScript==

var overrideCSS = " \
#top-bar { height:45px !important; } \
#search { padding:8px 0 !important; } \
#sections-header { height:45px !important; } \
#viewer-header { height:45px !important; } \
#viewer-header-container { border:none !important; } \
#chrome-fullscreen-top-toggle { box-shadow: none !important } \
#lhn-add-subscription-section { height:45px !important; } \
#lhn-add-subscription, #viewer-top-controls-container \
{ margin-top:-15px !important; } \
.lhn-section-primary { line-height: 21px !important; } \
#entries { padding:0 !important; } \
#entries.list .collapsed { height:2.3ex !important; padding:1px 0 !important; } \
#entries.list .collapsed .entry-source-title, #entries.list .collapsed \
.entry-title, #entries.list .collapsed .entry-date \
{ line-height: 2.3ex !important } \
#entries.list .entry .entry-secondary .snippet { color: #333 } \
#entries.list .entry.read .entry-secondary .snippet { color: inherit } \
#entries.list .entry .entry-main .entry-source-title \
{color:#333 !important} \
#entries.list .entry.read .entry-main .entry-source-title \
{color: #666 !important} \
#title-and-status-holder { padding:0.3ex 0 0 0.5em !important; } \
.entry-icons { margin-top:-8px !important } \
.entry-source-title { top:2px !important } \
.entry-secondary { top:2px !important } \
.entry-main .entry-original { margin-top:-6px !important } \
.section-minimize { left: 0px !important; top: 3px !important } \
#lhn-recommendations .section-minimize { top: 5px !important } \
#overview-selector, #lhn-selectors .selector, .folder .name.name-d-0, \
#sub-tree-header \
{ padding-left: 15px !important; } \
.folder .folder .folder-toggle { margin-left:13px !important } \
.folder .sub-icon, .folder .folder>a>.icon { margin-left:27px !important } \
.folder .folder>ul .icon { margin-left:34px !important } \
.folder .folder .name-text { max-width:160px; !important } \
#reading-list-selector .label, #reading-list-unread-count \
{ display:inline } \
.scroll-tree .toggle { top: 2px !important; } \
";
GM_addStyle(overrideCSS);
document.querySelector("#lhn-add-subscription-section").classList.add('hidden');
document.querySelector("#chrome-viewer").classList.add('fullscreen');
document.querySelector("#viewer-header").classList.add('hidden');
document.querySelector("#chrome-fullscreen-top-toggle").classList.remove('hidden');
