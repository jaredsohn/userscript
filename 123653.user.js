// ==UserScript==
// @name           ClanBase Wide
// @namespace      created by antman
// @description    ClanBase Wide Theme
// @include        http://clanbase.ggl.com/*
// @downloadURL    https://userscripts.org/scripts/source/123653.user.js
// @updateURL      https://userscripts.org/scripts/source/123653.user.js
// @grant          none
// @version        1.0.2
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head').item(0);
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('body { background: #000; }');
addGlobalStyle('#pagewrapper { width: auto; margin-left: 10px; margin-right: 10px; }');
addGlobalStyle('#topbanner_bg { display: none; }');
addGlobalStyle('div[position:absolute;left:0px;width:728px;height:90px;z-index:2;"] { display: none !important; }');
addGlobalStyle('div[style="float:right; width:300px;"] { display: none !important; }');