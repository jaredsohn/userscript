// ==UserScript==
// @name          Hide Calcalist Ad
// @namespace     hidecalcalistad@shebo.com
// @description   Get rid of the calcalist ad that jumps in between pages.
// @include       http://calcalist.co.il/*
// @include       https://calcalist.co.il/*
// @include       http://*.calcalist.co.il/*
// @include       https://*.calcalist.co.il/*
// ==/UserScript==

function hideAd(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

hideAd('#interDivFrame {display: none !important;}#interDiv {display: none !important;}');