// ==UserScript==
// @name          Content too update all
// @description   Scripting is fun
// @include       https://devuwf.unfranchise.com/index.cfm?action=content.mdUpdate
// @include       https://devuwf.unfranchise.com/index.cfm?action=content.mdEdit
// @version       1.0
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
      alert($); // check if the dollar (jquery) function works
      alert($().jquery); // check jQuery version
     $(document).ready(function(){
      $("#contentHeading tr th:nth-child(2)").append('<input id="checkAll" type="checkbox" value="1" name="checkAll">');
      $('#checkAll').click(function(){
        $("input:checkbox[name=cUpdate]").attr('checked', ($('#checkAll').is(':checked') ? true : false));
      });
     });
    }

