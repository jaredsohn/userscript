// ==UserScript==
// @name           Reddit Open All Unvoted Links
// @namespace      http://www.w3.org/1999/xhtml
// @description    Open all unvoted links in a subreddit.
// @include        http://*.reddit.com/r/*
// @exclude        http://*.reddit.com/r/*/comments/*
// ==/UserScript==

(function () {
    var $ = unsafeWindow.$;
    
    // The function as a oneliner. TODO: figure out how to fix "function not found" errors in greasemonkey
    var open_links_string = "$('div.link:not(.promotedlink) div.entry.unvoted a.title').mousedown().each(function (i, e) { window.open(e.href);}); return false;";
    
    // Add a link to sidebar.
    $("div.titlebox div.usertext-body div.md").prepend('<a href="#" onclick="'+open_links_string+'"><h2>Open all unvoted links</h2></a>');
})();