// ==UserScript==
// @name           ClublakersWidthFixer
// @namespace      ClublakersWidthFixer
// @description	   Fixes Clublakers forum area width	
// @include        http://www.clublakers.com/*
// ==/UserScript==

function addGlobalStyle(css) 
{
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#forum { width: 100% ! important; }');
addGlobalStyle('#wrap-border { width: 100% ! important; }');

var wrap = document.getElementById('wrap');
wrap.style.width = 'auto';