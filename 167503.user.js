// ==UserScript==
// @name        Hide Mana Footer
// @namespace   http://userscripts.org/users/eziggy
// @description Hide Mana Footer
// @include     *mana.mozilla.org*
// @grant       GM_addStyle
// @version     1
// ==/UserScript==

GM_addStyle('.section, section.footer-body{ display: none; visibility: hidden; }');
