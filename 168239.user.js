// ==UserScript==
// @name        Reducelnk Skipper
// @namespace   Automatically skips reducelnk.com timers
// @description This script allows to bypass the reducelnk timer
// @updateURL      
// @installURL     
// @include     *reducelnk.co*
// @include     *rdlnk.co*
// @grant       none
// @version     1.0.1
// @icon        https://reducelnk.com/imagesfiles/favicon.ico
// ==/UserScript==

urlHolder = document.getElementById("urlholder");
if (urlHolder != null) {
 document.location.href = urlHolder.value;
}