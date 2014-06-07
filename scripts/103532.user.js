// ==UserScript==
// @name       Shoryuken.com embedded content cleaner
// @namespace  http://userscripts.org/users/337788
// @version    0.1
// @description  Replaces annoying images / videos embedded into forum posts by idiots on shoryuken.com with links.
// @include    http://shoryuken.com/*
// @include    http://www.shoryuken.com/*
// @copyright  2011+, Shawn McCool
// ==/UserScript==

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
            letsJQuery();
        }
    }

    // All your GM code must be inside this function
    function letsJQuery() {

        unsafeWindow.jQuery('.messageText object').each(function() {
            var embed_source = unsafeWindow.jQuery(this).find('embed').attr('src');

            unsafeWindow.jQuery(this).before('<a style="color: #c60000" href="#" target="_NEW" class="hiddenEmbedLink">Embedded Video: ' + embed_source + "</a> ");
            unsafeWindow.jQuery(this).hide();
        });

        unsafeWindow.jQuery('.messageText img.LbImage').each(function() {
            var img_source = unsafeWindow.jQuery(this).attr('src');

            unsafeWindow.jQuery(this).before('<a style="color: #c60000" href="#" target="_NEW" class="hiddenEmbedLink">Embedded Image: ' + img_source + "</a> ");
            unsafeWindow.jQuery(this).hide();
        });

        unsafeWindow.jQuery('.hiddenEmbedLink').unbind('click').click(function() {
            unsafeWindow.jQuery(this).next(':hidden').show();
            unsafeWindow.jQuery(this).remove();
            return false;
        });
    }
