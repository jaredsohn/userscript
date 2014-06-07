// ==UserScript==
// @name           oneclickmoviez skipper
// @namespace      http://ilija.neopsindle.com/
// @description    skip all boring stuff on oneclickmoviez.com
// @include        http://oneclickmoviez.com/down/*
// ==/UserScript==
location.href = location.href.replace(/.*oneclickmoviez\.com\/down\/\?/, '');