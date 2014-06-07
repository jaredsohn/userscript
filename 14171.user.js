// ==UserScript==
// @name       del.icio.us: Handle IME correctly
// @namespace  http://8-p.info/
// @include    http://del.icio.us/*
// @version    0.1
// ==/UserScript==

(function() {
   var w = (typeof unsafeWindow != 'undefined') ? unsafeWindow : window;

   var originalNiceExtend = w.niceExtend;
   w.niceExtend = function (dest, src) {
      if (src.onkeyup) {
         var keyup = src.onkeyup;
         src.onkeyup = function (e) {
            if (e.keyCode != 13)
               keyup.call(this, e);
         }

         var keypress = src.onkeypress || function(){};
         src.onkeypress = function (e) {
            if (e.keyCode == 13)
               keyup.call(this, e);
            else
               keypress.call(this, e);
         }
      }
      
      return originalNiceExtend(dest, src);
   }
})();
