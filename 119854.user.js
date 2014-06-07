// ==UserScript==
// @name			Grinch FP
// @description		        Makes snow go away
// @include			http://*.facepunch*.com/*
//
// ==/UserScript==
window.console.log(window);
window.console.log(unsafeWindow);
window.console.log(window.jQuery);
(function($) {
  $(function() {
    document.body.removeChild(document.body.getElementsByTagName("canvas")[0]);
    var i = setInterval (function () {}, 10000);
    clearInterval (i-1);
    clearInterval (i);
  });
})(window.jQuery || unsafeWindow.jQuery);
