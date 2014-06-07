// ==UserScript==
// @name           Hide Rep
// @namespace      http://ciscavate.org
// @description    hides all reputation numbers on stack overflow
// @include        *
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

addGlobalStyle('.reputation-score, .summaryinfo { display: none ! important; }');
addGlobalStyle('#viewcount, .views, .vote-count-post, .votes { display: none ! important; }');
addGlobalStyle('.answer-votes { font-size: 0% ! important; }');
