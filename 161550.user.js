// ==UserScript==
// @name           Rewrite i.imgur.com to imgur.com
// @description    Avoid 403 Forbidden!
// @version			1.1
// @include        *
// ==/UserScript==

(function(){var b=document.getElementsByTagName("a");for(i=0;i<b.length;i++){var a=b[i].href;a.match("i.imgur.com")&&(a=a.replace("i.imgur.com","imgur.com"),b[i].setAttribute("href",a))}})();
