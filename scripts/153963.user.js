// ==UserScript==
// @name        Always show Google Search tools
// @description Makes Googles search tools appear by default
// @author      keyrat
// @version     .1
// @license     GPL
// @include     http://www.google.*
// @include     https://www.google.*
// @include     https://encrypted.google.*
// ==/UserScript==

document.getElementById('hdtbMenus').classList.add('hdtb-td-o');
document.getElementById('hdtbMenus').classList.remove('hdtb-td-c');
document.getElementById('hdtbMenus').classList.remove('hdtb-td-h');