// ==UserScript==
// @name           Safari Flow popup blocker
// @namespace      http://thameera.com
// @description    Blocks annoying Safari Flow trial block
// @include        *.safariflow.*
// @version        0.1
// ==/UserScript==

(function() {
  document.getElementsByClassName('trial-nag')[0].style.display='none'
})();
