// ==UserScript==
// @name          google mp3
// @namespace     
// @description   add google mp3 player to links
// @include       http://*
// @include       https://*
// ==/UserScript==
    var head,script
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://googlepage.googlepages.com/player.js'
    head.appendChild(script);

