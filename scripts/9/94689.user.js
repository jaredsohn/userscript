// ==UserScript==
// @name           eusaforums Translation FIX B)
// @namespace      http://eusaforums.com/forum/
// @description    Moves the translate icon/button
// @include        http://eusaforums.com/forum/index.php/*
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
        $('.jtt-translate-icon').css('display','none');
        var tripar = $('.jtt-translate-icon').parent().parent().parent();
        
        $(".quickbuttons",tripar).prepend("<li><a class='jtt-translate-icon'></a></li>");
        
        $('.jtt-translate-icon[title!="Translate this"]').live('click',function(event){
            var q =  $(event.target).parent().parent().parent().parent().parent();
            $('.jtt-translate-icon[title="Translate this"]',q).click();
        })
    }
    
    
