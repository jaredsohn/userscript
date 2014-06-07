    // ==UserScript==
    // @name       youtube-hateit
    // @description  Replaces "I dislike it" with "I HATE IT" in youtube videos
    // @version       0.9999999999999999999999
    // @author        Cidoku
    // @include    http://*.youtube.com/*
    // @include    https://*.youtube.com/*
    // ==/UserScript==
     
    var button = document.getElementById("watch-dislike");
     
    button.setAttribute('title','I HATE IT!');
    button.setAttribute('alt','I HATE IT!');