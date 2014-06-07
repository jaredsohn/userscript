// ==UserScript==
// @name           Auto Google Redirect
// @namespace      http://d.hatena.ne.jp/bannyan/
// @include        http://www.google.com/url?*

// ==/UserScript==
window.location = document.links[0].innerHTML;