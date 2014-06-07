// ==UserScript==
// @name           Gmail Auto Refresh
// @description    Gmail bakal Auto Refresh tiap 5 menit cuyy.
// @version        1.0
// @date           2013-10-16
// @author         Afrian Pasa
// @grant           none
// @include     https://mail.google.com/*
// @include     https://*.mail.google.com/*
// ==/UserScript==
setTimeout("window.location.reload(true)", 5 * 60 * 1000);