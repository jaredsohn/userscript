// ==UserScript==
// @name        Sankaku Idol/Chan Style Fix
// @namespace   faleij
// @description Fixes the broken CSS on Sankaku
// @include     http://*.sankakucomplex.com/*
// @include     https://*.sankakucomplex.com/*
// @version     1.1
// ==/UserScript==
GM_addStyle("div.scad-i { display: none !important; } div.content { width: auto !important; } .content-page { display: inline !important; }");