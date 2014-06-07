// ==UserScript==
// @name           Gmail Skinner 1.0.1
// @namespace      http://userscripts.org/scripts/show/60875
// @description    Skins Gmail for a more clean look
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @include        http://*.mail.google.com/*
// @include        https://*.mail.google.com/*
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.mq { display: none; }');
addGlobalStyle('.ps { display: none; }');
addGlobalStyle('.nH .mn { display: none; }');
addGlobalStyle('.mp { display: none; }');
addGlobalStyle('.ma { display: none; }');
addGlobalStyle('.qk { display: none; }');
addGlobalStyle('.nH .no .nH .nn { display: none; }');
addGlobalStyle('.oM { display: none; }');
addGlobalStyle('.u7 { display: none; }');
addGlobalStyle('.no { margin-top: 10px; }');
