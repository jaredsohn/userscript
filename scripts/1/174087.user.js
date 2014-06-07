// ==UserScript==
// @name       Launchpad monkey
// @namespace  http://github.com/gtt116
// @version    0.1
// @description  Make launchPad width bigger
// @match      http://*.launchpad.net/*
// @match      https://*.launchpad.net/*
// @copyright  2013+, gtt116
// ==/UserScript==

function createStyle(css, id) {
    var s = document.createElement('style');
    if (id) s.id = id;
    s.type = 'text/css';
    s.textContent = css;
    return s;
}

css = 'p {max-width:none}';
document.head.appendChild(createStyle(css));