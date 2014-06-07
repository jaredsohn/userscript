// ==UserScript==
// @name           focus on first inputbox
// @namespace      gzq.focus
// @description    alt+o to focus on first inputbox 
// @include        http://*
// ==/UserScript==

(function() {
    var KEY_O = 79;
    var firstbox = document.getElementsByTagName('input')[0];
    document.addEventListener('keydown', function(event) {
		if(event.keyCode == KEY_O && event.altKey) {
            firstbox.focus();
            firstbox.select();
        }
    }, false);
})();
