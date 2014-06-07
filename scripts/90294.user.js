// ==UserScript==
// @name           douban rt
// @namespace      www.douban.com
// @include        http://www.douban.com/
// @include        http://www.douban.com/?*
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
        $.grep($(".mbtr"), function(e, i){
            if ($(e).find("span.pl").text().match(/(.*前 )?说：$/)) {
                $(e).find(".quote").append('<a href="##" class="j_dbrt">RT</a>');
            }
        })});
    $(".j_dbrt").live("click", function(){
        $($("#db-talk").removeClass('talk-disable').find("textarea").focus()[0]).val($(this).parent().parent().text().replace(/ [^ ]*\s+RT$/, ''));
        return false;
    });
}

/*
Local Variables:
coding: utf-8
End:
*/
