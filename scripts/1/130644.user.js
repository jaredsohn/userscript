// ==UserScript==
// @name           StackOverflow HomePage Auto Reload
// @namespace      http://userscripts.org/users/165234/StackOverflow-HomePage-Auto-Reload
// @description    Automatically reloads stackoverflow homepage every minute
// @include        http://stackoverflow.com/
// ==/UserScript==

setInterval(function(){ window.location.href = window.location.href; }, 60000);