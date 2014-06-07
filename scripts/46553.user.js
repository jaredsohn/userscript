// ==UserScript==
// @name        mixi apri uri
// @namespace   http://d.hatena.ne.jp/hatecha/
// @description pop-up mixi apri uri in run_appli.pl-page if you have added it
// @include     http://*.mixi.*
// ==/UserScript==

(function () {
    var Anchor = document.body.getElementsByTagName('iframe');
        for(var i in Anchor) {
            href = Anchor[i].src;
            if(href && href.match(/canvas&url=(.*)%3F/)) {
                alert(decodeURIComponent(RegExp.$1));
            }
        }
 })()
 