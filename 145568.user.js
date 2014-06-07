// ==UserScript==
// @name           Hide link flair on r/Dota2 and r/Starcraft
// @include        http://www.reddit.com/r/dota2/*
// @include        http://www.reddit.com/r/Dota2/*
// @include        http://www.reddit.com/r/DotA2/*
// @include        http://www.reddit.com/r/starcraft/*
// @include        http://www.reddit.com/r/Starcraft/*
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

addGlobalStyle('.linkflairlabel {display: none;)');