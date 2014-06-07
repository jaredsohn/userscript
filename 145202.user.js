// ==UserScript==
// @name           Red Links
// @author         Nafe
// @include        *
// @description    Make all visited links red in Roccat Browser with GreaseKit

// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
    document.getElementsByTagName('body')[0].appendChild(style);
}


addGlobalStyle('a:visited {color:red !important;}');


