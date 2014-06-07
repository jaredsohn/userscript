// ==UserScript==
// @name           BBC Forum Tweaks
// @namespace      GaryB007
// @description    Tweak the recent BBC forum "improvements"
// @include        http://www.bbc.co.uk/dna/mbpointsofview/*
// ==/UserScript==

function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addStyle('ul.forumthreadposts li.stripe {background-color:#E1E1E1;}');
addStyle('ul.forumthreadposts li span.quote {border:1px solid #888888;}')
addStyle('ul.forumthreadposts li span.quote {padding:10px 7px 10px 7px;}')
addStyle('#blq-main {background-color:#FFFFFF};');
