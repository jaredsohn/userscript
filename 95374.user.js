?// ==UserScript==
// @name           desert op
// @description    desert op

// @include        *pl.desert-operations.com/world2/uebersicht.php?scale=1/*
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
addGlobalStyle('#base{background:#0d140d url(http://uk.desert-operations.com/world1/images/classic/base/big/2009_base_bg.png) 50px 20px no-repeat;width:400px;height:115px;float:left;padding-top:335px;}');

