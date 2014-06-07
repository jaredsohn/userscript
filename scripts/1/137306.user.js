// ==UserScript==
// @name           ReFrame Preventor
// @version        Fix
// @namespace      reframeprevent
// @include        http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @run-at         document-start
// ==/UserScript==
 (function () {
     window.addEventListener('beforescriptexecute', function (e) {
         var changed = 0;
         if (e.target.innerHTML.indexOf('top == self') != -1) {
             changed++;
             var s = document.createElement('script');
             s.innerHTML = e.target.innerHTML.replace('top == self', '"make" == "itso"');
             s.type = "text/javascript";
             document.getElementsByTagName("head")[0].appendChild(s);
             e.stopPropagation();
             e.preventDefault();
         }
         if (changed == 1) {
             window.removeEventListener(e.type, arguments.callee, true);
         }
     }, true, true);
 })();