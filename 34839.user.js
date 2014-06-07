// ==UserScript==
// @name           Stack Overflow Badges
// @namespace      http://viewLog.html
// @description    Stack Overflow Badges
// @include        http://stackoverflow.com/badges
// ==/UserScript==

//BEGIN - http://internetducttape.com/2008/05/08/greasemonkey-ninja-jquery/
// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();
//END - http://internetducttape.com/2008/05/08/greasemonkey-ninja-jquery/
    
// All your GM code must be inside this function
    function letsJQuery() {
      $.ajax({
        url: $("#headerlinks a:first").attr('href'),
        cache: false,
        success: function(html){
          var myBadges = $("a.badge", html);             
          $("a.badge").each(function(allIndex, allElement) {                
            $(myBadges).each(function(myIndex, myElement) {
               if (myElement.href == allElement.href) {
                  $(allElement).css('background-color', '#FF9900');
               }
            });
          });
        }
      });        
    }
