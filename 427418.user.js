// ==UserScript==
// @name         Hacker News - Open Links in New Tab
// @description  
// @author       wenLiangcan
// @version      0.1
// @namespace    https://github.com/wenLiangcan
// @homepage     https://github.com/wenLiangcan/Userscripts
// @license      GPL version 3 (http://www.gnu.org/licenses/gpl.txt)
// @copyright    Copyright © 2014 wenLiangcan
// @updateURL    http://userscripts.org/scripts/source/427418.user.js
// @downloadURL  http://userscripts.org/scripts/source/427418.user.js
// @include      http://news.ycombinator.com/*
// @include      https://news.ycombinator.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

var items = document.getElementsByClassName('title');
for (i=1; i<items.length; i+=2) {
    items[i].firstElementChild.target = '_blank';
}
