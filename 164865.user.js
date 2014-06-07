// ==UserScript==
// @name Green New Tab Links
// @description Adds a green style rule for links that open in a new tab.
// @include     *
// @grant none
// @version 1.2
// ==/UserScript==

document.head.appendChild(document.createElement('style'))
  .textContent='a[target="_blank"] {color: green}';
