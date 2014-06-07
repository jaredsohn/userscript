// ==UserScript==
// @name          Oomph Script automatic insert
// @namespace     
// @description   adds OOMPH javascript automatically, see more at http://visitmix.com/Lab/Oomph.  
// @include       http://*
// @exclude       http://www.google.com/reader/*
// @exclude       https://www.google.com/reader/*
// ==/UserScript==
    var head,script
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://visitmix.com/labs/oomph/1.0/client/jquery-1.2.6.min.js'
    head.appendChild(script);
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://visitmix.com/labs/oomph/1.0/client/oomph.js'
    head.appendChild(script);
