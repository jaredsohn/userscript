// ==UserScript==
// @name       Strikeout.co Clean Layout
// @version    0.1
// @description  Gets rid of ads on strikeout.co and improves layout
// @match      http://www.strikeout.co/*
// @copyright  2014 Nick P
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

addGlobalStyle('.button.blue, .button.white, .center, #overlay, #rightcolumn, #leftcolumn, #content>a { display:none !important; } div {  border-radius:0 !important; } #contentwrap { width:960px; }');