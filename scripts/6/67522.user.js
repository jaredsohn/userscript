// ==UserScript==
// @name           Anandtech bench easier view
// @namespace      http://userscripts.org/users/10737
// @description    Makes the Bench view on Anandtech easier to read
// @include        http://www.anandtech.com/bench/*
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

addGlobalStyle('.clearfix .caption { height:35px; } li div.cGraphAlt, li div.cGraph { height:30px; } li div.cLine { margin-top:3px; } .cLine .score { text-shadow: 1px 1px 1px #000; } div.score { margin-top: 1px; }');
