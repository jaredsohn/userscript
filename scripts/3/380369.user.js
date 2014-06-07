// ==UserScript==
// @name       Remove Gmail Ads by X-Force
// @namespace	http://www.iplaysoft.com/
// @version    0.1
// @description  Remove Gmail Ads
// @match      https://mail.google.com/mail/*
// @gant          GM_addStyle
// @copyright  X-Force
// ==/UserScript==

if (window.top != window.self)  //don't run on frames or iframes
  return;

GM_addStyle(".oM { display:none; }");
GM_addStyle(".Zs { display:none; }");
