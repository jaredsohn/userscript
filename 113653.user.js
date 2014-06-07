// ==UserScript==
// @name          Facebook News Pagelet Remover
// @namespace     http://www.facebook.com/labs/gmscripts
// @description   Removes that annoying pagelet above chat list
// @include       http://www.facebook.com/*
// @version       1.0
// ==/UserScript==
window.document.getElementById("pagelet_ticker").style.display = "none";