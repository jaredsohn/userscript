// ==UserScript==
// @name          Netvibes Compact
// @description   Reduce whitespace on Netvibes
// @include       http://www.netvibes.com/*
// ==/UserScript==

var css = " \
  body { \
    font-family: sans-serif; \
  } \
  .nv-reader-title-edit, .nv-reader-title { \
    margin: 5px; \
    font-size: 16px; \
  } \
  .nv-sidebar-left, .nv-sidebar-right, .nv-sidebarContainer { \
    width: 200px; \
  } \
  .nv-treeview-header .toggle-static-sections { \
    padding: 5px 5px 0px 10px; \
    width: 20px; \
    background-image: none; \
  } \
  #top, .nv-sidebarContainer, .nv-sidebar-left .nv-sidebar-scroller { \
    background-color: #211111; \
    background-image: none; \
  } \
  .nv-treeview-static .nv-treeview-row, .nv-treeview-section .nv-treeview-row, \
  .nv-treeview-feed { \
    height: 24px; \
    line-height: 24px; \
  } \
  .nv-sidebar-left .nv-sidebar-scroller { \
    top: 180px; \
  } \
  .nv-sidebar-left .hide-static-sections .nv-sidebar-scroller { \
    top: 40px; \
  } \
  .nv-treeview-static .nv-treeview-row .nv-treeview-unread, \
  .nv-treeview-row .nv-treeview-unread { \
    height: 16px; \
    line-height: 16px; \
    top: 4px; \
  } \
  .nv-treeview-static .nv-treeview-row .icon, \
  .nv-treeview-section .nv-treeview-row .icon { \
    top: 4px; \
  } \
  .nv-treeview-staticContainer { \
    margin-bottom: 5px; \
  } \
  .nv-treeview-content .nv-treeview-row { \
    padding-left: 20px; \
  } \
  .smartreader-header { \
    height: 35px; \
  } \
  .smartreader-header-top .container { \
    top: 5px; \
  } \
  .feed.nv-item-renderer { \
    margin: 0px 5px 0px 5px; \
    padding: 5px; \
  } \
  .nv-ir-feed-head, .nv-ir-article-text { \
    max-width: 750px; \
    margin: 0px 5px 5px 20px; \
  } \
  .nv-reader-item { \
    padding: 0px 5px 0px 10px; \
  } \
  .nv-reader-item .item-header, .nv-reader-item .item-header > * { \
    height: 20px; \
    line-height: 20px; \
  } \
  .nv-reader-item .item-feedinfo-favicon { \
    margin-top: 5px; \
  } \
  .nv-ir-feed-head h2 { \
    font-size: 18px; \
    line-height: 1.2em; \
  } \
  .nv-ir-feed-infos { \
    margin-top: 0px; \
  } \
  .nv-item-list-renderer .group-label { \
    height: 24px; \
    line-height: 24px; \
  } \
  #smartreader-feeds-headerTitle, .nv-reader-item .item-header { \
    color: #5e1e1e; \
  } \
  .nv-reader-item .item-title, .nv-ir-feed-head h2 a { \
    color: #333333; \
  } \
  .nv-reader-item .item-preview-wrapper { \
    color: #888888; \
  } \
  .nv-item-list-renderer .item-actions { \
    color: #aaaaaa; \
  } \
  .nv-ir-article-text { \
    font-size: 12px; \
    line-height: 1.4em; \
    color: #333333; \
  } \
  .nv-ir-article-text a, .nv-ir-article-text a:visited { \
    color: #6f9233; \
  } \
  .nv-ir-article-text p { \
    margin-top: 10px; \
  } \
  .nv-ir-article-text br { \
    display: inline !important; \
  } \
  #footer-toggle { \
    display: none; \
  }";

GM_addStyle(css);
