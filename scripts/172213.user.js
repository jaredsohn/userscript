// ==UserScript==
// @name        feedly to Google Reader
// @namespace   
// @description Remaking a few styles to make feedly look more like Google Reader. Based on the script by http://www.vipexsoft.com (http://userscripts.org/scripts/show/164211)
// @include     http://www.feedly.com/*
// @include     http://feedly.com/*
// @include     http://cloud.feedly.com/*
// @include     https://www.feedly.com/*
// @include     https://feedly.com/*
// @include     https://cloud.feedly.com/*
// @version     1.10
// @grant       none
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

addGlobalStyle('#feedlyFrame{ width:auto!important; } \
#feedlyPart{ width:97%!important; padding-right:8px!important; } \
#feedlyPage{ width:100%!important; padding-top:15px!important; } \
#sideArea{ display:none!important; } \
.moreHandle {display:none!important; }\
.section{ display:none!important; } \
.u100Entry .title{ font-size:18px!important; line-height:normal!important; font-weight:700!important; font-family: "arial", sans-serif!important; margin-bottom:6px!important; max-width:100%!important;} \
.wikiWidget {display:none!important; } \
.bottomwikiWidget {display:none!important; } \
.u100frame {max-width:100%!important; width:100%!important; padding:8px!important;} \
.entryBody img {overflow:visible!important; float:none!important; margin-top:2px!important; margin-bottom:2px!important; margin-left:0px!important; width:auto!important; height:auto!important; max-width:none!important;}\
#feedlyPart0.area {padding-left:10px!important;} \
#feedlyPageHeader {margin-right:5px!important;margin-top:5px!important;}\
.read {color:#444444!important;}\
.inlineFrame .title.read {color:#1155CC!important;}\
.youtubePlaceholder {margin:0!important;}\
.unread {color:#1155CC!important;}\
a.entryTitle.title.unread {color:#1155CC!important;}\
.nbrrecommendations {display:none!important;}\
.entryBody iframe {margin-left:0px!important;}\
.condensed .entryholder .u100Entry {max-height:100%!important; margin-left:8px!important; margin-right:8px!important;}\
.frameActionsTop {display:none!important;}\
.inlineFrame {padding:4px!important; min-height:0!important;}\
.customizer .section{ display:block!important; } \
.entryBody{ max-width:650px!important; line-height:normal!important; font-family: "arial", sans-serif!important; font-size:13px!important; margin-top:8px!important;} \
.entryBody a{color:#1155CC!important; text-decoration:underline!important; border-bottom-style: none!important; font-weight: normal!important;} \
.entryHeader { max-width:650px!important;} \
.entryBody td{font-size:13px!important;line-height:normal!important;}\
span .categoryUnreadCountHint span {color:#1155CC!important;} \
#fullyLoadedFollowing {margin-bottom:1200px!important;}\
.action {color:#1155CC!important;} \
.websiteCallForAction {display:none!important;}\
#feedlyMessageBar {display:none!important;}\
#searchBox {display:none!important;}\
#pageActionLayout100 {display:inline-block!important;}\
#proBanner {display:none!important;}\
#feedlyTitleBar .hhint {display:none!important;}\
#mainBar {margin-left:0!important; margin-right:0!important; width:100%!important;}\
.favicon {border-radius:0px!important;}\
#floatingBar h1 .hAction.tertiary {display:inline!important;}\
#fixedProfile {display:none!important;}\ ');