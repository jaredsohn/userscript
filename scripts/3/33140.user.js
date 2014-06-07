// ==UserScript==
// @name          Gmail basic HTML fixed width font
// @namespace     
// @description	  Read and write using a fixed width font in gmail's basic HTML view.
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==



function addGlobalStyle(css) {
    var head, style, t, s;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
    t = document.getElementsByName('body')[0];
    t.id = 'mb';
    s = document.getElementsByName('subject')[0];
    s.id = 'su';
    }




addGlobalStyle('.msg, textarea#to, input#cc, input#bcc, input#su, textarea#mb { font-family: MonoSpace; font-size: 9pt; !important; }');