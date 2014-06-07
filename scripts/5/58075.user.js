// ==UserScript==
// @name           LL Custom Quickpost Height
// @namespace      gs
// @description    Allows you to specify a custom height for the QuickPost pop-up on LL.
// @include        http*endoftheinter.net/*
// ==/UserScript==

var matches = document.getElementsByName("message")
for (var i = 0; i < matches.length; i++)
  if (matches[i].type == "textarea")
    matches[i].style.height = "100px"