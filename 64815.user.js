// ==UserScript==
// @name           saveacfavors
// @namespace      My
// @include        http://220.170.79.105/plus/view.php?aid=*
// @include        http://acfun.cn/plus/view.php?aid=*
// ==/UserScript==


(window.location+'').match(/aid=(\d+)/i);
window.open('http://illustrate.heliohost.org/cgi-bin/i.py?action=redirect&aid=' + RegExp.$1,'_self');