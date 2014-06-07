// ==UserScript==
// @name        Joomla CSS fix
// @namespace   Joomla CSS fix
// @description Creates a larger view for the CSS-editor in Joomla 2.5
// @include     http://wiki.greasespot.net/User_script
// @grant       none
// @version     1
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

addGlobalStyle(
'.CodeMirror-wrapping { height: 5000px ! important; }'
);