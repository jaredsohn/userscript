// ==UserScript==
// @name window.open Opens in New Tab
// @description Causes URIs opened with window.open to instead open in a new tab.
// @include *
// ==/UserScript==

unsafeWindow.open = GM_openInTab;
