// ==UserScript==
// @description This script removes the annoying unread count prominently featured in your title bar.
// @match http://www.google.com/reader/view/*
// @name Remove GReader Title Bar Unread Count
// ==/UserScript==
var titleChangeHandler = function(e) {
  document.title = document.title.split(/ \([0-9]+\)/)[0];
}

document.documentElement.addEventListener("DOMSubtreeModified", titleChangeHandler, false);
