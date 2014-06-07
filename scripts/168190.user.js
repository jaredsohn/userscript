// ==UserScript==
// @name       Sidebar on twitter stays fixed.
// @namespace  http://www.nitosblog.com/
// @version    0.1
// @description  Dashboard stays fixed
// @match      https://*twitter.com/*
// @copyright  2012+, You
// ==/UserScript==

GM_addStyle(".dashboard { position: fixed; } .trends {display:none;} ");
