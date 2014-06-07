// ==UserScript==
// @name           GMail - Enlarge "Next Author" Text
// @namespace      http://userscripts.org/users/40332
// @description    Make the name of the author of the next post in long threads that is display in the lower right larger.
// @include        https://mail.google.com/*
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

// To change size of text change the number 20 to a larger or smaller value to taste.
addGlobalStyle("div.it{font-size: 20px}");
