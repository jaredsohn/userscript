// ==UserScript==
// @name        feedlyLayoutExpander 
// @namespace   http://www.vipexsoft.com
// @description Change feedly layout expanding to full screen and darken a bit.
// @include     http://www.feedly.com/home*
// @include     http://feedly.com/*
// @include     https://feedly.com/*
// @include     http://cloud.feedly.com/*
// @version     0.92
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
#mainBar{ width: auto!important; } \
#feedlyPart{ width:auto!important; } \
#feedlyPage{ width:100%!important; padding-top:15px!important; } \
#sideArea{ display:none!important; } \
.section{ display:none!important; } \
.customizer .section{ display:block!important; } \
.entryBody{ max-width:none!important; } \
#feedlyPageHeader{ background-color:#FFFFFF!important; padding: 15px; border: 1px solid #EFEFEF; } ');

/*
.area{ background-color:#333333!important; border-color:#000000!important; } \
.selectedentry{ border-color:#000000!important; } \
.u100Frame{ background-color:#FFFFFF!important; } \
*/