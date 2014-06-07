// ==UserScript==
// @name        BeetusBotTOC
// @namespace   beetusbot
// @description Creates a TOC in the beginning of a thread if a user has multiple stories.
// @include     http://www.reddit.com/r/fatpeoplestories/comments/*
// @version     0.1
// @grant       none
// ==/UserScript==
// If greasemonkey the above will be used
$(function () {
    $(".thing").each(function () {
        if ($('.author', $(this)).first().text() == "BeetusBot") {
            var post = $(".md", $(this)).first();
            var stories = post.find("ul").clone();
            var toc = $("<p/>", {
                text: "Table of contents:"
            })
                .append(stories)
                .append($("<a/>", {
                    text: "Subscribe",
                    href: post.find('a[href*="reddit.com/message/compose/"]').attr('href')
                }))
                .append("<hr>");
            $('#siteTable .md').prepend(toc);
            return;
        }
    });
});