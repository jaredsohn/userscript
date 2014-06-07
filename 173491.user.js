// ==UserScript==
// @name        Feedly Compact
// @namespace   http://feedly.compact.view
// @description Compact view for feedly
// @include       http://feedly.com/*
// @include       https://feedly.com/*
// @include       http://*.feedly.com/*
// @include       https://*.feedly.com/*
// @version     0.1
// @grant       GM_addStyle
// ==/UserScript==


(function() {
    GM_addStyle(
        "#section0 div.label div { height: 0px !important;}" +
        "#feedlyTitleBar { height: 0px !important;}" +
        ".collapsed { border-color: transparent !important; }" +
        "#entries.list #current-entry .collapsed {" + 
        "   border: 2px solid #8181DC !important; }" +
        ".u0Entry { height: 20px !important; font-size: 12px !important; }" +
        ".u0Entry .title,.u0Entry .sourcetitle a   {line-height: 20px !important;}" +
        ".u0Entry .sourceInfo {line-height: 20px !important;}" +
        ".u0Entry .quicklistHandle {height: 20px !important;}" +
        ".u0Entry .lastModified {line-height: 8px !important;}" +
        ".feedfav {margin: 2px 7px 0 0 !important;}" +
        "#entries.list #current-entry.expanded .collapsed {" + 
        "   border-bottom-color: transparent !important;" + 
        "   border-width: 2px 0 !important; }");
})();
