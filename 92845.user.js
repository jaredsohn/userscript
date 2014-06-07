// ==UserScript==
// @name           Kongregate show hidden comments
// @description    Shows comments that are under rating threshold
// @include        http://www.kongregate.com/games/*
// ==/UserScript==

(function(){
    var count = 0;
    (function(){
        var all = document.evaluate("//span[@class='comment_content'][contains(@style,'display')][contains(@style,'none')]", document, null, 7, null);
        for (var i = 0, item; item = all.snapshotItem(i); i++) {
            item.style.display = 'block';
            item.style.color = '#999';
        }
        if (count++ < 10) {
            setTimeout(arguments.callee, 500);
        }
    }());
}());
