// ==UserScript==
// @name           Tinypic Cleaner
// @namespace      Your Mom
// @include        http://tinypic.com*
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

addGlobalStyle('div.content-sec, div.about, DIV[class="browse columns"] {display:none!important;} DIV[id="post-upload"] {width:100%!important;margin-left:0px !important;}INPUT[name="add_tag"] {width:50% !important;}');