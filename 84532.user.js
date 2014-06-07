// ==UserScript==
// @name           Reddit - Add subreddit links to user pages
// @namespace      http://userscripts.org/users/115800
// @description    Adds links to subreddits that comments were posted in on user pages.
// @icon           http://i.imgur.com/78pKh.png
// @include        http://*.reddit.com/user/*
// ==/UserScript==

$ = unsafeWindow.jQuery;
if ($) {
    var permalinks = $(".first a.bylink");

    for (var i = 0; i < permalinks.length; i++) {
        var permalink = permalinks.get(i);
        var permalinkHref = permalink.getAttribute("href");

        var subredditHref = /(http:\/\/.*?.reddit.com\/r\/.*?\/)/.exec(permalinkHref)[1];
        var subredditName = /.*\/r\/(.*?)\//.exec(subredditHref)[1];

        // I don't like this
        collapser = permalink.parentNode.parentNode.parentNode.childNodes[0].childNodes[7];
        collapser.parentNode.insertBefore($("<span> in <a href=\"" + subredditHref + "\">" + subredditName + "</a></span>").get(0), collapser);
    }
}
