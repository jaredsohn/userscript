// ==UserScript==
// @name           NooPicasaWeb
// @namespace      nicogiard
// @include        http://picasaweb.google.com/*
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

addGlobalStyle('.lhcl_content, .lhcl_googlephotos_body .lhcl_toolbar { background-color:#F3F3F3; }');

addGlobalStyle('.lhcl_exifoff {display:block;}');