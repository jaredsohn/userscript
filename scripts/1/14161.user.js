// ==UserScript==
// @name           Google Services in HTPPS
// @namespace      http://www.victor.eu.org/googlehttps
// @description    Change Google Url services using HTTP by same service using HTTPS for security.
// @include        http://docs.google.com/*
// @include        http://spreadsheets*.google.com*
// @include        http://spreadsheets.google.com*
// @include        http://www.google.*/reader/*
// @include        http://www.google.com/bookmarks*
// @include        http://www.google.com/calendar/*
// @include        http://www.google.com/history/*
// @include        http://gmail.google.com*
// @include        http://mail.google.com*
// @version        1.1.1
// ==/UserScript==

window.location.replace(window.location.href.replace(/^http\:(.+)/, "https:$1"));

