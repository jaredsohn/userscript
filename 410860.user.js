// ==UserScript==
// @name        Google Font Reverse
// @version     1.0
// @author      Okxa
// @include	https://www.google.*/search*
// @include	http://www.google.*/search*
// ==/UserScript==

function addGlobalStyle(css){
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function removeElement(elemntId) {
    var elem = document.getElementById(elemntId);
    elem.parentNode.removeChild(elem);
    return false;
}

GM_addStyle('#res h3, #tads h3 { margin-bottom: 2px !important; font-size: 16px !important; text-decoration:underline !important;}');