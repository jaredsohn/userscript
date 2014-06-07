// ==UserScript==
// @name           Disable Lotus Notes Logout Button
// @namespace      http://www.stealthmonkey.com
// @description    Disables the logout button, which is broken and requires a system reboot if clicked
// @include        *.nsf*
// ==/UserScript==

GM_addStyle("#e-modepanel-logout-anchor { display: none !important; }");
