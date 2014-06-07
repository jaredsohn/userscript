// ==UserScript==
// @name        bookmark@du00.com
// @namespace   zhang
// @description place a bookmark automatically when you open a chapter
// @include     http://www.du00.com/read/*/*/*.html
// @grant       GM_log
// @version     1
// ==/UserScript==


var ajax_prefix = 'javascript:Ajax.Request(';

var linkright = document.getElementById('linkright');
if (linkright) {
    var links = linkright.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        if (link.text == '加入书签') {
            if (link.href.substring(0, ajax_prefix.length) == ajax_prefix) {
                var quote = link.href.charAt(ajax_prefix.length);
                if (quote == "'" || quote == '"') {
                    var start = ajax_prefix.length + 1;
                    var end = link.href.indexOf(quote, start);
                    if (end > start) {
                        var url = link.href.substring(start, end);
                        //GM_log(url);
                        unsafeWindow.Ajax.Request(url);
                    }
                }
            }
        }
    }
}