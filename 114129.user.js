// ==UserScript==
// @name           pink theme
// @namespace      pinkTheme
// @description    pink theme
// @include        *nordic-t.org*
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

addGlobalStyle('a:link { color: #f70 ! important; }');
addGlobalStyle('a:visited { color: #f70 ! important; }');
addGlobalStyle('a:hover { color: #f70 ! important; }');
addGlobalStyle('a:hover { text-decoration: underline ! important; }');
addGlobalStyle('input, select, textarea { color: #000000; ! important; }');


// addGlobalStyle('a:link { text-decoration: underline ! important; }');