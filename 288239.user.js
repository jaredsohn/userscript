// ==UserScript==
// @name        Netvibes Skin Fix
// @namespace   plugin.animetakvimi.com
// @include     http://www.netvibes.com/privatepage/1
// @version     1
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle('.nv-reader-item .item-header, .nv-reader-item .item-enclosure-action, .nv-item-renderer .item-actions{ height: 25px; } .nv-reader-item, .nv-item-list-renderer .group-label{padding-left: 20px;} .smartreader-header { height: 41px; } .smartreader-header-top .container { top: 10px; } .nv-sidebar-handler.left{margin-right: 0px;} .nv-ir-feed-head, .nv-ir-article-text{ max-width: none; } .nv-item-list-renderer .group-label{color:darkcyan}.nv-ir-article-text br + br{display:block} .nv-reader-item:not(.this-class-does-not-exist) .item-preview-wrapper:after {background-image:linear-gradient(90deg, rgba(237, 237, 237, 0), #F2F2F2)} .nv-reader-item:not(.read){background-color:#F1F1F1} .nv-reader-item:not(.read) .item-title { color: #222;font-weight: bold; } .nv-reader-item .item-header > * { line-height: 27px; } .feed.nv-item-renderer { margin: 0;padding: 20px 20px 40px 0;} .nv-item-renderer.focus { border:2px solid #81C147 !important; border-left: 5px solid #81C147 !important; } .nv-item-renderer .item-actions.no-tagging{line-height: 22px;} .item-content{background-color:#FFF} .nv-ir-article-text{ color: #222; } /*body #footer{ display:none; }*/ .hideSidebarRight #footer-toggle {left: 5px;width: 65px;overflow: hidden;} #smartreader-feeds-main{ background-color:#F2F2F2 }#footer-toggle .footer-toggle-arrow{margin-left:-210px;}');