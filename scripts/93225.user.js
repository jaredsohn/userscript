// Author: Elad Ossadon ( http://devign.me | http://elad.ossadon.com | http://twitter.com/elado | elado7@gmail.com )

// ==UserScript==
// @name              Facebook - Fix RTL on Posts and Comments
// @namespace    devign.me
// @description    Fixes RTL on Posts and Comments
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// ==/UserScript==

var CSS="span[dir='rtl'] { display:block!important; text-align:right!important; }";
GM_addStyle(CSS);