// ==UserScript==
// @name           videotron_auto_submit
// @namespace      https://www.videotron.com/client/residentiel/secur/ForwardNS*
// @include        https://www.videotron.com/client/residentiel/secur/ForwardNS*
// ==/UserScript==
// --Thank to Joan Piedra the Samurai for the jquery part! http://joanpiedra.com/jquery/greasemonkey/
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
        //alert($); // check if the dollar (jquery) function works
        //alert($().jquery); // check jQuery version
        var input_=$('#user-id-internet').val('YOURID');
        var form_=$('#accces-direct').submit();
    }
