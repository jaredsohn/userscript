// ==UserScript==
// @name          SO sponsored tag advertisements.
// @description   Removes stupid sponsored tag advertisements.
// @include       http://stackoverflow.com/*
// @include       http://serverfault.com/*
// @include       http://superuser.com/*
// @include       http://meta.stackoverflow.com/*
// ==/UserScript==
    
(function(){
    //Function for finding the window's jQuery variable.
    //http://meta.stackoverflow.com/questions/12448/greasemonkey-users-here-is-your-vote-reputation-info-plug-in-for-stackoverflow/12454#12454
    function GM_wait() {
        var daWindow;
        if (window.opera) {
            daWindow=window;
        } else {
            daWindow = unsafeWindow;
        }
        if(typeof daWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait,100);
        } else {
            jQuery_init(daWindow.jQuery);
        }
    }
    GM_wait();
    
    function jQuery_init($){
        $(function(){
            $("a.post-tag img").remove();
            $("div.welovestackoverflow").remove();
        });
    };
})();
