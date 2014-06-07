// ==UserScript==
// @name        Facebook
// @namespace   http://localhost
// @description Changes the theme of Facebook to a preffered style, ignoring all the ugly current updates.
// @include     https://www.facebook.com/
// @version     1
// @grant       none
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

addGlobalStyle('.home { background-color: #fff; }');
addGlobalStyle('._5vb_, ._5vb_ #contentCol { background-color: #fff; }');
addGlobalStyle('._5p3y ._5pbw, ._5p3y ._5pbx, ._5p3y ._5pbx span.text_exposed_link { font-size: 13px; }');
addGlobalStyle('._4-u2 { border-radius: 0px; }');
addGlobalStyle('._5vb_ ._5pr2.fbChatSidebar, .timelineLayout ._5pr2.fbChatSidebar { background-color: none; }');
addGlobalStyle('._5q5b .fbNubFlyoutTitlebar, ._5q5b ._50-v .noTitlebar, ._5q5b ._50-v.openToggler .fbNubFlyoutTitlebar { border-top-left-radius: 0px; border-top-right-radius: 0px; }');