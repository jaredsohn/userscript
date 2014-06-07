// ==UserScript==
// @name           Reddit - Add submission links to user pages
// @namespace      http://userscripts.org/users/115800
// @description    Adds links to submissions that comments were posted in on user pages.
// @icon           http://i.imgur.com/78pKh.png
// @include        http://*.reddit.com/user/*
// ==/UserScript==

$ = unsafeWindow.jQuery;
if ($) {
    var permalinks = $(".first a.bylink");

    for (var i = 0; i < permalinks.length; i++) {
        var permalink = permalinks.get(i);
        var permalinkHref = permalink.getAttribute("href");

        var submission = document.createElement("a");
        submission.setAttribute("href", permalinkHref.substring(0, permalinkHref.length - 7));
        submission.setAttribute("style", "margin-left: 8px;");
        submission.innerHTML = "submission";

        permalink.parentNode.parentNode.childNodes[1].appendChild(submission);
    }
}
