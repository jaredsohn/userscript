// ==UserScript==
// @name           eBay Message Reply sendCopy Override
// @namespace      none
// @description    Ensures "Send a copy to my personal email address" is checked
// @include        http://contact.ebay.co.uk/*
// ==/UserScript==

var node = document.getElementById("sendCopy");
if (node == null) node = document.getElementById("ccSender");
if (node) node.setAttribute("checked","1");
