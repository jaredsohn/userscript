// ==UserScript==
// @name        Youtube logo redirector to subscription uploads
// @namespace   renars
// @description A few code line script which when clicking on youtube logo it redirects to subscription uploads instead of "what to watch"
// @include     http://*.youtube.com*
// @include     https://*youtube.com*
// @version     1.0
// ==/UserScript==
 document.getElementById("logo-container").onmouseover = function() {
   var link = document.getElementById("logo-container");
   link.setAttribute("href", "/feed/subscriptions/u");
   return true;
   }