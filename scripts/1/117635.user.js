// ==UserScript==
// @name          Google Reader Compact
// @author        ap
// @namespace     googlecompact
// @version       2011.11.09.001
// @description   This script will make Google Readers's new look compact
// @include       http*://www.google.*/reader/view/*
// @updateURL     https://userscripts.org/scripts/edit/117635.meta.js
// ==/UserScript==

if (typeof GM_addStyle === 'undefined') {
    var GM_addStyle = function(css) {
        var d = document;
        var s = d.createElement('style');
        var a = d.getElementsByTagName('head')[0] || d.documentElement;
        s.textContent = css;
        a.appendChild(s);
    }
}

GM_addStyle("#top-bar{height:38px}");
GM_addStyle("#logo{top:0!important;margin-top:8px!important;margin-left:30px!important}");
GM_addStyle("#top-bar #search{padding:7px 0!important;margin-left:200px!important}");
GM_addStyle("#home-section{padding:1px 0 0 0!important}");
GM_addStyle("#overview-selector{padding-left:18px!important}");
GM_addStyle("#nav{width:200px!important}");
GM_addStyle("#chrome{margin-left:200px!important}");
GM_addStyle("#scrollable-sections-top-shadow,#scrollable-sections-bottom-shadow{width:200px!important}");
GM_addStyle(".folder .folder .name-text{max-width:90px!important}");
GM_addStyle("#overview .title{font-size:140%!important}");
GM_addStyle("#sections-header{height:34px!important;margin-bottom:.5em!important}");
GM_addStyle("#lhn-add-subscription-section{height:34px!important;width:200px!important}");
GM_addStyle("#lhn-add-subscription{top:0!important;margin-top:5px!important;margin-left:20px!important;height:22px!important;min-width:142px!important}");
GM_addStyle("#viewer-refresh{margin-right:8px!important}");
GM_addStyle(".jfk-button{height:22px!important;line-height:22px!important}");
GM_addStyle(".jfk-button-collapse-left{`margin-right:8px}");
GM_addStyle("#entries-down{margin-right:0!important}");
GM_addStyle(".jfk-textinput{height:20px!important;padding:1px 3px!important}");
GM_addStyle("#search-input{width:277px!important}");
GM_addStyle("#search .search-restrict{width:95px!important;margin:0 8px!important}");
GM_addStyle(".goog-flat-menu-button{line-height:22px!important;margin:0 0 0 -1px!important}");
GM_addStyle(".goog-flat-menu-button.goog-flat-menu-button-focused{z-index:2!important}");
GM_addStyle(".goog-flat-menu-button-dropdown{top:9px!important}");
GM_addStyle("#viewer-header{height:34px!important;margin-right:22px!important}");
GM_addStyle("#viewer-top-controls{padding:0!important}");
GM_addStyle("#viewer-top-controls-container{height:24px!important;top:0!important;margin-top:5px!important}");
GM_addStyle(".goog-button-base-inner-box{height:22px!important}");
GM_addStyle("#viewer-view-options,#mark-all-as-read-split-button,#viewer-top-controls .goog-button{margin-right:8px!important}");
GM_addStyle(".goog-button-tight .goog-button-base-content{line-height:10px!important}");
GM_addStyle(".goog-menu{padding:3px 0!important}");
GM_addStyle(".goog-menu-button .goog-menu-button-dropdown{top:9px!important}");
GM_addStyle(".goog-menuitem,.goog-tristatemenuitem,.goog-filterobsmenuitem{padding:1px 20px 1px 20px!important;margin-top:3px!important}");
GM_addStyle(".goog-menuitem-highlight,.goog-menuitem-hover{padding-top:0!important;padding-bottom:0!important}");
GM_addStyle("#left-section{width:71%!important}");
GM_addStyle("#right-section{width:29%!important}");
GM_addStyle("#sections-holder{padding-right:5px!important}");
GM_addStyle("#overview .overview-segment{margin-top:7px!important;margin-bottom:0!important;padding-bottom:7px!important;border-bottom:1px solid #EEE!important}");
GM_addStyle("#left-section .section-header{margin-top:10px!important}");
GM_addStyle(".entry.read .collapsed{background:rgba(230,230,230,.85)!important}");
GM_addStyle(".entry.read .collapsed .entry-main .entry-source-title{font-weight:normal!important;color:#555!important}");
GM_addStyle(".entry.read .collapsed .entry-main .entry-secondary .entry-title{color:#555!important}");
GM_addStyle(".entry .collapsed .entry-main .entry-source-title{font-weight:bold!important;color:#000!important}");
GM_addStyle("#lhn-selectors .selector{height:20px!important;line-height:20px!important}");
GM_addStyle(".scroll-tree li.folder .link,.scroll-tree li.sub{height:20px!important}");
GM_addStyle("a:hover .tree-item-action-container,.scroll-tree li a.menu-open,.scroll-tree li a:hover{background-color:transparent!important}");
GM_addStyle(".unselectable>a:hover{background-color:#e0e0e0!important;color:#333!important}");
GM_addStyle("#recommendations-tree .sub-icon{margin-top:2px!important}");
GM_addStyle(".section-minimize{left:5px!important}");
GM_addStyle("#lhn-selectors .selector,.folder .name.name-d-0,#sub-tree-header{padding-left:17px!important}");
GM_addStyle(".folder .folder .folder-toggle{margin-left:20px!important;margin-top:2px!important}");
GM_addStyle(".folder .sub-icon,.folder .folder>a>.icon{margin-left:15px!important}");
GM_addStyle(".folder .folder>ul .icon{margin-left:32px!important}");
GM_addStyle(".tree-selected>a>.folder-icon,.tree-selected>a>.sub-icon,.tree-selected>a>.tag-icon{opacity:.7!important;filter:alpha(opacity=70)!important}");
GM_addStyle(".folder .icon-d-2.favicon{margin-top:-2px!important}");
GM_addStyle(".lhn-section-primary{line-height:20px!important}");
GM_addStyle("#reading-list-unread-count{margin-top:-2px!important}");
GM_addStyle(".unread-count{font-size:90%!important;float:right!important;padding:0 4px 0 0!important;margin-right:1px!important}");
GM_addStyle(".section-minimize{top:3px!important}");
GM_addStyle(".selectors-footer{padding-bottom:3px!important;margin-bottom:1px!important}");
GM_addStyle(".lhn-section-footer{padding-bottom:3px!important;margin-bottom:1px!important}");
GM_addStyle(".scroll-tree{line-height:20px!important}");
GM_addStyle(".scroll-tree li{maring:0!important}");
GM_addStyle("#title-and-status-holder{padding:1px 0 0 7px!important}");
GM_addStyle("#entries{padding-right:5px!important}");
GM_addStyle("#entries.list .entry .collapsed{padding:0!important;line-height:23px!important;border-width:0!important}");
GM_addStyle("#entries.list .collapsed .entry-icons{top:0!important;height:22px!important;border-width:0!important}");
GM_addStyle("#entries.list .collapsed .entry-main .entry-source-title{font-size:90%!important;top:0!important;left:2.2em!important;width:12.1em!important}");
GM_addStyle("#entries .collapsed .entry-title{font-size:90%!important}");
GM_addStyle("#entries.list .collapsed .entry-secondary{top:0!important}");
GM_addStyle("#entries.list .collapsed .entry-main .entry-original{top:4px!important}");
GM_addStyle("#entries.list .entry .entry-actions{padding:4px 0 6px 5px!important}");
GM_addStyle("#entries.list #current-entry.expanded .entry-actions{padding:1px!important}");
GM_addStyle(".entry .entry-body,.entry .entry-title,.entry .entry-likers{max-width:none!important;padding-right:20px}");
GM_addStyle("#stream-view-options-container div:nth-child(3){margin-right:8px!important}");
GM_addStyle("#quick-add-bubble-holder{width:304px!important}");
GM_addStyle("#quickadd{margin-right:8px!important;padding:1px 1px 1px 3px!important;outline:none;height:20px}");
GM_addStyle("#quickadd:focus{border:1px solid #4d90fe;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.3);-moz-box-shadow:inset 0 1px 2px rgba(0,0,0,.3);box-shadow:inset 0 1px 2px rgba(0,0,0,.3)}");
