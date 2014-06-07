// ==UserScript==
// @name           Hide Hotmail's Search Web Box
// @namespace      http://www.stealthmonkey.com
// @description    Hides the "Search the Web" box at the top of the Hotmail interface.
// @include        http://*.mail.live.com/*
// ==/UserScript==

if (document.getElementById('c_search') != null) {
  document.getElementById('c_search').parentNode.style.display = 'none';
}
