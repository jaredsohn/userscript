// ==UserScript==
// @name        Google Reader Fonts
// @namespace   http://gokdeniz.karadag.me
// @description Increases Google Reader font size and changes font to serif
// @include     http://www.google.com/reader/*
// @include     https://www.google.com/reader/*
// @grant       GM_addStyle
// @version     0.1
// ==/UserScript==


GM_addStyle(".entry-body { font-family: serif !important; font-size: 16px !important; }");