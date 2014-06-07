// ==UserScript==
// @name           gmail - intel exa slow scroll fix
// @namespace      gmail-intel-exa-cymen
// @description    Resolve issue with slow scrolling in threaded discussions on Gmail when using Intel EXA video driver under X.
// @include        https://mail.google.com/mail/*
// ==/UserScript==

// target: <div class="sss8ob"> (show's name of next thread poster on lower
// right)


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle("div.it{display:none !important}");
