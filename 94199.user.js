// ==UserScript==
// @author         Dotayuri
// @name           Favicon
// @description    Desu~
// @email	   Dotayuri@hotmail.com
// @include        *
// ==/UserScript==

         var Favicon = document.createElement('link');
         Favicon.setAttribute('rel', 'shortcut icon');
         Favicon.setAttribute('href', 'http://dotayuri.com/favicon.ico');
         var head = document.getElementsByTagName('head')[0];
         head.appendChild(Favicon);