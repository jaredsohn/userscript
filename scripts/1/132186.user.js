// ==UserScript==
// @name           Soundcloud.com Hide Player Comments
// @version        1.1
// @namespace      emkasoft
// @author         emkasoft <emkasoft@hotmail.com>
// @description    Hides the comments on Soundcloud tracks by default.
// @include        http://*.soundcloud.com/*
// @include        http://soundcloud.com/*
// ==/UserScript==

function dashlistener(ev) {
    var t = ev.target;
    if (t.nodeName.toLowerCase() != 'li') return;
    nocomments(t);
}

function nocomments(ob) {
    var players = ob.getElementsByClassName('player');
    for (var p in players) {
        if (players[p].nodeName.toLowerCase() != 'div') continue;
        players[p].className += ' no-comments';
    }
}

try {
    document.getElementById('overview-list').addEventListener('DOMNodeInserted', dashlistener, false);
} catch (e) {
    nocomments(document);
}