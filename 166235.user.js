// ==UserScript==
// @name        AVSIM navbar tamer
// @namespace   http://userscripts.org/users/515567
// @description Curtails the AVSIM back-to-top floating bar
// @author      Lek767
// @include     http://forum.avsim.net/*
// @grant       none
// @version     1.0
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

var elmScrollToTop = document.getElementById("scrolltotop");
elmScrollToTop.innerHTML = '<a href="#top">Back to top</a>';

addGlobalStyle('#scrolltotop { left: auto; right: 0%; margin-left: auto; width: auto;}');