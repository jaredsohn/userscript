// ==UserScript==
// @name          GenteYa.com
// @description   Provides download links for GenteYa
// @include       http://www.genteya.com/verfoto/*
// ==/UserScript==

// GenteYa URL: http://www.genteya.com/verfoto/?id=[pic_id]
// GenteYa download link: http://www.genteya.com/upload....

document.location = document.getElementsByTagName("img").item(0).src;