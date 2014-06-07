// ==UserScript==
// @name        Twitter Preview Fix
// @namespace   tpf
// @description Reverts Twitter's previews to the way they were before
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// @version     1
// @grant       none
// ==/UserScript==

function addCSS(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addCSS("body .with-media-forward .cards-base{margin-top:0}body .with-media-forward .cards-base .media-forward,body .with-media-forward .expanded-content{max-height:0}body .with-media-forward.opened-tweet .cards-base{margin-top:10px}body .with-media-forward.opened-tweet .cards-base .media-forward,body .with-media-forward.opened-tweet .expanded-content{max-height:none}");