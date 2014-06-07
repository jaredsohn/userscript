// ==UserScript==
// @name           Blocking Top Comments on the Star
// @namespace      http://userscripts.org/users/294280
// @description    Blocks "Top Comments" From appearing on news articles.
// @include        http://www.thestar.com/*
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

addGlobalStyle('.ts-top_comments { display: none !important; }');