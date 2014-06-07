// ==UserScript==
// @name           Bigger Slashdot
// @namespace      http://prodom.com.pl/scripts
// @description    Makes text at Slashdot little larger
// @include        http://slashdot.org/article.pl*
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

addGlobalStyle('body { font-size: 110% ! important; }');
