// ==UserScript==
// @name           LaunchPad Myanmar Font
// @namespace      Thant Thet Khin Zaw
// @description    Change LaunchPad Translation font to Myanmar Font
// @include        https://translations.launchpad.net/*
// @include        http://translations.launchpad.net/*
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

addGlobalStyle('div[lang="my"] {font-family: padauk, myanmar3, parabaik; font-size: 120%;}');
addGlobalStyle('input[lang="my"] {font-family:padauk, myanmar3, parabaik; font-size: 120%;}');
addGlobalStyle('textarea[lang="my"] {font-family:padauk, myanmar3, parabaik; font-size: 120%;}');
addGlobalStyle('label[lang="my"] {font-family:padauk, myanmar3, parabaik; font-size: 120%;}');