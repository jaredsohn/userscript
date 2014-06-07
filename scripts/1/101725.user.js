// ==UserScript==
// @name           Flooder1
// @namespace      fldr
// @include        http://*.bytsocial.com*
// ==/UserScript==

var a=Math.floor(Math.random() * (10000000000 - 1000000 + 1)) + 1000000;
document.location="http://www.bytsocial.com/bytsoftware/msoft/like-submit.php?q=93&gs&uid="+a;
time=42000;
setTimeout("location.reload(true);",time);
