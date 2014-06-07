// ==UserScript==
// @name        linked-in don't import email
// @namespace   linkedin.com
// @include     http://www.linkedin.com/
// @include     https://www.linkedin.com/
// @version     1
// @grant       none
// ==/UserScript==

(function (){
    function log(t){
        console.log("LinkedInX: " + t);
    }

    function reschedule(f){
        log("Not loaded enough, re-scheduling");
        window.setTimeout(f, 200);
    }

    function nuke(){
        log("Started");
        
        var control_js = document.getElementsByClassName("li-control");
        if (control_js.length < 1) {
            reschedule(nuke);
            return;
        }
        
        var addr_book_spam = document.getElementsByClassName("upload-address-book");
        if (addr_book_spam.length < 1) {
            reschedule(nuke);
            return;
        }
        
        for (var i = 0; i < addr_book_spam.length; i++) {
            var it = addr_book_spam.item(i);
            it.hidden = true;
            it.style.setProperty("display", "none", "important");
        }

        log("Finished!");
    }

    log("Loaded.");
    window.setTimeout(nuke, 5);
})();
