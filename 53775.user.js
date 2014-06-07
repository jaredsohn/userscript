// ==UserScript==
// @name           Me2Side
// @namespace      http://me2day.net/d3m3vilurr

// @include        http://me2day.net/*
// @exclude        http://me2day.net/*/setting/*
// @exclude        http://me2day.net/*/friends/list*
// @exclude        http://me2day.net/*/friends/status*
// @exclude        http://me2day.net/*/friends/search_my_friends*
// @exclude        http://me2day.net/*/invite*

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

addGlobalStyle(
    '#container .side_mn { float: right; } #topbar { margin-left: 0; margin-right: 160px; }'
);
