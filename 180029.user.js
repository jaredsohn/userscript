// ==UserScript==
// @name        bazqux - open in background for Firefox
// @namespace   troo.cz
// @include     https://bazqux.com/
// @version     1
// @grant       GM_openInTab
// ==/UserScript==

unsafeWindow.openLinkInBackgroud = function (l) { 
  setTimeout(function() { GM_openInTab(l); }, 0);
};
