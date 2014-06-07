// ==UserScript==
// @name           delfi_layout_correction
// @namespace      http://userscripts.org/users/173031
// @include        http://*.delfi.lv/*/comments/*
// @include        http://www.delfi.lv/*com=1*
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
  //   $('#layout_columns').css('left','112px');
  $('#column2').css('width','680px');
   $('#layout_column2').css('overflow','visible');
   $('#layout_column3').css('margin-left','250px');
  
     $('#layout_columns').css('background','none');
     $('#layout_column4').css('display','none');
    }