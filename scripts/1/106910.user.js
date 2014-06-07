// ==UserScript==
// @name           E-ShuuShuu Fancy Thumbs
// @namespace      http://code.jquery.com/
// @description    Make The Thumbs on E-ShuuShuu rounded and with shadow effect
// @include        http://e-shuushuu.net/*
// ==/UserScript==


// Add jQuery
(function() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');

        GM_JQ.src = 'http://code.jquery.com/jquery.min.js';
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
        $ = unsafeWindow.jQuery;
        letsJQuery();
    }
}

// All your GM code must be inside this function
function letsJQuery() {

    function transform1() {
        var DOMHead = document.getElementsByTagName("head")[0];
        var DOMScript = document.createElement("script");
        DOMScript.type = "text/javascript";
        DOMScript.src = "http://code.jquery.com/jquery-latest.min.js";
        DOMHead.appendChild(DOMScript);
        if (!document.getElementsByTagName("style").length) {
            var DOMStyle = document.createElement("style");
            DOMStyle.type = "text/css";
            DOMHead.appendChild(DOMStyle)
        }
    }

    function transform2() {
        $("head:first style:last").append(".rounded-img2 {display: inline-block;-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;-webkit-box-shadow: inset 0 1px 5px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .9), 0 -1px 0 rgba(0, 0, 0, .6);-moz-box-shadow: inset 0 1px 5px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .9), 0 -1px 0 rgba(0, 0, 0, .6);box-shadow: inset 0 1px 5px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .9), 0 -1px 0 rgba(0, 0, 0, .6);}");
    }

    function transform3() {
        $(".thumb_image img").toggleClass("rounded-img2");
    }

    function transform4() {
        $(".rounded-img, .rounded-img2").each(function() {
            var adjust = '';
            if (Math.round($(this).width() / 10) == 25)
                adjust = 'auto 100%';
            else
                adjust = '100% auto';
            $(this).wrap(function() { return '<span class="' + $(this).attr('class') + '" style="background:url(' + $(this).attr('src').replace("thumbs/", "") + ') no-repeat center center #E2F2FF; background-size:' + adjust + '; width: 100%; height: 100%;" />'; }); $(this).css("opacity", "0");
        });
    }


    transform1();
    transform2();
    transform3();
    transform4();

}