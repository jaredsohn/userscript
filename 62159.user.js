// ==UserScript==
// @name           stackoverflow inline code styling
// @namespace      stackoverflow
// @description    Styles inline code on StackOverflow to have a more distinct background color.
// @include        http://stackoverflow.com/*
// @include        http://superuser.com/*
// @include        http://serverfault.com/*
// @include        http://meta.stackoverflow.com/*
// @author         Kip Robinson - http://stackoverflow.com/users/18511/kip
// ==/UserScript==

(function() {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = "p > code, .comment-text > code, li > code { background-color: #ffa; }";
  head.appendChild(style);
})();
