// ==UserScript==
// @name           Streampad Blocker for Tumblr
// @namespace      http://www.brandonsadkins.com/userscripts
// @description    Blocks Streampad from appearing/playing in your browser when visiting Tumblr blogs.
// @include        http://*.tumblr.com/*
// ==/UserScript==

function globalAddCSS(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

globalAddCSS('#streampadBottomBar{display:none;}');

