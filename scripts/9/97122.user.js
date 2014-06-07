// ==UserScript==
// @name           News site comment remover
// @namespace      News site comment remover
// @description    Hide comments on CNN and other news sites
// @author         Jason Lancaster
// @include     http://www.cnn.com/*
// @include     http://news.yahoo.com/*
// @include     http://www.nypost.com/*
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

addGlobalStyle('#disqus_thread, .cnn_divln3pxblck { display:none ! important; }');
addGlobalStyle('#ygs-comments { display:none ! important; }');
addGlobalStyle('#comments_block { display:none ! important; }');

