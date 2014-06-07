// ==UserScript==
// @name        Highlight Topic Author Comments
// @namespace   http://userscripts.org
// @description Highlights Topic Author's Comments
// @version     1.1
// @include     http://habrahabr.ru/blogs/*
// @include     http://habrahabr.ru/blog/*
// @include     http://*.habrahabr.ru/blogs/*
// @include     http://*.habrahabr.ru/blog/*
// ==/UserScript==

(function(window, undefined ) {
    var w;
    w = (typeof unsafeWindow != 'undefined') ? unsafeWindow : window;
    if (w.self != w.top) 
        return;
    w.addEventListener("load", function(e) {
        var $ = w.$, authorName;
        $('<style>.info.topic_author { background-color: #fdd; }\n' +
          '.info.topic_author.is_new { background-color: #efd9ef !important; }</style>').appendTo('head');
        var authorName = $('.infopanel .author a').text();
        $('#comments div.info .username').each(function(id, val) {
            if ($(val).text() == authorName) {
                $(val).parent('.info').addClass('topic_author');
            }
        });
    });
})(window);
