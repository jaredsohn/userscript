// ==UserScript==
// @name        Hide 20Min.ch comments
// @namespace   20mincom
// @include     http*://*.20min.ch/*
// @version     1
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

function removeallcommentlinlks() {
    var elems = document.getElementsByTagName('*'), i;
    for (i in elems) {
        if((' ' + elems[i].className + ' ').indexOf(' icon_talkback ')
                > -1) {
            elems[i].parentNode.style.display = 'none';
        }
    }
}


removeallcommentlinlks();
addGlobalStyle('#talkback { display: none !important; }');