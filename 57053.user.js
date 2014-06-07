// ==UserScript==
// @name           Autorefresh Google Reader
// @namespace      http://chuckharmston.com/googlereader
// @description    Automatically refreshes Google Reader every 30 seconds
// @include        htt*://www.google.*/reader/view*
// ==/UserScript==

(function() {

    function autoRefresh(){
        var mouse = document.createEvent('MouseEvents');
        mouse.initEvent('click', true, false);
        document.getElementById('sub-tree-header').dispatchEvent(mouse);
    }
    interval = (window.top == window) ? window.setInterval(autoRefresh, 30000) : false;

})();