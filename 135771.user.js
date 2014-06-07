// ==UserScript==
// @description This script removes the annoying unread count prominently featured in your title bar.
// @match https://mail.google.com/mail/*
// @name Remove GMail Title Bar Unread Count
// ==/UserScript==
var titleElement = document.getElementsByTagName('title')[0];
var titleChangeHandler = function(e) {
  document.title = document.title.split(/ \([0-9]+\) /).join(" ");
}

document.documentElement.addEventListener("DOMSubtreeModified", titleChangeHandler, false);
