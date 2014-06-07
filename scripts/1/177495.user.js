// ==UserScript==
// @name        XHamster gallery hotkeys
// @namespace   xhamster
// @include     http://xhamster.com/photos/view/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js
// @require     http://eu-st.xhamster.com/js/tpl2.gallery.slide.js
// @grant       GM_log


$(document).ready(function() {
    (function(){
        document.addEventListener('keydown', function(e) {
            GM_log(e.keyCode);
            if (e.keyCode == 37) {
                slide.showPrev(true);
            }
            if (e.keyCode == 39) {
                slide.showNext(true);
            }
        }, false);
    })();
});

// ==/UserScript==
