// ==UserScript==
// @name          A Bolder IMDB
// @namespace     http://krishkumar.com/
// @description   Make links in the new IMDB stand out
// @include       http://www.imdb.com/*
// based on Mark Pilgrim's script for 'Adding CSS styles'
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

addGlobalStyle(
'#tn15 a:link, #tn15 a:visited {' +
'  font-weight: bolder ! important;' +
'}');