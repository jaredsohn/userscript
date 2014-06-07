// ==UserScript==
// @name        Fix Youtube Watch Later Button
// @description  Youtube recently broke the "Watch Later" button in video thumbnails. This attempts to fix it.
// @namespace   http://userscripts.org/users/622750
// @author      Degats
// @include     https://youtube.com/*
// @include     https://*.youtube.com/*
// @include     http://youtube.com/*
// @include     http://*.youtube.com/*
// @version     0.1
// @grant       none
// ==/UserScript==

/* Changelog
   =========

0.1 - 2014-03-30
    - First attempt, seems to work.
    - Not fully tested, may break other things.

*/

function addGlobalStyle(css) {
    var head,
    style;
    head = document.getElementsByTagName('head') [0];
    if (!head) {
        return ;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.delayed-frame-styles-not-in .hide-until-delayloaded { display: inline-block; }');