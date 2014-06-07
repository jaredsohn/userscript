// ==UserScript==
// @name           Astrid Focus Mode
// @namespace      http://ifup.org
// @description    Removes the right info bar and makes the main content span 12
// @include        http*://astrid.com/home*
// @version        1.0.0
// ==/UserScript==

document.getElementsByClassName('home-index-right')[0].style.display = 'none';
document.getElementsByClassName('home-index-main')[0].className = 'span12 home-index-main';
