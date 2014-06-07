// ==UserScript==
// @name           Focus On Searchbox
// @version        0.1
// @namespace      http://handlena.me
// @description    Focus on google search box with Ctrl + o.
// @include        http://www.google.co.jp/search*
// @include        http://www.google.com/search*
// @author         NAGATA Hiroaki
// ==/UserScript==

(function() {
    var KEY_CTRL = 17;
    var KEY_O = 79;
    
    var modstate = false;
    var searchbox = document.getElementsByClassName('lst-td')[0].getElementsByTagName('input')[0];

    document.addEventListener('keydown', function(event) {
        if(event.keyCode == KEY_CTRL) {
            modstate = true;
        }

        if(event.keyCode == KEY_O && modstate) {
            searchbox.focus();
        }
    }, false);

    document.addEventListener('keyup', function(event) {
        if(event.keyCode == KEY_CTRL) {
            modstate = false;
        }
    }, false);
})();
