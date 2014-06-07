// ==UserScript==
// @name        fix icons inline
// @namespace   zx.pk.ru
// @include     http://zx.pk.ru/*
// @include     http://zx-pk.ru/*
// @include     http://www.zx-pk.ru/*
// @include     http://www.zx.pk.ru/*
// @version     0.01
// @grant       none
// ==/UserScript==

var sheet = window.document.styleSheets[0];
sheet.insertRule('.inlineimg {vertical-align: bottom!important; padding-right: 2px; }', sheet.cssRules.length);
