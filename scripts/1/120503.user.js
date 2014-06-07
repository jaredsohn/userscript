// ==UserScript==
// @name           Disable Notifications on r/Dota2
// @namespace      www.reaverxai.com
// @include        http://www.reddit.com/r/dota2/*
// @include        http://www.reddit.com/r/Dota2/*
// @include        http://www.reddit.com/r/DotA2/*
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

addGlobalStyle('.titlebox .usertext-body .md h4 {display: none;)');
addGlobalStyle('.titlebox .usertext-body .md h5 {display: none;)');