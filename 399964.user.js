// ==UserScript==
// @name Cornify_Button
// @description Adds the Cornify button to SO.
// @include http://*.stackoverflow.com/*
// ==/UserScript==

(function() {
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') { 
            window.setTimeout(GM_wait,100); 
        } else { 
            $ = unsafeWindow.jQuery; letsJQuery(); 
        }
    }
    GM_wait();
    function letsJQuery() {
        $("head").append("<script type='text/javascript' src='http://www.cornify.com/js/cornify.js'></script>");
        $("<a href='http://www.cornify.com' ></a>")
            .append("<img src='http://www.cornify.com/assets/cornify.gif' style='vertical-align:top' alt='Cornify' />")
            .appendTo(".post-menu")
            .click(function() {
                $(this).closest("table").find("td:gt(0) img").attr("src", function() { return this.src.replace(/www\.gravatar\.com/, "unicornify.appspot.com"); });
                cornify_add();
                return false;
            })
            .before("<span class='lsep'>|</span>");
        }
    }
})();