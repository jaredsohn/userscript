// ==UserScript==
// @description This script removes the annoying unread count prominently featured in your title bar.
// @match https://twitter.com/*
// @name Remove Twitter Title Bar Unread Count
// ==/UserScript==
var titleChangeHandler = function(e) {
  var r = /\([0-9]+\) /;
  if (-1 < document.title.search(r)) {
    document.title = document.title.split(r)[1];
  }
}

document.documentElement.addEventListener("DOMSubtreeModified", titleChangeHandler, false);
