// By Ryan / "2L84ME" - www.warshq.byethost11.com
//
// ==UserScript==
// @name          Digg's Right Whitespace- Be gone!
// @namespace     http://www.warshq.byethost11.com
// @description   When used with Adblock, it removes the empty ad column on the right.
// @include       http://www.digg.com/*
// @include       http://digg.com/*
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

addGlobalStyle('div.comments_ad_image { width: 0px ! important; }');
addGlobalStyle('div.news-body { width: 100% ! important; }');
addGlobalStyle('div.comment { width: 100% ! important; }');
addGlobalStyle('div.comment-tray { width: 100% ! important; }');
