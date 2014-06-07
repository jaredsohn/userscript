// ==UserScript==
// @name           Facebook Autopoker
// @namespace      Bluestone
// @description    Automatically poke back people who have poked you on your Facebook home page.
// @version     1.0
// @include     http*://facebook.com/home.php*
// @include     http*://*.facebook.com/home.php*
// @include     http*://*.facebook.com/
// @include     http*://*.facebook.com/?*
// @include     http*://*.facebook.com/#*
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
    $("div#content").bind("DOMSubtreeModified", function(){
        // For each poke link...
        $("div#pagelet_netego_pokes div.clearfix").each(function(){
            var clearfix = $(this);
            var anchor = $(this).find("a[rel='async-post']");
            var uid = clearfix.attr("id").replace("poke_", "");
            var post_form_id = $("#post_form_id").val();
            var fb_dtsg = $("input[name=fb_dtsg]").val();
            // Tell Facebook to poke the person
            $.ajax({
                type: 'POST',
                url: 'ajax/poke.php?__a=1',
                data: 'uid=' + uid + '&pokeback=1&post_form_id=' + post_form_id + '&fb_dtsg=' + fb_dtsg + '&post_form_id_source=AsyncRequest',
                beforeSend: function(xhr){
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
                    xhr.setRequestHeader("Referer", document.location);
                    xhr.setRequestHeader("Cookie", document.cooki);
                },
                success: function(data, textStatus){
                    anchor.replaceWith("Poked");
                }
            });
        });
    });
}
