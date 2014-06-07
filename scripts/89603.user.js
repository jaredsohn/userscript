// Author: Elad Ossadon ( http://devign.me | http://elad.ossadon.com | http://twitter.com/elado | elado7@gmail.com )

// ==UserScript==
// @name           Facebook - Bring my big font back!
// @namespace      devign.me
// @description    Brings the font size of statuses back to normal
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==

var CSS=".uiStream .uiStreamMessage, .messageBody, .messageBody span, .mall_post_body_text { font-size:13px!important; }";
GM_addStyle(CSS);