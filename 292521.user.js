// ==UserScript==
// @name        Reddit Redirect
// @description Redirects reddit to bypass silly school block
// @include     http://*.reddit.com/r/*
// @grant       none
// @run-at      document-start
// ==/UserScript==

console.log("Redirecting to non-blocked webpage...");
var regex = /(.*www\.reddit.com\/r\/)([^+].*?)(\/?.*)/g;
var url = document.location.href;
if(url.match(regex))
{
   window.location = url.replace(regex, "$1+$2$3");
}
