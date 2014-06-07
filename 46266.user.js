// ==UserScript==
// @name        EnableRightClickMenu
// @description	Re-enables the right-click menu some sites disable
// @include		  *
// ==/UserScript==

function dummyIgnore() {
  return null;
}

document.oncontextmenu = dummyIgnore;
