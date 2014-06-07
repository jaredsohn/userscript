// ==UserScript==
// @name        Chiquwa_pipe
// @namespace   Chiquwa_pipe
// @include     https://twitter.com/*
// @version     1
// ==/UserScript==

var data = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
    'bWFnZVJlYWR5ccllPAAAAGRJREFUeNpi/HVzMwMMsChYMCCBf79eMz7vUYRwWPXigaSQfTayNBOc'+
    '8/vSQgYMgJAG6uaTN0aTZvzz+RoTmygDNgA0nAVN6M+DE8hcFOl3B6eiuYCJAS9Al4Z4D5/TkK0H'+
    'CDAAWzQiMpWtJi8AAAAASUVORK5CYII=';

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

addGlobalStyle('.vellip, .vellip:after, .vellip:before { background: url(' + data + ') center top transparent repeat-y !important; }');

addGlobalStyle('.conversation-module > li:after, .conversation-module > li:before { background: url(' + data + ') center top transparent repeat-y !important; border-radius: 0; width: 10px; left: 31px; }');
addGlobalStyle('.conversation-module .missing-tweets-bar { background: none; }');
