// ==UserScript==
// @name        vita big image
// @version     130114b0340
// @description aaaa
// @namespace   http://userscripts.org/users/wotupset
// @downloadURL    http://userscripts.org/scripts/source/155130.user.js
// @updateURL      http://userscripts.org/scripts/source/155130.meta.js
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include     http://vita.komica.org/00/*
// @include	http://*.komica.org/*/*
// @include	http://*.komica.net/*/*
// @include	http://*.komica2.net/*/*
// @include	http://*.komica3.net/*/*
// @include	http://*.komica4.net/*/*
// @exclude     http://gmail.google.com/*

// ==/UserScript==
document.querySelector("input[name=MAX_FILE_SIZE]").value = "3000000";