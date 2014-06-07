// ==UserScript==
// @name           avatar links
// @namespace      www.longboarden.nl
// @description    plaatst de avatars weer naar links op longboarden
// @include        http://longboarden.nl/*
// @include        http://www.longboarden.nl/*
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

addGlobalStyle('.postbody { float: right ! important; }');