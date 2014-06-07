// ==UserScript==
// @name          del.icio.us mp3
// @namespace     
// @description   add del.icio.us mp3 player to links
// @include       http://*
// @exclude       http://*.icio.us/*
// ==/UserScript==
    var head,script
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://del.icio.us/js/playtagger'
    head.appendChild(script);
