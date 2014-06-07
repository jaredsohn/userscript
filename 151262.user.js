// ==UserScript==
// @name           Pinkbook Mod
// @namespace      
// @description
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @icon	https://fbcdn-sphotos-a.akamaihd.net/hphotos-ak-snc7/483148_278903188850846_184728151601684_695423_1435950055_n.jpg
// ==/UserScript==

// Forked from:      http://userscripts.org/users/65153

function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addStyle('div, span, h1,h2,h3,h4,h5,h6{font-family:"Comic Sans MS" !important;}  #blueBar{background-color: #f0f !important;} a,a:hover{background-color:transparent !important;color:#f0f !important;outline-color:#f0f !important; }');
