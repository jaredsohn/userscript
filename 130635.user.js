// ==UserScript==
// @name ETI Title shortener
// @description Shortens "End of the Internet" in page titles to "ETI".
// @include http://*.endoftheinter.net/*
// @include https://*.endoftheinter.net/*
// @include http://endoftheinter.net/*
// @include https://endoftheinter.net/*
// ==/UserScript==

//If you want to eliminate ETI:
document.title = document.title.replace(/End of the Internet - /i, "");