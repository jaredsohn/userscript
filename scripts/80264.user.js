// ==UserScript==
// @name           Audible Amazon Links
// @version        1.0
// @namespace      ligature.me
// @include        http://www.audible.com/*
// @require        http://usocheckup.redirectme.net/80264.js
// ==/UserScript==

var $;

// Add jQuery
  (function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
      var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
          GM_JQ = document.createElement('script');

      GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
      GM_JQ.type = 'text/javascript';
      GM_JQ.async = true;

      GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
  })();

// Check if jQuery's loaded
  function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
      window.setTimeout(GM_wait, 100);
    } else {
      $ = unsafeWindow.jQuery.noConflict(true);
      letsJQuery();
    }
  }

// All your GM code must be inside this function
  function letsJQuery() {
    $("div.title").each(function(i) {
      $(this).html(this.innerHTML + "&nbsp;&nbsp;&nbsp;<a href='http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dstripbooks&field-keywords=" + this.textContent + "' target='_blank'><img src='http://www.firstai.de/assets/images/logoAmazon.png'></a>");
    });
  }