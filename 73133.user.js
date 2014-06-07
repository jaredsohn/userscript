// ==UserScript==
// @name           Rippybook
// @namespace      http://what.cd
// @description    Rippy uses Facebook too you know - by karlbright
// @include        https://ssl.what.cd/*
// @include        http://what.cd/*
// @include        http://www.what.cd/*
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

addGlobalStyle(".rippy { z-index:25; background: transparent url('http://i43.tinypic.com/13z251s.png') no-repeat bottom right; display: block; position: fixed; color: black; text-align: left; width: 200px; height: 151px; bottom: 0; right: 20px; padding: 95px 106px 63px 8px; color: #333; font-size: 12px; } span.rbm, span.rbb, span.rbt { padding: 0; background: none; margin: 0; }");