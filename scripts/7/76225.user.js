// ==UserScript==
// @name           Remove new google
// @namespace      http://www.google.com
// @include        http://*.google.*/*
// @include        http://google.*/*
// ==/UserScript==

function reStyleCSS(newCode) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = newCode;
  document.getElementsByTagName('head')[0].appendChild(style);
};

reStyleCSS("#leftnav {display:none}");
reStyleCSS("#center_col {margin-left:0}");