// ==UserScript==
// @name          Toggle YouTube Comments
// @namespace     http://userscripts.org/users/brettof86
// @description   YouTube comments almost always useless.
// @version       0.2
// @include       http://*.youtube.com/*
// @include       https://*.youtube.com/*
// ==/UserScript==
(function () {
    var comments = document.getElementById('watch-discussion');
    if (!comments) {
        return false;
    }
    // if you hide the div then youtube js won't load the iframe
    // because it can't find the div to place them in
    // moving them off screen makes them still load
    comments.setAttribute('style', 'position:absolute;left:-99999999px;');
    var div = document.createElement('div');
    div.classList.add('show_hide_comments');
    var a = document.createElement('a');
    a.text = 'Toggle Comments';
    a.href = '#';
    // youtube classes
    a.classList.add('yt-uix-button');
    a.classList.add('yt-uix-button-default');
    a.classList.add('yt-uix-button-size-default');
    a.onclick = function () {
        if (comments.getAttribute('style')) {
            comments.setAttribute('style', '');
        } else {
            comments.setAttribute('style', 'position:absolute;left:-99999999px;');
        }
        return false;
    };
    div.appendChild(a);
    comments.parentElement.insertBefore(div, comments);
    // style the button
    var css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = '.show_hide_comments { text-align: center; padding: 10px; border: 1px solid #E6E6E6; border-top: 0;}';
    document.body.appendChild(css);
}) ();
