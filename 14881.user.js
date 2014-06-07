// ==UserScript==

// @name           Kill Long Myspace Forum Posts

// @namespace      myspace.com/xenomark

// @description    Adds scrollbars to myspace forum posts, so your page doesn't get stretched out...

// @include        http://forums.myspace.com/p/*

// @include        http://forums.myspace.com/t/*

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

addGlobalStyle('div.ForumPostContentText {display:block; max-height:400px; overflow:auto;}');



