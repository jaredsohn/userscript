// ==UserScript==
// @name        YT Context
// @namespace   Stefan Voss
// @description Brings back context menu
// @include     http*://youtube.com*
// @include     http*://www.youtube.com*
// @version     1.0
// ==/UserScript==

var css = '.delayed-frame-styles-not-in .hide-until-delayloaded {display: block;}',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

head.appendChild(style);