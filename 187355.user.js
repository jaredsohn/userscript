// ==UserScript==
// @name        stop-redir
// @namespace   stop-redir
// @description Stops (probably malicious) redirection scripts from tumblr.
// @include     http://*.tumblr.com/*
// @include     https://*.tumblr.com/*
// @run-at	document-start
// @version     1
// ==/UserScript==

window.onbeforeunload = function(e){
  var e = e || window.event;
  // For IE and Firefox (prior to 4)
  if (e){
    e.returnValue = 'Do you want to leave this page?';
  }
  // For Safari and Chrome
  return "Do you want to leave this page?";
};
