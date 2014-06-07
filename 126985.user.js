// ==UserScript==
// @name       Twitter Keyboard Shortcuts
// @namespace  http://localhost/
// @version    0.1
// @description Some Twitter keyboard shortcuts for opening links in tweets
// @include    http://twitter.com/*
// @include    https://twitter.com/*
// ==/UserScript==

window.addEventListener("keydown", function(e)
{
    if (e.ctrlKey || e.altKey || e.metaKey)
        return;

    if (e.target.classList.contains('rich-editor') ||
        e.target.classList.contains('search-input') ||
        e.target.classList.contains('input-block'))
        return;

    var sel = document.querySelector('.selected-stream-item:focus');
    if (!sel) sel = document.querySelector('.permalink-tweet');
    if (!sel) sel = document.querySelector('.tweet');
    if (!sel) return;

    if (e.keyCode == 79 && !e.shiftKey) { // o
        var link = sel.querySelector('.js-tweet-text .twitter-timeline-link');
        if (!link) link = sel.querySelector('.js-tweet-text .pretty-link');
        if (!link) link = sel.querySelector('.view-more-link');
        if (link) window.open(link.href);
    }
    else if (e.keyCode == 79 && e.shiftKey) { // Shift + o
        var link = sel.querySelector('.stream-item-header .js-permalink');
        if (link) window.open(link.href);
    }
    else if (e.keyCode == 80 && !e.shiftKey) { // p
        var link = sel.querySelector('.stream-item-header .js-user-profile-link');
        if (link) window.open(link.href);
    }
    else if (e.keyCode == 80 && e.shiftKey) { // Shift + p
        var link = sel.querySelector('.js-retweet-text .js-user-profile-link');
        if (link) window.open(link.href);
    }
    else if (e.keyCode >= 48 && e.keyCode <= 57) { // 0 .. 9
        var n = e.keyCode - 49;
        if (n <0) n = 9;
        var links = sel.querySelectorAll('.js-tweet-text a');
        if (links[n]) window.open(links[n].href);
    }
}, false);
