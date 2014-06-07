// ==UserScript==
// @name            Google Reader Skin by umgbbc
// @namespace      http://userscripts.org/scripts/upload/102302
// @author         umgbbc
// @homepage         http://twitter.com/umgbbc
// @include        *google.com/reader/*

// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('body{font-family:Lucida Grande,Helvetica,Arial,sans-serif;background:#fff;} #global-info, #gb,#gbar, #logo-container, #search-submit,#chrome-header{display:none;}  #nav{position:absolute;top:0;width:150px;} #chrome{margin-left:150px;} .goog-button-base-content{line-height:1.4em;} #search{left: 670px !important; right: auto !important; top: 1px !important; width: 150px !important; height:23px !important; overflow: hidden !important;}#search:hover { width: 403px !important; height:323px !important; overflow: visible !important; } #main{top:-40px;background:#E1ECFE;} #search-input{font-size:13px;height:17px;margin:1px 0 0 1px;padding:3px 0 0 2px;width:100px;} #search-restrict{border:0;} #search-restrict-button{margin:1px 0 0;} .search-restrict-contents{width:60px;} #search-restrict-input{width:60px;}  #lhn-selectors, #sub-tree, #friends-tree-item-0-main ul, .scroll-tree li, #lhn-selectors .selector{background-color:#E1ECFE;} #lhn-selectors.lhn-section-minimized .selector, #lhn-subscriptions, #lhn-friends .lhn-section-primary, #lhn-selectors .selected, #lhn-selectors .selected:hover{background-color:#B6EFBB;} .lhn-section-footer {background-color:#C2CFF1;} .scroll-tree li a .name{color:#888888;} .scroll-tree li a .name-unread{color:#111111;} #chrome-title{font-size:13px;line-height:1;} #chrome-header{padding:3px 11px;} #viewer-top-controls{height:22px;padding:3px 3px 1px;} #entries.list .entry .collapsed {border:1px solid #FFFFFF;height:2.1ex;line-height:2.3ex;}');
