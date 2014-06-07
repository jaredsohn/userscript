// ==UserScript==
// @name           TweetDeck Clear Button
// @namespace      http://dvdbng.com
// @description    Adds a clear column button directly accesible
// @include        https://web.tweetdeck.com/web/*
// ==/UserScript==

var $ = unsafeWindow.jQuery;
unsafeWindow.TD_mustaches["column/column_header.mustache"] = unsafeWindow.TD_mustaches["column/column_header.mustache"].replace('<div class="options-nav">','<div class="options-nav"><a class="GS_clean">clean</a>');

$(document.body).delegate(".GS_clean","click",function(){
    $(this).parents(".column")
        .find("a[data-action=options]").click().end()
        .find("input[data-action=clear]").click().end()
        .find("a[data-action=options]").click()
});

