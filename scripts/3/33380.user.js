// ==UserScript==
// @name           Megaupload Captcha Fixer
// @namespace      http://adblockplus.org/forum/viewtopic.php?t=2884
// @include        http://*.megaupload.com/*
// @include        http://megaupload.com/*
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

addGlobalStyle('img[src^="/capgen."]{position: absolute !important; left: 40px !important;}');
