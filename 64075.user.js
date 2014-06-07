// ==UserScript==
// @name           Read feeds by one key
// @namespace      http://d.hatena.ne.jp/snaka72/
// @include        http://reader.livedoor.com/reader/
// @license        MIT style license
// ==/UserScript==
(function(){

var w = unsafeWindow || window;
w.addEventListener('load', function() {
    var feed = document.getElementById("right_container");
    w.Keybind.add('space', function() {
        var remain = feed.scrollHeight - feed.clientHeight - feed.scrollTop;
        if (remain == 0) {
            w.message("go next subscription");
            w.Control.read_next_subs();
        } else {
            w.Control.scroll_next_page(); 
        }
    });
}, false);

})();
