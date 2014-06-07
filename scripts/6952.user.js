// ==UserScript==
// @name          Working Inline Mp3 Player
// @description   Add a player to mp3 links
// @include       *
// ==/UserScript==
    var head,script
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://googlepage.googlepages.com/player.js'
    head.appendChild(script);
