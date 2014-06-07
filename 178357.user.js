// ==UserScript==
// @name       Reddit Title Fixer
// @version    0.1
// @description  Appends " - Reddit" to the end of the title of any page on reddit.
// @match      http://www.reddit.com/*
// @copyright  2013+, You
// ==/UserScript==

window.document.title += " - Reddit";