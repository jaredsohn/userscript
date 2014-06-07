// ==UserScript==
// @name          Dark Background
// @description   Turns a web page's background Grey and text White for readability.
// @include       *
// @include       about:blank
// ==/UserScript==

GM_addStyle("* { color: #EEEEEE ! important; background-color: #111111 ! important; } :link, :link * { color: #FFE37A !important } :visited, :visited * { color: #D6B742 !important }");
