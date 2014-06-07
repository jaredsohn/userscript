// ==UserScript==

// @name           Kill Tall DPs in Myspace Forums

// @namespace      myspace.com/mark

// @description    Shrinks tall default pics on the myspace forums list pages...

// @include        http://forums.myspace.com/*

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

addGlobalStyle('div.forumAvatar a img {max-height:40px;}');