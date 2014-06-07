// ==UserScript==
// @name           hackerthreads butter
// @namespace      

http://hackerthreads.org
// @description    eleanor was bawwwwing about the new 

theme, consider this as a "stfu you lazy noob"
// @include        

http://www.hackerthreads.org/*
// @include        http://hackerthreads.org/*
// 

==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle("div { background-color: #333333 ! important; color: #ffffff ! 

important}");
