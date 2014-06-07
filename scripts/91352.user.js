// ==UserScript==
// @name           move douban isay
// @namespace      www.douban.com
// @include        http://www.douban.com/
// ==/UserScript==

// Add jQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');

        GM_JQ.src = 'http://img3.douban.com/js/packed_jquery.min1.js';
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
        letsJQuery(unsafeWindow.jQuery);
    }
}

// All your GM code must be inside this function
function letsJQuery($) {
  
$(function(){
  $('#friend').before( $('#db-talk') );
  $('#db-talk .item').css('width', '294px').css('margin-bottom', '-20px').css('margin-top', '3px');
  $('#db-talk').css('background-color', '#E9F4E9');
});

}

/*
Local Variables:
coding: utf-8
End:
*/
