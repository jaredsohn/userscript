// ==UserScript==
// @name            Tek allow adblock chrome
// @version         0.1
// @description     Gjør slik at adblock funker på Tek-nettverket (tek.no). av NChief
// @match	        	http://*.hardware.no/*
// @match	        	http://*.tek.no/*
// @match	        	http://*.amobil.no/*
// @match	        	http://*.akam.no/*
// @match	        	http://*.teknofil.no/*
// @match	        	http://*.gamer.no/*
// @match	        	http://*.mobilen.no/*
// @match	        	http://hardware.no/*
// @match	        	http://tek.no/*
// @match	        	http://amobil.no/*
// @match	        	http://akam.no/*
// @match	        	http://teknofil.no/*
// @match	        	http://gamer.no/*
// @match	        	http://mobilen.no/*
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
      //var oldremove = unsafeWindow.$.fn.remove;
      unsafeWindow.$.fn.remove = function(what) {}; // Remove the remove function.
      
      $(document).ready(function() {
          $('.subscription-popup').hide();
          $('.tek-black-overlay').hide();
          $('.faded-article-content').removeClass('faded-article-content');
          $('.adblock-message').hide();
      });
  }
})();