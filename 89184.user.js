// ==UserScript==
// @name           Forum Fix v2
// @namespace      http://userscripts.org/
// @description    Fixes forum width and background white removed, post font size reduced to 12px, CUL text enlarged slightly, post/signature divider darkened, viewed threads are easier to spot.
// @include        http://forums.xbox.com/*
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

addGlobalStyle('a.lnk3:visited {color:#a49d7e!important;}');
addGlobalStyle('div.postBody {width: 720px!important;font-size:12px;}');
addGlobalStyle('div#bodycolumn {background-image:url("http://209.85.62.24/326/148/0/p371641/bodycolumn.png")!important;}');
addGlobalStyle('div.userRank h3 {font-size:12px!important; padding:5px;}');
addGlobalStyle('div.thread {width:540px!important;}');
addGlobalStyle('div#subjArea {width: 720px!important;}');
addGlobalStyle('div.report {width:720px!important;}');
addGlobalStyle('hr {background-color: #141414!important;border: 0;color: #141414!important;}');


