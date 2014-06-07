// ==UserScript==
// @name           Gmail Auto Refresh
// @description    Auto Refresh Gmail every 15 minutes.
// @version        1.0
// @date           2013-08-04
// @author         Boltex
// @include     https://mail.google.com/*
// @include     https://*.mail.google.com/*
// ==/UserScript==
setTimeout("window.location.reload(true)", 15 * 60 * 1000);