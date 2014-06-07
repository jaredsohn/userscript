// ==UserScript==
// @name            tv2 adblock
// @version         0.1
// @description     Blocks ads on tv2.no
// @match	      	http://*.tv2.no/*
// @run-at	        document-start
// ==/UserScript==

(function(){
  //boilerplate greasemonkey to wait until jQuery is defined...
  function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined')
      window.setTimeout(GM_wait,100);
    else
      unsafeWindow.jQuery(function() { letsJQuery(unsafeWindow.jQuery); });
  }
  GM_wait();

  function letsJQuery($) {   
    $(document).ready(function() {
        $('.adContainer, .wallpaper').hide();
        setInterval(function(){$('.adContainer, .wallpaper').hide();},300);
    });
  }
})();
